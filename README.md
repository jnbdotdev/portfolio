# Portfolio v2 · James Patricio

Site estático (HTML, CSS e JavaScript puros, sem frameworks e sem build). Funciona no GitHub Pages e também abrindo o `index.html` direto no navegador, offline.

## Estrutura

```
index.html              página única (estrutura, SEO, Open Graph, JSON-LD)
404.html                página de erro do GitHub Pages
assets/css/main.css     design system, temas e todos os breakpoints
assets/js/content.js    TODO o conteúdo do site (EN e PT) — é aqui que você edita
assets/js/boot.js       aplica tema e idioma antes da primeira pintura (sem "piscar")
assets/js/app.js        renderização, tema diário, idioma, navegação e animações
assets/fonts/           Fraunces, Instrument Sans e JetBrains Mono (self-hosted, licença OFL)
assets/img/             logo, favicons por tema, ícones e og-image.png
robots.txt · sitemap.xml · site.webmanifest · .nojekyll · .gitignore
```

## Segurança

O `index.html` declara uma Content-Security-Policy: só scripts, fontes e imagens do próprio site são aceitos, e nenhum script inline roda. Se um dia você adicionar algo externo (um analytics, uma fonte do Google, um embed), inclua o domínio na meta tag `Content-Security-Policy` ou o navegador vai bloquear.

## Editando o conteúdo

Tudo que aparece no site está em `assets/js/content.js`:

- Textos de interface ficam em `ui.en` e `ui.pt`.
- Experiência, projetos, certificações, stack, princípios e escopo são listas de objetos `{ en: "...", pt: "..." }`.
- Datas usam `"AAAA-MM"`; `end: null` significa "atual". A duração e o gráfico de linha do tempo são calculados sozinhos.
- Qualquer item com `visible: false` some do site sem precisar apagar.
- O canal do YouTube aparece no Contato assim que você preencher `config.links.youtube`.

## Tema diário (vinho / marrom)

A regra roda antes da primeira pintura da página, então não existe "piscada" de cor:

- **Dia par do mês → vinho** · **dia ímpar → marrom**, pela data local de quem visita.
- Se a página ficar aberta na virada da meia-noite, o tema troca sozinho.
- O botão de tema no topo troca manualmente e guarda a escolha só naquela aba (`sessionStorage`). No rodapé aparece "voltar ao tema do dia".

### Testando offline

Abra o `index.html` (duplo clique funciona) ou rode um servidor local na pasta:

```
python3 -m http.server 8000
# http://localhost:8000
```

Parâmetros de URL para teste:

| URL | Efeito |
| --- | --- |
| `?date=2026-10-03` | simula um dia ímpar → marrom |
| `?date=2026-10-04` | simula um dia par → vinho |
| `?theme=brown` / `?theme=wine` | força o tema |
| `?theme=auto` | limpa a escolha manual |
| `?lang=pt` / `?lang=en` | força o idioma |

Também há atalhos no console do navegador: `portfolio.simulateDay(3)`, `portfolio.setTheme("wine")`, `portfolio.autoTheme()`, `portfolio.setLang("pt")`.

## Idioma

Inglês por padrão, com botão EN/PT. A escolha fica salva no navegador. Para abrir automaticamente em português para quem usa navegador em PT, mude `autoDetectLang` para `true` em `content.js` **e** `data-lang-auto="true"` na tag `<html>` do `index.html`.

## Responsividade

A estrutura muda por faixa de tela, não só reorganiza blocos:

- **Celulares (até 839 px):** sobrenome vertical na lateral do hero, navegação em dock inferior (alcance do polegar), barra de progresso horizontal no topo, timeline vertical, projetos em carrossel com snap, certificações em formato de registro. Respeita notch e home indicator (`safe-area`).
- **Tablets (840 a 1099 px):** navegação no topo, hero em três colunas com o mapa de integração.
- **Notebooks e monitores (1100 px ou mais):** trilho vertical fixo à esquerda com progresso em luz neon, pipeline horizontal, experiência em gráfico de Gantt interativo.
- **Monitores de 24" a 32" (1920 a 3840 px):** a escala tipográfica cresce junto com a tela e o conteúdo ganha largura máxima maior, para não ficar minúsculo em 4K.
- Telas baixas (MacBook Air, janelas de 720 px de altura) e celular deitado têm ajustes próprios.

Acessibilidade: contraste AA nos dois temas (auditado com axe-core, zero violações), navegação por teclado com foco visível, link "pular para o conteúdo", `prefers-reduced-motion` desliga flicker, pulsos e marquee, e `prefers-contrast` reforça as linhas.

## Publicando no GitHub Pages

1. O repositório precisa ter estes arquivos na raiz (o `index.html` na raiz do branch publicado).
2. Em *Settings → Pages*: *Deploy from a branch*, branch `main`, pasta `/ (root)`.
3. O endereço fica `https://jnbdotdev.github.io/portfolio/`. Se o repositório tiver outro nome, atualize as URLs absolutas em `index.html` (canonical e Open Graph), `404.html`, `robots.txt` e `sitemap.xml`.
4. Para atualizar depois: edite, faça commit e push. O GitHub republica sozinho em um ou dois minutos.
