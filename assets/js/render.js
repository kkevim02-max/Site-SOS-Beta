function esc(value){
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  })[c]);
}

function formatDate(iso){
  const d=new Date(iso+"T12:00:00");
  return {
    dia:String(d.getDate()).padStart(2,"0"),
    mes:d.toLocaleDateString("pt-BR",{month:"short"}).replace(".",""),
    ano:d.getFullYear()
  };
}

function renderCoursePage(courseId){
  const course=window.SOS_CURSOS?.[courseId];
  if(!course) return;
  document.querySelectorAll("[data-course-title]").forEach(n=>n.textContent=course.title);
  document.querySelectorAll("[data-course-description]").forEach(n=>n.textContent=course.description);
  document.querySelectorAll("[data-course-icon]").forEach(n=>n.textContent=course.icon);
  const list=document.querySelector("#lessonList");
  if(!list) return;
  list.innerHTML=course.lessons.map((lesson,index)=>`
    <article class="lesson-row reveal visible">
      <div class="lesson-number">${String(index+1).padStart(2,"0")}</div>
      <div>
        <h3>${esc(lesson[0])}</h3>
        <p>${esc(lesson[1])}</p>
      </div>
      <a class="small-btn" href="aula.html?curso=${encodeURIComponent(courseId)}&aula=${index+1}">Abrir aula</a>
    </article>
  `).join("");
  const count=document.querySelector("#lessonCount");
  if(count) count.textContent=course.lessons.length;
}


