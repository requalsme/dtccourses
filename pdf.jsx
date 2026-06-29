/* PDF export — html2canvas + jsPDF. Renders certificates offscreen, captures, names by learner. */
(function(){
  const W=1123, H=794;
  function safe(name){return (name||"learner").trim().replace(/[^\w\s-]/g,"").replace(/\s+/g,"_");}
  function ensureHost(){
    let h=document.getElementById("__cert_export_host");
    if(!h){
      h=document.createElement("div");
      h.id="__cert_export_host";
      Object.assign(h.style,{position:"fixed",left:"-12000px",top:"0",width:W+"px",height:H+"px",background:"#fff",zIndex:-1});
      document.body.appendChild(h);
    }
    return h;
  }
  function waitImgs(node){
    const imgs=[...node.querySelectorAll("img")];
    return Promise.all(imgs.map(im=> im.complete && im.naturalWidth ? Promise.resolve()
      : new Promise(r=>{im.onload=r;im.onerror=r;})));
  }
  function renderCert(rec, course, cfg){
    return new Promise(async(resolve)=>{
      const host=ensureHost();
      host.innerHTML="";
      const mount=document.createElement("div");
      host.appendChild(mount);
      const root=ReactDOM.createRoot(mount);
      root.render(React.createElement(window.Certificate,{rec,course,cfg,id:"export-"+course.id}));
      // allow react paint + effects (QR canvas)
      await new Promise(r=>setTimeout(r,120));
      const certEl=mount.querySelector(".certificate");
      await waitImgs(certEl);
      await new Promise(r=>setTimeout(r,260));
      const canvas=await html2canvas(certEl,{scale:2,backgroundColor:"#ffffff",width:W,height:H,windowWidth:W,windowHeight:H,logging:false,useCORS:true});
      root.unmount();
      resolve(canvas);
    });
  }
  async function exportOne(course, rec, cfg){
    const {jsPDF}=window.jspdf;
    const pdf=new jsPDF({orientation:"landscape",unit:"mm",format:"a4"});
    const cv=await renderCert(rec,course,cfg);
    pdf.addImage(cv.toDataURL("image/jpeg",0.94),"JPEG",0,0,297,210,undefined,"FAST");
    pdf.save(`${safe(rec.name)}_${safe(course.short)}_Certificate.pdf`);
  }
  async function exportAll(items, cfg, onProgress){
    // items: [{course, rec}]
    const {jsPDF}=window.jspdf;
    const pdf=new jsPDF({orientation:"landscape",unit:"mm",format:"a4"});
    for(let i=0;i<items.length;i++){
      if(onProgress) onProgress(i,items.length);
      const cv=await renderCert(items[i].rec,items[i].course,cfg);
      if(i>0) pdf.addPage("a4","landscape");
      pdf.addImage(cv.toDataURL("image/jpeg",0.94),"JPEG",0,0,297,210,undefined,"FAST");
    }
    const nm=items[0]?.rec?.name;
    pdf.save(`${safe(nm)}_DareToCare_All_Certificates.pdf`);
  }
  window.DTC_PDF={exportOne,exportAll,safe};
})();
