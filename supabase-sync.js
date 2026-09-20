/* Dare to Care — course site <-> DTC app bridge.

   WHAT THIS REPLACED, AND WHY
   This file used to talk to Firebase (firebase-sync.js). The DTC app moved to
   Supabase and this did not, so the two products quietly stopped being one:
   the app wrote a handoff token to Postgres, this site looked that token up in
   Firestore, found nothing, and showed a released new hire the access-code
   form as though it had never heard of them. Certificates went the same way —
   written to a collection nobody reads, so the office saw no training at all.
   Both halves worked. They just worked against different databases.

   HOW IT WORKS NOW
   Everything goes through four database functions (dtc-app/supabase/
   course-bridge.sql), never through tables. The key below is the publishable
   one, which is meant to be public: on its own it reads nothing, because every
   table refuses it. What identifies the learner is the handoff token the app
   minted for them — so this public page can act for exactly one person, the
   one the app just sent, and cannot reach anybody else.

   The token is remembered here rather than passed around by app.jsx, which
   still calls these functions with a uid the way it always did. */
(function () {
  var SUPABASE_URL = "https://syfhzfusdrejtxsbkpmy.supabase.co";
  var PUBLISHABLE_KEY = "sb_publishable_AvZPtXi1_j-DxZJn20pObg_Fs0SNjTD";

  // The token this learner arrived on. Held for the session: signing in needs
  // a fresh one, but saving progress an hour into a course does not, and the
  // database decides where that line is rather than this file.
  var token = null;
  try {
    token = new URLSearchParams(window.location.search).get("h");
    if (token) sessionStorage.setItem("dtc_handoff", token);
    else token = sessionStorage.getItem("dtc_handoff");
  } catch (e) {
    /* private mode, or no session storage — the handoff simply won't persist */
  }

  function rpc(fn, args) {
    return fetch(SUPABASE_URL + "/rest/v1/rpc/" + fn, {
      method: "POST",
      headers: {
        "apikey": PUBLISHABLE_KEY,
        "authorization": "Bearer " + PUBLISHABLE_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify(args || {}),
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; });
  }

  /* Sign-in by handoff. app.jsx expects an object with name/email/uid, or a
     falsy value meaning "carry on as an anonymous learner". The two refusals
     it can show a reason for — expired, and training not yet released — come
     back as the shapes it already knows how to read. */
  window.DTC_getHandoff = function (t) {
    return rpc("redeem_course_handoff", { p_token: t || token }).then(function (res) {
      if (!res || !res.status) return null;
      if (res.status === "expired") return { expiresAt: "1970-01-01T00:00:00.000Z" };
      if (res.status === "not-released") return { role: "newHire", coursesUnlockedAt: null };
      if (res.status !== "ok") return null;
      if (t) token = t;
      return { uid: res.uid, name: res.name, email: res.email, role: res.role };
    });
  };

  /* Progress. The uid argument is ignored on purpose: the token decides whose
     progress this is, so a learner cannot ask for somebody else's by changing
     a value in the page. */
  window.DTC_loadProgress = function () {
    if (!token) return Promise.resolve({});
    return rpc("course_progress_get", { p_token: token }).then(function (res) {
      return res && typeof res === "object" ? res : {};
    });
  };

  window.DTC_saveProgress = function (_uid, progress) {
    if (!token) return Promise.resolve(false);
    return rpc("course_progress_save", { p_token: token, p_progress: progress || {} });
  };

  /* The certificate. Attribution is the database's job — it files this against
     the person the token names, whatever the page says. Anything else would be
     a training record the learner could write for themselves. */
  window.DTC_saveCertificate = function (cert) {
    if (!token || !cert || !cert.courseId) return Promise.resolve(null);
    return rpc("course_certificate_save", {
      p_token: token,
      p_cert: {
        name: cert.name || "",
        email: cert.email || "",
        courseId: cert.courseId,
        courseTitle: cert.courseTitle || "",
        score: cert.score == null ? 0 : cert.score,
      },
    });
  };

  /* Learners who came in with an access code rather than from the app have no
     token, so nothing above can file anything for them. That is not a new
     limitation — their certificates went to Firestore before, where nothing
     read them — but it is the reason access-config.js still says the switch to
     app-sign-in-only is the thing that makes training records complete. */
  window.DTC_hasHandoff = function () { return !!token; };
})();
