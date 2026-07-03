/* Sign-in, Dashboard, Certificates, App shell */

/* Name input cleanup for certificate accuracy:
   - keeps letters (incl. accented), spaces, apostrophes, hyphens, periods
   - drops numbers and other invalid characters
   - preserves intentional capitalization for names like McDonald, DeLaCruz, O'Brien, de la Cruz, or bell
   - only fixes obvious all-caps/all-lowercase entries */
function tidyName(raw){
  let s = (raw||"").replace(/[^\p{L}\p{M} .'’\-]/gu, "");
  s = s.replace(/^\s+/, "");
  s = s.replace(/\s{2,}/g, " ");
  s = s.replace(/\s+$/, "");
  const letters = s.replace(/[^\p{L}\p{M}]/gu, "");
  if(!letters) return s;
  const hasLower = /\p{Ll}/u.test(letters);
  const hasUpper = /\p{Lu}/u.test(letters);
  const lowercaseParticles = new Set(["da","de","del","della","der","di","du","la","le","van","von"]);
  const stylizedLowercase = new Set(["bell"]);
  function titlePiece(piece){
    const lower = piece.toLocaleLowerCase();
    if(lowercaseParticles.has(lower) || stylizedLowercase.has(lower)) return lower;
    return lower.replace(/\p{L}/u, m => m.toLocaleUpperCase());
  }
  function titleObviousEntry(value){
    return value.replace(/[\p{L}\p{M}]+/gu, titlePiece);
  }
  if(hasUpper && !hasLower) return titleObviousEntry(s);
  if(hasLower && !hasUpper && /\s/.test(s) && !stylizedLowercase.has(s.trim().split(/\s+/)[0])) return titleObviousEntry(s);
  return s;
}

/* Access codes come from access-config.js (window.DTC_ACCESS).
   If a remoteUrl is set, the latest codes are fetched at sign-in so they can be
   changed without re-deploying; the local list is the automatic fallback. */
async function getValidCodes(){
  const A = window.DTC_ACCESS || {};
  let perm = Array.isArray(A.codes) ? A.codes : [];
  if(A.remoteUrl){
    try{
      const r = await fetch(A.remoteUrl, {cache:"no-store"});
      if(r.ok){
        const data = await r.json();
        const remote = Array.isArray(data) ? data : (Array.isArray(data.codes) ? data.codes : []);
        if(remote.length) perm = remote;
      }
    }catch(e){ /* unreachable — keep permanent/local codes */ }
  }
  const rotating = (window.DTCCodes && window.DTCCodes.rotatingValidCodes)
    ? window.DTCCodes.rotatingValidCodes(A) : [];
  return perm.concat(rotating);
}
function normCode(s){ return String(s||"").replace(/\s+/g,"").toLowerCase(); }

function ProgressRing({pct,size=74,stroke=8,label}){
  const r=(size-stroke)/2, C=2*Math.PI*r, off=C*(1-pct/100);
  return <div className="ring" style={{width:size,height:size}}>
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--tint)" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--green)" strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={C} strokeDashoffset={off} style={{transition:"stroke-dashoffset .8s ease"}}/>
    </svg>
    <span className="pct">{label??pct+"%"}</span>
  </div>;
}

function SignIn({onSubmit}){
  const [first,setFirst]=React.useState("");
  const [last,setLast]=React.useState("");
  const [dob,setDob]=React.useState("");
  const [code,setCode]=React.useState("");
  const [codeErr,setCodeErr]=React.useState(false);
  const [checking,setChecking]=React.useState(false);
  const cfg=window.DTC_CONFIG;
  const dobMax=React.useMemo(()=>{
    const d=new Date();
    d.setFullYear(d.getFullYear()-15);
    return d.toISOString().slice(0,10);
  },[]);
  const dobMin="1900-01-01";
  const dobOk=dob&&dob>=dobMin&&dob<=dobMax;
  const ok=first.trim()&&last.trim()&&dobOk&&code;
  async function submit(e){
    e.preventDefault();
    if(!ok||checking) return;
    setChecking(true);
    let valid=false;
    try{
      const codes=await getValidCodes();
      valid=codes.map(normCode).includes(normCode(code));
    }catch(err){ valid=false; }
    setChecking(false);
    if(!valid){ setCodeErr(true); return; }
    setCodeErr(false);
    onSubmit(`${first.trim()} ${last.trim()}`.replace(/\s+/g," "), dob);
  }
  return (
    <div className="signin">
      <div className="left">
        <img className="infinity" src={cfg.logo} alt=""/>
        <div className="logo-chip"><img src={cfg.logo} alt="Dare to Care Home Care"/></div>
        <div>
          <h2>Caregiver Training & Certification</h2>
          <p>Six required modules to keep our clients safe, respected, and well cared for.</p>
          <ul>
            <li><span className="tick"><Icon name="check" size={14} style={{color:"#fff"}}/></span> Complete each module, then pass a short quiz</li>
            <li><span className="tick"><Icon name="check" size={14} style={{color:"#fff"}}/></span> Score {cfg.passPct}% or higher to earn a certificate</li>
            <li><span className="tick"><Icon name="check" size={14} style={{color:"#fff"}}/></span> Download all six certificates when complete</li>
          </ul>
        </div>
        <div style={{fontSize:13,color:"#9ecbb2"}}>© {new Date().getFullYear()} Dare to Care Home Care</div>
      </div>
      <div className="right">
        <form className="signin-card" onSubmit={submit}>
          <h3>Let's get started</h3>
          <p className="sub">Enter your information exactly as it should appear on your certificates.</p>
          <div className="field">
            <label>First name</label>
            <input value={first} onChange={e=>setFirst(tidyName(e.target.value))} maxLength={40} autoComplete="given-name" autoFocus/>
          </div>
          <div className="field">
            <label>Last name</label>
            <input value={last} onChange={e=>setLast(tidyName(e.target.value))} maxLength={40} autoComplete="family-name"/>
            <div className="hint">Your legal name is printed on every certificate.</div>
          </div>
          <div className="field">
            <label>Date of birth</label>
            <input type="date" value={dob} onChange={e=>setDob(e.target.value)} min={dobMin} max={dobMax} autoComplete="bday"/>
            {dob && !dobOk && <div className="hint" style={{color:"#c0392b"}}>Enter a realistic date of birth. Caregivers must be at least 15.</div>}
          </div>
          <div className="field">
            <label>Access code</label>
            <input value={code} onChange={e=>{setCode(e.target.value);setCodeErr(false);}} placeholder="Enter your access code" autoComplete="off"/>
            {codeErr && <div className="hint" style={{color:"#c0392b"}}>Incorrect access code — please check with your supervisor.</div>}
          </div>
          <button className="btn block lg" disabled={!ok||checking} type="submit">{checking ? "Checking…" : <>Begin training <Icon name="arrow" size={18}/></>}</button>
        </form>
      </div>
    </div>
  );
}

function CourseCard({course, rec, onOpen}){
  const passed=rec?.passed;
  return (
    <div className={"course-card"+(passed?" done":"")} onClick={onOpen} role="button">
      <span className="ribbon"/>
      <div className="cc-top">
        <div className="cc-icon"><CourseGlyph name={course.icon} size={26}/></div>
        <span className="cc-num">MODULE {String(course.num).padStart(2,"0")}</span>
      </div>
      <h3>{course.title}</h3>
      <p className="blurb">{course.blurb}</p>
      <div className="cc-foot">
        <div className="cc-meta">
          <span className="media-tag"><Icon name={course.video?"video":"doc"} size={14}/>{course.video?"Video":"Reading"}</span>
          <span className="dot"/>
          <span>{course.quiz.length} questions</span>
        </div>
        {passed
          ? <span className="status-pill passed"><Icon name="award" size={14}/> {rec.score}% · Passed</span>
          : <span className="status-pill todo">Start <Icon name="arrow" size={13}/></span>}
      </div>
    </div>
  );
}

function Dashboard({courses, progress, name, onOpen, goCerts}){
  const done=courses.filter(c=>progress[c.id]?.passed).length;
  const pct=Math.round(done/courses.length*100);
  const allDone=done===courses.length;
  return (
    <div className="page">
      {allDone &&
        <div className="alldone">
          <div className="badge-ico"><Icon name="award" size={32} style={{color:"#fff"}}/></div>
          <div style={{flex:1,minWidth:240}}>
            <h3>All six modules complete — outstanding work, {name.split(" ")[0]}!</h3>
            <p>Your full certification packet is ready. Download all six certificates for your records.</p>
          </div>
          <button className="btn gold lg" onClick={goCerts}><Icon name="award" size={18}/> View certificates</button>
        </div>}

      <div className="dash-head">
        <div>
          <span className="eyebrow">Your training</span>
          <h1 className="title">Welcome, {name.split(" ")[0]}</h1>
          <p className="lead">Complete all six modules to become a certified Dare to Care caregiver. Take them in any order.</p>
        </div>
        <div className="progress-summary">
          <ProgressRing pct={pct} label={done+"/"+courses.length}/>
          <div className="meta">
            <b>{allDone?"Certification complete":`${done} of ${courses.length} complete`}</b>
            <div>{allDone?"All certificates earned":`${courses.length-done} module${courses.length-done===1?"":"s"} remaining`}</div>
          </div>
        </div>
      </div>

      <div className="course-grid">
        {courses.map(c=><CourseCard key={c.id} course={c} rec={progress[c.id]} onOpen={()=>onOpen(c.id)}/>)}
      </div>
    </div>
  );
}

/* certificate thumbnail (scaled live cert) */
function CertThumb({rec,course,cfg}){
  const ref=React.useRef(null);
  const [w,setW]=React.useState(360);
  React.useEffect(()=>{const el=ref.current;if(!el)return;const ro=new ResizeObserver(()=>setW(el.clientWidth));ro.observe(el);setW(el.clientWidth);return()=>ro.disconnect();},[]);
  const scale=w/1123;
  return <div ref={ref} style={{width:"100%",height:794*scale,position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:0,left:0,transformOrigin:"top left",transform:`scale(${scale})`}}>
      <Certificate rec={rec} course={course} cfg={cfg} id={"thumb-"+course.id}/>
    </div>
  </div>;
}

function CertModal({rec,course,cfg,onClose,onDownload,busy}){
  return <div className="modal-scrim" onClick={onClose}>
    <div className="modal" onClick={e=>e.stopPropagation()}>
      <div className="modal-head">
        <h4>{course.title} — Certificate</h4>
        <div className="actions">
          <button className="btn sm" disabled={busy} onClick={onDownload}>{busy?<span className="spinner"/>:<Icon name="download" size={16}/>} Download PDF</button>
          <button className="iconbtn" onClick={onClose}><Icon name="x" size={18}/></button>
        </div>
      </div>
      <div className="modal-scroll">
        <div style={{width:"100%",maxWidth:1040}}><CertViewport rec={rec} course={course} cfg={cfg}/></div>
      </div>
    </div>
  </div>;
}

function Certificates({courses, progress, name, cfg, toast}){
  const earned=courses.filter(c=>progress[c.id]?.passed);
  const [open,setOpen]=React.useState(null);
  const [busyId,setBusyId]=React.useState(null);
  const [bulk,setBulk]=React.useState(null); // "all"|"combined"
  const recOf=(c)=>({
    name,
    score:progress[c.id].score,
    date:progress[c.id].date,
    durationSeconds:progress[c.id].durationSeconds,
    trainingEntity:progress[c.id].trainingEntity || cfg.trainingEntity || cfg.org,
    policyAcknowledged:progress[c.id].policyAcknowledged
  });

  async function dlOne(c){
    setBusyId(c.id);
    try{ await window.DTC_PDF.exportOne(c,recOf(c),cfg); } finally{ setBusyId(null); }
  }
  async function dlCombined(){
    setBulk("combined");
    try{
      await window.DTC_PDF.exportAll(earned.map(c=>({course:c,rec:recOf(c)})),cfg);
      toast("Combined PDF downloaded — "+earned.length+" pages");
    } finally{ setBulk(null); }
  }
  async function dlAllIndiv(){
    setBulk("all");
    try{
      for(const c of earned){ await window.DTC_PDF.exportOne(c,recOf(c),cfg); await new Promise(r=>setTimeout(r,400)); }
      toast(earned.length+" certificates downloaded");
    } finally{ setBulk(null); }
  }

  if(earned.length===0){
    return <div className="page"><div className="empty">
      <div className="ei"><Icon name="award" size={30}/></div>
      <h2 style={{margin:"0 0 6px"}}>No certificates yet</h2>
      <p>Pass a module assessment at {cfg.passPct}% or higher and your certificate will appear here.</p>
    </div></div>;
  }

  return (
    <div className="page">
      <span className="eyebrow">Your achievements</span>
      <h1 className="title">Certificates</h1>
      <p className="lead" style={{marginBottom:24}}>{earned.length} of {courses.length} earned · issued to <b>{name}</b>. Download individually or as one combined PDF.</p>

      <div className="cert-toolbar">
        <div className="cnt"><b>{earned.length} certificate{earned.length===1?"":"s"} ready</b>
          <div>Files are auto-named with your name on download</div></div>
        <div className="actions">
          <button className="btn ghost" disabled={!!bulk} onClick={dlAllIndiv}>
            {bulk==="all"?<span className="spinner dark"/>:<Icon name="download" size={17}/>} Download each ({earned.length} files)
          </button>
          <button className="btn" disabled={!!bulk} onClick={dlCombined}>
            {bulk==="combined"?<span className="spinner"/>:<Icon name="doc" size={17}/>} Download all in one PDF
          </button>
        </div>
      </div>

      <div className="cert-grid">
        {courses.map(c=>{
          const rec=progress[c.id];
          if(!rec?.passed){
            return <div className="cert-mini" key={c.id}>
              <div className="thumb" style={{minHeight:200}}>
                <div className="locked"><div className="lk"><Icon name="lock" size={26}/><div style={{fontWeight:600,fontSize:13}}>Not yet earned</div></div></div>
              </div>
              <div className="mini-foot"><div><b>{c.short}</b><div className="when">Module {String(c.num).padStart(2,"0")} · locked</div></div></div>
            </div>;
          }
          return <div className="cert-mini" key={c.id}>
            <div className="thumb" style={{cursor:"zoom-in"}} onClick={()=>setOpen(c)}><CertThumb rec={recOf(c)} course={c} cfg={cfg}/></div>
            <div className="mini-foot">
              <div><b>{c.short}</b><div className="when">{rec.score}% · {fmtDate(rec.date)}</div></div>
              <button className="btn sm" disabled={busyId===c.id} onClick={()=>dlOne(c)}>
                {busyId===c.id?<span className="spinner"/>:<Icon name="download" size={15}/>} PDF
              </button>
            </div>
          </div>;
        })}
      </div>

      {open && <CertModal rec={recOf(open)} course={open} cfg={cfg} busy={busyId===open.id}
        onClose={()=>setOpen(null)} onDownload={()=>dlOne(open)}/>}
    </div>
  );
}

/* ===== APP ===== */
const STORE="dtc_training_v2";
function load(){ try{return JSON.parse(localStorage.getItem(STORE))||{};}catch(e){return {};} }
function save(s){ try{localStorage.setItem(STORE,JSON.stringify(s));}catch(e){} }

function App(){
  const courses=window.DTC_COURSES, cfg=window.DTC_CONFIG;
  const [state,setState]=React.useState(()=>{const s=load();return {user:s.user||null,dob:s.dob||s.hireDate||null,progress:s.progress||{}};});
  const [view,setView]=React.useState(()=>{try{return sessionStorage.getItem('dtc_view')||"dashboard";}catch(e){return "dashboard";}}); // dashboard | course | certs
  const [activeCourse,setActiveCourse]=React.useState(()=>{try{return sessionStorage.getItem('dtc_course')||null;}catch(e){return null;}});
  const [toastMsg,setToastMsg]=React.useState(null);
  // Identity handoff from the DTC app. If a ?h=token is present, sign the learner
  // in as their app profile (no access code) and remember their email so
  // completions link back to that exact profile.
  const [handoffPending,setHandoffPending]=React.useState(()=>{try{return new URLSearchParams(window.location.search).has('h');}catch(e){return false;}});

  React.useEffect(()=>{
    if(!handoffPending) return;
    var token=null, courseParam=null;
    try{ var qs=new URLSearchParams(window.location.search); token=qs.get('h'); courseParam=qs.get('course'); }catch(e){}
    if(token && typeof window.DTC_getHandoff==="function"){
      window.DTC_getHandoff(token).then(function(h){
        try{ history.replaceState(null,'',window.location.pathname); }catch(e){}
        if(h && h.name){
          var applyProgress=function(remote){
            setState(function(s){ return { user:h.name, dob:s.dob||null, email:(h.email||'').toLowerCase(), uid:h.uid||'', progress:Object.assign({}, s.progress||{}, remote||{}) }; });
            setHandoffPending(false);
            // Deep link: land directly on the module the DTC app sent them to open,
            // instead of the course dashboard, so the two products feel like one.
            if(courseParam && (courses||[]).some(function(c){return c.id===courseParam;})){
              setActiveCourse(courseParam); setView("course");
            }
          };
          if(h.uid && typeof window.DTC_loadProgress==="function"){ window.DTC_loadProgress(h.uid).then(applyProgress); }
          else { applyProgress({}); }
        } else { setHandoffPending(false); }
      });
    } else { setHandoffPending(false); }
  },[handoffPending]);

  React.useEffect(()=>{try{sessionStorage.setItem('dtc_view',view);if(activeCourse)sessionStorage.setItem('dtc_course',activeCourse);else sessionStorage.removeItem('dtc_course');}catch(e){}},[view,activeCourse]);

  React.useEffect(()=>{
    save(state);
    // Persist progress to the user's profile (handoff users only) so it follows them.
    if(state.uid && typeof window.DTC_saveProgress==="function"){
      window.DTC_saveProgress(state.uid, state.progress, {email:state.email, uid:state.uid, name:state.user});
    }
  },[state]);
  function toast(m){ setToastMsg(m); clearTimeout(window.__t); window.__t=setTimeout(()=>setToastMsg(null),3200); }

  function signOut(){
    if(!window.confirm("Sign out? Your completed certificates are saved and can be re-earned. Your current session will be cleared.")) return;
    try{ localStorage.removeItem(STORE); }catch(e){}
    setState({user:null,dob:null,progress:{}});
  }

  if(handoffPending) return <div style={{minHeight:"100vh",display:"grid",placeItems:"center",fontFamily:"system-ui",color:"#5A6B62"}}><div style={{textAlign:"center"}}><div className="spinner dark" style={{margin:"0 auto 14px"}}></div>Signing you in…</div></div>;
  if(!state.user) return <SignIn onSubmit={(name,dob)=>setState({user:name,dob,progress:{}})}/>;

  function openCourse(id){ setActiveCourse(id); setView("course"); window.scrollTo(0,0); }
  function completeCourse(id,rec){
    setState(s=>({...s,progress:{...s.progress,[id]:rec}}));
    // Sync a completion record to the DTC app (best-effort; see firebase-sync.js).
    try {
      if (rec && rec.passed && typeof window.DTC_saveCertificate === "function") {
        var c = (courses || []).find(function(x){ return x.id === id; }) || {};
        window.DTC_saveCertificate({ name: state.user, dob: state.dob, email: state.email, uid: state.uid, courseId: id, courseTitle: c.title, score: rec.score, date: rec.date });
      }
    } catch(e) { /* never block course completion */ }
  }
  function nav(v){ setView(v); setActiveCourse(null); window.scrollTo(0,0); }

  const course=courses.find(c=>c.id===activeCourse);
  const done=courses.filter(c=>state.progress[c.id]?.passed).length;

  return (
    <div className="app">
      <div className="topbar">
        <div className="brand" onClick={()=>nav("dashboard")}>
          <img src={cfg.logo} alt="Dare to Care Home Care"/>
          <div className="bn">Caregiver Training<small>Dare to Care Home Care</small></div>
        </div>
        <div className="spacer"/>
        <div className="nav-links">
          <button className={view==="dashboard"?"active":""} onClick={()=>nav("dashboard")}>Courses</button>
          <button className={view==="certs"?"active":""} onClick={()=>nav("certs")}>
            Certificates {done>0 && <span style={{marginLeft:4,fontSize:11,background:view==="certs"?"rgba(255,255,255,.25)":"var(--gold)",color:"#fff",borderRadius:"999px",padding:"1px 7px"}}>{done}</span>}
          </button>
        </div>
        <div className="who">
          <span style={{fontWeight:600,color:"var(--ink)"}}>{state.user}</span>
          <span className="avatar">{initials(state.user)}</span>
          <button className="btn ghost sm" onClick={signOut} style={{marginLeft:8}}>Sign out</button>
        </div>
      </div>

      {view==="dashboard" &&
        <Dashboard courses={courses} progress={state.progress} name={state.user}
          onOpen={openCourse} goCerts={()=>nav("certs")}/>}

      {view==="course" && course &&
        <CoursePlayer course={course} cfg={cfg} userName={state.user} record={state.progress[course.id]}
          onComplete={completeCourse} onExit={()=>nav("dashboard")}/>}

      {view==="certs" &&
        <Certificates courses={courses} progress={state.progress} name={state.user} cfg={cfg} toast={toast}/>}

      {toastMsg && <div className="toast"><Icon name="check" size={16}/> {toastMsg}</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
