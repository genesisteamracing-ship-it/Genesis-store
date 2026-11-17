# Diretrizes de Desenvolvimento — Gênesis Store (AGENTS.md)

Este documento estabelece as regras de arquitetura, padrões de código e convenções obrigatórias para todos os agentes e desenvolvedores que atuam no repositório da **Gênesis Store**.

---

## 1. Modularidade e Princípios SOLID
* **Princípio da Responsabilidade Única (SRP):** Cada arquivo, componente, módulo ou função deve ter apenas uma única razão para mudar.
* **Proibido "God Files":** Nunca crie arquivos com centenas de linhas misturando responsabilidades (HTML, estilos e scripts juntos são estritamente proibidos).
* **Separação de Camadas:**
  - **HTML:** Exclusivo para semântica, acessibilidade (WAI-ARIA) e estrutura do DOM.
  - **CSS:** Centralizado em folhas de estilo modulares (`css/`), utilizando variáveis de design tokens (`:root`), responsividade fluida e BEM ou classes utilitárias limpas.
  - **JavaScript:** Organizado em serviços (`services/`), utilitários (`utils/`) e controladores de página, com tipagem forte (TypeScript ou JSDoc rigoroso), tratamento defensivo de erros e desacoplamento de lógica de negócio vs. manipulação de DOM.
* **Componentes Reutilizáveis:** Crie abstrações pequenas, reutilizáveis e fáceis de testar.

---

## 2. Gerenciamento de Mídias e Vídeos (Zero Heavy Assets no Git)
* **Nunca comitar arquivos de vídeo locais:** É terminantemente proibido versionar arquivos de vídeo binários (`.mp4`, `.mov`, `.avi`, `.webm` de alta resolução) no repositório Git.
* **Uso exclusivo de referências externas:** Todos os vídeos devem ser servidos via serviços especializados de streaming e hospedagem (YouTube, Vimeo, Cloudinary, AWS S3 / CDN externo) e incorporados por meio de:
  - `<iframe>` com lazy loading (`loading="lazy"`).
  - Links com thumbnail estática e acionamento em modal ou nova guia.

---

## 3. Padrão de Formato de Imagens (Apenas WEBP e SVG)
* **Proibido PNG e JPEG brutos:** Nunca adicione imagens no formato `.png` ou `.jpg`/`.jpeg` ao repositório.
* **Apenas WEBP:** Todas as imagens rasterizadas (fotos de produtos, banners, fotos de membros da equipe) devem obrigatoriamente estar no formato moderno **`.webp`**, garantindo:
  - Redução de 30% a 70% no tamanho de arquivo sem perda de qualidade visual perceptível.
  - Menor tempo de carregamento (LCP e Core Web Vitals aprimorados).
  - Suporte nativo a transparência alfa e compressão balanceada.
* **SVG para Vetores:** Ícones, logos vetoriais e ilustrações geométricas devem ser mantidos como **`.svg`** otimizados (sem metadados desnecessários do Illustrator/Figma).

---

## 4. Qualidade de Código & Tipagem
* **TypeScript / JSDoc Rigoroso:** Proibido o uso de `any`. Toda estrutura de dados (ex: `Product`, `CartItem`, `OrderPayload`) deve ser fortemente tipada.
* **Validação:** Em formulários e entradas de dados, sempre utilize validação com esquemas declarativos (como Zod) e boas práticas de acessibilidade.
* **Tratamento de Estados:** Sempre prever e tratar estados de carregamento (*loading*), erro (*error*), sucesso (*success*) e estados vazios (*empty states*).
* **Commits Semânticos:** Seguir o padrão Conventional Commits:
  - `feat:` Novas funcionalidades.
  - `fix:` Correção de bugs.
  - `refactor:` Melhoria de código sem alterar comportamento externo.
  - `perf:` Otimizações de desempenho e carregamento de assets.
  - `docs:` Alterações em documentação.
