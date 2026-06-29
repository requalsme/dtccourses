# Access Codes — Admin Guide

The site uses **auto-rotating monthly codes**. Every month the secret phrase
generates **four codes — any one of which works** — and they refresh on the 1st
with **no edits and no redeploy**:

| Style | Example |
|---|---|
| Numbers only | `408216` |
| Letters (brand word) | `COMPASSION` |
| Letters + numbers | `DIGNITY47` |
| Brand phrase | `Safe-Hands` |

Hand caregivers whichever style you prefer. If a code leaks, all four expire at
the next rotation on their own.

Everything is configured in **`access-config.js`**:

```js
window.DTC_ACCESS = {
  codes: ["DareToCare-2026"],   // optional always-on backup code(s)
  remoteUrl: "",                // optional extra codes from a link (no redeploy)
  rotate: {
    enabled: true,
    secret: "change-this-to-your-own-secret-phrase",  // PRIVATE — builds the codes
    graceDays: 2                                       // last month's codes work the first 2 days
  },
  revealKey: "change-this-reveal-word"                 // PRIVATE — for the #show= link
};
```

## One-time setup (do this, then deploy once)

1. Change **`rotate.secret`** to your own private phrase — the seed for every
   monthly code. Keep it private; never give it to caregivers.
2. Change **`revealKey`** to a different private word (used only for the hidden
   reveal link below).
3. (Optional) Remove the `codes: ["DareToCare-2026"]` backup once you've confirmed
   the rotating codes work — or keep one permanent code as a fallback.
4. Re-deploy (drop the zip into Netlify). **You won't redeploy again just to
   change codes.**

## How to see this month's four codes (two ways)

**A) The generator file — `admin-code.html` (recommended, fully private)**
Keep it on your computer (do **not** upload it). Double-click it, type your
`rotate.secret`, and it lists this month's four codes, next month's, and any
month you pick. Runs offline; never stores your secret.

**B) The hidden link on the live site**
Visit:

```
https://YOURSITE/#show=YOUR-REVEAL-WORD
```

A panel shows all four current codes (and next month's), then the link erases
itself from the address bar. It uses the URL **hash** (after `#`), which browsers
never send to Netlify — so it stays out of server logs and referrer headers.
Still, treat the link like a password.

> Codes are **not case-sensitive** and spaces are ignored.

## Changing the brand words

The letter-based codes are drawn from a caregiving word list. To change it, edit
the `WORDS` array in **both** `dtc-codes.js` and `admin-code.html` (keep them
identical), then redeploy.

## Optional always-on extra codes

- **`codes`** — permanent codes that always work (e.g. for a trainer). Plain
  words; editing requires a redeploy.
- **`remoteUrl`** — a link returning `{"codes":["..."]}` (e.g. npoint.io) for
  permanent codes you can change without redeploying. If unreachable, it's
  ignored and the rotating codes still work.

---

## Honest note on security

This is a static site with no login server, so the rotating formula and your
secret ship inside the page files. A caregiver who has this month's codes can't
guess next month's, and leaked codes auto-expire — that's the real benefit. But a
technically savvy person who downloads the site files could reproduce the formula.
So this is **convenience + automatic expiry**, not hard security — the right fit
for an internal caregiver portal. For codes that truly can't be shared or
reverse-engineered, that's the **Airtable / admin** path on your roadmap
(P1-A/B, P3-D); ask me when you're ready to move the check server-side.
