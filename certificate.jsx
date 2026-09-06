/* Certificate artboard — A4 landscape @ 96dpi (1123 x 794) */
/* ── The agency seal ────────────────────────────────────────────────────────
 *
 * WHAT WAS WRONG WITH THE OLD ONE
 * It used a generic leaf outline rather than the Dare to Care mark, and it ran
 * one circular text path the whole way round — which means the bottom half of
 * the wording was upside down, the single most common way a seal reads as
 * clip art rather than as a seal.
 *
 * WHAT MAKES THIS ONE READ AS A SEAL
 * Real seals — notarial, collegiate, agency — share an anatomy, and it is the
 * anatomy that does the work rather than any one flourish:
 *   a scalloped or milled outer edge, the way a die-struck impression leaves
 *     the paper;
 *   concentric rules, thick outside and hairline inside, so the text band is a
 *     band and not just text on a disc;
 *   wording that reads left to right on BOTH arcs — two separate paths, the
 *     lower one drawn west-to-east under the centre so its glyphs stand up;
 *   marks at the poles separating the two legends;
 *   a solid centre medallion carrying the emblem, keyed off the rules.
 *
 * The emblem is the agency's own: the open ring with the veined leaf growing
 * up through its gap. Drawn as vector rather than placed as the logo PNG so it
 * stays crisp when a certificate is exported to PDF at print size, and so the
 * leaf's veins can be cut back OUT of the leaf in the medallion green — which
 * is how the real mark is built.
 */

const SEAL_GOLD = "#B7892F";
const SEAL_GREEN = "#154C36";
const SEAL_CREAM = "#F6F1E3";

/* The milled edge. Generated rather than hand-written: forty-eight arcs is not
   something to maintain by hand, and the count wants to change with size. */
function scallopPath(cx, cy, r, teeth){
  const step = (Math.PI * 2) / teeth;
  const depth = (2 * r * Math.sin(step / 2) / 2) * 1.06;
  let d = "";
  for (let i = 0; i < teeth; i++){
    const a0 = i * step, a1 = (i + 1) * step;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    if (i === 0) d += "M" + x0.toFixed(2) + "," + y0.toFixed(2);
    d += " A" + depth.toFixed(2) + "," + depth.toFixed(2) + " 0 0 1 " + x1.toFixed(2) + "," + y1.toFixed(2);
  }
  return d + "Z";
}

/* The agency mark: an open ring with a leaf growing up through the gap.
   Centred on the origin so it can be dropped into the medallion at any scale. */
function DTCMark({ring = SEAL_CREAM, cut = SEAL_GREEN}){
  /* Proportions taken off the brand PNG rather than guessed. On the original,
     the ring's stroke is a little over a fifth of its outer diameter and the
     leaf runs about three quarters of that diameter — a thinner ring makes the
     two shapes merge into one blob at seal size, which is what the first cut
     of this did. */
  return (
    <g>
      {/* The ring, open at the lower left where the leaf comes through. */}
      <path d="M -27.57,-4.86 A 28,28 0 1 1 -9.58,26.31"
        fill="none" stroke={ring} strokeWidth="14" strokeLinecap="butt"/>
      {/* The leaf, growing out of the opening and up across the ring. */}
      <path d="M -24,24 Q -20,-6 16,-14 Q 12,16 -24,24 Z" fill={ring}/>
      {/* Veins carved back out in the medallion colour, the way the real mark
         is built — the leaf is not outlined, it is cut. Every stroke is kept
         inside the leaf's own outline; the first attempt let them run past the
         tip, which read as scratches rather than veins. */}
      <g stroke={cut} strokeWidth="1.8" strokeLinecap="round" fill="none">
        <path d="M -21,21 L 13,-11"/>
        <path d="M -10.8,11.4 L -8.8,5.9"/>
        <path d="M -10.8,11.4 L -5.3,13.4"/>
        <path d="M -4,5 L -2,-0.5"/>
        <path d="M -4,5 L 1.5,7"/>
        <path d="M 2.8,-1.4 L 4.8,-6.9"/>
        <path d="M 2.8,-1.4 L 8.3,0.6"/>
      </g>
    </g>
  );
}

/* A small leaf, used at the poles to part the two legends. Answers the same
   question a star does on a civic seal — "this is where one phrase ends" —
   without borrowing a civic seal's iconography. */
function PoleLeaf({x, y, rotate}){
  return (
    <g transform={"translate(" + x + "," + y + ") rotate(" + rotate + ")"}>
      <path d="M0,-5 C4,-2 4,2 0,5 C-4,2 -4,-2 0,-5 Z" fill={SEAL_GOLD}/>
      <path d="M0,-3.4 L0,3.4" stroke={SEAL_CREAM} strokeWidth="0.7" strokeLinecap="round"/>
    </g>
  );
}

