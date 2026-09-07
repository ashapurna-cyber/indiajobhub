const jobs=[
{id:1,title:"SSC CGL Recruitment 2026",org:"Staff Selection Commission",type:"Government",qual:["Graduate"],state:"All India",category:"SSC",deadline:"2026-10-15",date:"2026-09-05",vacancies:"To be announced",salary:"As per post",apply:"https://ssc.gov.in/"},
{id:2,title:"RRB Railway Technician Recruitment 2026",org:"Railway Recruitment Board",type:"Government",qual:["10th","ITI"],state:"All India",category:"Railway",deadline:"2026-10-20",date:"2026-09-04",vacancies:"Multiple",salary:"As per post",apply:"https://www.rrbapply.gov.in/"},
{id:3,title:"Assam Police Recruitment 2026",org:"Assam Police",type:"Government",qual:["12th"],state:"Assam",category:"Police",deadline:"2026-10-08",date:"2026-09-03",vacancies:"Check official notice",salary:"As per post",apply:"https://police.assam.gov.in/"},
{id:4,title:"IBPS Bank Recruitment 2026",org:"IBPS",type:"Government",qual:["Graduate"],state:"All India",category:"Banking",deadline:"2026-09-30",date:"2026-09-02",vacancies:"Multiple",salary:"As per post",apply:"https://www.ibps.in/"},
{id:5,title:"DSSSB Junior Assistant Recruitment",org:"Delhi Subordinate Services Selection Board",type:"Government",qual:["12th","Graduate"],state:"Delhi",category:"Teaching",deadline:"2026-10-05",date:"2026-09-01",vacancies:"Check official notice",salary:"As per post",apply:"https://dsssb.delhi.gov.in/"},
{id:6,title:"Junior Web Developer",org:"Tech Careers India",type:"Private",qual:["Diploma","Graduate"],state:"Karnataka",category:"IT",deadline:"2026-09-25",date:"2026-08-30",vacancies:"25",salary:"₹25,000–₹45,000/month",apply:"#"},
{id:7,title:"ITI Electrician Apprentice",org:"National Apprenticeship Opportunities",type:"Private",qual:["ITI"],state:"Maharashtra",category:"IT",deadline:"2026-09-28",date:"2026-08-29",vacancies:"50",salary:"Stipend as per rules",apply:"#"},
{id:8,title:"Graduate Trainee",org:"India Private Careers",type:"Private",qual:["Graduate"],state:"West Bengal",category:"IT",deadline:"2026-10-01",date:"2026-08-28",vacancies:"30",salary:"₹20,000–₹35,000/month",apply:"#"}
];

const $=id=>document.getElementById(id);
const stateFilter=$("stateFilter"), jobsGrid=$("jobsGrid");
[...new Set(jobs.map(j=>j.state))].sort().forEach(s=>stateFilter.add(new Option(s,s)));
$("jobCount").textContent=jobs.length;

