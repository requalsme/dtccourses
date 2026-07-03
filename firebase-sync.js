/* Dare to Care — course site → DTC app certificate sync.
   Additive and self-contained: on module pass, app.jsx calls
   window.DTC_saveCertificate(...) which writes a completion record to the same
   Firebase project the DTC app reads. If Firebase is unreachable or anonymous
   auth is disabled, everything fails silently and the course site behaves
   exactly as before. */
(function () {
  try {
    if (typeof firebase === "undefined") return;
    firebase.initializeApp({
      apiKey: "AIzaSyBLAj8h8i4JLGjw0Ms5CE9aabpoM2G57ng",
      authDomain: "dtcapp-24504.firebaseapp.com",
      projectId: "dtcapp-24504",
      storageBucket: "dtcapp-24504.firebasestorage.app",
      messagingSenderId: "373168542820",
      appId: "1:373168542820:web:69750756b1712976febb71"
    });
    firebase.auth().signInAnonymously().catch(function (e) {
      console.warn("[DTC] anonymous auth unavailable — certificates won't sync:", e && e.code);
    });
    var db = firebase.firestore();

    // Stable id per learner+course so re-passing doesn't create duplicates.
    // Prefer email (ties to the DTC app profile); fall back to name+dob.
    function certId(cert) {
      var base = cert.email
        ? (cert.email + "|" + (cert.courseId || ""))
        : ((cert.name || "") + "|" + (cert.dob || "") + "|" + (cert.courseId || ""));
      var h = (window.hashStr ? window.hashStr(base.toLowerCase().replace(/\s+/g, "")) : Date.now()).toString(36);
      return "cert_" + h;
    }

    window.DTC_saveCertificate = function (cert) {
      try {
        return db.collection("certificates").doc(certId(cert)).set({
          name: cert.name || "",
          dob: cert.dob || "",
          email: (cert.email || "").toLowerCase(),
          uid: cert.uid || "",
          courseId: cert.courseId || "",
          courseTitle: cert.courseTitle || "",
          score: (cert.score != null ? cert.score : null),
          date: cert.date || new Date().toISOString(),
          source: "course-site",
          createdAt: new Date().toISOString()
        }).catch(function (e) { console.warn("[DTC] certificate save failed:", e && e.code); });
      } catch (e) {
        console.warn("[DTC] certificate save error:", e);
      }
    };

    // Resolve a one-time handoff token (from the DTC app) to the user's identity,
    // so the course site can sign them in without a second login. Waits for
    // (anonymous) auth to be ready first, otherwise the read would be denied.
    window.DTC_getHandoff = function (token) {
      return new Promise(function (resolve) {
        var done = false;
        function finish(v) { if (!done) { done = true; resolve(v); } }
        function read() {
          db.collection("courseHandoffs").doc(token).get()
            .then(function (snap) { finish(snap.exists ? snap.data() : null); })
            .catch(function () { finish(null); });
        }
        try {
          if (firebase.auth().currentUser) { read(); }
          else { firebase.auth().signInAnonymously().then(read).catch(function () { finish(null); }); }
        } catch (e) { finish(null); }
        // Safety timeout so the course site never hangs on the loader.
        setTimeout(function () { finish(null); }, 6000);
      });
    };
  } catch (e) {
    console.warn("[DTC] Firebase sync unavailable:", e);
  }
})();
