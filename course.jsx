/* Course player: lesson (video / reading preview) -> quiz -> result -> certificate */

function ReadingPreview({course}){
  const floats=[{n:course.icon,x:"12%",y:"22%",s:54,d:"0s"},{n:"spark",x:"80%",y:"30%",s:40,d:"1.2s"},
    {n:course.icon,x:"72%",y:"70%",s:64,d:"2.4s"},{n:"leaf",x:"22%",y:"72%",s:46,d:"0.6s"}];
  const topics=course.sections.map(s=>s.h);
  return (
    <div className="reading-preview">
      <div className="pulse-rings"><span className="pr"/><span className="pr" style={{animationDelay:"1.7s"}}/></div>
      {floats.map((f,i)=><div key={i} className="float-ico" style={{left:f.x,top:f.y,animationDelay:f.d}}><CourseGlyph name={f.n==="leaf"||f.n==="spark"?f.n:f.n} size={f.s}/></div>)}
      <div className="center">
        <div className="play-orb"><Icon name="doc" size={34} style={{color:"#fff"}}/></div>
        <h4>Reading lesson</h4>
        <p>This module is currently provided as a written lesson.</p>
        <p style={{opacity:.85}}>Review the complete lesson below before starting the assessment.</p>
        <div className="chip-reading"><Icon name="doc" size={13}/> Reading module</div>
      </div>
      <div className="ticker"><div className="track">
        {[...topics,...topics].map((t,i)=><span key={i}>● &nbsp;{t}</span>)}
      </div></div>
    </div>
  );
}

function LessonStep({course, cfg, watched, setWatched, policyAcknowledged, setPolicyAcknowledged, onStartQuiz}){
  const hasVideo=!!course.video;
  const vref=React.useRef(null);
  const policyHref=cfg.policyLinks?.[course.id];
  const needsPolicy=!!policyHref;
  const canStart=watched && (!needsPolicy || policyAcknowledged);
  const lessonStatus = hasVideo
    ? (watched
        ? (needsPolicy && !policyAcknowledged
            ? "Video complete - review the agency policy to unlock your assessment."
            : "Video complete - your assessment is unlocked.")
        : "Watch the full video to unlock your assessment.")
    : (watched
        ? (needsPolicy && !policyAcknowledged
            ? "Lesson reviewed - review the agency policy to unlock your assessment."
            : "Lesson reviewed - your assessment is unlocked.")
        : "Review the lesson below, then mark it complete to unlock your assessment.");
  return (
    <div className="course-layout">
      <div>
        <div className="lesson-panel">
          <div className="video-wrap">
            {hasVideo
              ? <video ref={vref} controls preload="metadata" playsInline
                  onEnded={()=>setWatched(true)} poster="">
                  <source src={course.video} type="video/mp4"/>
                </video>
              : <ReadingPreview course={course}/>}
          </div>
          <div className="lesson-body">
            <span className="eyebrow">Module {String(course.num).padStart(2,"0")} · Lesson</span>
            <h2 style={{fontSize:"24px",letterSpacing:"-.01em",margin:"8px 0 12px"}}>{course.title}</h2>
            <p className="intro">{course.intro}</p>
            <div className="sec-list">
              {course.sections.map((s,k)=>
                <div className="sec" key={k}>
                  <span className="sn">{k+1}</span>
                  <div><h4>{s.h}</h4><p>{s.p}</p></div>
                </div>)}
            </div>
            {needsPolicy && <div className="policy-review">
              <div className="policy-review-copy">
                <div className="policy-icon"><Icon name="doc" size={18}/></div>
                <div>
                  <h4>Agency policy review</h4>
                  <p>Open and review the agency policy before starting this module assessment.</p>
                </div>
                <a className="btn ghost sm" href={policyHref} target="_blank" rel="noopener noreferrer">
                  <Icon name="doc" size={15}/> Open policy PDF
                </a>
              </div>
              <label className="policy-check">
                <input type="checkbox" checked={policyAcknowledged} onChange={e=>setPolicyAcknowledged(e.target.checked)}/>
                <span>I have opened and reviewed this agency policy.</span>
              </label>
            </div>}
          </div>
          <div className="lesson-cta">
            <span className="note">{lessonStatus}</span>
            <div style={{display:"flex",gap:"10px"}}>
              {!watched && !hasVideo && <button className="btn ghost sm" onClick={()=>setWatched(true)}>
                <Icon name="check" size={16}/> Mark as reviewed
              </button>}
              <button className="btn" disabled={!canStart} onClick={onStartQuiz}>
                Start assessment <Icon name="arrow" size={18}/>
              </button>
            </div>
          </div>
        </div>
      </div>

      <aside className="rail">
        <div className="rail-card">
          <h5>In this module</h5>
          {course.sections.map((s,k)=><div className="rail-obj" key={k}><span className="b"/>{s.h}</div>)}
        </div>
        <div className="rail-card">
          <h5>Module details</h5>
          <div className="rail-obj"><Icon name={hasVideo?"video":"doc"} size={17} style={{color:"var(--green)",marginTop:1}}/>{hasVideo?"Narrated video + reading":"Reading lesson"}</div>
          {needsPolicy && <div className="rail-obj"><Icon name="doc" size={17} style={{color:"var(--green)",marginTop:1}}/>Agency policy review required</div>}
          <div className="rail-obj"><Icon name="list" size={17} style={{color:"var(--green)",marginTop:1}}/>{course.quiz.length}-question assessment</div>
          <div className="rail-obj"><Icon name="award" size={17} style={{color:"var(--green)",marginTop:1}}/>Pass at {cfg.passPct}% to earn certificate</div>
          <div className={"watch-state "+(canStart?"ok":"no")} style={{marginTop:14}}>
            <span className="ic">{canStart?<Icon name="check" size={15}/>:<Icon name="lock" size={14}/>}</span>
            {canStart?"Assessment unlocked":"Assessment locked"}
          </div>
        </div>
      </aside>
    </div>
  );
}

