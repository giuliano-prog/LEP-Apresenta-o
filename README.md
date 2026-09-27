# LEP — Plataforma de Inteligência e Automação para Audiovisual

Página institucional de apresentação da Plataforma LEP: a "casa digital" da LEP,
com um núcleo compartilhado e módulos independentes construídos progressivamente.

Projeto independente. Não usa banco de dados, autenticação, APIs ou arquivos de
outros repositórios da LEP.

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera o site estático em dist/
npm run preview  # serve o dist/ gerado
```

## Estrutura

```
src/
  data/plataforma.ts      # todos os textos, módulos, núcleo e fluxo de Editais
  data/lep-mark-path.ts   # símbolo LEP vetorizado a partir do logo oficial
  components/             # Header, Hero, Casa (planta), ModuloAtual, Visao, Encerramento
  layouts/Base.astro      # <head>, fontes e script
  styles/global.css       # paleta, tipografia e layout
  scripts/main.ts         # animações de rolagem, menu, progresso e timecode
public/
  favicon.svg
  brand/lep-filmes-logo.webp  # logo original (referência)
```

Para mudar textos ou o status de um módulo, edite apenas `src/data/plataforma.ts`.

## Identidade

- Paleta: preto `#111110`, creme `#F3F0EA`, areia `#D2C3AF`, laranja do site `#E55B2E`, laranja do logo `#F79633`.
- Tipografia (hospedada no próprio site, sem serviços externos): DM Serif Display (títulos), Manrope (texto), JetBrains Mono (rótulos técnicos).
- Laranja reservado ao que está vivo: o módulo em desenvolvimento, o ponto "REC" e os estados ativos.
- Animações respeitam `prefers-reduced-motion`.

## Publicação

Site estático (`dist/`), compatível com Vercel, Netlify ou GitHub Pages sem configuração adicional.
