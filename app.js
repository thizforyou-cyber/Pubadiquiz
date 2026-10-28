let bank=[
{id:1,topic:"Administrative Thought",q:"The New Public Administration is considered anti-positivist. What does this mean?",o:["It rejects the definition of Public Administration as value-free.","It advocates only private-sector management.","It rejects social equity as a goal.","It focuses only on quantitative methods."],a:0,src:"Uploaded question-bank PDF, Question 2",why:"The PDF gives option A. Here, anti-positivism challenges the idea that public administration can be studied as entirely value-free."},
{id:2,topic:"Administrative Thought",q:"'Catalytic Government' is a feature of which approach?",o:["Private Administration","Entrepreneurial Government","New Public Administration","Principal-Agent Relationship"],a:1,src:"Uploaded question-bank PDF, Question 4",why:"The PDF gives option B: Entrepreneurial Government. The catalytic idea is that government steers and enables rather than directly doing everything."},
{id:3,topic:"Thinkers & Theories",q:"Who was acknowledged by Woodrow Wilson as a source of the idea of the politics–administration dichotomy?",o:["Hamilton","Bluntschli","Madison","Bentham"],a:1,src:"Uploaded question-bank PDF, Question 5",why:"The PDF gives option B: Bluntschli. Check your prescribed text if you need to verify the historical attribution."},
{id:4,topic:"Thinkers & Theories",q:"'Before a Science can develop principles, it must possess concepts' was stated by whom?",o:["Chester Barnard","Herbert Simon","Chris Argyris","Rensis Likert"],a:1,src:"Uploaded question-bank PDF, Question 7",why:"The PDF gives option B: Herbert Simon. The idea stresses the need for clear concepts before developing general principles."},
{id:5,topic:"Administrative Thought",q:"According to the source PDF's answer key, which code is given for the author–work matching question 6?",o:["Code A","Code B","Code C","Code D"],a:2,src:"Uploaded question-bank PDF, Question 6",why:"The source answer key marks C. The extracted title list has formatting issues, so check the original PDF before memorising individual pairings."},
{id:6,topic:"Development & Governance",q:"Which budgetary method is used in the context of Development Administration, according to the source bank?",o:["Performance Budget","Block Vote Budget Allocation System","Zero Base Budget","Line Item Budget"],a:0,src:"Uploaded question-bank PDF, Question 865",why:"The PDF gives option A: Performance Budget. It connects expenditure with work performed and results achieved."},
{id:7,topic:"Indian Administration",q:"Under which Article of the Constitution of India is the President empowered to promulgate an ordinance?",o:["Article 53","Article 54","Article 122","Article 123"],a:3,src:"Uploaded question-bank PDF, Question 870",why:"The PDF gives option D: Article 123, concerning the President's ordinance-making power subject to constitutional conditions."},
{id:8,topic:"Development & Governance",q:"Planning for the optimal location of schools, hospitals and banks is known as what?",o:["Local planning","Spatial planning","Vertical planning","Horizontal planning"],a:1,src:"Uploaded question-bank PDF, Question 866",why:"The PDF gives option B: Spatial planning. It considers where services and facilities should be located geographically."},
{id:9,topic:"Thinkers & Theories",q:"Which is NOT listed as a root of New Public Service Theory in the source question bank?",o:["Public Choice Theory","Theories of Democratic Citizenship","Models of Community and Civil Society","Organizational Humanism and Discourse Theory"],a:0,src:"Uploaded question-bank PDF, Question 3",why:"The PDF gives option A: Public Choice Theory. Treat this as the source answer key and verify if it conflicts with your prescribed material."},
{id:10,topic:"Development & Governance",q:"Which organisation is given as the source of the phrase 'Sustainable Development' in the question bank?",o:["World Health Organization","World Bank Report on Air Pollution","World Commission on Environment and Development","International Convention on Biological Diversity"],a:2,src:"Uploaded question-bank PDF, Question 406",why:"The PDF gives option C: World Commission on Environment and Development."}
];
const cards=[["New Public Administration","Source-bank link: anti-positivist → rejects the idea that public administration is entirely value-free."],["Catalytic Government","The source question's answer is Entrepreneurial Government. Think: steer and enable, not do everything directly."],["Herbert Simon","The source bank attributes the statement about concepts preceding principles to Herbert Simon."],["Article 123","The source bank associates Article 123 with the President's ordinance-making power."],["Spatial planning","Planning the geographical location of services such as schools, hospitals and banks."]];
const $=id=>document.getElementById(id),s={xp:0,correct:0,sessions:0,daily:0,missed:[],mode:"quiz",items:[],i:0,right:0,answered:false,fi:0,reveal:false};
function esc(x){return String(x).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function dashboard(){$("xp").textContent=s.xp;$("correct").textContent=s.correct;$("sessions").textContent=s.sessions;$("daily").textContent=Math.min(5,s.daily)+"/5";}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function openQuiz(mode="quiz",topic=null){s.mode=mode;s.i=0;s.right=0;s.answered=false;s.fi=0;s.reveal=false;let list=bank;if(topic)list=list.filter(q=>q.topic===topic);if(mode==="review")list=s.missed.map(id=>bank.find(q=>q.id===id)).filter(Boolean);s.items=shuffle(list);$("modal").hidden=false;$("mode").textContent=mode==="review"?"MISTAKE REVIEW":mode==="flash"?"QUICK RECALL":topic?topic.toUpperCase():"QUIZ ARENA";render();}
function render(){$("sessionxp").textContent=s.xp;if(s.mode==="flash"){renderFlash();return;}const c=$("content");if(!s.items.length){$("progress").style.width="0";c.innerHTML='<div class="result"><h2>No mistakes to review yet</h2><p>Play a quiz first. Missed questions will appear here for revision.</p><button class="primary" id="goQuiz">Start a quiz →</button></div>';$("goQuiz").onclick=()=>openQuiz("quiz");return;}if(s.i>=s.items.length){results();return;}const q=s.items[s.i];s.answered=false;$("progress").style.width=s.i/s.items.length*100+"%";c.innerHTML='<div class="qmeta"><span>QUESTION '+(s.i+1)+' OF '+s.items.length+'</span><span>'+esc(q.topic)+'</span></div><h2 class="question">'+esc(q.q)+'</h2><div class="answers">'+q.o.map((x,i)=>'<button class="answer" data-a="'+i+'"><span class="letter">'+String.fromCharCode(65+i)+'</span><span>'+esc(x)+'</span></button>').join("")+'</div><div id="feedback"></div><div class="actions"><button class="secondary" id="exit">Exit quiz</button><button class="primary" id="next" disabled>Choose an answer</button></div><div class="source">Source: '+esc(q.src)+'</div>';document.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>answer(+b.dataset.a));$("next").onclick=()=>{if(s.answered){s.i++;render();}};$("exit").onclick=close;}
function answer(n){if(s.answered)return;s.answered=true;const q=s.items[s.i],ok=n===q.a;if(ok){s.right++;s.correct++;s.xp+=10;s.daily++;s.missed=s.missed.filter(id=>id!==q.id);}else if(!s.missed.includes(q.id))s.missed.push(q.id);dashboard();$("sessionxp").textContent=s.xp;document.querySelectorAll("[data-a]").forEach(b=>{b.disabled=true;let i=+b.dataset.a;if(i===q.a)b.classList.add("correct");else if(i===n)b.classList.add("wrong");});$("feedback").innerHTML='<div class="feedback '+(ok?"good":"bad")+'"><b>'+(ok?"✓ Correct! +10 XP":"Not quite — keep learning.")+'</b><br>'+esc(q.why)+'</div>';$("next").disabled=false;$("next").textContent=s.i===s.items.length-1?"See results →":"Next question →";}
function results(){s.sessions++;dashboard();let pct=Math.round(s.right/s.items.length*100);$("progress").style.width="100%";$("content").innerHTML='<div class="result"><div style="font-size:42px">'+(pct>=80?"🏆":pct>=50?"🚀":"🌱")+'</div><h2>'+(pct>=80?"Brilliant work!":pct>=50?"Nice progress!":"Every attempt teaches you.")+'</h2><div class="score">'+pct+'%</div><p>You got <b>'+s.right+' out of '+s.items.length+'</b> correct and earned <b>'+s.right*10+' XP</b>.<br>'+s.missed.length+' question(s) in your mistake list.</p><div class="actions"><button class="secondary" id="review">Review mistakes</button><button class="primary" id="again">Play again →</button></div></div>';$("review").onclick=()=>openQuiz("review");$("again").onclick=()=>openQuiz("quiz");}
function renderFlash(){const c=$("content");$("progress").style.width=Math.min(100,(s.fi+1)/cards.length*100)+"%";if(s.fi>=cards.length){c.innerHTML='<div class="result"><h2>Recall round complete ✨</h2><p>You reviewed '+cards.length+' concepts.</p><button class="primary" id="againFlash">Run it back →</button></div>';$("againFlash").onclick=()=>openQuiz("flash");return;}let card=cards[s.fi];c.innerHTML='<div class="qmeta"><span>RECALL CARD '+(s.fi+1)+' OF '+cards.length+'</span><span>QUICK RECALL</span></div><button class="flashcard" id="flip"><small>'+(s.reveal?"THE KEY IDEA":"TRY TO RECALL")+'</small><strong>'+esc(s.reveal?card[1]:card[0])+'</strong><small>Tap card to '+(s.reveal?"see the prompt":"reveal answer")+'</small></button><div class="actions"><button class="secondary" id="exitFlash">Exit</button><button class="primary" id="nextFlash">'+(s.reveal?"Next card →":"Reveal answer")+'</button></div>';$("flip").onclick=()=>{s.reveal=!s.reveal;renderFlash();};$("nextFlash").onclick=()=>{if(!s.reveal)s.reveal=true;else{s.fi++;s.reveal=false;}renderFlash();};$("exitFlash").onclick=close;}
function close(){$("modal").hidden=true;}
$("start").onclick=()=>openQuiz("quiz");document.querySelectorAll("[data-mode]").forEach(b=>b.onclick=()=>openQuiz(b.dataset.mode));document.querySelectorAll("[data-topic]").forEach(b=>b.onclick=()=>openQuiz("quiz",b.dataset.topic));$("close").onclick=close;$("modal").onclick=e=>{if(e.target===$("modal"))close();};dashboard();

