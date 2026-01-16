// === CONFIGURE AQUI (troque pelos seus dados) ===
const CONFIG = {
  nome: "Barbearia Prime",
  whatsapp: "11985995945", // ex: 55 + DDD + número (somente dígitos)
  instagram: "11985995945e",
  endereco: "Rua Exemplo, 123 — Centro, Sua Cidade",
  googleMapsQuery: "Rua Exemplo 123 Centro Sua Cidade",
  email: "11985995945",
  telefoneFormatado: "(11 )985995945"
};

// Helpers
const el = (id) => document.getElementById(id);

function buildWhatsAppLink(texto) {
  const base = "https://wa.me/" + CONFIG.whatsapp;
  const msg = encodeURIComponent(texto);
  return `${base}?text=${msg}`;
}

function setAllZapLinks() {
  const msgPadrao = `Olá! Quero agendar um horário na ${CONFIG.nome}.`;
  const link = buildWhatsAppLink(msgPadrao);

  ["btnZapTop", "btnZapHero", "btnZapPromo", "btnZapServicos", "btnZapContato", "btnZapFloat"]
    .forEach(id => el(id)?.setAttribute("href", link));
}

function setMapsLink() {
  const maps = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(CONFIG.googleMapsQuery);
  el("btnMaps")?.setAttribute("href", maps);
}

function hydrateText() {
  el("ano").textContent = new Date().getFullYear();
  el("enderecoTxt").textContent = CONFIG.endereco;
  el("enderecoCard").textContent = CONFIG.endereco;
  el("foneTxt").textContent = CONFIG.telefoneFormatado;
}

// Mobile menu
function setupMobileMenu() {
  const hamburger = el("hamburger");
  const mobileMenu = el("mobileMenu");

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener("click", () => {
    const isOpen = mobileMenu.style.display === "block";
    mobileMenu.style.display = isOpen ? "none" : "block";
    hamburger.textContent = isOpen ? "☰ Menu" : "✕ Fechar";
  });

  mobileMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mobileMenu.style.display = "none";
      hamburger.textContent = "☰ Menu";
    });
  });
}

// Form (mailto)
function setupForm() {
  const form = el("formContato");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = el("nome").value.trim();
    const tel = el("telefone").value.trim();
    const msg = el("mensagem").value.trim();

    const subject = encodeURIComponent(`Contato pelo site — ${CONFIG.nome}`);
    const body = encodeURIComponent(`Nome: ${nome}\nWhatsApp: ${tel || "-"}\n\nMensagem:\n${msg}\n`);

    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
  });
}

// Init
hydrateText();
setAllZapLinks();
setMapsLink();
setupMobileMenu();
setupForm();
