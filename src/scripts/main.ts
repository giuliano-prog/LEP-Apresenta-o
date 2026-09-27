// Comportamentos da página: entradas na rolagem, progresso, timecode,
// seção ativa, menu no celular e ativação dos cômodos na Visão.

const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)");

// ---------- Entradas conforme a rolagem ----------

// O hero aparece logo ao carregar; o restante, quando entra na tela.
requestAnimationFrame(() => {
  document.querySelectorAll(".hero .revelar").forEach((el) => el.classList.add("visivel"));
});

const alvosEntrada = document.querySelectorAll<HTMLElement>(
  "main > section:not(.hero) .revelar, [data-planta='planta'], [data-fluxo]",
);

if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        }
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
  );
  alvosEntrada.forEach((el) => observador.observe(el));
} else {
  alvosEntrada.forEach((el) => el.classList.add("visivel"));
}

// ---------- Seção ativa no menu ----------

const links = new Map<string, HTMLAnchorElement>();
document.querySelectorAll<HTMLAnchorElement>("[data-link-secao]").forEach((a) => {
  links.set(a.dataset.linkSecao!, a);
});

if ("IntersectionObserver" in window) {
  const observadorSecao = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        const link = links.get(entrada.target.id);
        if (!link) continue;
        if (entrada.isIntersecting) {
          links.forEach((l) => l.removeAttribute("aria-current"));
          link.setAttribute("aria-current", "true");
        } else if (link.hasAttribute("aria-current")) {
          link.removeAttribute("aria-current");
        }
      }
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  links.forEach((_, id) => {
    const secao = document.getElementById(id);
    if (secao) observadorSecao.observe(secao);
  });
}

// ---------- Menu no celular ----------

const botaoMenu = document.querySelector<HTMLButtonElement>("[data-alternar-menu]");
const nav = document.querySelector<HTMLElement>("[data-nav]");

function definirMenu(aberto: boolean) {
  if (!botaoMenu || !nav) return;
  botaoMenu.setAttribute("aria-expanded", String(aberto));
  nav.toggleAttribute("data-aberto", aberto);
}

botaoMenu?.addEventListener("click", () => {
  definirMenu(botaoMenu.getAttribute("aria-expanded") !== "true");
});
nav?.addEventListener("click", (e) => {
  if ((e.target as HTMLElement).closest("a")) definirMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && botaoMenu?.getAttribute("aria-expanded") === "true") {
    definirMenu(false);
    botaoMenu.focus();
  }
});

// ---------- Progresso, timecode e cômodos da Visão ----------

const barra = document.querySelector<HTMLElement>("[data-progresso]");
const timecode = document.querySelector<HTMLElement>("[data-timecode]");
const plantaVisao = document.querySelector<HTMLElement>("[data-planta='visao']");
// De baixo para cima (da fundação para o topo), em qualquer largura de tela.
// É uma sequência visual, não uma ordem de lançamento.
const comodosVisao = plantaVisao
  ? Array.from(plantaVisao.querySelectorAll<HTMLElement>(".comodo[data-status='planejado']")).reverse()
  : [];
const totalVisao = comodosVisao.length;

const dois = (n: number) => String(n).padStart(2, "0");

// 1 pixel rolado = 1 quadro, a 24 quadros por segundo.
function formatarTimecode(quadros: number) {
  const q = quadros % 24;
  const totalSeg = Math.floor(quadros / 24);
  const s = totalSeg % 60;
  const m = Math.floor(totalSeg / 60) % 60;
  const h = Math.floor(totalSeg / 3600);
  return `${dois(h)}:${dois(m)}:${dois(s)}:${dois(q)}`;
}

function acenderComodos() {
  if (!plantaVisao) return;
  let acesos = totalVisao;
  if (!movimentoReduzido.matches) {
    const caixa = plantaVisao.getBoundingClientRect();
    const alturaTela = window.innerHeight;
    // Começa quando a planta entra na tela e termina quando sua base chega ao mesmo ponto.
    const inicio = alturaTela * 0.85;
    const progresso = (inicio - caixa.top) / Math.max(caixa.height, 1);
    acesos = Math.round(Math.min(Math.max(progresso, 0), 1) * totalVisao);
  }
  comodosVisao.forEach((comodo, i) => comodo.toggleAttribute("data-aceso", i < acesos));
}

let agendado = false;

function atualizar() {
  agendado = false;
  const rolagem = window.scrollY;
  const maximo = document.documentElement.scrollHeight - window.innerHeight;
  const progresso = maximo > 0 ? Math.min(rolagem / maximo, 1) : 0;
  barra?.style.setProperty("--progresso", progresso.toFixed(4));
  if (timecode) timecode.textContent = formatarTimecode(Math.round(rolagem));
  acenderComodos();
}

function agendar() {
  if (!agendado) {
    agendado = true;
    requestAnimationFrame(atualizar);
  }
}

window.addEventListener("scroll", agendar, { passive: true });
window.addEventListener("resize", agendar);
movimentoReduzido.addEventListener?.("change", agendar);
atualizar();
