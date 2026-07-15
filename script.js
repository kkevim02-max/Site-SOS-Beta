const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const menuBtn = $("#menuBtn");
const mainNav = $("#mainNav");
if (menuBtn && mainNav) {
  menuBtn.addEventListener("click", () => mainNav.classList.toggle("open"));
  $$("a", mainNav).forEach(link => link.addEventListener("click", () => mainNav.classList.remove("open")));
}

const themeBtn = $("#themeBtn");
const savedTheme = localStorage.getItem("fe-theme");
if (savedTheme === "dark") document.body.classList.add("dark");
if (themeBtn) {
  themeBtn.textContent = document.body.classList.contains("dark") ? "☀" : "◐";
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");
    localStorage.setItem("fe-theme", dark ? "dark" : "light");
    themeBtn.textContent = dark ? "☀" : "◐";
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });
$$(".reveal").forEach(el => observer.observe(el));

const studyPages = ["igreja", "terco", "castidade", "vocacao", "oracoes"];
const getCompleted = () => {
  try { return JSON.parse(localStorage.getItem("fe-completed") || "[]"); }
  catch { return []; }
};
const saveCompleted = value => localStorage.setItem("fe-completed", JSON.stringify(value));

function updateStudyProgress() {
  const completed = getCompleted();
  const count = completed.filter(item => studyPages.includes(item)).length;
  const percent = (count / studyPages.length) * 100;
  const bar = $("#studyBar");
  const label = $("#studyCount");
  if (bar) bar.style.width = `${percent}%`;
  if (label) label.textContent = `${count}/${studyPages.length} concluídos`;

  $$(".complete-btn").forEach(btn => {
    const key = btn.dataset.complete;
    const done = completed.includes(key);
    btn.classList.toggle("completed", done);
    btn.textContent = done ? "✓ Parte concluída" : "Marcar como estudado";
  });
}
updateStudyProgress();

$$(".complete-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.complete;
    let completed = getCompleted();
    completed = completed.includes(key)
      ? completed.filter(item => item !== key)
      : [...completed, key];
    saveCompleted(completed);
    updateStudyProgress();
  });
});

$$(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".tab-btn").forEach(item => item.classList.remove("active"));
    $$(".tab-panel").forEach(item => item.classList.remove("active"));
    btn.classList.add("active");
    const panel = document.getElementById(btn.dataset.tab);
    if (panel) panel.classList.add("active");
  });
});

const challengeBoxes = $$("[data-challenge]");
function updateChallenge() {
  const completed = challengeBoxes.filter(box => box.checked).length;
  const bar = $("#challengeBar");
  if (bar) bar.style.width = `${(completed / Math.max(challengeBoxes.length, 1)) * 100}%`;
}
challengeBoxes.forEach(box => {
  const key = `challenge-${box.dataset.challenge}`;
  box.checked = localStorage.getItem(key) === "1";
  box.addEventListener("change", () => {
    localStorage.setItem(key, box.checked ? "1" : "0");
    updateChallenge();
  });
});
updateChallenge();

const prayerModeBtn = $("#prayerModeBtn");
if (prayerModeBtn) {
  prayerModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("prayer-mode");
    prayerModeBtn.textContent = document.body.classList.contains("prayer-mode")
      ? "Sair do modo oração"
      : "Ativar modo oração";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const openAllBtn = $("#openAllBtn");
if (openAllBtn) {
  let open = false;
  openAllBtn.addEventListener("click", () => {
    open = !open;
    $$(".prayer-list details").forEach(item => item.open = open);
    openAllBtn.textContent = open ? "Fechar todas" : "Abrir todas";
  });
}