/* responsive certificate viewport */
function CertViewport({rec, course, cfg, maxW=1040}){
  const ref=React.useRef(null);
  const [w,setW]=React.useState(maxW);
  React.useEffect(()=>{
    const el=ref.current; if(!el) return;
    const ro=new ResizeObserver(()=>setW(el.clientWidth));
    ro.observe(el); setW(el.clientWidth);
    return ()=>ro.disconnect();
  },[]);
  const scale=Math.min(w,maxW)/1123;
  return <div ref={ref} style={{width:"100%"}}>
    <div style={{height:794*scale, position:"relative"}}>
      <div style={{position:"absolute",top:0,left:"50%",transform:`translateX(-50%) scale(${scale})`,transformOrigin:"top center"}}>
        <Certificate rec={rec} course={course} cfg={cfg} id={"view-"+course.id}/>
      </div>
    </div>
  </div>;
}

function CertStep({course, cfg, rec, onExit, onDownload, busy}){
  return (
    <div>
      <div className="course-top" style={{justifyContent:"space-between"}}>
        <button className="crumb" onClick={onExit}><Icon name="back" size={18}/> Back to dashboard</button>
        <div style={{display:"flex",gap:"10px"}}>
          <button className="btn" disabled={busy} onClick={onDownload}>
            {busy?<span className="spinner"/>:<Icon name="download" size={18}/>} Download PDF
          </button>
        </div>
      </div>
      <div style={{textAlign:"center",marginBottom:22}}>
        <span className="eyebrow">Congratulations, {rec.name.split(" ")[0]}</span>
        <h1 className="title" style={{fontSize:"30px"}}>Your certificate is ready</h1>
        <p className="lead" style={{margin:"0 auto"}}>Certificate for <b>{course.title}</b> — automatically issued in your name.</p>
      </div>
      <div style={{background:"#EEF1EE",borderRadius:"22px",padding:"26px",boxShadow:"var(--shadow-md)"}}>
        <CertViewport rec={rec} course={course} cfg={cfg}/>
      </div>
    </div>
  );
}

