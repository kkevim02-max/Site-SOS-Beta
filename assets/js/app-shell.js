document.addEventListener("DOMContentLoaded", () => {
  const page = location.pathname.split("/").pop() || "index.html";
  const query = location.search;

  const bottomItems = [
    { href: "index.html", label: "Início", icon: "⌂", active: page === "index.html" || page === "" },
    { href: "formacao-musical.html", label: "Aulas", icon: "♫", active: ["formacao-musical.html","curso-violao.html","curso-canto.html","curso-teclado.html","aula.html"].includes(page) },
    { href: "formacao-liturgica.html", label: "Liturgia", icon: "IHS", active: ["formacao-liturgica.html","tempos-liturgicos.html"].includes(page) },
    { href: "folhas-missa.html", label: "Folhas", icon: "▤", active: page === "folhas-missa.html" },
  ];

  const bottom = document.createElement("nav");
  bottom.className = "mobile-bottom-nav";
  bottom.setAttribute("aria-label", "Navegação rápida");
  bottom.innerHTML = bottomItems.map(item => `
    <a href="${item.href}" class="${item.active ? "active" : ""}">
      <span class="bottom-icon">${item.icon}</span>
      <span>${item.label}</span>
    </a>
  `).join("") + `
    <button type="button" class="bottom-menu-button">
      <span class="bottom-icon">☰</span>
      <span>Menu</span>
    </button>
  `;
  document.body.appendChild(bottom);

  bottom.querySelector(".bottom-menu-button")?.addEventListener("click", () => {
    document.querySelector(".nav-toggle")?.click();
  });

  const verses = [
    ["“Servi ao Senhor com alegria.”", "Salmo 100,2"],
    ["“Cantai ao Senhor um cântico novo.”", "Salmo 96,1"],
    ["“Tudo o que fizerdes, fazei para a glória de Deus.”", "1Coríntios 10,31"],
    ["“Eis-me aqui, envia-me.”", "Isaías 6,8"],
    ["“Permanecei em mim e eu permanecerei em vós.”", "João 15,4"]
  ];
  const verseNode = document.querySelector("#dailyVerse");
  const refNode = document.querySelector("#dailyVerseRef");
  if (verseNode && refNode) {
    const dayIndex = Math.floor(Date.now() / 86400000) % verses.length;
    verseNode.textContent = verses[dayIndex][0];
    refNode.textContent = verses[dayIndex][1];
  }
});
