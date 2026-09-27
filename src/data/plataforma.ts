// Conteúdo da página. Todos os textos da plataforma ficam aqui,
// para que possam ser revisados sem mexer nos componentes.

export type Status = "fundacao" | "desenvolvimento" | "planejado";

export const STATUS_LABEL: Record<Status, string> = {
  fundacao: "Fundação",
  desenvolvimento: "Em desenvolvimento",
  planejado: "Planejado",
};

export const plataforma = {
  nome: "LEP — Plataforma de Inteligência e Automação para Audiovisual",
  titulo: "Inteligência e automação para o audiovisual.",
  apoio:
    "Um núcleo compartilhado e módulos independentes para organizar a produção audiovisual.",
  status: "Plataforma em desenvolvimento",
  encerramento:
    "Uma plataforma pensada para transformar processos da produção audiovisual em fluxos mais simples, conectados e inteligentes.",
};

export const nucleo = [
  "Organização",
  "Usuários e permissões",
  "Auditoria",
  "Arquivos",
  "Custos de IA",
];

export type Modulo = {
  id: string;
  nome: string;
  status: Status;
  /** Classe de posição na planta (ver Casa.astro). */
  area?: "destaque" | "largo";
};

export const modulos: Modulo[] = [
  { id: "editais", nome: "Captação de Recursos / Editais", status: "desenvolvimento", area: "destaque" },
  { id: "projetos", nome: "Projetos", status: "planejado" },
  { id: "contratos", nome: "Contratos", status: "planejado" },
  { id: "equipe", nome: "Equipe", status: "planejado" },
  { id: "orcamentos", nome: "Orçamentos", status: "planejado" },
  { id: "prestacao", nome: "Prestação de contas", status: "planejado" },
  { id: "direitos", nome: "Direitos e clearance", status: "planejado" },
  { id: "producao", nome: "Produção", status: "planejado" },
  { id: "documentacao", nome: "Documentação", status: "planejado" },
  { id: "assistente", nome: "Assistente da LEP", status: "planejado", area: "largo" },
];

export const fluxoEditais = [
  { curto: "Monitoramento", completo: "Monitoramento de oportunidades" },
  { curto: "Cadastro", completo: "Cadastro de editais" },
  { curto: "Prazos e valores", completo: "Organização de prazos e valores" },
  { curto: "Elegibilidade", completo: "Análise de elegibilidade" },
  { curto: "Match com projetos", completo: "Match com projetos" },
];

export const secoes = [
  { id: "casa", rotulo: "A Casa" },
  { id: "modulo-atual", rotulo: "Módulo atual" },
  { id: "visao", rotulo: "Visão" },
];
