// ─────────────────────────────────────────────────────────────────────────────
// translations.ts
// All website text in one place. Switch language by passing lang = "en" | "tc"
// To add or edit text, change the values below — no code logic needs to change.
// ─────────────────────────────────────────────────────────────────────────────

export type Lang = "en" | "tc";

export const t = {
  // ── Navigation ──────────────────────────────────────────────────────────────
  nav: {
    home:     { en: "Home",     tc: "主頁" },
    about:    { en: "About",    tc: "關於我們" },
    projects: { en: "Projects", tc: "項目" },
    services: { en: "Services", tc: "服務" },
    demos:    { en: "Products", tc: "產品" },
    contact:  { en: "Contact",  tc: "聯絡我們" },
    back:     { en: "← Back to Home", tc: "← 返回主頁" },
  },

  // ── Home page — short intro + quick links out to each section page ──────────
  home: {
    intro: {
      en: "Explore what we do, how we've helped clients, and how to reach us.",
      tc: "探索我們的服務範疇、過往成功案例，以及聯絡方式。",
    },
    links: {
      about:    { en: "Learn about our team, mission, and track record.",  tc: "了解我們的團隊、使命及往績。" },
      services: { en: "See the five solutions we design and deliver.",     tc: "了解我們設計及交付的五大方案。" },
      projects: { en: "Browse case studies from real client engagements.", tc: "瀏覽真實客戶項目的個案研究。" },
      contact:  { en: "Get in touch to start a conversation.",             tc: "聯絡我們，開展合作對話。" },
    },
  },

  // ── Hero Section ─────────────────────────────────────────────────────────────
  hero: {
    // The home page <h1>: says what the firm is and where, for search.
    tagline: {
      en: "AI and engineering solutions for Hong Kong industry",
      tc: "香港工業 AI 及工程解決方案",
    },
    sub: {
      en: "3form designs and delivers AI and data systems, agentic AI, turnkey engineering, industrial layout and product design for manufacturers in Hong Kong and the Greater Bay Area.",
      tc: "3form 為香港及大灣區製造商設計及交付 AI 及數據系統、Agentic AI、一站式工程、工業佈局及產品設計。",
    },
    cta:  { en: "Explore Our Services", tc: "探索我們的服務" },
    cta2: { en: "Get in Touch",         tc: "立即聯絡" },
  },

  // ── About Section ────────────────────────────────────────────────────────────
  about: {
    heading: { en: "About 3form Engineering Co", tc: "關於 3form Engineering Co" },
    company_body: {
      en: "3form Engineering Co is a Hong Kong–based engineering and AI solutions company. We design and deliver AI and data systems, agentic AI, turnkey engineering, industrial layout and product design for manufacturers in Hong Kong and the Greater Bay Area — one team from first diagnosis to a working result.",
      tc: "3form Engineering Co 是一家總部位於香港的工程及 AI 解決方案公司。我們為香港及大灣區製造商設計及交付 AI 及數據系統、Agentic AI、一站式工程、工業佈局及產品設計，由診斷到成果落地，全程由同一團隊負責。",
    },
    stat1_num:   "6+",
    stat1_label: { en: "Years of Experience", tc: "年豐富經驗" },
    stat2_num:   "50+",
    stat2_label: { en: "Projects Completed",  tc: "完成項目" },
    stat3_num:   "30+",
    stat3_label: { en: "Clients Served",      tc: "服務客戶" },

    // ── Founder bio — sourced from Edward's LinkedIn profile ─────────────────
    founder: {
      name:  "Edward Fong",
      photoUrl: "/team/edward-fong.png",
      title: {
        en: "Founder",
        tc: "創辦人",
      },
      bio_p1: {
        en: "Edward is a Mechanical Engineer with over three years at the Hong Kong Productivity Council (HKPC), where he currently serves as Senior Consultant — Smart Machinery and Equipment. His work spans IoT 4.0 and warehouse management system (WMS) development, AI-driven computer vision inspection, and advanced plastic and composite processing — supporting Hong Kong manufacturers through government funding applications and schemes such as the New Industrialisation and Technology Training Programme (NITTP) and the Cash Rebate Scheme (CRS).",
        tc: "Edward 是一名機械工程師，在香港生產力促進局（HKPC）工作超過三年，現任智能機械及設備高級顧問。他的工作範疇包括物聯網4.0及倉庫管理系統（WMS）開發、人工智能機器視覺檢測，以及先進塑膠及複合材料製程，並透過政府資助申請，以及新型工業化及科技培訓計劃（NITTP）、現金回贈計劃（CRS）等計劃，協助香港製造商發展升級。",
      },
      bio_p2: {
        en: "He holds a Bachelor of Engineering and a Master of Science in Mechanical Engineering from the University of Hong Kong, and is an Associate Member of the Institution of Mechanical Engineers (IMechE), Hong Kong Branch. Edward previously developed a patented machine vision inspection system for automotive parts, and led an automated retail store project applying end-to-end automation to offline retail operations. He now channels this hands-on engineering and funding expertise into 3form Co, helping Hong Kong businesses modernise their operations and access the resources to grow.",
        tc: "他於香港大學取得機械工程學士及理學碩士學位，同時為英國機械工程師學會（IMechE）香港分會準會員。Edward 曾研發一套獲專利的汽車零件裝飾表面機器視覺檢測系統，並曾主導一個全自動零售店項目，將端對端自動化技術應用於線下零售營運。現時，他將這些扎實的工程及資助申請經驗帶到 3form Co，協助香港企業提升營運及爭取發展資源。",
      },
      // Key credential tags shown as pills under his name
      credentials: [
        { en: "IMechE Associate Member (HK Branch)",             tc: "IMechE 香港分會準會員" },
        { en: "BEng & MSc, Mechanical Engineering (HKU)",        tc: "香港大學機械工程學士及碩士" },
        { en: "Patent Holder — Machine Vision Inspection System", tc: "機器視覺檢測系統專利發明人" },
      ],
    },

    // ── Engagement roadmap — the four stages of a typical engagement (Edward,
    // 2026-10-13): Diagnose, Design, Deliver, Support. Funding is no longer a
    // step; it is offered as support alongside (see services.fundingNote).
    roadmap: {
      heading: { en: "How We Work", tc: "我們的工作方式" },
      sub: {
        en: "One company, one team, from first diagnosis to support after handover — no handoff between separate vendors.",
        tc: "一家公司，一個團隊，由診斷到交付後支援一站式完成，毋須在不同供應商之間轉手。",
      },
      steps: [
        {
          title: { en: "Diagnose", tc: "診斷評估" },
          desc: {
            en: "We visit your site, study the problem and agree what the finished result must do.",
            tc: "我們實地了解問題，並與您確定成果須達到的要求。",
          },
        },
        {
          title: { en: "Design", tc: "方案設計" },
          desc: {
            en: "We design the solution: the system, the layout, the product or the AI that fits.",
            tc: "我們設計合適的方案，包括系統、佈局、產品或 AI。",
          },
        },
        {
          title: { en: "Deliver", tc: "項目交付" },
          desc: {
            en: "We build it, install it and commission it, with compliance support where the project needs it.",
            tc: "我們負責建造、安裝及調試，並在項目需要時提供合規支援。",
          },
        },
        {
          title: { en: "Support", tc: "持續支援" },
          desc: {
            en: "We stay on after handover to keep it working and improve it.",
            tc: "交付後我們繼續跟進，確保運作暢順並持續改善。",
          },
        },
      ],
    },
  },

  // ── Services Section ─────────────────────────────────────────────────────────
  services: {
    heading: { en: "Our Services", tc: "我們的服務" },
    sub: {
      en: "Five solutions we design and deliver for manufacturers in Hong Kong and the Greater Bay Area.",
      tc: "我們為香港及大灣區製造商設計及交付的五大方案。",
    },
    // The five solutions (Edward, 2026-10-13). Each is a card on the Services
    // page linking to its own page; `related` lists the earlier services now
    // grouped under it (page keys from src/routes.ts). `icon` is a file in
    // public/services. Funding is not a pillar: see fundingNote below.
    items: [
      {
        id: 1,
        page: "aiDataAdoption",
        icon: "icon-03.webp",
        title:  { en: "AI & Data Solutions",                               tc: "AI 及數據方案" },
        detail: {
          en: "AI tools, data pipelines and dashboards that turn raw production data into decisions you can act on.",
          tc: "以 AI 工具、數據流程及儀表板，將原始生產數據轉化為可行的決策。",
        },
        related: [] as string[],
      },
      {
        id: 2,
        page: "industrialAgents",
        icon: "icon-09.webp",
        title:  { en: "Agentic AI Solutions",                              tc: "Agentic AI 智能代理方案" },
        detail: {
          en: "AI agents that work on real plant data — reading sensor streams, documents and inspection results to automate the routine decisions your operations team repeats every day.",
          tc: "能處理真實廠房數據的 AI 智能代理，讀取感測器數據、文件及檢測結果，將營運團隊每日重複的例行決策自動化。",
        },
        related: [] as string[],
      },
      {
        id: 3,
        page: "engineeringTurnkey",
        icon: "icon-07.webp",
        title:  { en: "Engineering Turnkey",                               tc: "一站式工程方案" },
        detail: {
          en: "One team from diagnosis to a working result: production lines and automation, machine vision inspection stations, production site setup, and software and IoT systems.",
          tc: "由診斷到成果落地，全程由同一團隊負責：生產線及自動化、機器視覺檢測站、生產場地設立，以及軟件及物聯網系統。",
        },
        related: ["productionSetup", "warehouseSystem", "equipmentMaintenance"],
      },
      {
        id: 4,
        page: "industrialLayout",
        icon: "icon-10.webp",
        title:  { en: "Industrial Layout",                                 tc: "工業佈局規劃" },
        detail: {
          en: "Production line and warehouse layout, whole-site planning, and the building services that go with it.",
          tc: "生產線及倉庫佈局、整體廠房規劃，以及相關的屋宇裝備規劃。",
        },
        related: ["processEnhancement", "facilityMaintenance"],
      },
      {
        id: 5,
        page: "productDesign",
        icon: "icon-11.webp",
        title:  { en: "Product Design",                                    tc: "產品設計" },
        detail: {
          en: "Mechanical design and CAD, design for manufacturing, prototyping, and materials and process selection.",
          tc: "機械設計及 CAD、可製造性設計、原型製作，以及物料及製程選擇。",
        },
        related: ["onCallAdvisory"],
      },
    ],
    cardLink:     { en: "Full details →", tc: "查看詳情 →" },
    relatedLabel: { en: "Also in this area", tc: "相關服務" },
    // Shown on every service page and under the How We Work steps. Funding is
    // support for a project, not a service of its own (Edward, 2026-10-13).
    fundingNote: {
      en: "Funding support is available: where a project qualifies for a government funding scheme, we prepare the application as part of the work.",
      tc: "可提供資助支援：如項目符合政府資助計劃的資格，我們會在項目中一併準備申請。",
    },
    // ── CTA block at the bottom of the Services page ─────────────────────────
    cta: {
      heading: { en: "Ready to get started?", tc: "準備好開始了嗎？" },
      sub: {
        en: "Request a demo of our tools, or ask for a quotation on your project — we'll get back to you within one business day.",
        tc: "查詢我們工具的示範，或為您的項目索取報價 — 我們將在一個工作天內回覆您。",
      },
      button: { en: "Request a Demo / Quotation", tc: "查詢示範／報價" },
    },

    // ── On-Call Engineering Advisory landing page (/services/on-call-engineering-advisory/).
    // A retainer, from Edward's answers on 2026-10-12: on call and mostly
    // remote, visiting site when needed; four work areas; a fixed monthly fee
    // agreed after a first meeting; three-month minimum. No prices, response
    // times or client examples have been given — do not add any.
    onCallAdvisoryPage: {
      label: { en: "On-Call Engineering Advisory", tc: "隨時支援工程顧問服務" },
      heading: {
        en: "On-call engineering advisory for product design and manufacturing in Hong Kong",
        tc: "香港產品設計及製造業隨時支援工程顧問",
      },
      intro: {
        en: "Keep an engineering advisor on call for a fixed monthly fee. 3form supports your team by phone, WhatsApp and video call during office hours, and visits your site when the work needs it.",
        tc: "以固定月費，讓工程顧問隨時候命。3form 於辦公時間內透過電話、WhatsApp 及視像通話支援您的團隊，並在工作有需要時到場。",
      },
      audienceHeading: { en: "Who we work with", tc: "服務對象" },
      audiences: [
        {
          title: { en: "Hong Kong product design and manufacturing companies", tc: "香港產品設計及製造企業" },
          body: {
            en: "You design or make products and need engineering judgement regularly, but not a full-time senior engineer on the payroll. We act as your standing advisor.",
            tc: "您從事產品設計或製造，經常需要工程專業判斷，但未必需要聘請全職資深工程師。我們擔任您的常設顧問。",
          },
        },
      ],
      coverage: {
        heading: { en: "What the retainer covers", tc: "服務涵蓋範圍" },
        items: [
          {
            title: { en: "Product design support", tc: "產品設計支援" },
            body: {
              en: "Design reviews, design-for-manufacturing advice, material and process selection, and guidance on prototyping.",
              tc: "設計評審、可製造性設計建議、物料及製程選擇，以及原型製作指導。",
            },
          },
          {
            title: { en: "Manufacturing engineering", tc: "製造工程" },
            body: {
              en: "Production line and process problems, Lean and Six Sigma improvement, quality and inspection.",
              tc: "生產線及製程問題、精益及六西格瑪改善、品質及檢測。",
            },
          },
          {
            title: { en: "Supplier and factory liaison", tc: "供應商及工廠聯絡" },
            body: {
              en: "Technical checks, sampling and quality follow-up with your factories in the Greater Bay Area or overseas, on your behalf.",
              tc: "代您與大灣區或海外的工廠跟進技術審核、樣辦及品質事宜。",
            },
          },
          {
            title: { en: "Funding and technology advice", tc: "資助及技術建議" },
            body: {
              en: "Ongoing advice on funding applications, AI and automation adoption, and equipment choices.",
              tc: "就資助申請、人工智能及自動化應用，以及設備選擇提供持續建議。",
            },
          },
        ],
      },
      stepsHeading: { en: "How the retainer works", tc: "服務如何運作" },
      steps: [
        {
          title: { en: "First meeting", tc: "首次會面" },
          body: {
            en: "We learn your products, your team and where you need support, then agree the scope and a fixed monthly fee.",
            tc: "我們了解您的產品、團隊及需要支援的範疇，然後議定服務範圍及固定月費。",
          },
        },
        {
          title: { en: "On call each month", tc: "每月隨時支援" },
          body: {
            en: "Your team contacts us by phone, WhatsApp or video call during office hours, Monday to Friday, 09:00 to 18:00. We visit your site when the work needs it.",
            tc: "您的團隊可於辦公時間（星期一至五，09:00 至 18:00）透過電話、WhatsApp 或視像通話聯絡我們。工作有需要時，我們會到場支援。",
          },
        },
        {
          title: { en: "Minimum three months", tc: "最短服務期三個月" },
          body: {
            en: "The retainer runs for a minimum of three months, so we have time to learn your products and follow issues through.",
            tc: "服務期最短為三個月，讓我們有足夠時間了解您的產品，並把問題跟進到底。",
          },
        },
      ],
      ctaHeading: { en: "Need an engineer on call?", tc: "需要工程顧問隨時候命？" },
      ctaBody: {
        en: "Tell us what you design or make and where you need support. We reply within one business day.",
        tc: "告訴我們您設計或生產的產品，以及需要支援的範疇，我們會於一個工作天內回覆。",
      },
      ctaButton: { en: "Contact us", tc: "聯絡我們" },
      cardLink: { en: "Full on-call advisory details →", tc: "查看隨時支援顧問詳情 →" },
    },
    // ── Engineering Turnkey landing page (/services/engineering-turnkey/).
    // One of the five solutions (Edward, 2026-10-13). The "what we deliver"
    // items restate what he confirmed 3form does; no prices, clients or
    // results have been given — do not add any.
    engineeringTurnkeyPage: {
      label: { en: "Engineering Turnkey", tc: "一站式工程方案" },
      heading: {
        en: "Turnkey engineering for factories in Hong Kong",
        tc: "香港工廠一站式工程方案",
      },
      intro: {
        en: "3form takes an engineering project from first diagnosis to a working result. We design it, source it, install it and commission it, so you deal with one team instead of several vendors.",
        tc: "3form 由診斷開始，把工程項目一直做到成果落地。我們負責設計、採購、安裝及調試，讓您只需面對一個團隊，毋須周旋於多個供應商之間。",
      },
      audienceHeading: { en: "Who we work with", tc: "服務對象" },
      audiences: [
        {
          title: { en: "Hong Kong and Greater Bay Area manufacturers", tc: "香港及大灣區製造商" },
          body: {
            en: "You run manufacturing or production in Hong Kong or the Greater Bay Area and want one team to take a project from diagnosis to a working result.",
            tc: "您在香港或大灣區從事製造或生產，並希望由同一團隊把項目由診斷做到成果落地。",
          },
        },
      ],
      coverage: {
        heading: { en: "What we deliver", tc: "交付範圍" },
        items: [
          {
            title: { en: "Production lines and automation", tc: "生產線及自動化" },
            body: {
              en: "Design, sourcing, installation and commissioning of production lines and automated equipment.",
              tc: "生產線及自動化設備的設計、採購、安裝及調試。",
            },
          },
          {
            title: { en: "Machine vision inspection stations", tc: "機器視覺檢測站" },
            body: {
              en: "Complete inspection stations: camera, lighting, software and integration with your line.",
              tc: "完整的檢測站：相機、燈光、軟件，以及與生產線的整合。",
            },
          },
          {
            title: { en: "Production site setup", tc: "生產場地設立" },
            body: {
              en: "Setting up a whole production site, including licensing and HACCP or GMP systems.",
              tc: "設立整個生產場地，包括牌照申請及 HACCP 或 GMP 系統。",
            },
          },
          {
            title: { en: "Software and IoT systems", tc: "軟件及物聯網系統" },
            body: {
              en: "Warehouse systems, dashboards, sensors and data systems, installed and running.",
              tc: "倉庫系統、儀表板、感測器及數據系統，安裝妥當並投入運作。",
            },
          },
        ],
      },
      stepsHeading: { en: "How we work", tc: "工作流程" },
      steps: [
        {
          title: { en: "Diagnose", tc: "診斷評估" },
          body: {
            en: "We visit your site, review the problem and agree what the finished result must do.",
            tc: "我們實地了解問題，並與您確定成果須達到的要求。",
          },
        },
        {
          title: { en: "Design", tc: "方案設計" },
          body: {
            en: "We design the solution and specify the equipment and software.",
            tc: "我們設計方案，並訂明所需的設備及軟件。",
          },
        },
        {
          title: { en: "Deliver", tc: "項目交付" },
          body: {
            en: "We source, install and commission it on your site.",
            tc: "我們負責採購，並在您的場地安裝及調試。",
          },
        },
        {
          title: { en: "Support", tc: "持續支援" },
          body: {
            en: "We stay on after handover to keep it running.",
            tc: "交付後我們繼續跟進，確保運作暢順。",
          },
        },
      ],
      ctaHeading: { en: "Planning an engineering project?", tc: "正在籌劃工程項目？" },
      ctaBody: {
        en: "Tell us what you want built and where. We reply within one business day.",
        tc: "告訴我們您想建立的項目及地點，我們會於一個工作天內回覆。",
      },
      ctaButton: { en: "Contact us", tc: "聯絡我們" },
      cardLink: { en: "Full engineering turnkey details →", tc: "查看一站式工程詳情 →" },
    },
    // ── Industrial Layout landing page (/services/industrial-layout/).
    // One of the five solutions (Edward, 2026-10-13). The "what we deliver"
    // items restate what he confirmed 3form does; no prices, clients or
    // results have been given — do not add any.
    industrialLayoutPage: {
      label: { en: "Industrial Layout", tc: "工業佈局規劃" },
      heading: {
        en: "Industrial layout planning for factories and warehouses in Hong Kong",
        tc: "香港工廠及倉庫工業佈局規劃",
      },
      intro: {
        en: "3form plans how your factory or warehouse is arranged, so materials, people and equipment flow well, from a single production line to a whole site.",
        tc: "3form 為您規劃工廠或倉庫的佈局，令物料、人員及設備流轉暢順，範圍由單一生產線到整個廠房。",
      },
      audienceHeading: { en: "Who we work with", tc: "服務對象" },
      audiences: [
        {
          title: { en: "Hong Kong and Greater Bay Area manufacturers", tc: "香港及大灣區製造商" },
          body: {
            en: "You run manufacturing, production or warehousing in Hong Kong or the Greater Bay Area and are setting up, moving or rearranging a site.",
            tc: "您在香港或大灣區從事製造、生產或倉儲，並正在設立、搬遷或重新佈置場地。",
          },
        },
      ],
      coverage: {
        heading: { en: "What we plan", tc: "規劃範圍" },
        items: [
          {
            title: { en: "Production line layout", tc: "生產線佈局" },
            body: {
              en: "Arranging machines and workstations so materials flow well, including first-in-first-out (FIFO).",
              tc: "安排機器及工作站的位置，令物料流轉暢順，包括先進先出（FIFO）。",
            },
          },
          {
            title: { en: "Warehouse layout", tc: "倉庫佈局" },
            body: {
              en: "Racking, zones and picking routes for your warehouse.",
              tc: "倉庫的貨架、分區及揀貨路線。",
            },
          },
          {
            title: { en: "Whole factory or site planning", tc: "整體廠房或場地規劃" },
            body: {
              en: "Planning a new or relocated site: space, utilities and compliance zones.",
              tc: "為新設或搬遷的場地作規劃：空間、公用設施及合規分區。",
            },
          },
          {
            title: { en: "Building services for the site", tc: "場地屋宇裝備" },
            body: {
              en: "Air-conditioning, ventilation and electrical planning tied to the layout.",
              tc: "配合佈局的冷氣、通風及電力規劃。",
            },
          },
        ],
      },
      stepsHeading: { en: "How we work", tc: "工作流程" },
      steps: [
        {
          title: { en: "Diagnose", tc: "診斷評估" },
          body: {
            en: "We walk your site and study how materials and people move today.",
            tc: "我們實地視察，了解現時物料及人員的流動情況。",
          },
        },
        {
          title: { en: "Design", tc: "方案設計" },
          body: {
            en: "We draw the layout and plan the building services it needs.",
            tc: "我們繪製佈局，並規劃所需的屋宇裝備。",
          },
        },
        {
          title: { en: "Deliver", tc: "項目交付" },
          body: {
            en: "We support the installation or the move on site.",
            tc: "我們在現場支援安裝或搬遷。",
          },
        },
        {
          title: { en: "Support", tc: "持續支援" },
          body: {
            en: "We review the layout once it is in use and adjust it where needed.",
            tc: "佈局投入使用後，我們會檢視並按需要調整。",
          },
        },
      ],
      ctaHeading: { en: "Setting up or rearranging a site?", tc: "正在設立或重新佈置場地？" },
      ctaBody: {
        en: "Tell us about the site and what moves through it. We reply within one business day.",
        tc: "告訴我們場地情況及當中流轉的物料，我們會於一個工作天內回覆。",
      },
      ctaButton: { en: "Contact us", tc: "聯絡我們" },
      cardLink: { en: "Full industrial layout details →", tc: "查看工業佈局詳情 →" },
    },
    // ── Product Design landing page (/services/product-design/).
    // One of the five solutions (Edward, 2026-10-13). The "what we deliver"
    // items restate what he confirmed 3form does; no prices, clients or
    // results have been given — do not add any.
    productDesignPage: {
      label: { en: "Product Design", tc: "產品設計" },
      heading: {
        en: "Product design and engineering for manufacturing in Hong Kong",
        tc: "香港產品設計及工程：為量產而設計",
      },
      intro: {
        en: "3form designs products that a factory can make reliably: the mechanical design, design for manufacturing, prototypes, and the choice of material and process.",
        tc: "3form 設計工廠能穩定生產的產品：機械設計、可製造性設計、原型製作，以及物料及製程選擇。",
      },
      audienceHeading: { en: "Who we work with", tc: "服務對象" },
      audiences: [
        {
          title: { en: "Hong Kong and Greater Bay Area manufacturers", tc: "香港及大灣區製造商" },
          body: {
            en: "You make products in Hong Kong or the Greater Bay Area, or have them made, and need the design engineered for production.",
            tc: "您在香港或大灣區生產產品，或委託工廠生產，並需要把設計做到可以量產。",
          },
        },
      ],
      coverage: {
        heading: { en: "What we do", tc: "服務範圍" },
        items: [
          {
            title: { en: "Mechanical design and CAD", tc: "機械設計及 CAD" },
            body: {
              en: "We design the parts and produce the drawings and 3D models.",
              tc: "我們設計零件，並製作圖則及 3D 模型。",
            },
          },
          {
            title: { en: "Design for manufacturing", tc: "可製造性設計" },
            body: {
              en: "We review and adjust a design so a factory can make it reliably and at lower cost.",
              tc: "我們檢視及調整設計，令工廠能穩定生產並降低成本。",
            },
          },
          {
            title: { en: "Prototyping", tc: "原型製作" },
            body: {
              en: "We make or manage prototypes and test samples.",
              tc: "我們製作或統籌原型及測試樣辦。",
            },
          },
          {
            title: { en: "Materials and process selection", tc: "物料及製程選擇" },
            body: {
              en: "We choose the plastics, composites and manufacturing process for your product.",
              tc: "我們為您的產品選擇塑膠、複合材料及製造工序。",
            },
          },
        ],
      },
      stepsHeading: { en: "How we work", tc: "工作流程" },
      steps: [
        {
          title: { en: "Diagnose", tc: "診斷評估" },
          body: {
            en: "We review your product idea or current design and what it must do.",
            tc: "我們了解您的產品構思或現有設計，以及產品須達到的要求。",
          },
        },
        {
          title: { en: "Design", tc: "方案設計" },
          body: {
            en: "We produce the mechanical design, drawings and 3D models.",
            tc: "我們完成機械設計、圖則及 3D 模型。",
          },
        },
        {
          title: { en: "Deliver", tc: "項目交付" },
          body: {
            en: "We prototype, test and prepare the design for the factory.",
            tc: "我們製作原型、進行測試，並為工廠生產做好準備。",
          },
        },
        {
          title: { en: "Support", tc: "持續支援" },
          body: {
            en: "We support you through the first production runs.",
            tc: "我們在首批生產期間繼續支援。",
          },
        },
      ],
      ctaHeading: { en: "Have a product to design or improve?", tc: "有產品需要設計或改良？" },
      ctaBody: {
        en: "Tell us about the product and where it will be made. We reply within one business day.",
        tc: "告訴我們產品情況及生產地點，我們會於一個工作天內回覆。",
      },
      ctaButton: { en: "Contact us", tc: "聯絡我們" },
      cardLink: { en: "Full product design details →", tc: "查看產品設計詳情 →" },
    },
    // ── Engineering & Process Enhancement landing page (/services/lean-six-sigma/).
    // Built from Edward's interview answers (2026-09-23). He asked for no
    // examples or results at this stage — don't add any until he supplies them.
    processPage: {
      label: { en: "Engineering & Process Enhancement", tc: "工程及流程優化" },
      heading: {
        en: "Lean & Six Sigma process improvement for HK manufacturers",
        tc: "香港工廠精益生產及流程改善",
      },
      intro: {
        en: "3form helps manufacturers find where production, operations and cost can improve, and fixes it with Lean and Six Sigma. We start from your pain points on site, then provide technical work or advice, whichever your process needs.",
        tc: "3form 協助製造商找出生產、營運及成本上可改善之處，並以精益及六西格瑪方法優化。我們由實地了解痛點開始，再按流程所需提供技術支援或顧問意見。",
      },
      audienceHeading: { en: "Who we work with", tc: "服務對象" },
      audiences: [
        {
          title: { en: "Greater Bay Area manufacturers expanding through Hong Kong", tc: "經香港拓展業務的大灣區製造商" },
          body: {
            en: "You run manufacturing or production in the Greater Bay Area and see Hong Kong as a stepping stone for overseas expansion and promotion. We support you with both technical and advisory support.",
            tc: "您在大灣區從事製造或生產，並以香港作為拓展海外市場及推廣的踏腳石。我們同時提供技術及顧問支援。",
          },
        },
      ],
      stepsHeading: { en: "How an engagement runs", tc: "合作流程" },
      steps: [
        {
          title: { en: "Pain points and site evaluation", tc: "痛點分析及實地評估" },
          body: {
            en: "We start with a preliminary review of your pain points and an evaluation of your site.",
            tc: "我們先初步了解您的痛點，並進行實地評估。",
          },
        },
        {
          title: { en: "Production, operation and cost study", tc: "生產、營運及成本研究" },
          body: {
            en: "We study your production, operations and costs with Lean and Six Sigma to find where to optimise.",
            tc: "我們以精益及六西格瑪方法研究您的生產、營運及成本，找出可優化之處。",
          },
        },
        {
          title: { en: "Technical or advisory support", tc: "技術或顧問支援" },
          body: {
            en: "We enhance your current business process, either by doing the technical work or by advising your team, whichever fits.",
            tc: "按實際需要，以技術執行或顧問建議的方式，提升您現有的業務流程。",
          },
        },
      ],
      ctaHeading: { en: "Want to see where your process can improve?", tc: "想了解您的流程可如何改善？" },
      ctaBody: {
        en: "Tell us about your production line or operation. We reply within one business day.",
        tc: "告訴我們您的生產線或營運情況，我們會於一個工作天內回覆。",
      },
      ctaButton: { en: "Contact us", tc: "聯絡我們" },
      cardLink: { en: "Full process enhancement details →", tc: "查看流程優化詳情 →" },
    },
    // ── AI & Data Digitalization landing page (/services/ai-data-adoption/). Follows the interview
    // pattern Edward confirmed on 2026-09-24 (GBA clients; pain points and site
    // evaluation, a study, then technical or advisory support). No examples.
    aiDataPage: {
      label: { en: "AI & Data Solutions", tc: "AI 及數據方案" },
      heading: {
        en: "AI and data solutions for Hong Kong manufacturers",
        tc: "香港製造業 AI 及數據方案",
      },
      intro: {
        en: "3form guides manufacturers through AI tool selection, data pipeline setup and digital transformation, so raw production data turns into business intelligence you can act on.",
        tc: "3form 引導製造商完成人工智能工具選擇、數據流程建立及數碼轉型，將原始生產數據轉化為可行的商業洞察。",
      },
      audienceHeading: { en: "Who we work with", tc: "服務對象" },
      audiences: [
        {
          title: { en: "Greater Bay Area manufacturers expanding through Hong Kong", tc: "經香港拓展業務的大灣區製造商" },
          body: {
            en: "You run manufacturing or production in the Greater Bay Area and see Hong Kong as a stepping stone for overseas expansion and promotion. We support your digital transformation with both technical and advisory support.",
            tc: "您在大灣區從事製造或生產，並以香港作為拓展海外市場及推廣的踏腳石。我們同時以技術及顧問支援，協助您完成數碼轉型。",
          },
        },
      ],
      stepsHeading: { en: "How an engagement runs", tc: "合作流程" },
      steps: [
        {
          title: { en: "Pain points and site evaluation", tc: "痛點分析及實地評估" },
          body: {
            en: "We start with a preliminary review of your pain points and how data moves through your operation today.",
            tc: "我們先初步了解您的痛點，以及現時數據在營運中的流轉方式。",
          },
        },
        {
          title: { en: "Tool and data pipeline study", tc: "工具及數據流程研究" },
          body: {
            en: "We assess which AI tools fit your needs and how a data pipeline should connect your systems.",
            tc: "我們評估哪些人工智能工具切合您的需要，以及數據流程應如何連接您的系統。",
          },
        },
        {
          title: { en: "Technical or advisory support", tc: "技術或顧問支援" },
          body: {
            en: "We set up the tools and pipeline for you, or advise your team through the transformation, whichever fits.",
            tc: "按實際需要，由我們建立工具及數據流程，或以顧問身份指導您的團隊完成轉型。",
          },
        },
      ],
      ctaHeading: { en: "Want to put your production data to work?", tc: "想讓生產數據發揮作用？" },
      ctaBody: {
        en: "Tell us about your operation and the data you collect today. We reply within one business day.",
        tc: "告訴我們您的營運情況及現時收集的數據，我們會於一個工作天內回覆。",
      },
      ctaButton: { en: "Contact us", tc: "聯絡我們" },
      cardLink: { en: "Full AI & data details →", tc: "查看人工智能及數據詳情 →" },
    },
    // ── Production Site Setup landing page (/services/production-site-setup/). Follows the interview
    // pattern Edward confirmed on 2026-09-24 (GBA clients; pain points and site
    // evaluation, a study, then technical or advisory support). No examples.
    productionSetupPage: {
      label: { en: "Production Site Setup", tc: "生產場地設立" },
      heading: {
        en: "Production site setup in Hong Kong",
        tc: "香港生產場地設立顧問",
      },
      intro: {
        en: "3form supports manufacturers setting up compliant production facilities in Hong Kong, covering licensing, HACCP food safety systems, GMP standards and FIFO inventory management.",
        tc: "3form 支援製造商在香港設立合規的生產設施，涵蓋牌照申請、HACCP食品安全系統、GMP標準及先進先出存貨管理。",
      },
      audienceHeading: { en: "Who we work with", tc: "服務對象" },
      audiences: [
        {
          title: { en: "Greater Bay Area manufacturers expanding through Hong Kong", tc: "經香港拓展業務的大灣區製造商" },
          body: {
            en: "You run manufacturing or production in the Greater Bay Area and see Hong Kong as a stepping stone for overseas expansion and promotion. We help you set up a compliant production site here, with both technical and advisory support.",
            tc: "您在大灣區從事製造或生產，並以香港作為拓展海外市場及推廣的踏腳石。我們以技術及顧問支援，協助您在港設立合規的生產基地。",
          },
        },
      ],
      stepsHeading: { en: "How an engagement runs", tc: "合作流程" },
      steps: [
        {
          title: { en: "Pain points and site evaluation", tc: "痛點分析及實地評估" },
          body: {
            en: "We start with a preliminary review of your production plans and pain points, and evaluate the site.",
            tc: "我們先初步了解您的生產規劃及痛點，並評估場地。",
          },
        },
        {
          title: { en: "Compliance and layout study", tc: "合規及佈局研究" },
          body: {
            en: "We map the licensing, HACCP and GMP requirements that apply, and plan the layout and FIFO inventory flow.",
            tc: "我們梳理適用的牌照、HACCP及GMP要求，並規劃廠房佈局及先進先出存貨流程。",
          },
        },
        {
          title: { en: "Technical or advisory support", tc: "技術或顧問支援" },
          body: {
            en: "We carry out the setup work, or advise your team through it, whichever fits.",
            tc: "按實際需要，由我們執行設立工作，或以顧問身份指導您的團隊。",
          },
        },
      ],
      ctaHeading: { en: "Setting up production in Hong Kong?", tc: "正在香港設立生產基地？" },
      ctaBody: {
        en: "Tell us about your product and your site plan. We reply within one business day.",
        tc: "告訴我們您的產品及場地計劃，我們會於一個工作天內回覆。",
      },
      ctaButton: { en: "Contact us", tc: "聯絡我們" },
      cardLink: { en: "Full production site setup details →", tc: "查看生產場地設立詳情 →" },
    },
    // ── Warehouse Management System landing page (/services/warehouse-management-system/). Follows the interview
    // pattern Edward confirmed on 2026-09-24 (GBA clients; pain points and site
    // evaluation, a study, then technical or advisory support). No examples.
    warehouseSystemPage: {
      label: { en: "Warehouse Management System", tc: "倉庫管理系統" },
      heading: {
        en: "Warehouse management system for Hong Kong operations",
        tc: "香港倉庫管理系統（SaaS）",
      },
      intro: {
        en: "3form's hosted warehouse management platform tracks lots and expiry dates (FEFO), alerts you to low stock and upcoming expiry, and keeps a full audit trail. We configure it around how your stock actually moves.",
        tc: "3form 的託管式倉庫管理平台可追蹤批次及效期（FEFO）、發出低庫存及到期預警，並保留完整審計軌跡。我們按您實際的存貨流轉方式設定平台。",
      },
      audienceHeading: { en: "Who we work with", tc: "服務對象" },
      audiences: [
        {
          title: { en: "Greater Bay Area manufacturers expanding through Hong Kong", tc: "經香港拓展業務的大灣區製造商" },
          body: {
            en: "You run manufacturing or production in the Greater Bay Area and see Hong Kong as a stepping stone for overseas expansion and promotion. We set up stock control for your Hong Kong operation, with both technical and advisory support.",
            tc: "您在大灣區從事製造或生產，並以香港作為拓展海外市場及推廣的踏腳石。我們以技術及顧問支援，為您在港的營運建立存貨管理。",
          },
        },
      ],
      stepsHeading: { en: "How an engagement runs", tc: "合作流程" },
      steps: [
        {
          title: { en: "Pain points and site evaluation", tc: "痛點分析及實地評估" },
          body: {
            en: "We review your stock pain points and walk through how goods move in your warehouse today.",
            tc: "我們了解您在存貨管理上的痛點，並實地了解現時貨物在倉庫中的流轉。",
          },
        },
        {
          title: { en: "Workflow study", tc: "流程研究" },
          body: {
            en: "We map your receiving, storage and picking flow and your lot and expiry rules, then configure the platform around them.",
            tc: "我們梳理收貨、儲存及揀貨流程，以及批次和效期規則，再按此設定平台。",
          },
        },
        {
          title: { en: "Technical or advisory support", tc: "技術或顧問支援" },
          body: {
            en: "We configure and roll out the platform, or advise your team on running it, whichever fits.",
            tc: "按實際需要，由我們設定及推行平台，或以顧問身份指導您的團隊運用。",
          },
        },
      ],
      ctaHeading: { en: "Losing track of lots or expiry dates?", tc: "難以追蹤批次或效期？" },
      ctaBody: {
        en: "Tell us how your warehouse runs today. We reply within one business day.",
        tc: "告訴我們您倉庫現時的運作方式，我們會於一個工作天內回覆。",
      },
      ctaButton: { en: "Contact us", tc: "聯絡我們" },
      cardLink: { en: "Full warehouse system details →", tc: "查看倉庫管理系統詳情 →" },
    },
    // ── General Maintenance & Repair landing page (/services/equipment-maintenance-repair/). Follows the interview
    // pattern Edward confirmed on 2026-09-24 (GBA clients; pain points and site
    // evaluation, a study, then technical or advisory support). No examples.
    equipmentMaintenancePage: {
      label: { en: "General Maintenance & Repair", tc: "一般維修及保養服務" },
      heading: {
        en: "Factory equipment maintenance and repair in Hong Kong",
        tc: "香港工廠設備維修及保養",
      },
      intro: {
        en: "3form plans preventive maintenance, diagnoses breakdowns and supports repairs for production equipment, keeping machinery serviceable and downtime measured rather than guessed at.",
        tc: "3form 為生產設備提供預防性保養規劃、故障診斷及維修支援，令機器保持可運作狀態，停機時間有數據可依，而非憑估算。",
      },
      audienceHeading: { en: "Who we work with", tc: "服務對象" },
      audiences: [
        {
          title: { en: "Greater Bay Area manufacturers expanding through Hong Kong", tc: "經香港拓展業務的大灣區製造商" },
          body: {
            en: "You run manufacturing or production in the Greater Bay Area and see Hong Kong as a stepping stone for overseas expansion and promotion. We keep your production equipment running, with both technical and advisory support.",
            tc: "您在大灣區從事製造或生產，並以香港作為拓展海外市場及推廣的踏腳石。我們以技術及顧問支援，確保您的生產設備運作暢順。",
          },
        },
      ],
      stepsHeading: { en: "How an engagement runs", tc: "合作流程" },
      steps: [
        {
          title: { en: "Pain points and site evaluation", tc: "痛點分析及實地評估" },
          body: {
            en: "We review the breakdowns and downtime you face, and evaluate your equipment on site.",
            tc: "我們了解您面對的故障及停機問題，並實地評估您的設備。",
          },
        },
        {
          title: { en: "Maintenance study", tc: "保養研究" },
          body: {
            en: "We study failure patterns and downtime to build a preventive maintenance plan.",
            tc: "我們研究故障規律及停機數據，制定預防性保養計劃。",
          },
        },
        {
          title: { en: "Technical or advisory support", tc: "技術或顧問支援" },
          body: {
            en: "We carry out diagnosis and repair work, or advise your maintenance team, whichever fits.",
            tc: "按實際需要，由我們進行診斷及維修，或以顧問身份指導您的保養團隊。",
          },
        },
      ],
      ctaHeading: { en: "Equipment keeps breaking down?", tc: "設備經常故障？" },
      ctaBody: {
        en: "Tell us about the machines and the downtime you face. We reply within one business day.",
        tc: "告訴我們您的設備及停機情況，我們會於一個工作天內回覆。",
      },
      ctaButton: { en: "Contact us", tc: "聯絡我們" },
      cardLink: { en: "Full maintenance & repair details →", tc: "查看維修及保養詳情 →" },
    },
    // ── Industrial Agentic Development landing page (/services/industrial-ai-agents/). Follows the interview
    // pattern Edward confirmed on 2026-09-24 (GBA clients; pain points and site
    // evaluation, a study, then technical or advisory support). No examples.
    industrialAgentsPage: {
      label: { en: "Agentic AI Solutions", tc: "Agentic AI 智能代理方案" },
      heading: {
        en: "Industrial AI agents for factories in Hong Kong",
        tc: "香港工廠 AI Agent 開發：自動化每日重複的營運決策",
      },
      intro: {
        en: "3form builds AI agents that work on real plant data, reading sensor streams, documents and inspection results to automate the routine decisions your operations team repeats every day.",
        tc: "3form 開發能處理真實廠房數據的人工智能代理，讀取感測器數據、文件及檢測結果，將營運團隊每日重複的例行決策自動化。",
      },
      audienceHeading: { en: "Who we work with", tc: "服務對象" },
      audiences: [
        {
          title: { en: "Greater Bay Area manufacturers expanding through Hong Kong", tc: "經香港拓展業務的大灣區製造商" },
          body: {
            en: "You run manufacturing or production in the Greater Bay Area and see Hong Kong as a stepping stone for overseas expansion and promotion. We automate routine operations decisions, with both technical and advisory support.",
            tc: "您在大灣區從事製造或生產，並以香港作為拓展海外市場及推廣的踏腳石。我們以技術及顧問支援，將例行營運決策自動化。",
          },
        },
      ],
      stepsHeading: { en: "How an engagement runs", tc: "合作流程" },
      steps: [
        {
          title: { en: "Pain points and site evaluation", tc: "痛點分析及實地評估" },
          body: {
            en: "We review your pain points on site and find the routine decisions your team repeats every day.",
            tc: "我們實地了解您的痛點，找出團隊每日重複的例行決策。",
          },
        },
        {
          title: { en: "Data and decision study", tc: "數據及決策研究" },
          body: {
            en: "We study the sensor streams, documents and inspection results those decisions depend on.",
            tc: "我們研究這些決策所依據的感測器數據、文件及檢測結果。",
          },
        },
        {
          title: { en: "Technical or advisory support", tc: "技術或顧問支援" },
          body: {
            en: "We build and deploy the agents, or advise your team on building them, whichever fits.",
            tc: "按實際需要，由我們開發及部署代理，或以顧問身份指導您的團隊開發。",
          },
        },
      ],
      ctaHeading: { en: "Repeating the same decisions every day?", tc: "每日重複同樣的決策？" },
      ctaBody: {
        en: "Tell us about the routine work your operations team handles. We reply within one business day.",
        tc: "告訴我們營運團隊處理的例行工作，我們會於一個工作天內回覆。",
      },
      ctaButton: { en: "Contact us", tc: "聯絡我們" },
      cardLink: { en: "Full AI agent details →", tc: "查看工業智能代理詳情 →" },
    },
  },

  // ── Products (formerly Live Demos) — working software 3form has built. `real: true`
  // items are working builds (see the disclosure line); `real: false` items
  // are announced but not yet built, and use the same illustrative treatment
  // as unbuilt project cards.
  demos: {
    heading: { en: "Products", tc: "產品" },
    sub: {
      en: "Working software we have built, not just proposed. Open any of them and try it.",
      tc: "我們實際建構的軟件，並非紙上談兵。歡迎逐一開啟試用。",
    },
    illustrative_badge: { en: "Coming Soon", tc: "即將推出" },
    launch_demo: { en: "Launch Demo", tc: "啟動示範" },
    items: [
      {
        id: 1,
        tag: { en: "Smart Factory · WMS / MES / APS", tc: "智能工廠・倉庫／生產執行／排程" },
        title: { en: "3Form Factory OS: Warehouse, Production & Planning", tc: "3Form 工廠系統：倉庫、生產及排程一體化" },
        desc: {
          en: "One system from order to delivery. Production planning on a real shift calendar, a simple touch screen for workers at each workstation, FEFO warehouse stock with full batch traceability, scrap and downtime tracking, and Lean / Six Sigma charts. An AI advisor suggests, but only people decide. Connects to SAP, Oracle and Workday.",
          tc: "由接單到出貨，一個系統全包：按真實班次日曆排產、工作站觸控屏讓工人一按即用、FEFO 倉庫批次全程追溯、報廢及停機記錄，以及精益／六標準差分析圖表。AI 顧問只提供建議，決定權在人。可連接 SAP、Oracle 及 Workday。",
        },
        note: {
          en: "Live demo with 3 months of sample data. Try it as a manager or a worker; no sign-up needed. The first load can take about a minute.",
          tc: "附三個月示範數據的實機示範。可用管理人員或工人身份試用，無需註冊。首次開啟約需一分鐘。",
        },
        real: true,
        demoUrl: "https://threeform-wms-demo.onrender.com/",
      },
      {
        id: 2,
        tag: { en: "Digital Twin & Agentic AI", tc: "數碼孿生及代理式人工智能" },
        title: { en: "Inspection Cell Digital Twin with AI Tuning", tc: "檢測工作站數碼孿生及 AI 調校" },
        desc: {
          en: "A live 3D twin of a robotic visual-inspection cell — conveyor, UR7e suction pick, rail-mounted camera scan and good/reject sorting — with a dashboard and an AI process assistant that diagnoses rising reject rates and proposes setting changes for an engineer to approve.",
          tc: "機械人視覺檢測工作站的即時三維孿生 — 涵蓋輸送帶、UR7e 真空吸取、導軌相機掃描及良品／不良品分揀 — 配備儀表板及 AI 製程助理，可診斷不良率上升的原因並建議參數調整，經工程師批准後方會執行。",
        },
        note: {
          en: "Machine, robot and camera are simulated; inspection is rule-based until the real vision model is connected. The AI's diagnoses are real (DeepSeek). First visit may take about a minute while the server wakes up.",
          tc: "機器、機械人及相機均為模擬；在接入真實視覺模型前，檢測採用規則判斷。AI 診斷為真實運算（DeepSeek）。首次瀏覽時伺服器需約一分鐘啟動。",
        },
        real: true,
        demoUrl: "https://fongpolok.github.io/3form-digital-twin-ui/",
      },
      {
        id: 3,
        tag: { en: "Compliance", tc: "合規" },
        title: { en: "ESG Auditing", tc: "ESG審核" },
        desc: {
          en: "An auditor-facing dashboard for a Hong Kong recycling facility — work orders, ESG metrics against HKEX/GRI frameworks, and PDF report generation.",
          tc: "為香港回收設施而設的審核員儀表板 — 工作單、對照香港交易所／GRI框架的ESG指標，以及PDF報告生成。",
        },
        note: { en: "", tc: "" },
        real: true,
        demoUrl: "https://esg-frontend-d6g2.onrender.com/ops/",
      },
      {
        id: 4,
        tag: { en: "Machine Vision", tc: "機器視覺" },
        title: { en: "Defect Detection (OpenCV / Cognex)", tc: "缺陷檢測（OpenCV／Cognex）" },
        desc: {
          en: "An inspection-station control app — pendant jogging, recipe teach/run, and two working defect detectors (classical OpenCV template diff and pretrained-backbone anomaly detection) running live against sample images.",
          tc: "檢測工作站控制應用程式 — 支援教導盒點動、配方教導／執行，以及兩個實際運作的缺陷檢測器（傳統OpenCV模板比對及預訓練骨幹異常檢測），可即時對樣本圖像進行檢測。",
        },
        note: {
          en: "Robot, camera, and lighting are simulated (no physical hardware attached); the two vision detectors run real inference. A third (YOLO) and RoboDK integration are wired up but honestly report as not-ready — no labeled training data / no RoboDK install on this host.",
          tc: "機械人、相機及燈光均為模擬（未連接實體硬件）；兩個視覺檢測器則為真實推理運算。第三個檢測器（YOLO）及RoboDK整合已接入，但誠實地顯示為未就緒 — 尚無標註訓練數據／此主機未安裝RoboDK。",
        },
        real: true,
        demoUrl: "https://fongpolok.github.io/3form-defect-demo-ui/",
      },
    ],
  },

  // ── Projects page ─────────────────────────────────────────────────────────────
  projects: {
    all_heading: { en: "All Projects",     tc: "所有項目" },
    all_sub: {
      en: "Real results from completed engagements, alongside actual examples of the work we take on.",
      tc: "已完成項目的真實成果，以及我們所承接工作類型的實際案例。",
    },
    illustrative_badge: { en: "Actual Example", tc: "實際案例" },
    // ── All projects (shown on the /projects page) ───────────────────────────
    items: [
      {
        id: 1,
        tag:    { en: "Lean / 6 Sigma",    tc: "精益 / 六西格瑪" },
        title:  { en: "Production Line Overhaul for FMCG Manufacturer",          tc: "快消品製造商生產線優化" },
        desc:   { en: "Reduced cycle time by 32% and defect rate by 18% through systematic Lean mapping and kaizen workshops.", tc: "透過系統化精益圖析及改善研討會，將週期時間縮短32%，缺陷率降低18%。" },
        result: { en: "32% faster cycle time",  tc: "週期時間縮短32%" },
        featured: true,
      },
      {
        id: 2,
        tag:    { en: "Funding",           tc: "資助" },
        title:  { en: "BUD Fund Application for SME Expansion",                  tc: "中小企BUD基金擴張申請" },
        desc:   { en: "Secured HK$2M in BUD Fund support for a local SME entering Southeast Asian markets, covering process documentation and market entry planning.", tc: "成功為本地中小企取得200萬港元BUD基金，拓展東南亞市場，涵蓋流程文件及市場進入規劃。" },
        result: { en: "HK$2M funding secured", tc: "取得200萬港元資助" },
        featured: false,
      },
      {
        id: 3,
        tag:    { en: "AI & Data",         tc: "人工智能及數據" },
        title:  { en: "Real-Time KPI Dashboard for Food Production Facility",    tc: "食品生產設施實時KPI儀表板" },
        desc:   { en: "Designed and deployed a real-time production KPI dashboard integrating IoT sensor data with business reporting systems.", tc: "設計並部署整合物聯網感測器數據與業務報告系統的實時生產KPI儀表板。" },
        result: { en: "100% production visibility", tc: "100%生產可視化" },
        featured: true,
      },
      {
        id: 4,
        tag:    { en: "Production Setup",  tc: "生產設立" },
        title:  { en: "Food Factory Licensing & HACCP Implementation", tc: "食品廠牌照申請及HACCP實施" },
        desc:   { en: "Guided a new food production SME through licensing applications, HACCP plan development, and GMP facility setup — from zero to operational in 6 months.", tc: "引導新食品生產中小企完成牌照申請、HACCP計劃制定及GMP設施設置，6個月內從零到投產。" },
        result: { en: "6 months to full compliance", tc: "6個月達到全面合規" },
        featured: false,
      },
      {
        id: 5,
        tag:    { en: "Lean / 6 Sigma",    tc: "精益 / 六西格瑪" },
        title:  { en: "Warehouse Layout Optimisation for Logistics Company", tc: "物流公司倉庫佈局優化" },
        desc:   { en: "Applied 5S and value stream mapping to reorganise warehouse operations, reducing order pick time and improving safety compliance.", tc: "應用5S及價值流圖析重組倉庫運營，縮短訂單揀取時間並提升安全合規。" },
        result: { en: "40% reduction in pick errors", tc: "揀貨錯誤減少40%" },
        featured: false,
      },
      {
        id: 6,
        tag:    { en: "Funding",           tc: "資助" },
        title:  { en: "Funding Grant for Technology Upgrade",   tc: "科技升級資助" },
        desc:   { en: "Prepared and submitted a successful general funding application, enabling a manufacturer to upgrade legacy production equipment with government co-funding.", tc: "準備並提交成功的一般資助申請，協助製造商利用政府共同資助升級舊有生產設備。" },
        result: { en: "HK$500K equipment co-funded", tc: "50萬港元設備共同資助" },
        featured: false,
      },
      {
        id: 7,
        tag:    { en: "AI & Data",         tc: "人工智能及數據" },
        title:  { en: "AI Demand Forecasting for Retail SME",       tc: "零售中小企AI需求預測" },
        desc:   { en: "Implemented a lightweight AI demand forecasting model that reduced overstock by 25% and improved inventory turnover for a multi-location retailer.", tc: "實施輕量化AI需求預測模型，為多門市零售商減少25%過剩庫存並提升存貨週轉率。" },
        result: { en: "25% overstock reduction",    tc: "過剩庫存減少25%" },
        featured: false,
      },
      {
        id: 8,
        tag:    { en: "Production Setup",  tc: "生產設立" },
        title:  { en: "GMP Compliance Audit & Remediation",         tc: "GMP合規審核及整改" },
        desc:   { en: "Conducted a full GMP gap assessment for a cosmetics manufacturer and led remediation to achieve export certification for EU markets.", tc: "為化妝品製造商進行全面GMP差距評估，並主導整改以取得歐盟市場出口認證。" },
        result: { en: "EU export certification achieved", tc: "取得歐盟出口認證" },
        featured: false,
      },
    ],
    // ── Individual project detail page (per-project, blank pending write-up) ──
    view_details:      { en: "View Details",        tc: "查看詳情" },
    back_to_projects:  { en: "← Back to Projects",  tc: "← 返回項目列表" },
    detail_pending: {
      en: "Full deliverables write-up for this project is being prepared and will be added soon.",
      tc: "本項目的完整交付成果說明正在準備中，將於稍後補充。",
    },
  },

  // ── Contact Section ──────────────────────────────────────────────────────────
  contact: {
    heading: { en: "Contact Us",       tc: "聯絡我們" },
    // Approved by Edward, 2026-09-23 (SEO item 4: the page was ~65 words).
    sub: {
      en: "3form Engineering Co works with manufacturers, food producers, warehouses and technology firms across Hong Kong. Tell us what you want to build or improve: an AI system, a production line, a factory layout, or a new product. We reply within one business day to arrange a short call. For work on site, we first walk through your site and then send a written quotation based on what we saw.",
      tc: "3form Engineering Co 為全港製造商、食品生產商、倉儲及科技企業提供服務。請告訴我們您想建立或改善的地方，無論是 AI 系統、生產線、廠房佈局，還是新產品。我們會於一個工作天內回覆，安排簡短通話。如涉及現場工作，我們會先實地視察，再按所見提供書面報價。",
    },
    // Company facts from Edward, 2026-09-23. Also feed the Organization
    // JSON-LD (legalName, foundingDate, address) in src/structuredData.ts.
    legalName:    "3form Engineering Co Ltd.",
    foundingYear: "2026",
    address: {
      street:   "Room C22, 12/F, Wong King Industrial Building, 2-4 Tai Yau Street",
      locality: "San Po Kong",
      region:   "Kowloon",
      country:  "HK",
      display: {
        en: "Room C22, 12/F, Wong King Industrial Building, 2-4 Tai Yau Street, San Po Kong, Kowloon, Hong Kong",
        tc: "香港九龍新蒲崗大有街2-4號旺景工業大廈12樓C22室",
      },
    },
    // Office hours feed both the visible contact block and the JSON-LD
    // openingHoursSpecification in src/structuredData.ts.
    hours: {
      days:    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens:   "09:00",
      closes:  "18:00",
      display: { en: "Mon–Fri 09:00–18:00", tc: "星期一至五 09:00–18:00" },
    },
    // We work on client sites; the office is not a shop. Say so plainly rather
    // than letting a visitor turn up to a closed industrial-building door.
    appointmentOnly: {
      en: "By appointment only — no walk-in storefront.",
      tc: "預約制，不設門市。",
    },
    phone:   "5744 9594",
    tel:     "+85257449594",
    email:   "edwardfong@3formhk.com",
    website: "www.3formhk.com",
    // WhatsApp Business is the fastest route to a reply, so it leads every
    // contact action list and gets the sitewide floating button.
    whatsapp: {
      display: "+852 5744 9594",
      href:    "https://wa.me/85257449594",
      /** Prefilled opener. Deliberately price-free: quotes follow a site walk-through. */
      message: {
        en: "Hello 3form Engineering, I'd like to ask about your engineering services.",
        tc: "您好，3form Engineering，我想諮詢貴公司的工程服務。",
      },
      label: { en: "WhatsApp us", tc: "WhatsApp 聯絡我們" },
      aria: {
        en: "Chat with 3form Engineering on WhatsApp",
        tc: "透過 WhatsApp 與 3form Engineering 聯絡",
      },
    },
    wechat: {
      id:     "edwardfpl",
      label:  { en: "WeChat ID", tc: "微信 ID" },
      copy:   { en: "Copy ID",   tc: "複製 ID" },
      copied: { en: "Copied!",   tc: "已複製！" },
      copy_failed: {
        en: "Copy failed — the WeChat ID is edwardfpl.",
        tc: "複製失敗 — 微信 ID 為 edwardfpl。",
      },
    },
    labels: {
      office:     { en: "Office",       tc: "辦公室" },
      hours:      { en: "Office hours", tc: "辦公時間" },
      phone:      { en: "Phone",        tc: "電話" },
      email:      { en: "Email",        tc: "電郵" },
      website:    { en: "Website",      tc: "網站" },
      whatsapp:   { en: "WhatsApp",     tc: "WhatsApp" },
      wechat:     { en: "WeChat",       tc: "微信" },
      call:       { en: "Call us",      tc: "致電我們" },
      emailUs:    { en: "Email us",     tc: "電郵聯絡" },
    },
    form_name:    { en: "Your Name",   tc: "您的姓名" },
    form_email:   { en: "Your Email",  tc: "您的電郵" },
    form_message: { en: "Your Message", tc: "您的訊息" },
    form_send:    { en: "Send Message", tc: "發送訊息" },
    form_sending: { en: "Sending…",     tc: "發送中…" },
    sent_endpoint_heading: { en: "Message sent!", tc: "訊息已發送！" },
    sent_endpoint_body:    { en: "We will get back to you shortly.", tc: "我們將盡快回覆您。" },
    sent_mailto_heading:   { en: "Opening your email client…", tc: "正在開啟您的電郵程式…" },
    sent_mailto_body: {
      en: "We've prepared your message for edwardfong@3formhk.com. If nothing opened, please email us directly.",
      tc: "我們已為您準備好發送至 edwardfong@3formhk.com 的郵件。如未有反應，請直接發送電郵給我們。",
    },
    error_heading: { en: "Something went wrong", tc: "發生錯誤" },
    error_body: {
      en: "We couldn't send that. Please email us directly at edwardfong@3formhk.com.",
      tc: "訊息未能發送，請直接發送電郵至 edwardfong@3formhk.com。",
    },
    send_another: { en: "Send another", tc: "再次發送" },
    try_again:    { en: "Try again",    tc: "重試" },
  },

  // ── Partners Section ─────────────────────────────────────────────────────────
  partners: {
    heading: { en: "Our Partners & Affiliations", tc: "合作夥伴及聯繫機構" },
    sub: {
      en: "We work alongside industry-leading organisations to deliver the best outcomes for our clients.",
      tc: "我們與業界領先機構攜手合作，為客戶提供最佳成果。",
    },
    // Standard affiliation disclaimer — listing an organisation as a partner
    // is not a claim that it endorses anything said here.
    disclaimer: {
      en: "Any opinions, findings, conclusions or recommendations expressed in this material/publication (or by members of this company) do not reflect the views of aforementioned partners.",
      tc: "本材料／刊物（或本公司成員）所表達的任何意見、研究結果、結論或建議，並不代表上述合作夥伴的觀點。",
    },
    // To add a partner: add an object below.
    // imgUrl: put the path to the logo file here, e.g. "/logos/hkpc.png"
    //         Leave as "" to show the fallback text plate instead.
    items: [
      { id: 1,  name: "HKPC",           shortName: "HKPC",      imgUrl: "/logos/hkpc.png",           desc: { en: "Hong Kong Productivity Council",       tc: "香港生產力促進局" } },
      { id: 2,  name: "Cognex",         shortName: "COGNEX",    imgUrl: "/logos/cognex.png",         desc: { en: "Machine Vision & Barcode Solutions",   tc: "機器視覺及條碼解決方案" } },
      { id: 3,  name: "HKSTP",          shortName: "HKSTP",     imgUrl: "/logos/stp.png",            desc: { en: "Hong Kong Science & Technology Parks Corporation", tc: "香港科技園公司" } },
      { id: 4,  name: "HKU iDendron",   shortName: "iDendron",  imgUrl: "/logos/idendron.png",       desc: { en: "HKU Innovation & Entrepreneurship Hub", tc: "香港大學創新及創業中心" } },
      { id: 5,  name: "Keyence",        shortName: "KEYENCE",   imgUrl: "/logos/keyence.png",        desc: { en: "Sensors, Machine Vision & Automation", tc: "感測器、機器視覺及自動化" } },
      { id: 6,  name: "OPC Hub @ Cyberport", shortName: "OPC",  imgUrl: "/logos/opc-cyberport.png",  desc: { en: "One Person Company Hub, Cyberport",    tc: "數碼港一人公司培育基地" } },
      { id: 7,  name: "TÜV SÜD",        shortName: "TÜV SÜD",  imgUrl: "/logos/tuvsud.png",         desc: { en: "International Certification",          tc: "國際認證機構" } },
      { id: 8,  name: "InvestHK",       shortName: "InvestHK",  imgUrl: "/logos/investhk.png",       desc: { en: "Dept. of Investment Promotion",        tc: "投資推廣署" } },
    ],
  },

  // ── Legal — Terms of Use & Privacy Policy ───────────────────────────────────
  legal: {
    terms_link:   { en: "Terms of Use",    tc: "使用條款" },
    privacy_link: { en: "Privacy Policy",  tc: "私隱政策" },

    terms: {
      heading: { en: "Terms of Use", tc: "使用條款" },
      updated: { en: "Last updated: January 2025", tc: "最後更新：2025年1月" },
      sections: [
        {
          title: { en: "1. Acceptance of Terms", tc: "1. 接受條款" },
          body:  { en: "By accessing and using www.3formhk.com ('the Website'), you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Website.", tc: "您訪問及使用 www.3formhk.com（「本網站」）即表示您接受並同意受本使用條款約束。如您不同意本條款，請勿使用本網站。" },
        },
        {
          title: { en: "2. Use of Content", tc: "2. 內容使用" },
          body:  { en: "All content on this Website, including text, graphics, logos, and images, is the property of 3form Engineering Co and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.", tc: "本網站上的所有內容，包括文字、圖形、標誌及圖像，均為 3form Engineering Co 的財產，受適用知識產權法律保護。未經我們事先書面同意，您不得複製、分發或創建衍生作品。" },
        },
        {
          title: { en: "3. Disclaimer", tc: "3. 免責聲明" },
          body:  { en: "The information provided on this Website is for general informational purposes only. 3form Engineering Co makes no representations or warranties of any kind regarding the accuracy or completeness of information on the Website.", tc: "本網站提供的資訊僅供一般參考之用。3form Engineering Co 對本網站上資訊的準確性或完整性不作任何形式的聲明或保證。" },
        },
        {
          title: { en: "4. Limitation of Liability", tc: "4. 責任限制" },
          body:  { en: "3form Engineering Co shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, this Website or its content.", tc: "3form Engineering Co 對因您使用或無法使用本網站或其內容而引起的任何直接、間接、附帶或後果性損害概不負責。" },
        },
        {
          title: { en: "5. Governing Law", tc: "5. 適用法律" },
          body:  { en: "These Terms of Use shall be governed by and construed in accordance with the laws of the Hong Kong Special Administrative Region.", tc: "本使用條款應受香港特別行政區法律管轄並依其詮釋。" },
        },
        {
          title: { en: "6. Changes to Terms", tc: "6. 條款變更" },
          body:  { en: "3form Engineering Co reserves the right to modify these terms at any time. Continued use of the Website after changes constitutes acceptance of the new terms.", tc: "3form Engineering Co 保留隨時修改本條款的權利。在條款變更後繼續使用本網站即表示接受新條款。" },
        },
      ],
    },

    privacy: {
      heading: { en: "Privacy Policy", tc: "私隱政策" },
      updated: { en: "Last updated: September 2026", tc: "最後更新：2026年9月" },
      // Content modelled on the Federation of Hong Kong Industries privacy policy structure
      // Reference: https://www.industryhk.org/tc/privacy-policy/
      sections: [
        {
          title: { en: "General", tc: "一般聲明" },
          body: {
            en: "3form Engineering Co is committed to protecting the privacy of visitors to www.3formhk.com ('the Website'). In general, you can browse this Website without providing any personal data about yourself. We do not require you to register to access general information on the Website.",
            tc: "3form Engineering Co 致力保護瀏覽 www.3formhk.com（「本網站」）人士的私隱。一般而言，您可在無需提供任何個人資料的情況下瀏覽本網站。您毋須登記即可查閱本網站上的一般資訊。",
          },
        },
        {
          title: { en: "Cookies and Automatic Data Collection", tc: "Cookies 及自動資料收集" },
          body: {
            en: "Like most websites, this Website uses cookies to record visit data. Information collected automatically may include your browser type, operating system, IP address, and domain name. This information is used solely for general statistical analysis to improve the Website and does not identify you personally. We use Google Analytics for this analysis, so the data is processed by Google; you can opt out with Google's browser add-on at https://tools.google.com/dlpage/gaoptout.",
            tc: "與大多數網站一樣，本網站使用 Cookies 記錄訪問資料。自動收集的資訊可能包括您的瀏覽器類型、作業系統、IP地址及域名。這些資訊僅用於一般統計分析以改善本網站，不會識別您的個人身份。我們使用 Google Analytics 進行此分析，相關資料由 Google 處理；您可透過 Google 的瀏覽器外掛程式選擇退出：https://tools.google.com/dlpage/gaoptout。",
          },
        },
        {
          title: { en: "Personal Data Provided Voluntarily", tc: "主動提供的個人資料" },
          body: {
            en: "When you submit an enquiry through our contact form, we collect personal data such as your name, email address, and message content. Each data collection page specifies the purpose for which data is collected. Provision of personal data is voluntary; however, failure to provide the requested data may prevent us from processing your enquiry.",
            tc: "當您透過本網站的聯絡表格提交查詢時，我們會收集您的姓名、電郵地址及訊息內容等個人資料。每個資料收集頁面均列明收集資料的目的。提供個人資料純屬自願；然而，如您拒絕提供所需資料，我們可能無法處理您的查詢。",
          },
        },
        {
          title: { en: "Use of Personal Data", tc: "個人資料的使用" },
          body: {
            en: "Personal data collected is used to respond to your enquiries and to provide the services you have requested. With your consent, data may also be used to send you information about our services. You may opt out of receiving such communications at any time by contacting us at edwardfong@3formhk.com.",
            tc: "所收集的個人資料用於回應您的查詢及提供您所要求的服務。在獲得您同意的情況下，資料亦可能用於向您發送有關我們服務的資訊。您可隨時發送電郵至 edwardfong@3formhk.com 選擇退出接收此類通訊。",
          },
        },
        {
          title: { en: "Security", tc: "資料安全" },
          body: {
            en: "We implement appropriate technical and organisational measures to protect personal data against unauthorised access, disclosure, alteration, or destruction. Only authorised personnel have access to personal data held by 3form Engineering Co.",
            tc: "我們採取適當的技術及組織措施，保護個人資料免遭未經授權的訪問、披露、更改或銷毀。只有獲授權人員方可訪問 3form Engineering Co 持有的個人資料。",
          },
        },
        {
          title: { en: "Disclosure to Third Parties", tc: "向第三方披露" },
          body: {
            en: "We do not sell or trade your personal data. Data may be shared with third-party service providers or technical staff who assist in operating the Website or delivering our services, and with parties required by law. Such parties are required to maintain the confidentiality of your data. 3form Engineering Co is not responsible for the privacy practices of external websites linked from this Website.",
            tc: "我們不會出售或交易您的個人資料。資料可能與協助運營本網站或提供服務的第三方服務供應商或技術人員共享，以及與法律規定的各方共享。此類各方須對您的資料保密。3form Engineering Co 對本網站所連結的外部網站的私隱慣例概不負責。",
          },
        },
        {
          title: { en: "Your Rights under the Personal Data (Privacy) Ordinance", tc: "您在《個人資料（私隱）條例》下的權利" },
          body: {
            en: "Under the Personal Data (Privacy) Ordinance (Cap. 486) of Hong Kong, you have the right to request access to and correction of your personal data held by us. To make a data access or correction request, please write to us at edwardfong@3formhk.com.",
            tc: "根據香港《個人資料（私隱）條例》（第486章），您有權要求查閱及更正我們持有的您的個人資料。如需提出查閱或更正資料的申請，請發送電郵至 edwardfong@3formhk.com 與我們聯絡。",
          },
        },
        {
          title: { en: "Changes to This Policy", tc: "政策變更" },
          body: {
            en: "3form Engineering Co reserves the right to amend this Privacy Policy at any time. Any changes will be posted on this page. We recommend that you check this page periodically for updates.",
            tc: "3form Engineering Co 保留隨時修改本私隱政策的權利。任何更改將發佈於本頁面。建議您定期查閱本頁面以了解最新資訊。",
          },
        },
        {
          title: { en: "Governing Language", tc: "適用語言" },
          body: {
            en: "This Privacy Policy is available in both English and Traditional Chinese. In the event of any conflict between the two versions, the English version shall prevail.",
            tc: "本私隱政策提供英文及繁體中文兩個版本。如兩個版本有任何抵觸，應以英文版本為準。",
          },
        },
      ],
    },
  },

  // ── Footer ───────────────────────────────────────────────────────────────────
  footer: {
    rights: {
      en: "© 2026 3form Engineering Co. All rights reserved.",
      tc: "© 2026 3form Engineering Co. 版權所有。",
    },
    domain: "www.3formhk.com",
    // Social links — fill in your real URLs in the href values in App.tsx Footer component
    social: {
      linkedin:  { en: "LinkedIn",  tc: "LinkedIn" },
      facebook:  { en: "Facebook",  tc: "Facebook" },
      instagram: { en: "Instagram", tc: "Instagram" },
    },
  },
};

// Helper — pick the right language string
export function txt(field: { en: string; tc: string }, lang: Lang): string {
  return field[lang];
}
