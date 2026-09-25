window.DTC_ACCESS = {
  // THE SWITCH. Flip to true once everyone has a Dare to Care app account.
  //
  // Flipped true on 2026-09-25: a caregiver took all her courses on the code
  // path and nothing reached the office, because certificates are only filed
  // for learners the app vouches for. Everyone who takes training needs an app
  // account now.
  //
  // false (before): learners can sign in either by handoff from the DTC app, or
  //   with name + date of birth + a shared access code. Existing caregivers rely
  //   on the code path for annual refreshers, so it stays open for now.
  //
  // true (the goal): the access-code form disappears and the ONLY way in is a
  //   handoff from the app. That is what makes the training gate airtight — a
  //   shared code can be passed to someone whose training hasn't been released,
  //   and no amount of checking on this site can tell the difference.
  //
  // Before flipping it: every caregiver who takes courses needs an app account,
  // otherwise they are locked out of their own annual training.
  requireAppSignIn: true,

  codes: ["DTCHC-0000"], // optional permanent backup — remove later

  remoteUrl: "",

  rotate: {
    enabled: true,
    secret: "RRC3",
    graceDays: 2
  },

  revealKey: "RRC3"
};