// DOCX_IMPORT_PANEL — import a Word question bank in the browser.
(function(){
  const savedKey="pubadiquest_imported_questions_v1";
  try {
    const saved=JSON.parse(localStorage.getItem(savedKey)||"[]");
    if(Array.isArray(saved)&&saved.length) bank=bank.filter(q=>!q.imported).concat(saved);
  } catch(e) {}
  const main=document.querySelector("main");
  const footer=main&&main.querySelector("footer");
  const panel=document.createElement("section");
  panel.className="mission";
  panel.style.cssText="display:block;margin-top:22px";
  panel.innerHTML='<div class="mission-icon">📄</div><div class="mission-text"><small>YOUR QUESTION BANK</small><h3>Import questions from Word</h3><p>Choose your .docx file. Questions and answer keys will be extracted in this browser and saved on this device.</p><label for="docxImport" class="primary" style="display:inline-block;margin-top:10px;cursor:pointer">Choose Word file</label><input id="docxImport" type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" style="display:none"><p id="importStatus" role="status" style="margin-top:10px">Built-in practice questions are ready.</p></div>';
  if(footer) main.insertBefore(panel,footer); else if(main) main.appendChild(panel);
  const status=panel.querySelector("#importStatus"), input=panel.querySelector("#docxImport");
  function loadMammoth(){
    return new Promise((resolve,reject)=>{
      if(window.mammoth) return resolve(window.mammoth);
      const script=document.createElement("script");
      script.src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.8.0/mammoth.browser.min.js";
      script.onload=()=>window.mammoth?resolve(window.mammoth):reject(new Error("Word reader could not start."));
      script.onerror=()=>reject(new Error("Could not load the Word reader. Check your internet connection."));
      document.head.appendChild(script);
    });
  }
  function parseBank(raw){
    const text=raw.replace(/\r/g,"").replace(/[ \t]+/g," ").trim();
    const starts=[...text.matchAll(/(?:^|\n)\s*Q\.?\s*(\d+)\s*[:.)-]?\s*/g)];
    const parsed=[];
    for(let i=0;i<starts.length;i++){
      const start=starts[i].index+(starts[i][0].startsWith("\n")?1:0);
      const end=i+1<starts.length?starts[i+1].index:text.length;
      const block=text.slice(start,end).trim();
      const qm=block.match(/^Q\.?\s*(\d+)/i); if(!qm) continue;
      const answerMatch=block.match(/Answer\s*:\s*([1-4])/i); if(!answerMatch) continue;
      const beforeAnswer=block.slice(0,answerMatch.index).trim();
      const lines=beforeAnswer.split("\n");
      const optionStarts=[];
      for(let j=0;j<lines.length;j++) if(/^\s*[1-4][.)]\s+/.test(lines[j])) optionStarts.push(j);
      if(optionStarts.length<4) continue;
      const opts=optionStarts.slice(-4);
      const stem=lines.slice(0,opts[0]).join(" ").replace(/^Q\.?\s*\d+\s*/i,"").trim();
      const options=opts.map((lineIndex,k)=>{
        const endLine=k<3?opts[k+1]:lines.length;
        return lines.slice(lineIndex,endLine).join(" ").replace(/^\s*[1-4][.)]\s*/,"").replace(/\s+/g," ").trim();
      });
      if(!stem||options.some(o=>!o)) continue;
      parsed.push({id:1000+Number(qm[1]),topic:"June 2026 PYQ",q:stem,o:options,a:Number(answerMatch[1])-1,src:"2026 JUNE.docx · Question "+qm[1],why:"The answer key in your Word file marks option "+answerMatch[1]+". An explanation was not provided in the source file.",imported:true});
    }
    return parsed;
  }
  input.addEventListener("change",async()=>{
    const file=input.files&&input.files[0]; if(!file)return;
    status.textContent="Reading your Word file…";
    try{
      const mammoth=await loadMammoth();
      const result=await mammoth.extractRawText({arrayBuffer:await file.arrayBuffer()});
      const parsed=parseBank(result.value||"");
      if(!parsed.length) throw new Error("I couldn't find question blocks with four numbered options and an Answer: 1–4 key. Please check that the file uses this format.");
      bank=bank.filter(q=>!q.imported).concat(parsed);
      localStorage.setItem(savedKey,JSON.stringify(parsed));
      status.textContent="Imported "+parsed.length+" questions successfully. They are saved in this browser; start Quiz Arena to practise.";
      const stat=document.querySelector(".stats article:first-child strong");
      if(stat) stat.title="Question bank now includes your imported Word questions.";
    }catch(err){status.textContent="Import failed: "+err.message;}
    input.value="";
  });
})();
