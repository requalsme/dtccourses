/* Shared icons + utilities */

function Icon({name, size=24, stroke=2, className, style}){
  const p = {width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",
    strokeWidth:stroke,strokeLinecap:"round",strokeLinejoin:"round",className,style};
  switch(name){
    case "shield": return <svg {...p}><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9.2 12l2 2 3.6-4"/></svg>;
    case "home": return <svg {...p}><path d="M4 11l8-7 8 7"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/></svg>;
    case "hands": return <IconHands size={size} stroke={stroke} style={style} className={className}/>;
    case "cross": return <svg {...p}><rect x="9" y="3" width="6" height="18" rx="1.5"/><rect x="3" y="9" width="18" height="6" rx="1.5"/></svg>;
    case "drop": return <svg {...p}><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/></svg>;
    case "scale": return <svg {...p}><path d="M12 3v18"/><path d="M7 6h10"/><path d="M5 21h14"/><path d="M7 6l-3 6h6z"/><path d="M17 6l-3 6h6z"/></svg>;
    case "play": return <svg {...p} fill="currentColor" stroke="none"><path d="M8 5v14l11-7z"/></svg>;
    case "check": return <svg {...p}><path d="M5 12.5l4.5 4.5L19 7"/></svg>;
    case "arrow": return <svg {...p}><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>;
    case "back": return <svg {...p}><path d="M19 12H5"/><path d="M11 18l-6-6 6-6"/></svg>;
    case "lock": return <svg {...p}><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>;
    case "download": return <svg {...p}><path d="M12 4v11"/><path d="M8 11l4 4 4-4"/><path d="M5 19h14"/></svg>;
    case "award": return <svg {...p}><circle cx="12" cy="9" r="6"/><path d="M9 14l-2 7 5-3 5 3-2-7"/></svg>;
    case "doc": return <svg {...p}><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M10 13h6M10 17h6"/></svg>;
    case "video": return <svg {...p}><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/></svg>;
    case "clock": return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case "x": return <svg {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case "spark": return <svg {...p}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></svg>;
    case "send": return <svg {...p}><path d="M21 3L10 14"/><path d="M21 3l-7 18-4-8-8-4z"/></svg>;
    case "leaf": return <svg {...p}><path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z"/><path d="M5 19c3-5 6-7 10-9"/></svg>;
    case "list": return <svg {...p}><path d="M8 6h12M8 12h12M8 18h12"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></svg>;
    case "alert": return <svg {...p}><path d="M12 3l9 16H3z"/><path d="M12 9v5M12 17h.01"/></svg>;
    default: return null;
  }
}
// fix two malformed paths above with clean versions
function IconHands({size=24,stroke=2,style,className}){
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    <path d="M12 21C9 19 4 15 4 10.5 4 8 5.8 6 8 6c1.6 0 3 1 4 2.5C13 7 14.4 6 16 6c2.2 0 4 2 4 4.5C20 15 15 19 12 21z"/>
  </svg>;
}

const COURSE_ICONS = {shield:"shield",home:"home",hands:"hands",cross:"cross",drop:"drop",scale:"scale"};
function CourseGlyph({name, size=26}){
  if(name==="hands") return <IconHands size={size}/>;
  return <Icon name={name} size={size}/>;
}

/* ---- utils ---- */
function hashStr(str){
  let h=2166136261>>>0;
  for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}
  return h>>>0;
}
function makeCertId(name, courseCode, dateISO){
  const seed = hashStr((name||"").toLowerCase().trim()+"|"+courseCode+"|"+dateISO.slice(0,10));
  const b36 = seed.toString(36).toUpperCase().padStart(6,"0").slice(0,6);
  const yr = new Date(dateISO).getFullYear();
  return `DTC-${courseCode}-${yr}-${b36}`;
}
function fmtDate(iso){
  return new Date(iso).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
}
function fmtDuration(seconds){
  const total=Math.max(0,Math.round(Number(seconds)||0));
  const mins=Math.floor(total/60), secs=total%60;
  if(mins>=60){
    const hrs=Math.floor(mins/60), rem=mins%60;
    return `${hrs} hr${hrs===1?"":"s"}${rem?` ${rem} min`:""}`;
  }
  if(mins) return `${mins} min${secs?` ${secs} sec`:""}`;
  return `${secs||1} sec`;
}
function initials(name){
  const parts=(name||"").trim().split(/\s+/);
  return ((parts[0]?.[0]||"")+(parts[parts.length-1]?.[0]||"")).toUpperCase()||"–";
}

Object.assign(window,{Icon,IconHands,CourseGlyph,hashStr,makeCertId,fmtDate,fmtDuration,initials,COURSE_ICONS});
