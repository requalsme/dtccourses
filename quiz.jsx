/* Quiz + Result */
function Confetti(){
  const colors=["#297A57","#2E8250","#B7892F","#E9D9AE","#ABCFBB"];
  const bits=React.useMemo(()=>Array.from({length:90},(_,i)=>({
    left:Math.random()*100, delay:Math.random()*0.6, dur:2.4+Math.random()*1.8,
    rot:Math.random()*360, c:colors[i%colors.length], w:6+Math.random()*7
  })),[]);
  return <div className="confetti">{bits.map((b,i)=>
    <i key={i} style={{left:b.left+"vw",background:b.c,width:b.w,height:b.w*1.6,
      animationDuration:b.dur+"s",animationDelay:b.delay+"s",transform:`rotate(${b.rot}deg)`,
      borderRadius:i%3?0:"50%"}}/>)}</div>;
}

function Quiz({course, cfg, onPass, onFail, onExit}){
  const qs=course.quiz;
  const [i,setI]=React.useState(0);
  const [picked,setPicked]=React.useState(null);     // index chosen for current q
  const [answers,setAnswers]=React.useState([]);      // chosen index per q
  const q=qs[i];
  const locked=picked!==null;
  const correct=q.answer;

  function choose(idx){ if(locked) return; setPicked(idx); }
  function next(){
    const na=[...answers]; na[i]=picked; setAnswers(na);
    if(i+1<qs.length){ setI(i+1); setPicked(null); }
    else{
      const score=na.reduce((s,a,k)=> s+(a===qs[k].answer?1:0),0);
      const pct=Math.round(score/qs.length*100);
      if(pct>=cfg.passPct) onPass(pct); else onFail(pct,na);
    }
  }
  return (
    <div className="quiz-wrap">
      <div className="course-top">
        <button className="crumb" onClick={onExit}><Icon name="back" size={18}/> Back to lesson</button>
      </div>
      <div className="quiz-card">
        <div className="quiz-meta">
          <span className="eyebrow">Knowledge Check</span>
          <span className="qcount">Question {i+1} of {qs.length}</span>
        </div>
        <div className="qprog"><i style={{width:((i+(locked?1:0))/qs.length*100)+"%"}}/></div>
        <h3 className="qtext">{q.q}</h3>
        {q.options.map((opt,idx)=>{
          let cls="opt";
          if(locked){
            if(idx===correct) cls+=" correct";
            else if(idx===picked) cls+=" wrong";
          } else if(idx===picked) cls+=" sel";
          const mark = locked ? (idx===correct?"✓":(idx===picked?"✕":String.fromCharCode(65+idx)))
                              : String.fromCharCode(65+idx);
          return <button key={idx} className={cls} disabled={locked} onClick={()=>choose(idx)}>
            <span className="mk">{mark}</span>{opt}
          </button>;
        })}
        {locked && <div className="explain">
          {picked===correct ? <b>Correct. </b> : <b>Not quite. </b>}{q.why}
        </div>}
        <div className="quiz-foot">
          <span className="qcount" style={{color:"var(--slate-light)"}}>
            {locked ? (picked===correct?"Well done":"Review the explanation, then continue") : "Select your answer"}
          </span>
          <button className="btn" disabled={!locked} onClick={next}>
            {i+1<qs.length ? "Next question" : "See results"} <Icon name="arrow" size={18}/>
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultScreen({course, cfg, pct, passed, onContinue, onRetake, onExit}){
  const R=54, C=2*Math.PI*R, off=C*(1-pct/100);
  const color=passed?"var(--green)":"var(--danger)";
  return (
    <div className="quiz-wrap">
      {passed && <Confetti/>}
      <div className={"result "+(passed?"pass":"fail")}>
        <div className="big-ring">
          <svg width="128" height="128">
            <circle cx="64" cy="64" r={R} fill="none" stroke="var(--tint)" strokeWidth="11"/>
            <circle cx="64" cy="64" r={R} fill="none" stroke={color} strokeWidth="11"
              strokeLinecap="round" strokeDasharray={C} strokeDashoffset={off}
              transform="rotate(-90 64 64)" style={{transition:"stroke-dashoffset .9s ease"}}/>
          </svg>
          <div className="v" style={{color}}>{pct}%</div>
        </div>
        {passed ? <>
          <h2>You passed! 🎉</h2>
          <p>You've demonstrated understanding of <b>{course.title}</b>.</p>
          <div className="score-line"><Icon name="award" size={18}/> Certificate unlocked · Passing standard {cfg.passPct}%</div>
          <div className="result-actions">
            <button className="btn gold lg" onClick={onContinue}><Icon name="award" size={18}/> View your certificate</button>
            <button className="btn ghost" onClick={onExit}>Back to dashboard</button>
          </div>
        </> : <>
          <h2>Almost there</h2>
          <p>You scored {pct}% — you need <b>{cfg.passPct}%</b> to pass and earn your certificate.</p>
          <div className="score-line"><Icon name="list" size={18}/> Review the material and try again — you've got this.</div>
          <div className="result-actions">
            <button className="btn lg" onClick={onRetake}><Icon name="arrow" size={18}/> Retake the quiz</button>
            <button className="btn ghost" onClick={onExit}>Review the lesson</button>
          </div>
        </>}
      </div>
    </div>
  );
}

Object.assign(window,{Quiz,ResultScreen,Confetti});