function matches(j,q){
 const text=[j.title,j.org,j.type,j.state,j.category,...j.qual].join(" ").toLowerCase();
 return !q || text.includes(q.toLowerCase());
}
function render(){
 const q=$("searchInput").value.trim();
 const type=$("typeFilter").value, qual=$("qualFilter").value, state=stateFilter.value;
 let list=jobs.filter(j=>matches(j,q)&&(!type||j.type===type)&&(!qual||j.qual.includes(qual))&&(!state||j.state===state));
 if($("sortFilter").value==="deadline") list.sort((a,b)=>a.deadline.localeCompare(b.deadline));
 else list.sort((a,b)=>b.date.localeCompare(a.date));
 jobsGrid.innerHTML=list.map(j=>`
 <article class="job">
  <div class="job-top"><span class="badge ${j.type==="Private"?"private":""}">${j.type}</span><span class="meta">${j.state}</span></div>
  <h3>${j.title}</h3><div class="meta"><span>🏢 ${j.org}</span><span>🎓 ${j.qual.join(", ")}</span></div>
  <div class="deadline">⏳ Last Date: ${formatDate(j.deadline)}</div>
  <div class="job-actions"><button onclick="showJob(${j.id})">View Details</button><a class="apply" href="${j.apply}" target="_blank" rel="noopener">Apply</a></div>
 </article>`).join("");
 $("empty").classList.toggle("hidden",list.length>0);
}
function formatDate(x){return new Date(x+"T00:00:00").toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}
function showJob(id){
 const j=jobs.find(x=>x.id===id);
 $("modalContent").innerHTML=`<span class="badge ${j.type==="Private"?"private":""}">${j.type}</span>
 <h2>${j.title}</h2><p><b>${j.org}</b></p>
 <ul class="detail-list"><li><b>Qualification:</b> ${j.qual.join(", ")}</li><li><b>Location:</b> ${j.state}</li><li><b>Vacancies:</b> ${j.vacancies}</li><li><b>Salary:</b> ${j.salary}</li><li><b>Last Date:</b> ${formatDate(j.deadline)}</li></ul>
 <div class="notice">Important: Verify the official notification, eligibility, fees and dates before applying.</div>
 <br><a class="apply" href="${j.apply}" target="_blank" rel="noopener">Visit Official Apply Website</a>`;
 $("modal").classList.remove("hidden");
}
function quick(q){$("searchInput").value=q; document.querySelector("#jobs").scrollIntoView({behavior:"smooth"}); render()}
document.querySelectorAll("[data-quick]").forEach(b=>b.addEventListener("click",()=>quick(b.dataset.quick)));
["searchBtn","searchInput","typeFilter","qualFilter","stateFilter","sortFilter"].forEach(id=>{
 if(id==="searchInput") $(id).addEventListener("keydown",e=>{if(e.key==="Enter")render()});
 else if($(id)) $(id).addEventListener("click",()=>id==="searchBtn"&&render());
});
["typeFilter","qualFilter","stateFilter","sortFilter"].forEach(id=>$(id).addEventListener("change",render));
$("resetBtn").onclick=()=>{["searchInput","typeFilter","qualFilter","stateFilter"].forEach(id=>$(id).value="");$("sortFilter").value="latest";render()};
$("closeModal").onclick=()=>$("modal").classList.add("hidden");
$("modal").addEventListener("click",e=>{if(e.target===$("modal"))$("modal").classList.add("hidden")});
$("menuBtn").onclick=()=>$("navMenu").classList.toggle("open");
document.querySelector("#stateButtons").innerHTML=[...new Set(jobs.map(j=>j.state))].sort().map(s=>`<button onclick="quick('${s}')">${s}</button>`).join("");
render();
{ id:8, ... },

{
  id:9,
  title:"SSC Junior Engineer Recruitment 2026",
  org:"Staff Selection Commission",
  type:"Government",
  qual:["Diploma","Graduate"],
  state:"All India",
  category:"SSC",
  deadline:"2026-09-22",
  date:"2026-09-02",
  vacancies:"1,748",
  salary:"As per SSC rules",
  apply:"https://ssc.gov.in/"
},

{
  id:10,
  title:"IBPS RRB Office Assistant Recruitment 2026",
  org:"Institute of Banking Personnel Selection",
  type:"Government",
  qual:["Graduate"],
  state:"All India",
  category:"Banking",
  deadline:"2026-09-21",
  date:"2026-09-01",
  vacancies:"8,183",
  salary:"As per IBPS RRB rules",
  apply:"https://ibpsreg.ibps.in/rrboaxvaug26/"
},

{
  id:11,
  title:"IBPS RRB Officer Scale-I Recruitment 2026",
  org:"Institute of Banking Personnel Selection",
  type:"Government",
  qual:["Graduate"],
  state:"All India",
  category:"Banking",
  deadline:"2026-09-21",
  date:"2026-09-01",
  vacancies:"4,256",
  salary:"As per IBPS RRB rules",
  apply:"https://ibpsreg.ibps.in/rrbxvaug26/"
},

{
  id:12,
  title:"ISRO Scientist/Engineer SC Recruitment 2026",
  org:"Indian Space Research Organisation",
  type:"Government",
  qual:["Graduate"],
  state:"All India",
  category:"Engineering",
  deadline:"2026-09-16",
  date:"2026-08-27",
  vacancies:"175",
  salary:"As per ISRO rules",
  apply:"https://www.isro.gov.in/"
}
];