function CoursePlayer({course, cfg, userName, record, onComplete, onExit}){
  const [step,setStep]=React.useState(record?.passed ? "cert" : "lesson");
  const [watched,setWatched]=React.useState(!!record?.passed);
  const [policyAcknowledged,setPolicyAcknowledged]=React.useState(!!record?.policyAcknowledged);
  const [result,setResult]=React.useState(null); // {pct,passed}
  const [busy,setBusy]=React.useState(false);
  const startedAt=React.useRef(Date.now());

  const steps=[{k:"lesson",label:"Lesson"},{k:"quiz",label:"Assessment"},{k:"cert",label:"Certificate"}];
  const curIdx = step==="lesson"?0 : (step==="quiz"||step==="result")?1:2;
  const trainingEntity=cfg.trainingEntity || cfg.org;

  function elapsedSeconds(){
    return Math.max(1,Math.round((Date.now()-startedAt.current)/1000));
  }

  function currentCertRecord(){
    return {
      name:userName,
      score:result?.pct ?? record?.score ?? 100,
      date:result?.date || record?.date || new Date().toISOString(),
      durationSeconds:result?.durationSeconds ?? record?.durationSeconds,
      trainingEntity:result?.trainingEntity ?? record?.trainingEntity ?? trainingEntity,
      policyAcknowledged:result?.policyAcknowledged ?? record?.policyAcknowledged
    };
  }

  async function download(){
    const rec=currentCertRecord();
    setBusy(true);
    try{ await window.DTC_PDF.exportOne(course,rec,cfg); }
    finally{ setBusy(false); }
  }

  function handlePass(pct){
    const date=new Date().toISOString();
    const durationSeconds=elapsedSeconds();
    const recordPolicyAcknowledged=!cfg.policyLinks?.[course.id] || policyAcknowledged;
    const rec={name:userName,score:pct,passed:true,date,durationSeconds,trainingEntity,policyAcknowledged:recordPolicyAcknowledged};
    onComplete(course.id,rec);
    setResult({pct,passed:true,date,durationSeconds,trainingEntity,policyAcknowledged:recordPolicyAcknowledged});
    setStep("result");
  }
  function handleFail(pct){ setResult({pct,passed:false}); setStep("result"); }

  const liveRec=currentCertRecord();

  return (
    <div className="page page-wide">
      <div className="course-top">
        <button className="crumb" onClick={onExit}><Icon name="back" size={18}/> All courses</button>
        <span style={{color:"var(--border-strong)"}}>/</span>
        <span className="crumb" style={{color:"var(--ink)",fontWeight:700}}>{course.short}</span>
      </div>

      {step!=="cert" && <div className="stepbar">
        {steps.map((s,k)=>(
          <React.Fragment key={s.k}>
            <div className={"step "+(k===curIdx?"active":k<curIdx?"complete":"")}>
              <span className="si">{k<curIdx?<Icon name="check" size={14}/>:k+1}</span>{s.label}
            </div>
            {k<steps.length-1 && <div className={"step-line "+(k<curIdx?"on":"")}/>}
          </React.Fragment>
        ))}
      </div>}

      {step==="lesson" &&
        <LessonStep course={course} cfg={cfg} watched={watched} setWatched={setWatched}
          policyAcknowledged={policyAcknowledged} setPolicyAcknowledged={setPolicyAcknowledged}
          onStartQuiz={()=>setStep("quiz")}/>}

      {step==="quiz" &&
        <Quiz course={course} cfg={cfg} onPass={handlePass} onFail={handleFail} onExit={()=>setStep("lesson")}/>}

      {step==="result" &&
        <ResultScreen course={course} cfg={cfg} pct={result.pct} passed={result.passed}
          onContinue={()=>setStep("cert")} onRetake={()=>setStep("lesson")} onExit={()=>result.passed?setStep("cert"):setStep("lesson")}/>}

      {step==="cert" &&
        <CertStep course={course} cfg={cfg} rec={liveRec} busy={busy}
          onDownload={download} onExit={onExit}/>}
    </div>
  );
}

Object.assign(window,{CoursePlayer,ReadingPreview,CertViewport,LessonStep,CertStep});