function renderVisual(visual){
  if(!visual) return '';
  const title=visual.title?`<h2>${esc(visual.title)}</h2>`:'';
  if(visual.type==='image') return `<section class="lesson-block lesson-visual">${title}<figure><img class="zoomable" src="${esc(visual.src)}" alt="${esc(visual.alt||'Apoio visual da aula')}">${visual.caption?`<figcaption>${esc(visual.caption)}</figcaption>`:''}</figure></section>`;
  if(visual.type==='gallery') return `<section class="lesson-block lesson-visual">${title}<div class="visual-gallery">${visual.images.map(i=>`<figure><img class="zoomable" src="${esc(i.src)}" alt="${esc(i.alt||'Apoio visual')}">${i.caption?`<figcaption>${esc(i.caption)}</figcaption>`:''}</figure>`).join('')}</div></section>`;
  if(visual.type==='steps') return `<section class="lesson-block lesson-visual">${title}<div class="visual-steps">${visual.items.map(i=>`<div><span>${esc(i.icon)}</span><strong>${esc(i.label)}</strong></div>`).join('')}</div></section>`;
  if(visual.type==='parts') return `<section class="lesson-block lesson-visual">${title}<div class="instrument-parts">${visual.items.map((x,i)=>`<span style="--i:${i}">${esc(x)}</span>`).join('')}<div class="instrument-shape">VIOLÃO</div></div></section>`;
  if(visual.type==='chord-table') return `<section class="lesson-block lesson-visual">${title}<div class="mini-table">${visual.items.map(x=>`<div><strong>${esc(x[0])}</strong><span>${esc(x[1])}</span></div>`).join('')}</div></section>`;
  if(visual.type==='chords') return `<section class="lesson-block lesson-visual">${title}<div class="chord-flow">${visual.chords.map(x=>`<span>${esc(x)}</span>`).join('')}</div></section>`;
  if(visual.type==='study-plan') return `<section class="lesson-block lesson-visual">${title}<div class="study-plan">${visual.items.map(x=>`<div><strong>${esc(x[0])}</strong><span>${esc(x[1])}</span></div>`).join('')}</div></section>`;
  if(visual.type==='error-table') return `<section class="lesson-block lesson-visual">${title}<div class="error-grid">${visual.items.map(x=>`<div><strong>${esc(x[0])}</strong><span>${esc(x[1])}</span></div>`).join('')}</div></section>`;
  if(visual.type==='quiz') return `<section class="lesson-block lesson-visual">${title}<div class="quiz-list">${visual.questions.map((q,i)=>`<details><summary>${i+1}. ${esc(q)}</summary><p>Responda no caderno e confira com o instrutor.</p></details>`).join('')}</div></section>`;
  if(visual.type==='checklist') return `<section class="lesson-block lesson-visual">${title}<div class="visual-checklist">${visual.items.map(x=>`<label><input type="checkbox"> ${esc(x)}</label>`).join('')}</div></section>`;
  if(visual.type==='breath') return `<section class="lesson-block lesson-visual">${title}<div class="breath-diagram"><div class="lungs">↔</div>${visual.items.map((x,i)=>`<div class="breath-step"><span>${i+1}</span>${esc(x)}</div>`).join('')}</div></section>`;
  if(visual.type==='pitch') return `<section class="lesson-block lesson-visual">${title}<div class="pitch-ladder">${visual.notes.map((x,i)=>`<span style="--step:${i}">${esc(x)}</span>`).join('')}</div></section>`;
  if(visual.type==='vowels') return `<section class="lesson-block lesson-visual">${title}<div class="vowel-row">${visual.items.map(x=>`<span>${esc(x)}</span>`).join('')}</div></section>`;
  if(visual.type==='timeline') return `<section class="lesson-block lesson-visual">${title}<div class="visual-timeline">${visual.items.map((x,i)=>`<div><span>${i+1}</span><strong>${esc(x)}</strong></div>`).join('')}</div></section>`;
  if(visual.type==='rhythm') return `<section class="lesson-block lesson-visual">${title}<div class="rhythm-grid">${visual.beats.map((x,i)=>`<div><span>${i+1}</span><strong>${esc(x)}</strong></div>`).join('')}</div></section>`;
  if(visual.type==='mic') return `<section class="lesson-block lesson-visual">${title}<div class="mic-diagram"><span class="mic-icon">🎤</span><div class="distance-line"><strong>${esc(visual.distance)}</strong></div><span class="mouth-icon">👄</span></div><ul>${visual.tips.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section>`;
  if(visual.type==='fingers') return `<section class="lesson-block lesson-visual">${title}<div class="hand-pair"><div><strong>Mão esquerda</strong><div class="finger-row">${visual.left.map(x=>`<span>${esc(x)}</span>`).join('')}</div></div><div><strong>Mão direita</strong><div class="finger-row">${visual.right.map(x=>`<span>${esc(x)}</span>`).join('')}</div></div></div></section>`;
  if(visual.type==='keyboard'){
    const white=['C','D','E','F','G','A','B','C2','D2','E2','F2','G2','A2','B2'];
    const blackAt={0:'C#',1:'D#',3:'F#',4:'G#',5:'A#',7:'C#2',8:'D#2',10:'F#2',11:'G#2',12:'A#2'};
    const labelFor=n=>{const h=visual.highlights.find(x=>x.note===n || (n.endsWith('2')&&x.note===n.slice(0,-1)));return h?.label||''};
    const active=n=>visual.highlights.some(x=>x.note===n || (n.endsWith('2')&&x.note===n.slice(0,-1)));
    return `<section class="lesson-block lesson-visual">${title}<div class="keyboard-diagram">${white.map((n,i)=>`<div class="white-key ${active(n)?'active':''}"><small>${n.replace('2','')}</small>${labelFor(n)?`<span>${esc(labelFor(n))}</span>`:''}${blackAt[i]?`<i class="black-key"></i>`:''}</div>`).join('')}</div></section>`;
  }
  if(visual.type==='bass'){
    const strings=['G','D','A','E'];
    return `<section class="lesson-block lesson-visual">${title}<div class="bass-board"><div class="fret-head"></div>${[0,1,2,3,4,5].map(f=>`<div class="fret-number">${f}</div>`).join('')}${strings.map(s=>`<div class="bass-row"><strong>${s}</strong>${[0,1,2,3,4,5].map(f=>{const d=visual.dots.find(x=>x.string===s&&x.fret===f);return `<span>${d?`<b>${esc(d.label)}</b>`:''}</span>`}).join('')}</div>`).join('')}</div></section>`;
  }
  return '';
}

function openImageLightbox(src,alt){
  let box=document.querySelector('.image-lightbox');
  if(!box){box=document.createElement('div');box.className='image-lightbox';box.innerHTML='<button aria-label="Fechar">✕</button><img alt="">';document.body.appendChild(box);box.addEventListener('click',e=>{if(e.target===box||e.target.tagName==='BUTTON')box.classList.remove('open')});}
  box.querySelector('img').src=src;box.querySelector('img').alt=alt||'';box.classList.add('open');
}

