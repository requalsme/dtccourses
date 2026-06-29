/* Certificate artboard — A4 landscape @ 96dpi (1123 x 794) */
function SealLeaf(){
  return <svg className="leaf" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z"/><path d="M5 19c3-5 6-7 10-9"/>
  </svg>;
}

function CertSeal(){
  // circular text ring drawn with SVG textPath
  return <div className="cert-seal">
    <svg className="ring-text" viewBox="0 0 118 118" width="112" height="112">
      <defs><path id="sealcircle" d="M59,59 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"/></defs>
      <circle cx="59" cy="59" r="57" fill="none" stroke="#B7892F" strokeWidth="1"/>
      <circle cx="59" cy="59" r="45.5" fill="none" stroke="#B7892F" strokeWidth="1"/>
      <text fontFamily="'Libre Franklin',sans-serif" fontSize="9.2" fontWeight="700" letterSpacing="2.4" fill="#0A5C39">
        <textPath href="#sealcircle" startOffset="0%">DARE TO CARE HOME CARE • CERTIFIED CAREGIVER •</textPath>
      </text>
    </svg>
    <div className="core"><SealLeaf/><small>VERIFIED</small></div>
  </div>;
}

function Certificate({rec, course, cfg, id="certificate"}){
  const certId = makeCertId(rec.name, course.code, rec.date);
  return (
    <div className="certificate" id={id} data-cert={course.id}>
      {/* guilloche pattern */}
      <svg className="cert-guilloche" viewBox="0 0 1063 734" preserveAspectRatio="none">
        <defs>
          <pattern id={"gpat-"+course.id} width="34" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <path d="M0 17h34M17 0v34" stroke="#0D7C4D" strokeWidth="0.6"/>
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
          Assessment score: {rec.score}% &nbsp;·&nbsp; Passing standard: {cfg.passPct}% &nbsp;·&nbsp; Module {String(course.num).padStart(2,"0")} of 06
        </div>
      </div>

      <CertSeal/>

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
