const jobs=[
  {
    id:1,
    title:"SSC Junior Engineer Recruitment 2026",
    org:"Staff Selection Commission",
    type:"Government",
    qual:["Diploma","Graduate"],
    state:"All India",
    category:"SSC",
    deadline:"2026-09-22",
    date:"2026-09-02",
    vacancies:"1,748",
    salary:"Level-6: ₹35,400–₹1,12,400",
    apply:"https://ssc.gov.in/"
  },

  {
    id:2,
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
    id:3,
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
    id:4,
    title:"ISRO Scientist/Engineer SC Recruitment 2026",
    org:"Indian Space Research Organisation",
    type:"Government",
    qual:["Graduate"],
    state:"All India",
    category:"Engineering",
    deadline:"2026-09-16",
    date:"2026-08-27",
    vacancies:"175",
    salary:"Level-10: As per ISRO notification",
    apply:"https://cdn.digialm.com/EForms/configuredHtml/1258/102146/Index.html"
  }
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
  const type=$("typeFilter").value;
  const qual=$("qualFilter").value;
  const state=stateFilter.value;

  let list=jobs.filter(j=>
    matches(j,q)&&
    (!type||j.type===type)&&
    (!qual||j.qual.includes(qual))&&
    (!state||j.state===state)
  );

  if($("sortFilter").value==="deadline"){
    list.sort((a,b)=>a.deadline.localeCompare(b.deadline));
  }else{
    list.sort((a,b)=>b.date.localeCompare(a.date));
  }

  jobsGrid.innerHTML=list.map(j=>`
    <article class="job">
      <div class="job-top">
        <span class="badge ${j.type==="Private"?"private":""}">${j.type}</span>
        <span class="meta">${j.state}</span>
      </div>

      <h3>${j.title}</h3>

      <div class="meta">
        <span>🏢 ${j.org}</span>
        <span>🎓 ${j.qual.join(", ")}</span>
      </div>

      <div class="deadline">
        ⏳ Last Date: ${formatDate(j.deadline)}
      </div>

      <div class="job-actions">
        <button onclick="showJob(${j.id})">View Details</button>
        <a class="apply" href="${j.apply}" target="_blank" rel="noopener">Apply</a>
      </div>
    </article>
  `).join("");

  $("empty").classList.toggle("hidden",list.length>0);
}

function formatDate(x){
  return new Date(x+"T00:00:00").toLocaleDateString("en-IN",{
    day:"2-digit",
    month:"short",
    year:"numeric"
  });
}

function showJob(id){
  const j=jobs.find(x=>x.id===id);

  $("modalContent").innerHTML=`
    <span class="badge ${j.type==="Private"?"private":""}">${j.type}</span>
    <h2>${j.title}</h2>
    <p><b>${j.org}</b></p>

    <ul class="detail-list">
      <li><b>Qualification:</b> ${j.qual.join(", ")}</li>
      <li><b>Location:</b> ${j.state}</li>
      <li><b>Vacancies:</b> ${j.vacancies}</li>
      <li><b>Salary:</b> ${j.salary}</li>
      <li><b>Last Date:</b> ${formatDate(j.deadline)}</li>
    </ul>

    <div class="notice">
      Important: Verify the official notification, eligibility, fees and dates before applying.
    </div>

    <br>
    <a class="apply" href="${j.apply}" target="_blank" rel="noopener">
      Visit Official Apply Website
    </a>
  `;

  $("modal").classList.remove("hidden");
}

function quick(q){
  $("searchInput").value=q;
  document.querySelector("#jobs").scrollIntoView({behavior:"smooth"});
  render();
}

document.querySelectorAll("[data-quick]").forEach(b=>
  b.addEventListener("click",()=>quick(b.dataset.quick))
);

["searchBtn","searchInput","typeFilter","qualFilter","stateFilter","sortFilter"].forEach(id=>{
  if(id==="searchInput"){
    $(id).addEventListener("keydown",e=>{
      if(e.key==="Enter") render();
    });
  }else if($(id)){
    $(id).addEventListener("click",()=>{
      if(id==="searchBtn") render();
    });
  }
});

["typeFilter","qualFilter","stateFilter","sortFilter"].forEach(id=>
  $(id).addEventListener("change",render)
);

$("resetBtn").onclick=()=>{
  ["searchInput","typeFilter","qualFilter","stateFilter"].forEach(id=>
    $(id).value=""
  );

  $("sortFilter").value="latest";
  render();
};

$("closeModal").onclick=()=>
  $("modal").classList.add("hidden");

$("modal").addEventListener("click",e=>{
  if(e.target===$("modal")){
    $("modal").classList.add("hidden");
  }
});

$("menuBtn").onclick=()=>
  $("navMenu").classList.toggle("open");

document.querySelector("#stateButtons").innerHTML=
  [...new Set(jobs.map(j=>j.state))]
  .sort()
  .map(s=>`<button onclick="quick('${s}')">${s}</button>`)
  .join("");

render();