function CertSeal({year}){
  const C = 100;
  const stamped = year || new Date().getFullYear();
  return (
    <div className="cert-seal">
      <svg viewBox="0 0 200 200" width="200" height="200" role="img"
        aria-label="Dare to Care Home Care certified caregiver seal">
        {/* Milled edge, then the two rules that make the text a band. */}
        <path d={scallopPath(C, C, 93, 48)} fill={SEAL_GOLD} opacity="0.9"/>
        <circle cx={C} cy={C} r="88.5" fill={SEAL_CREAM}/>
        <circle cx={C} cy={C} r="88.5" fill="none" stroke={SEAL_GOLD} strokeWidth="2.4"/>
        <circle cx={C} cy={C} r="82" fill="none" stroke={SEAL_GOLD} strokeWidth="0.9"/>

        <defs>
          {/* Two arcs, not one circle. The lower one runs west to east UNDER
              the centre, so its glyphs stand upright instead of hanging. */}
          <path id="sealTop" d="M 26,100 A 74,74 0 0 1 174,100"/>
          <path id="sealBottom" d="M 28,100 A 72,72 0 0 0 172,100"/>
        </defs>
        <text fontFamily="'Figtree',system-ui,sans-serif" fontSize="11.6" fontWeight="700"
          letterSpacing="1.25" fill={SEAL_GREEN}>
          <textPath href="#sealTop" startOffset="50%" textAnchor="middle">
            DARE TO CARE HOME CARE
          </textPath>
        </text>
        <text fontFamily="'Figtree',system-ui,sans-serif" fontSize="11" fontWeight="600"
          letterSpacing="1.6" fill={SEAL_GREEN}>
          <textPath href="#sealBottom" startOffset="50%" textAnchor="middle">
            CERTIFIED CAREGIVER
          </textPath>
        </text>

        <PoleLeaf x={26} y={100} rotate={90}/>
        <PoleLeaf x={174} y={100} rotate={90}/>

        {/* The medallion, keyed off the inner rule. */}
        <circle cx={C} cy={C} r="62" fill={SEAL_GREEN}/>
        <circle cx={C} cy={C} r="62" fill="none" stroke={SEAL_GOLD} strokeWidth="1.6"/>
        <circle cx={C} cy={C} r="56" fill="none" stroke={SEAL_CREAM} strokeWidth="0.8" opacity="0.5"/>

        <g transform={"translate(" + (C + 2.5) + "," + (C - 8) + ") scale(1.16)"}>
          <DTCMark/>
        </g>

        {/* The year, set in the serif and tabular, the way a struck date is. */}
        <text x={C} y={C + 46} textAnchor="middle"
          fontFamily="'Lora',Georgia,serif" fontSize="13" fontWeight="500"
          letterSpacing="2.2" fill={SEAL_CREAM} opacity="0.92"
          style={{fontVariantNumeric:"tabular-nums"}}>
          {stamped}
        </text>
      </svg>
    </div>
  );
}

function Certificate({rec, course, cfg, id="certificate"}){
  const certId = makeCertId(rec.name, course.code, rec.date);
  const totalCourses = window.DTC_COURSES?.length || course.num;
  return (
    <div className="certificate" id={id} data-cert={course.id}>
      {/* guilloche pattern */}
      <svg className="cert-guilloche" viewBox="0 0 1063 734" preserveAspectRatio="none">
        <defs>
          <pattern id={"gpat-"+course.id} width="34" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <path d="M0 17h34M17 0v34" stroke="#297A57" strokeWidth="0.6"/>
          </pattern>
        </defs>
        <rect width="1063" height="734" fill={`url(#gpat-${course.id})`}/>
      </svg>
      <img className="cert-watermark" src={cfg.logo} alt=""/>
      <div className="cert-border-outer"></div>
      <div className="cert-border-inner"></div>
      <div className="cert-corner tl"></div><div className="cert-corner tr"></div>
      <div className="cert-corner bl"></div><div className="cert-corner br"></div>

      <div className="cert-inner">
        <img className="cert-logo" src={cfg.logo} alt="Dare to Care Home Care"/>
        <div className="cert-org">{cfg.trainingEntity || cfg.org} Caregiver Training Program</div>
        <div className="cert-kicker">Certificate of Completion</div>
        <div className="cert-h1">Certificate</div>
        <div className="cert-presented">This certifies that</div>
        <div className="cert-name">{rec.name}</div>
        <div className="cert-nameline"></div>
        <div className="cert-body">
          has successfully completed all required coursework, demonstrated understanding,
          and passed the assessment for the training module
        </div>
        <div className="cert-course">{course.title}</div>
        <div className="cert-score">
          Assessment score: {rec.score}% &nbsp;·&nbsp; Passing standard: {cfg.passPct}% &nbsp;·&nbsp; Module {String(course.num).padStart(2,"0")} of {String(totalCourses).padStart(2,"0")}
        </div>
      </div>

      <CertSeal year={new Date(rec.date).getFullYear()}/>

      <div className="cert-foot">
        <div className="cert-sig">
          <div className="sig-name">{cfg.signoffName}</div>
          <div className="sig-meta">{cfg.signoffTitle}</div>
        </div>
        <div className="cert-sig cert-date">
          <div className="sig-name">{fmtDate(rec.date)}</div>
          <div className="sig-meta">Date of Completion</div>
        </div>
      </div>

      <div className="cert-id">
        <b>CERTIFICATE ID</b><br/>{certId}<br/>
        Issued {new Date(rec.date).toISOString().slice(0,10)}
      </div>
    </div>
  );
}

/* Fit-scale wrapper so a full-size cert renders inside any box */
function CertScaled({rec, course, cfg, boxW}){
  const W=1123, scale=boxW/W;
  return <div className="scaled" style={{width:W, transform:`scale(${scale})`}}>
    <Certificate rec={rec} course={course} cfg={cfg} id={"mini-"+course.id}/>
  </div>;
}

Object.assign(window,{Certificate,CertScaled,CertSeal});
