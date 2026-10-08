/*
 * ============================================================================
 *  CONTENT — the single source of truth for every word on the site.
 *  Edit this file to update experience, projects, credentials or copy.
 *
 *  - Every user-facing text is { en: "...", pt: "..." }.
 *  - Fields named `html` (or keys listed in UI_HTML_KEYS in app.js) may hold
 *    simple inline markup like <em>; everything else is inserted as plain text.
 *  - Dates use "YYYY-MM". `end: null` means "present".
 *  - Set `visible: false` on any item to hide it without deleting it.
 * ============================================================================
 */
window.SITE = {
  config: {
    name: "James Patricio",
    fullName: "James Henrique Santana Patricio",
    url: "https://jnbdotdev.github.io/portfolio/",
    email: "contatojamesdeveloper@gmail.com",
    whatsapp: "5511957182318",
    links: {
      linkedin: "https://www.linkedin.com/in/jamespatricio/",
      github: "https://github.com/jnbdotdev",
      instagram: "https://www.instagram.com/jnbdotdev/",
      youtube: "" // paste your channel URL here to show it in Contact
    },
    defaultLang: "en", // "en" | "pt"
    autoDetectLang: false, // true = Portuguese browsers open in PT automatically
    timezone: "America/Sao_Paulo",
    careerStart: "2021-07", // used for "years in tech"
    ganttFrom: 2020 // first year on the experience chart
  },

  /* ------------------------------------------------------------------------
   *  Interface copy
   * --------------------------------------------------------------------- */
  ui: {
    en: {
      "meta.title": "James Patricio — Data Integration Analyst",
      "meta.description": "James Patricio is a Data Integration Analyst in São Paulo. He designs integration architecture, builds it in Python and SQL on Azure, tests it, secures it and uses AI as a deliberate part of the workflow.",
      "skip": "Skip to content",
      "nav.intro": "Intro",
      "nav.scope": "Scope",
      "nav.stack": "Stack",
      "nav.principles": "Principles",
      "nav.path": "Path",
      "nav.work": "Work",
      "nav.ledger": "Credentials",
      "nav.contact": "Contact",
      "nav.label": "Sections",
      "lang.label": "Language",
      "theme.wine": "Wine",
      "theme.brown": "Brown",
      "theme.day": "Day",
      "theme.even": "even day",
      "theme.odd": "odd day",
      "theme.manual": "manual",
      "theme.toggle": "Switch colour theme",
      "theme.auto": "back to the daily theme",

      "hero.name": "James Patricio · Data Integration Analyst",
      "hero.title": "I design, build, test and secure the way data <em class=\"neon-text flicker\">moves</em>.",
      "hero.lead": "At Avenues São Paulo I architect the integrations between the school's platforms, write the Python and SQL behind them, test every contract and review the code for security. AI is part of the toolkit, used where it actually helps.",
      "hero.cta.work": "See the work",
      "hero.cta.contact": "Get in touch",
      "hero.based": "Based in",
      "hero.local": "Local time",
      "hero.years": "In tech since",
      "hero.open": "Open to data engineering conversations",
      "map.caption": "Integration map",
      "map.sources": "Sources",
      "map.layer": "Integration layer",
      "map.layerSub": "python · tests · security",
      "map.core": "Azure SQL",
      "map.consumers": "Consumers",
      "map.alt": "Integration map: Veracross, Canvas and other APIs flow through an integration layer (Python, tests and security) into Azure SQL, and from there to apps, BI and AI.",
      "console.title": "pipeline.log",
      "console.tag": "today",

      "band": ["Integration architecture", "Python", "SQL", "Azure", "REST APIs", "QA", "Secure code", "AI tooling", "Data modeling", "Power Platform"],

      "scope.index": "Scope",
      "scope.title": "What the job <em>actually</em> covers.",
      "scope.lead": "Integration is the title. In practice the work runs from architecture to code, from testing to security, with AI as a working tool.",

      "stack.index": "Stack",
      "stack.title": "My stack, drawn the way data <em>moves</em>.",
      "stack.lead": "Five stages, from the system where a record is born to the app where someone uses it. These are the tools I use at each one.",
      "stack.code": "Languages",
      "stack.spoken": "Spoken",
      "stack.practice": "Practice",
      "stack.workflow": "Workflow",

      "principles.index": "Principles",
      "principles.title": "How I build data systems in <em>2026</em>.",
      "principles.lead": "Data contracts, observability and governed AI lead the conversation this year. These are the habits behind them that I apply to every integration.",

      "path.index": "Path",
      "path.title": "From the help desk to the <em>data layer</em>.",
      "path.lead": "Support, networks, hardware, then the Microsoft stack, and now data integration. Each step taught me something about where systems break.",
      "path.now": "Now",
      "path.present": "present",
      "path.months": "mo",
      "path.years": "yr",
      "path.select": "Select a row to see details",
      "path.today": "TODAY",
      "path.kind.work": "Work",
      "path.kind.edu": "Education",
      "path.kind.study": "Study",

      "work.index": "Work",
      "work.title": "Selected <em>work</em>.",
      "work.lead": "Production systems first, side projects after. Internal work is described at the level of architecture and stack, without exposing data or credentials.",
      "work.problem": "Problem",
      "work.approach": "Approach",
      "work.outcome": "Outcome",
      "work.prev": "Previous project",
      "work.next": "Next project",
      "work.repo": "View repository",
      "work.internal": "Internal system, no public link",
      "work.soon": "Launching soon",
      "work.archive": "Archive · public repositories",
      "work.of": "of",

      "ledger.index": "Credentials",
      "ledger.title": "Credentials, as a <em>query result</em>.",
      "ledger.lead": "The most recent first. Coursera credentials link to their verification pages.",
      "ledger.all": "All",
      "ledger.security": "Security",
      "ledger.data": "Data",
      "ledger.dev": "Development",
      "ledger.language": "Language",
      "ledger.col.year": "Issued",
      "ledger.col.name": "Credential",
      "ledger.col.issuer": "Issuer",
      "ledger.col.area": "Area",
      "ledger.rows": "rows",
      "ledger.verify": "verify",
      "ledger.featured": "★ featured",
      "ledger.education": "Education",

      "contact.index": "Contact",
      "contact.sign": "Got data that needs to <em class=\"neon-text\">move</em>?",
      "contact.lead": "Integrations, back-end work, QA, secure code or a second opinion on a schema. Email is the fastest way to reach me, in English or Portuguese.",
      "contact.copy": "Copy",
      "contact.copied": "Copied to clipboard",
      "contact.copyFail": "Copy failed. Select the address instead",
      "contact.email": "Email",
      "contact.linkedin": "LinkedIn",
      "contact.github": "GitHub",
      "contact.whatsapp": "WhatsApp",
      "contact.youtube": "YouTube",
      "contact.instagram": "Instagram",
      "contact.whatsappText": "Hi James! I found your portfolio and would like to talk.",

      "footer.built": "Designed and built by James Patricio. Static HTML, CSS and JavaScript on GitHub Pages, no frameworks, no trackers.",
      "footer.theme": "Today's theme:",
      "footer.source": "Source on GitHub",
      "footer.top": "Back to top",

      "noscript": "This site works best with JavaScript enabled. Contact: contatojamesdeveloper@gmail.com · linkedin.com/in/jamespatricio · github.com/jnbdotdev"
    },

    pt: {
      "meta.title": "James Patricio — Analista de Integração de Dados",
      "meta.description": "James Patricio é Analista de Integração de Dados em São Paulo. Desenha a arquitetura de integração, desenvolve em Python e SQL na Azure, testa, protege e usa IA como parte deliberada do fluxo de trabalho.",
      "skip": "Pular para o conteúdo",
      "nav.intro": "Início",
      "nav.scope": "Escopo",
      "nav.stack": "Stack",
      "nav.principles": "Princípios",
      "nav.path": "Trajetória",
      "nav.work": "Projetos",
      "nav.ledger": "Certificações",
      "nav.contact": "Contato",
      "nav.label": "Seções",
      "lang.label": "Idioma",
      "theme.wine": "Vinho",
      "theme.brown": "Marrom",
      "theme.day": "Dia",
      "theme.even": "dia par",
      "theme.odd": "dia ímpar",
      "theme.manual": "manual",
      "theme.toggle": "Trocar o tema de cores",
      "theme.auto": "voltar ao tema do dia",

      "hero.name": "James Patricio · Analista de Integração de Dados",
      "hero.title": "Desenho, construo, testo e protejo o caminho que o dado <em class=\"neon-text flicker\">percorre</em>.",
      "hero.lead": "Na Avenues São Paulo arquiteto as integrações entre as plataformas da escola, escrevo o Python e o SQL por trás delas, testo cada contrato e reviso o código com foco em segurança. A IA faz parte do ferramental, usada onde realmente ajuda.",
      "hero.cta.work": "Ver projetos",
      "hero.cta.contact": "Falar comigo",
      "hero.based": "Em",
      "hero.local": "Hora local",
      "hero.years": "Em tecnologia desde",
      "hero.open": "Aberto a conversas sobre engenharia de dados",
      "map.caption": "Mapa de integração",
      "map.sources": "Origens",
      "map.layer": "Camada de integração",
      "map.layerSub": "python · testes · segurança",
      "map.core": "Azure SQL",
      "map.consumers": "Consumo",
      "map.alt": "Mapa de integração: Veracross, Canvas e outras APIs passam por uma camada de integração (Python, testes e segurança) até o Azure SQL e, de lá, para apps, BI e IA.",
      "console.title": "pipeline.log",
      "console.tag": "hoje",

      "band": ["Arquitetura de integração", "Python", "SQL", "Azure", "APIs REST", "QA", "Código seguro", "IA como ferramenta", "Modelagem de dados", "Power Platform"],

      "scope.index": "Escopo",
      "scope.title": "O que o trabalho <em>realmente</em> envolve.",
      "scope.lead": "Integração é o nome do cargo. Na prática, o trabalho vai da arquitetura ao código, do teste à segurança, com a IA como ferramenta de trabalho.",

      "stack.index": "Stack",
      "stack.title": "Minha stack, desenhada do jeito que o dado <em>flui</em>.",
      "stack.lead": "Cinco etapas, do sistema onde o registro nasce até o app onde alguém o usa. Estas são as ferramentas que uso em cada uma.",
      "stack.code": "Linguagens",
      "stack.spoken": "Idiomas",
      "stack.practice": "Práticas",
      "stack.workflow": "Fluxo de trabalho",

      "principles.index": "Princípios",
      "principles.title": "Como construo sistemas de dados em <em>2026</em>.",
      "principles.lead": "Contratos de dados, observabilidade e IA governada lideram a conversa este ano. Estes são os hábitos por trás disso que aplico em toda integração.",

      "path.index": "Trajetória",
      "path.title": "Do suporte técnico à <em>camada de dados</em>.",
      "path.lead": "Suporte, redes, hardware, depois o ecossistema Microsoft e agora integração de dados. Cada etapa me ensinou algo sobre onde os sistemas quebram.",
      "path.now": "Agora",
      "path.present": "atual",
      "path.months": "m",
      "path.years": "a",
      "path.select": "Selecione uma linha para ver os detalhes",
      "path.today": "HOJE",
      "path.kind.work": "Trabalho",
      "path.kind.edu": "Formação",
      "path.kind.study": "Estudos",

      "work.index": "Projetos",
      "work.title": "Projetos <em>selecionados</em>.",
      "work.lead": "Primeiro os sistemas em produção, depois os projetos pessoais. Trabalhos internos aparecem no nível de arquitetura e stack, sem expor dados ou credenciais.",
      "work.problem": "Problema",
      "work.approach": "Abordagem",
      "work.outcome": "Resultado",
      "work.prev": "Projeto anterior",
      "work.next": "Próximo projeto",
      "work.repo": "Ver repositório",
      "work.internal": "Sistema interno, sem link público",
      "work.soon": "Lançamento em breve",
      "work.archive": "Arquivo · repositórios públicos",
      "work.of": "de",

      "ledger.index": "Certificações",
      "ledger.title": "Certificações, como <em>resultado de query</em>.",
      "ledger.lead": "As mais recentes primeiro. As credenciais da Coursera levam à página de verificação.",
      "ledger.all": "Todas",
      "ledger.security": "Segurança",
      "ledger.data": "Dados",
      "ledger.dev": "Desenvolvimento",
      "ledger.language": "Idioma",
      "ledger.col.year": "Emissão",
      "ledger.col.name": "Credencial",
      "ledger.col.issuer": "Emissor",
      "ledger.col.area": "Área",
      "ledger.rows": "linhas",
      "ledger.verify": "verificar",
      "ledger.featured": "★ destaque",
      "ledger.education": "Formação",

      "contact.index": "Contato",
      "contact.sign": "Tem dados que precisam <em class=\"neon-text\">fluir</em>?",
      "contact.lead": "Integrações, back-end, QA, código seguro ou uma segunda opinião sobre um schema. E-mail é o caminho mais rápido, em português ou inglês.",
      "contact.copy": "Copiar",
      "contact.copied": "Copiado para a área de transferência",
      "contact.copyFail": "Não foi possível copiar. Selecione o endereço",
      "contact.email": "E-mail",
      "contact.linkedin": "LinkedIn",
      "contact.github": "GitHub",
      "contact.whatsapp": "WhatsApp",
      "contact.youtube": "YouTube",
      "contact.instagram": "Instagram",
      "contact.whatsappText": "Olá, James! Vi seu portfolio e gostaria de conversar.",

      "footer.built": "Desenhado e construído por James Patricio. HTML, CSS e JavaScript estáticos no GitHub Pages, sem frameworks e sem rastreadores.",
      "footer.theme": "Tema de hoje:",
      "footer.source": "Código no GitHub",
      "footer.top": "Voltar ao topo",

      "noscript": "Este site funciona melhor com JavaScript ativado. Contato: contatojamesdeveloper@gmail.com · linkedin.com/in/jamespatricio · github.com/jnbdotdev"
    }
  },

  /* ------------------------------------------------------------------------
   *  Hero console lines (decorative log of the kind of work I run daily)
   * --------------------------------------------------------------------- */
  console: [
    { k: "extract", v: "veracross.api /students /enrollments", s: "200" },
    { k: "map", v: "sis.person_id → canvas.sis_user_id", s: "ok" },
    { k: "validate", v: "types · keys · lengths · tz", s: "ok" },
    { k: "upsert", v: "azure_sql.enrollments (idempotent)", s: "ok" },
    { k: "sync", v: "canvas.lms sections + users", s: "ok" },
    { k: "auth", v: "oauth2 scope: org-only", s: "ok" },
    { k: "log", v: "rotate · retain · alert", s: "ok" },
    { k: "commit", v: "github → azure deploy", s: "ok" }
  ],

  /* ------------------------------------------------------------------------
   *  Scope: the five fronts of the job
   * --------------------------------------------------------------------- */
  disciplines: [
    {
      name: { en: "Integration & data architecture", pt: "Arquitetura de integração e dados" },
      body: {
        en: "I map how records move between the SIS, the LMS and the cloud database, then design the flows, keys and contracts before writing code.",
        pt: "Mapeio como os registros transitam entre o SIS, o LMS e o banco na nuvem, e desenho fluxos, chaves e contratos antes de escrever código."
      },
      tags: ["Data mapping", "ETL / ELT", "REST APIs", "Azure SQL"]
    },
    {
      name: { en: "Development", pt: "Desenvolvimento" },
      body: {
        en: "Python services and automations, web apps in Flask or SPFx with React and TypeScript, and Power Platform apps when the problem lives inside Microsoft 365.",
        pt: "Serviços e automações em Python, apps web em Flask ou SPFx com React e TypeScript, e apps Power Platform quando o problema vive dentro do Microsoft 365."
      },
      tags: ["Python", "TypeScript", "React", "Power Apps"]
    },
    {
      name: { en: "Quality assurance", pt: "Qualidade (QA)" },
      body: {
        en: "API checks in Postman, validation queries that reconcile source and destination, and a review of every change before it reaches production.",
        pt: "Testes de API no Postman, queries de validação que reconciliam origem e destino e revisão de cada mudança antes de chegar à produção."
      },
      tags: ["Postman", { en: "Data validation", pt: "Validação de dados" }, { en: "Test cases", pt: "Casos de teste" }]
    },
    {
      name: { en: "Secure code", pt: "Código seguro" },
      body: {
        en: "Code review guided by the OWASP Top 10, least-privilege access, secrets kept out of repositories and sign-in restricted to the organization.",
        pt: "Revisão de código guiada pelo OWASP Top 10, acesso com privilégio mínimo, segredos fora dos repositórios e login restrito à organização."
      },
      tags: ["OWASP", "DevSecOps", "Zero Trust", "OAuth 2.0"]
    },
    {
      name: { en: "AI as a working tool", pt: "IA como ferramenta" },
      body: {
        en: "AI on purpose, not as decoration: a private LLM workspace for the team, AI-assisted coding and documentation with human review, and quick prototypes of internal tools.",
        pt: "IA com propósito, não como enfeite: um workspace de LLM privado para a equipe, código e documentação assistidos por IA com revisão humana e protótipos rápidos de ferramentas internas."
      },
      tags: ["LLMs", "LibreChat", { en: "Prompt design", pt: "Engenharia de prompt" }, "Human-in-the-loop"]
    }
  ],

  /* ------------------------------------------------------------------------
   *  Stack as a pipeline
   * --------------------------------------------------------------------- */
  stack: [
    {
      label: { en: "Sources", pt: "Origens" },
      title: { en: "Where records are born", pt: "Onde o registro nasce" },
      desc: {
        en: "Student information systems, LMSs and the everyday spreadsheets and lists that schools depend on.",
        pt: "Sistemas de gestão acadêmica, LMSs e as planilhas e listas do dia a dia de que uma escola depende."
      },
      tools: ["Veracross (SIS)", "Canvas LMS", "iSAMS", "SharePoint", "Excel", "Outlook Calendar", "REST APIs"]
    },
    {
      label: { en: "Ingest", pt: "Ingestão" },
      title: { en: "Pull, map, validate", pt: "Extrair, mapear, validar" },
      desc: {
        en: "Authenticated extraction, field mapping between systems and validation before anything is written.",
        pt: "Extração autenticada, mapeamento de campos entre sistemas e validação antes de qualquer escrita."
      },
      tools: ["Python", "pandas", "requests", "Postman", "Azure Data Factory", "Power Automate"]
    },
    {
      label: { en: "Store", pt: "Armazenamento" },
      title: { en: "One governed core", pt: "Um núcleo governado" },
      desc: {
        en: "Relational models with explicit keys and constraints, loaded with idempotent upserts.",
        pt: "Modelos relacionais com chaves e restrições explícitas, carregados com upserts idempotentes."
      },
      tools: ["Azure SQL Database", "SQL Server", "T-SQL", "SQLAlchemy", "pyodbc", "PostgreSQL"]
    },
    {
      label: { en: "Serve", pt: "Entrega" },
      title: { en: "Put it to work", pt: "Colocar o dado para trabalhar" },
      desc: {
        en: "Apps, reports and dashboards that staff actually open, built on the same trusted tables.",
        pt: "Apps, relatórios e dashboards que a equipe realmente usa, construídos sobre as mesmas tabelas confiáveis."
      },
      tools: ["Power Apps", "Power BI", "SSRS", "Flask", "SPFx + React", "TypeScript"]
    },
    {
      label: { en: "Run & secure", pt: "Operar e proteger" },
      title: { en: "Keep it alive and locked", pt: "Manter no ar e protegido" },
      desc: {
        en: "Containers, identity-scoped access and logs that someone will read when things go wrong.",
        pt: "Containers, acesso por identidade e logs que alguém vai ler quando algo der errado."
      },
      tools: ["Azure Container Apps", "Azure VMs", "Docker", "GitHub", "OAuth 2.0", "Caddy", "Zero Trust"]
    }
  ],

  languages: {
    code: ["Python", "SQL / T-SQL", "TypeScript", "JavaScript", "Java", "PHP"],
    spoken: [
      { en: "Portuguese · native", pt: "Português · nativo" },
      { en: "English · fluent", pt: "Inglês · fluente" }
    ],
    practice: [
      { en: "Data mapping", pt: "Mapeamento de dados" },
      { en: "ETL / ELT", pt: "ETL / ELT" },
      { en: "Integration architecture", pt: "Arquitetura de integração" },
      { en: "DevSecOps", pt: "DevSecOps" }
    ],
    workflow: ["Git", "GitHub", "Linux", "Scrum", "Kanban"]
  },

  /* ------------------------------------------------------------------------
   *  Principles (current data-architecture themes, grounded in my work)
   * --------------------------------------------------------------------- */
  principles: [
    {
      title: { en: "Contracts before pipelines", pt: "Contrato antes do pipeline" },
      body: {
        en: "Most integration bugs I have fixed were contract bugs: duplicate keys, short columns, dates that lost their timezone. Types, keys and lengths get pinned before the first row lands.",
        pt: "A maioria dos bugs de integração que corrigi era quebra de contrato: chave duplicada, coluna curta, data que perdeu o fuso. Tipos, chaves e tamanhos são fixados antes da primeira linha chegar."
      },
      proof: { en: "Veracross → Azure SQL loads", pt: "Cargas Veracross → Azure SQL" }
    },
    {
      title: { en: "Safe to run twice", pt: "Seguro rodar duas vezes" },
      body: {
        en: "A retry should never create a duplicate. Loads are idempotent upserts, so a failed run can simply run again.",
        pt: "Um retry nunca deve gerar duplicata. As cargas são upserts idempotentes, então uma execução que falhou pode simplesmente rodar de novo."
      },
      proof: { en: "SIS ↔ LMS synchronization", pt: "Sincronização SIS ↔ LMS" }
    },
    {
      title: { en: "Observable by default", pt: "Observável por padrão" },
      body: {
        en: "A failure nobody sees becomes a data-quality incident weeks later. Logs, run metadata and alerts ship with the first version.",
        pt: "Falha que ninguém vê vira incidente de qualidade semanas depois. Logs, metadados de execução e alertas entram já na primeira versão."
      },
      proof: { en: "Alerting on critical Power Automate flows", pt: "Alertas em fluxos críticos de Power Automate" }
    },
    {
      title: { en: "Security is part of the schema", pt: "Segurança faz parte do schema" },
      body: {
        en: "Least privilege and identity-bound access are design inputs. Added later, they cost more and protect less.",
        pt: "Privilégio mínimo e acesso atrelado à identidade são requisitos de design. Adicionados depois, custam mais e protegem menos."
      },
      proof: { en: "Microsoft Cybersecurity Architecture, 2026", pt: "Microsoft Cybersecurity Architecture, 2026" }
    },
    {
      title: { en: "AI-ready means governed", pt: "Pronto para IA é governado" },
      body: {
        en: "A model is only as safe as the identity rules and data beneath it. First I decide who can sign in and what it can reach.",
        pt: "Um modelo é tão seguro quanto as regras de identidade e os dados por baixo dele. Primeiro defino quem entra e o que ele alcança."
      },
      proof: { en: "Org-only internal AI workspace on Azure", pt: "Workspace de IA interno, só para a organização" }
    },
    {
      title: { en: "Model for the question", pt: "Modelar para a pergunta" },
      body: {
        en: "Star schemas to slice, wide tables for speed, and lineage drawn so the next person knows where a number came from.",
        pt: "Star schema para fatiar, tabelas largas para velocidade e linhagem desenhada para que o próximo saiba de onde veio cada número."
      },
      proof: { en: "Database modeling tool, in progress", pt: "Ferramenta de modelagem de dados, em construção" }
    }
  ],

  /* ------------------------------------------------------------------------
   *  Experience (source: LinkedIn, Oct 2026)
   *  kind: "work" | "edu" | "study"
   * --------------------------------------------------------------------- */
  experience: [
    {
      kind: "work",
      start: "2026-02",
      end: null,
      role: { en: "Data Integration Analyst", pt: "Analista de Integração de Dados" },
      org: "Avenues The World School",
      place: { en: "São Paulo · on-site · full-time", pt: "São Paulo · presencial · tempo integral" },
      bullets: [
        {
          en: "Design the integration architecture between Veracross (SIS), Canvas LMS and Azure: data mapping, ETL and the contracts between systems.",
          pt: "Desenho a arquitetura de integração entre Veracross (SIS), Canvas LMS e Azure: mapeamento de dados, ETL e os contratos entre sistemas."
        },
        {
          en: "Develop the Python services, SQL and automations behind it, deployed on Azure and versioned on GitHub.",
          pt: "Desenvolvo os serviços em Python, o SQL e as automações por trás disso, com deploy na Azure e versionamento no GitHub."
        },
        {
          en: "Handle QA and code security for the integrations: API tests in Postman, validation queries and review before release.",
          pt: "Cuido de QA e segurança do código das integrações: testes de API no Postman, queries de validação e revisão antes de cada release."
        },
        {
          en: "Bring AI into the team's workflow, including a private LLM workspace hosted on Azure.",
          pt: "Levo a IA para o fluxo de trabalho da equipe, incluindo um workspace de LLM privado hospedado na Azure."
        }
      ],
      tags: ["Integration architecture", "Python", "SQL", "Azure", "Postman", "QA", "AppSec", "AI"]
    },
    {
      kind: "work",
      start: "2025-04",
      end: "2026-02",
      role: { en: "Power Platform Developer", pt: "Desenvolvedor Power Platform" },
      org: "Computécnica Tecnologia",
      place: { en: "São Paulo · at St. Paul's School · English-only team", pt: "São Paulo · na St. Paul's School · equipe em inglês" },
      bullets: [
        {
          en: "Built SainTrips, a school-trip management app on Power Apps, Power Automate and SharePoint, integrating the iSAMS API and Excel sources.",
          pt: "Construí o SainTrips, app de gestão de viagens escolares em Power Apps, Power Automate e SharePoint, integrando a API do iSAMS e fontes em Excel."
        },
        {
          en: "Delivered a room-booking system on Outlook calendars, a new school portal on SPFx with React and TypeScript, and a Power BI dashboard for the wellbeing team.",
          pt: "Entreguei um sistema de reserva de salas sobre os calendários do Outlook, um novo portal da escola em SPFx com React e TypeScript e um dashboard em Power BI para a equipe de bem-estar."
        },
        {
          en: "Remapped and fixed critical flows and added the alerting that let the team react to failures quickly.",
          pt: "Remapeei e corrigi fluxos críticos e implementei os alertas que permitiram à equipe reagir rápido a falhas."
        }
      ],
      tags: ["Power Apps", "Power Automate", "Power BI", "SharePoint", "SPFx", "React", "SQL Server", "SSRS"]
    },
    {
      kind: "study",
      start: "2024-07",
      end: "2025-04",
      role: { en: "Focused study period", pt: "Período dedicado aos estudos" },
      org: { en: "Career transition", pt: "Transição de carreira" },
      place: { en: "São Paulo", pt: "São Paulo" },
      bullets: [
        {
          en: "After graduating, studied full-time to move from IT support into software development.",
          pt: "Depois da graduação, estudei em tempo integral para migrar do suporte de TI para o desenvolvimento de software."
        },
        {
          en: "Shipped Episode Counter v2 and its REST API (Java, Spring, PostgreSQL, Docker) and completed FIAP and Fundação Bradesco courses.",
          pt: "Publiquei o Episode Counter v2 e sua API REST (Java, Spring, PostgreSQL, Docker) e concluí cursos da FIAP e da Fundação Bradesco."
        }
      ],
      tags: ["Java", "Spring", "PostgreSQL", "Docker", "Python"]
    },
    {
      kind: "work",
      start: "2023-12",
      end: "2024-07",
      role: { en: "Lab Technician", pt: "Técnico de Laboratório" },
      org: "Simpress",
      place: { en: "Osasco · on-site", pt: "Osasco · presencial" },
      bullets: [
        {
          en: "Maintained computers, notebooks and phones for corporate clients.",
          pt: "Manutenção de computadores, notebooks e celulares de clientes corporativos."
        },
        {
          en: "Built a Power Apps tool to organize client activation keys, cutting the time for that task by about 30%.",
          pt: "Criei uma ferramenta em Power Apps para organizar chaves de ativação de clientes, reduzindo em cerca de 30% o tempo dessa tarefa."
        }
      ],
      tags: ["Power Apps", "Hardware", "Linux"]
    },
    {
      kind: "work",
      start: "2022-06",
      end: "2023-09",
      role: { en: "IT Intern", pt: "Estagiário de TI" },
      org: "Solve System Informática",
      place: { en: "São Paulo · hybrid", pt: "São Paulo · híbrido" },
      bullets: [
        {
          en: "Monitored network devices, handled small configurations and worked with clients and carriers.",
          pt: "Monitorei dispositivos de rede, fiz pequenas configurações e atendi clientes e operadoras."
        },
        {
          en: "Wrote a Python script that automated a recurring process, saving about three hours of work per day.",
          pt: "Escrevi um script em Python que automatizou um processo recorrente, economizando cerca de três horas de trabalho por dia."
        }
      ],
      tags: ["Python", "Networking", "Firewalls"]
    },
    {
      kind: "work",
      start: "2021-07",
      end: "2022-03",
      role: { en: "Technical Support Expert II", pt: "Expert em Suporte Técnico II" },
      org: "Teleperformance",
      place: { en: "São Paulo · Apple support", pt: "São Paulo · suporte Apple" },
      bullets: [
        {
          en: "Supported Apple customers and was promoted from level I to level II within months, also covering calls in English for customers worldwide.",
          pt: "Atendi clientes Apple e fui promovido do nível I para o II em poucos meses, assumindo também atendimentos em inglês para clientes de vários países."
        }
      ],
      tags: ["macOS", "iOS", "English"]
    },
    {
      kind: "edu",
      start: "2020-02",
      end: "2023-12",
      role: { en: "B.Sc. Computer Science", pt: "Bacharelado em Ciência da Computação" },
      org: "UNINOVE",
      place: { en: "São Paulo", pt: "São Paulo" },
      bullets: [
        {
          en: "Data structures, Java and OOP, SQL, REST APIs, Spring Boot, Git, Docker and Scrum, mostly through team projects.",
          pt: "Estruturas de dados, Java e POO, SQL, APIs REST, Spring Boot, Git, Docker e Scrum, principalmente em projetos em equipe."
        }
      ],
      tags: ["Java", "SQL", "Spring Boot", "Docker"]
    }
  ],

  /* ------------------------------------------------------------------------
   *  Selected work
   *  status: "live" | "internal" | "public" | "wip" | "soon"
   * --------------------------------------------------------------------- */
  work: [
    {
      id: "sis-lms",
      status: "live",
      context: { en: "Avenues · internal", pt: "Avenues · interno" },
      year: "2026",
      title: { en: "Veracross ↔ Canvas data integration", pt: "Integração de dados Veracross ↔ Canvas" },
      sub: {
        en: "The pipeline that keeps a school's student system and learning platform in agreement.",
        pt: "O pipeline que mantém o sistema acadêmico e a plataforma de ensino de uma escola em acordo."
      },
      problem: {
        en: "Two critical platforms holding the same people and courses, with no automatic way to reconcile them.",
        pt: "Duas plataformas críticas com as mesmas pessoas e cursos, sem forma automática de reconciliá-las."
      },
      approach: {
        en: "Python ETL over both REST APIs, a mapping layer and Azure SQL as the governed core, with handling for auth errors, key collisions and timezone-aware dates.",
        pt: "ETL em Python sobre as duas APIs REST, uma camada de mapeamento e Azure SQL como núcleo governado, tratando erros de autenticação, colisões de chave e datas com fuso."
      },
      outcome: {
        en: "Student, enrollment and course data moves through tested code with logs and versioned releases, replacing manual steps.",
        pt: "Dados de alunos, matrículas e cursos passam por código testado, com logs e releases versionados, no lugar de etapas manuais."
      },
      stack: ["Python", "REST APIs", "SQLAlchemy", "pyodbc", "Azure SQL", "GitHub"],
      link: null
    },
    {
      id: "ai-workspace",
      status: "internal",
      context: { en: "Avenues · internal", pt: "Avenues · interno" },
      year: "2026",
      title: { en: "Private AI workspace on Azure", pt: "Workspace de IA privado na Azure" },
      sub: {
        en: "A self-hosted LibreChat deployment for a small internal team.",
        pt: "Uma instalação self-hosted do LibreChat para uma pequena equipe interna."
      },
      problem: {
        en: "Give a small team access to LLM tools under the school's own identity and infrastructure.",
        pt: "Dar a uma pequena equipe acesso a ferramentas de LLM sob a identidade e a infraestrutura da própria escola."
      },
      approach: {
        en: "Containers on Azure (Container Apps, then a VM), Caddy as reverse proxy, an admin analytics panel and the school's own branding.",
        pt: "Containers na Azure (Container Apps, depois VM), Caddy como proxy reverso, painel administrativo de análise e a identidade visual da escola."
      },
      outcome: {
        en: "Closed an external sign-in exposure by moving OAuth to an organization-only Google Workspace project.",
        pt: "Fechei uma exposição de login externo movendo o OAuth para um projeto Google Workspace restrito à organização."
      },
      stack: ["Docker", "Azure", "Caddy", "OAuth 2.0", "LibreChat", "YAML"],
      link: null
    },
    {
      id: "enrollment-viewer",
      status: "internal",
      context: { en: "Avenues · internal", pt: "Avenues · interno" },
      year: "2026",
      title: { en: "Live enrollment viewer", pt: "Visualizador de matrículas em tempo real" },
      sub: {
        en: "A small web app that shows project-based-learning enrollments as they change.",
        pt: "Um app web enxuto que mostra as matrículas de aprendizagem por projetos conforme mudam."
      },
      problem: {
        en: "Checking enrollments meant waiting for someone to export a spreadsheet.",
        pt: "Conferir matrículas dependia de alguém exportar uma planilha."
      },
      approach: {
        en: "Flask reading directly from Azure SQL through SQLAlchemy, plus chunked XLSX exports that split large tables across sheets.",
        pt: "Flask lendo direto do Azure SQL via SQLAlchemy, além de exportações XLSX em blocos que dividem tabelas grandes entre abas."
      },
      outcome: {
        en: "One trusted screen instead of several outdated files.",
        pt: "Uma tela confiável no lugar de vários arquivos desatualizados."
      },
      stack: ["Python", "Flask", "SQLAlchemy", "pyodbc", "Azure SQL", "XLSX"],
      link: null
    },
    {
      id: "saintrips",
      status: "internal",
      context: { en: "Computécnica · St. Paul's School", pt: "Computécnica · St. Paul's School" },
      year: "2025",
      title: { en: "SainTrips and school operations apps", pt: "SainTrips e apps de operação escolar" },
      sub: {
        en: "A suite of Microsoft 365 apps for a British school in São Paulo.",
        pt: "Um conjunto de apps Microsoft 365 para uma escola britânica em São Paulo."
      },
      problem: {
        en: "Trips, room bookings and wellbeing follow-ups needed dedicated tools inside the school's Microsoft 365.",
        pt: "Viagens, reservas de salas e acompanhamento de bem-estar precisavam de ferramentas próprias dentro do Microsoft 365 da escola."
      },
      approach: {
        en: "Power Apps and Power Automate over SharePoint, integrating the iSAMS API, Excel and Outlook calendars, plus a new portal in SPFx and React.",
        pt: "Power Apps e Power Automate sobre SharePoint, integrando a API do iSAMS, Excel e calendários do Outlook, além de um novo portal em SPFx e React."
      },
      outcome: {
        en: "Trip and room data in one place, and a Power BI dashboard for the wellbeing team.",
        pt: "Dados de viagens e salas em um só lugar e um dashboard em Power BI para a equipe de bem-estar."
      },
      stack: ["Power Apps", "Power Automate", "SharePoint", "iSAMS API", "SPFx", "React", "Power BI"],
      link: null
    },
    {
      id: "modeling-tool",
      status: "wip",
      context: { en: "Personal · in progress", pt: "Pessoal · em construção" },
      year: "2026",
      title: { en: "Database modeling tool", pt: "Ferramenta de modelagem de dados" },
      sub: {
        en: "A diagramming tool built around the questions I hit while modeling the Canvas LMS API.",
        pt: "Uma ferramenta de diagramação construída a partir das dúvidas que surgiram ao modelar a API do Canvas LMS."
      },
      problem: {
        en: "Most ERD tools draw tables but say little about direction of foreign keys, derived tables or where data came from.",
        pt: "A maioria das ferramentas de ERD desenha tabelas, mas diz pouco sobre direção das FKs, tabelas derivadas ou de onde veio o dado."
      },
      approach: {
        en: "Separate visual languages for constraints and ETL lineage, with support for star schemas and one-big-table designs.",
        pt: "Linguagens visuais separadas para restrições e linhagem de ETL, com suporte a star schema e one big table."
      },
      outcome: {
        en: "Work in progress. Shared here because it shows how I think about models.",
        pt: "Em andamento. Está aqui porque mostra como penso modelos."
      },
      stack: ["Data modeling", "ERD", "Lineage", "Canvas LMS API"],
      link: null
    },
    {
      id: "adsense",
      status: "public",
      context: { en: "Personal · open source", pt: "Pessoal · open source" },
      year: "2024",
      title: { en: "Google AdSense data collector", pt: "Coletor de dados do Google AdSense" },
      sub: {
        en: "A desktop tool that scrapes AdSense revenue estimates and turns them into charts.",
        pt: "Uma ferramenta desktop que coleta estimativas de receita do AdSense e as transforma em gráficos."
      },
      problem: {
        en: "Comparing estimates across niches and regions meant copying numbers from a web calculator by hand.",
        pt: "Comparar estimativas entre nichos e regiões exigia copiar números de uma calculadora web à mão."
      },
      approach: {
        en: "Selenium automation, Tesseract OCR, pandas and Matplotlib behind a CustomTkinter interface.",
        pt: "Automação com Selenium, OCR com Tesseract, pandas e Matplotlib com interface em CustomTkinter."
      },
      outcome: {
        en: "Repeatable collection into a clean dataset, with charts ready for comparison.",
        pt: "Coleta repetível em um dataset limpo, com gráficos prontos para comparação."
      },
      stack: ["Python", "Selenium", "Tesseract", "pandas", "Matplotlib", "CustomTkinter"],
      link: "https://github.com/jnbdotdev/googleads-datacollector"
    },
    {
      id: "secure-coding",
      status: "soon",
      context: { en: "Author · course", pt: "Autor · curso" },
      year: "2026",
      title: { en: "Secure Coding: the complete course", pt: "Secure Coding: Curso Completo" },
      sub: {
        en: "A Portuguese-language course on writing code that fails safely.",
        pt: "Um curso em português sobre escrever código que falha com segurança."
      },
      problem: {
        en: "AI-assisted coding makes it faster to ship and just as fast to ship vulnerabilities.",
        pt: "Programar com IA acelera a entrega e, na mesma velocidade, a entrega de vulnerabilidades."
      },
      approach: {
        en: "Ten modules mapped to the OWASP Top 10:2025, each with a verified real-world case, built through a Python and Playwright pipeline.",
        pt: "Dez módulos alinhados ao OWASP Top 10:2025, cada um com um caso real verificado, gerados por um pipeline em Python e Playwright."
      },
      outcome: {
        en: "2026 edition written and reviewed. Publication coming soon.",
        pt: "Edição 2026 escrita e revisada. Publicação em breve."
      },
      stack: ["OWASP Top 10:2025", "AppSec", "Python", "Playwright"],
      link: null
    }
  ],

  archive: [
    {
      name: "Episode Counter API",
      year: "2024",
      stack: "Java · Spring · REST · PostgreSQL",
      desc: { en: "REST API that frees the original desktop app from the JVM so it can run on web and mobile.", pt: "API REST que tira o app desktop original da JVM para rodar na web e no celular." },
      link: "https://github.com/jnbdotdev/episodecounter-api-v2"
    },
    {
      name: "Episode Counter v2",
      year: "2024",
      stack: "Java · PostgreSQL · Docker · OOP",
      desc: { en: "Tracks where you stopped in series, anime, films and books.", pt: "Registra onde você parou em séries, animes, filmes e livros." },
      link: "https://github.com/jnbdotdev/episode-counter-v2"
    },
    {
      name: "Rede Sucata",
      year: "2023",
      stack: "PHP · SQLite · CRUD",
      desc: { en: "Online menu with full CRUD, built for an institution I worked with.", pt: "Cardápio online com CRUD completo, feito para uma instituição onde atuei." },
      link: "https://github.com/jnbdotdev/rede-sucata"
    },
    {
      name: "PotterManiacos Games",
      year: "2023",
      stack: "JavaScript · HTML · CSS",
      desc: { en: "Text-formatting tool for a Harry Potter fan community.", pt: "Ferramenta de formatação de texto para uma comunidade de fãs de Harry Potter." },
      link: "https://github.com/jnbdotdev/pottermaniacos-games-v2"
    },
    {
      name: "T.E.O.M.A: Monsmalters",
      year: "2023",
      stack: "Web · data catalog",
      desc: { en: "A catalog of characters I drew as a child, with powers, skills and weapons.", pt: "Catálogo dos personagens que desenhei na infância, com poderes, habilidades e armas." },
      link: "https://github.com/jnbdotdev/t.e.o.m.a"
    }
  ],

  /* ------------------------------------------------------------------------
   *  Credentials. area: "security" | "data" | "dev" | "language"
   * --------------------------------------------------------------------- */
  credentials: [
    { year: "2026", name: "Microsoft Cybersecurity Architecture · Professional Certificate", issuer: "Microsoft · Coursera", area: "security", featured: true, verify: "https://coursera.org/verify/professional-cert/VQREM3EEC4TJ" },
    { year: "2026", name: "Security Strategy and Compliance", issuer: "Microsoft · Coursera", area: "security", verify: "https://coursera.org/verify/WLQKPKXOTGBZ" },
    { year: "2026", name: "Identity and Zero Trust Architecture", issuer: "Microsoft · Coursera", area: "security", verify: "https://coursera.org/verify/YGU49IBCQQ6A" },
    { year: "2026", name: "Infrastructure and Network Protection", issuer: "Microsoft · Coursera", area: "security", verify: "https://coursera.org/verify/Q9H42Q2080RT" },
    { year: "2026", name: "Application and DevSecOps", issuer: "Microsoft · Coursera", area: "security", verify: "https://coursera.org/verify/PC1X0LY6GPIE" },
    { year: "2026", name: "Threat Detection and Security Engineering", issuer: "Microsoft · Coursera", area: "security", verify: "https://coursera.org/verify/5HN4ALSMOJPR" },
    { year: "2024", name: "Java Fundamentos (60 h)", issuer: "FIAP", area: "dev" },
    { year: "2024", name: "Java POO (40 h)", issuer: "Curso em Vídeo", area: "dev" },
    { year: "2024", name: { en: "Introduction to Object-Oriented Programming", pt: "Introdução à Programação Orientada a Objetos" }, issuer: "Fundação Bradesco", area: "dev" },
    { year: "2024", name: { en: "Build a Simple Website with HTML, CSS and JavaScript", pt: "Crie um Site Simples Usando HTML, CSS e JavaScript" }, issuer: "Fundação Bradesco · Microsoft", area: "dev" },
    { year: "2024", name: "Jornada Python", issuer: "Hashtag Treinamentos", area: "data" },
    { year: "2024", name: "Power Apps Completo", issuer: "Cursa", area: "data" },
    { year: "2023", name: { en: "Power BI short course", pt: "Minicurso de Power BI" }, issuer: "Xperiun", area: "data" },
    { year: "2022", name: { en: "Python for Cybersecurity · Associate", pt: "Python para Cibersegurança · Associado" }, issuer: "IBSEC", area: "security" },
    { year: "2022", name: { en: "Cloud Security · Professional", pt: "Segurança na Nuvem (Cloud Security) · Profissional" }, issuer: "IBSEC", area: "security" },
    { year: "2022", name: { en: "Cybersecurity Fundamentals", pt: "Fundamentos em Cibersegurança" }, issuer: "IBSEC", area: "security" },
    { year: "2022", name: { en: "Networking Fundamentals", pt: "Fundamentos em Redes" }, issuer: "IBSEC", area: "security" },
    { year: "2022", name: { en: "Cybersecurity Awareness", pt: "Boas Práticas de Cibersegurança" }, issuer: "IBSEC", area: "security" },
    { year: "—", name: "Master in English", issuer: "CNA", area: "language" },
    { year: "2018–21", name: { en: "Foundations: programming logic, PHP, HTML & CSS, Android, robotics", pt: "Base: lógica de programação, PHP, HTML e CSS, Android, robótica" }, issuer: "NOP · Oficina de Profissões", area: "dev" }
  ],

  education: [
    {
      when: "2020 — 2023",
      title: { en: "B.Sc. Computer Science", pt: "Bacharelado em Ciência da Computação" },
      org: "Universidade Nove de Julho (UNINOVE)",
      note: { en: "Graduated December 2023", pt: "Concluído em dezembro de 2023" }
    },
    {
      when: { en: "Languages", pt: "Idiomas" },
      title: { en: "Portuguese native, English fluent", pt: "Português nativo, inglês fluente" },
      org: "CNA · Master in English",
      note: { en: "Worked daily in an English-only team since 2025", pt: "Trabalho diário em equipe só em inglês desde 2025" }
    }
  ]
};
