/* Dare to Care — auto-rotating access codes.
   Each month the secret phrase generates FOUR codes (any one works to sign in):
     • numeric  — all numbers              e.g. 408216
     • letters  — two brand words, mixed case   e.g. hOpeGuArDIan
     • alnum    — brand word (mixed case) + digits  e.g. diGNity47
     • brand    — a brand phrase, mixed case  e.g. sAfe-haNds
   Sign-in is case-insensitive (easy to type); the varied capitalization is to
   make the codes look less guessable. Same values are computed by the live site
   and by admin-code.html. Pure JS so the generator runs offline by double-click.
   To change the vocabulary, edit WORDS here AND in admin-code.html (keep equal). */
(function(){
  var WORDS=["CARE","DARE","HEART","HOME","KIND","TRUST","COMFORT","DIGNITY",
             "RESPECT","SAFE","HANDS","COMPASSION","SUPPORT","NURTURE","GRACE",
             "HOPE","SHIELD","GUARDIAN","WELLNESS","SERVE","FAMILY","WARMTH"];
  function dtcHash(str){
    var h = 0x811c9dc5 >>> 0;
    for(var i=0;i<str.length;i++){ h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    h ^= h>>>15; h = Math.imul(h,0x2c1b3c6d)>>>0; h ^= h>>>12; h = Math.imul(h,0x297a2d39)>>>0; h ^= h>>>15;
    return h>>>0;
  }
  function pad(n,len){ var s=""+n; while(s.length<len) s="0"+s; return s; }
  function title(w){ return w.charAt(0)+w.slice(1).toLowerCase(); }
  function pick(secret,pid,tag){ return WORDS[ dtcHash(tag+"|"+secret+"|"+pid) % WORDS.length ]; }
  function pick2(secret,pid,tag){ var a=pick(secret,pid,tag+"1"), b=pick(secret,pid,tag+"2");
    if(b===a) b=WORDS[(dtcHash(tag+"2|"+secret+"|"+pid)+1)%WORDS.length]; return [a,b]; }
  // deterministic mixed-case: each letter upper/lower by hash bits; guarantees ≥1 of each
  function mixCase(word, seed){
    var h=dtcHash("case|"+seed+"|"+word), out="", ups=0, lows=0;
    for(var i=0;i<word.length;i++){
      if(i>0 && i%31===0) h=dtcHash(h+"|"+i);
      var up=(h>>>(i%31))&1, ch=word.charAt(i);
      if(up){ out+=ch.toUpperCase(); ups++; } else { out+=ch.toLowerCase(); lows++; }
    }
    if(ups===0) out=out.charAt(0).toUpperCase()+out.slice(1);
    if(lows===0 && out.length>1) out=out.slice(0,-1)+out.charAt(out.length-1).toLowerCase();
    return out;
  }
  function periodId(d){ return d.getFullYear()+"-"+pad(d.getMonth()+1,2); }  // monthly YYYY-MM
  function monthStart(off){ var n=new Date(); return new Date(n.getFullYear(), n.getMonth()+(off||0), 1); }

  function monthlyCodes(secret, pid){
    var numeric = pad(dtcHash("num|"+secret+"|"+pid) % 1000000, 6);
    var lw = pick2(secret,pid,"le");
    var letters = mixCase(lw[0]+lw[1], secret+"|L|"+pid);
    var aw = pick(secret,pid,"aln");
    var alnum = mixCase(aw, secret+"|A|"+pid) + pad(dtcHash("adg|"+secret+"|"+pid) % 100, 2);
    var pw = pick2(secret,pid,"ph");
    var brand = mixCase(title(pw[0]), secret+"|B1|"+pid)+"-"+mixCase(title(pw[1]), secret+"|B2|"+pid);
    return { numeric:numeric, letters:letters, alnum:alnum, brand:brand };
  }
  function asList(o){ return [o.numeric, o.letters, o.alnum, o.brand]; }

  function currentCodes(secret){ return monthlyCodes(secret, periodId(new Date())); }
  function nextCodes(secret){ return monthlyCodes(secret, periodId(monthStart(1))); }
  function codesForMonth(secret, d){ return monthlyCodes(secret, periodId(d)); }
  function periodLabel(off){ return monthStart(off).toLocaleString(undefined,{month:"long",year:"numeric"}); }

  function rotatingValidCodes(A){
    A=A||{}; var R=A.rotate||{};
    if(!R.enabled || !R.secret) return [];
    var now=new Date();
    var out = asList(monthlyCodes(R.secret, periodId(now)));
    var g=(typeof R.graceDays==="number")?R.graceDays:0;
    if(g>0 && now.getDate()<=g){ out = out.concat(asList(monthlyCodes(R.secret, periodId(monthStart(-1))))); }
    return out;
  }

  function maybeReveal(){
    try{
      var h=location.hash||"", q=location.search||"";
      var m=h.match(/(?:^#|&)show=([^&]+)/) || q.match(/[?&]show=([^&]+)/);
      var key=m?decodeURIComponent(m[1]).trim():null;
      if(key!==null){ try{ history.replaceState(null,"",location.pathname); }catch(e){ location.hash=""; } }
      if(key===null) return;
      var A=window.DTC_ACCESS||{}, R=A.rotate||{};
      var revealKey=A.revealKey || R.revealKey || "";
      if(!revealKey || key.toLowerCase()!==String(revealKey).toLowerCase() || !R.secret) return;
      var c=monthlyCodes(R.secret, periodId(new Date()));
      var n=monthlyCodes(R.secret, periodId(monthStart(1)));
      function row(lbl,val){ return '<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:9px 12px;background:#EAF6EF;border:1px solid #cfe9da;border-radius:9px;margin-top:8px">'
        +'<span style="font-size:12px;color:#5A6B62">'+lbl+'</span>'
        +'<b style="font-size:18px;letter-spacing:1px;color:#0A5C39">'+val+'</b></div>'; }
      var ov=document.createElement("div");
      ov.style.cssText="position:fixed;inset:0;z-index:99999;background:rgba(10,40,28,.55);display:grid;place-items:center;font-family:system-ui,'Segoe UI',sans-serif;padding:18px;overflow:auto";
      ov.innerHTML='<div style="background:#fff;max-width:440px;width:100%;border-radius:16px;padding:26px;box-shadow:0 22px 60px rgba(0,0,0,.32)">'
        +'<div style="font-size:12px;letter-spacing:1.6px;color:#0D7C4D;font-weight:700">DARE TO CARE · ADMIN</div>'
        +'<h2 style="margin:6px 0 2px;font-size:20px;color:#14352a">Access codes — '+periodLabel(0)+'</h2>'
        +'<p style="font-size:12px;color:#8a988f;margin:2px 0 8px">Any one works · capitalization doesn\'t matter when signing in.</p>'
        +row("Numbers", c.numeric)+row("Letters", c.letters)+row("Letters + numbers", c.alnum)+row("Brand phrase", c.brand)
        +'<div style="margin-top:16px;font-size:12px;color:#5A6B62">Next month ('+periodLabel(1)+'): '
        +'<b>'+n.numeric+'</b> · <b>'+n.letters+'</b> · <b>'+n.alnum+'</b> · <b>'+n.brand+'</b></div>'
        +'<p style="font-size:12px;color:#8a988f;margin:14px 0 0;line-height:1.5">They change automatically on the 1st — no deploy. Keep this reveal link private.</p>'
        +'<button id="dtc-reveal-close" style="margin-top:16px;width:100%;padding:11px;border:0;border-radius:9px;background:#0D7C4D;color:#fff;font-size:15px;font-weight:600;cursor:pointer">Done</button>'
        +'</div>';
      document.body.appendChild(ov);
      var b=document.getElementById("dtc-reveal-close"); if(b) b.onclick=function(){ ov.remove(); };
      ov.addEventListener("click",function(e){ if(e.target===ov) ov.remove(); });
    }catch(e){}
  }

  window.DTCCodes={ dtcHash:dtcHash, periodId:periodId, monthlyCodes:monthlyCodes,
    currentCodes:currentCodes, nextCodes:nextCodes, codesForMonth:codesForMonth,
    periodLabel:periodLabel, rotatingValidCodes:rotatingValidCodes, maybeReveal:maybeReveal, WORDS:WORDS };
  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded", maybeReveal);
  }else{
    setTimeout(maybeReveal, 0);
  }
  window.addEventListener("hashchange", maybeReveal);
})();