function renderLessonPage(){
  const params=new URLSearchParams(location.search);
  const courseId=params.get("curso");
  const lessonIndex=Number(params.get("aula"))-1;
  const course=window.SOS_CURSOS?.[courseId];
  const lesson=course?.lessons?.[lessonIndex];
  const shell=document.querySelector("#lessonShell");
  if(!shell) return;
  if(!course || !lesson){
    shell.innerHTML='<div class="empty">Aula não encontrada. Volte à formação musical.</div>';
    return;
  }
  document.title=`${lesson[0]} | ${course.title} | S.O.S`;
  const [title,objective,topics,practice,homework,visual]=lesson;
  shell.innerHTML=`
    <div class="lesson-page">
      <span class="kicker">${esc(course.title)} • Aula ${String(lessonIndex+1).padStart(2,"0")}</span>
      <h1 class="title">${esc(title)}</h1>
      <p class="subtitle">${esc(objective)}</p>
      <div class="lesson-meta">
        <span class="tag">Duração sugerida: 45–60 min</span>
        <span class="tag">Aula ${lessonIndex+1} de ${course.lessons.length}</span>
      </div>
      <section class="lesson-block">
        <h2>Objetivo da aula</h2>
        <p>${esc(objective)}</p>
      </section>
      <section class="lesson-block">
        <h2>Conteúdo</h2>
        <ul>${topics.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
      </section>
      ${renderVisual(visual)}
      <section class="lesson-block">
        <h2>Prática orientada</h2>
        <ul>${practice.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
      </section>
      <section class="lesson-block">
        <h2>Atividade para casa</h2>
        <p>${esc(homework)}</p>
      </section>
      <div class="info"><strong>Orientação:</strong> avance somente quando o exercício estiver confortável. A qualidade e a regularidade são mais importantes que a velocidade.</div>
      <nav class="lesson-nav">
        ${lessonIndex>0?`<a href="aula.html?curso=${courseId}&aula=${lessonIndex}">← Aula anterior</a>`:'<span></span>'}
        <a href="curso-${courseId}.html">Voltar ao curso</a>
        ${lessonIndex<course.lessons.length-1?`<a href="aula.html?curso=${courseId}&aula=${lessonIndex+2}">Próxima aula →</a>`:'<span></span>'}
      </nav>
    </div>`;
  shell.querySelectorAll('.zoomable').forEach(img=>img.addEventListener('click',()=>openImageLightbox(img.src,img.alt)));
}

function renderFolhas(){
  const list=document.querySelector("#resourceList");
  if(!list) return;
  const rows=(window.SOS_FOLHAS||[]).slice().sort((a,b)=>b.data.localeCompare(a.data));
  function draw(){
    const term=(document.querySelector("#search")?.value||"").toLowerCase();
    const cat=document.querySelector("#filter")?.value||"todos";
    const filtered=rows.filter(x=>{
      const text=`${x.titulo} ${x.tempo} ${x.descricao}`.toLowerCase();
      return text.includes(term)&&(cat==="todos"||x.categoria===cat);
    });
    list.innerHTML=filtered.length?filtered.map(x=>{
      const d=formatDate(x.data);
      const button=x.arquivo
        ?`<a class="small-btn" href="${esc(x.arquivo)}" target="_blank" rel="noopener">Abrir PDF</a>`
        :`<span class="small-btn disabled">PDF não adicionado</span>`;
      return `<article class="resource">
        <div class="resource-date"><strong>${d.dia}</strong><span>${esc(d.mes)} ${d.ano}</span></div>
        <div><h3>${esc(x.titulo)}</h3><p>${esc(x.descricao||"Folha de canto e orientações.")}</p>
        <span class="tag">${esc(x.tempo||"Celebração")}</span><span class="tag">${esc(x.categoria||"outro")}</span></div>${button}
      </article>`;
    }).join(""):'<div class="empty">Nenhuma folha encontrada.</div>';
  }
  document.querySelector("#search")?.addEventListener("input",draw);
  document.querySelector("#filter")?.addEventListener("change",draw);
  draw();
}

function renderApostilas(){
  const list=document.querySelector("#apostilaList");
  if(!list) return;
  list.innerHTML=(window.SOS_APOSTILAS||[]).map(x=>`
    <article class="card">
      <div class="icon">📘</div>
      <span class="tag">${esc(x.tipo)}</span>
      <h3>${esc(x.titulo)}</h3>
      <p>${esc(x.descricao)}</p>
      ${x.arquivo?`<a class="small-btn" href="${esc(x.arquivo)}" target="_blank" rel="noopener">Abrir PDF</a>`:`<span class="small-btn disabled">PDF em breve</span>`}
    </article>`).join("");
}
