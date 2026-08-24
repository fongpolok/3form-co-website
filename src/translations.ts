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
    demos:    { en: "Demos",    tc: "示範" },
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
      services: { en: "See how we help businesses improve and grow.",      tc: "了解我們如何協助企業提升及發展。" },
      projects: { en: "Browse case studies from real client engagements.", tc: "瀏覽真實客戶項目的個案研究。" },
      contact:  { en: "Get in touch to start a conversation.",             tc: "聯絡我們，開展合作對話。" },
    },
  },

  // ── Hero Section ─────────────────────────────────────────────────────────────
  hero: {
    // McKinsey-style tagline: authoritative, outcome-focused, no fluff
    tagline: {
      en: "Helping Hong Kong businesses achieve meaningful, measurable, and lasting improvement.",
      tc: "協助香港企業實現有意義、可量化且持久的業務提升。",
    },
    sub: {
      en: "We combine engineering precision, data intelligence, and regulatory expertise to transform your operations — from the factory floor to the boardroom.",
      tc: "我們結合工程精準度、數據智能及監管專業知識，從生產現場到董事會，全面轉化您的營運。",
    },
    cta:  { en: "Explore Our Services", tc: "探索我們的服務" },
    cta2: { en: "Get in Touch",         tc: "立即聯絡" },
  },

  // ── About Section ────────────────────────────────────────────────────────────
  about: {
    heading: { en: "About 3form Co", tc: "關於 3form Co" },
    company_body: {
      en: "3form Co is a Hong Kong–based engineering and management consulting firm dedicated to helping businesses improve operations, adopt emerging technologies, and navigate complex regulatory environments. We work across manufacturing, food production, and technology sectors — bringing structured methodology and hands-on execution to every engagement.",
      tc: "3form Co 是一家總部位於香港的工程及管理顧問公司，致力協助企業改善營運、採用新興技術，並應對複雜的監管環境。我們在製造、食品生產及科技行業提供服務，為每個項目帶來系統化方法論及實際執行能力。",
    },
    stat1_num:   "10+",
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
        en: "Founder & Principal Consultant",
        tc: "創辦人及首席顧問",
      },
      bio_p1: {
        en: "Edward is a Mechanical Engineer with over three years at the Hong Kong Productivity Council (HKPC), where he currently serves as Senior Consultant — Smart Machinery and Equipment. His work spans IoT 4.0 and warehouse management system (WMS) development, AI-driven computer vision inspection, and advanced plastic and composite processing — supporting Hong Kong manufacturers through government-funded schemes including the New Industrialisation Funding Scheme (NIFS), the New Industrialisation and Technology Training Programme (NITTP), and the Cash Rebate Scheme (CRS).",
        tc: "Edward 是一名機械工程師，在香港生產力促進局（HKPC）工作超過三年，現任智能機械及設備高級顧問。他的工作範疇包括物聯網4.0及倉庫管理系統（WMS）開發、人工智能機器視覺檢測，以及先進塑膠及複合材料製程，並透過新型工業化資助計劃（NIFS）、新型工業化及科技培訓計劃（NITTP）及現金回贈計劃（CRS）等政府資助計劃，協助香港製造商發展升級。",
      },
      bio_p2: {
        en: "He holds a Bachelor of Engineering and is completing a Master of Science in Mechanical Engineering at the University of Hong Kong, and is an Associate Member of the Institution of Mechanical Engineers (IMechE), Hong Kong Branch. Edward previously developed a patented machine vision inspection system for automotive parts, and led an automated retail store project applying end-to-end automation to offline retail operations. He now channels this hands-on engineering and funding expertise into 3form Co, helping Hong Kong businesses modernise their operations and access the resources to grow.",
        tc: "他於香港大學取得機械工程學士學位，並正在攻讀機械工程理學碩士學位，同時為英國機械工程師學會（IMechE）香港分會準會員。Edward 曾研發一套獲專利的汽車零件裝飾表面機器視覺檢測系統，並曾主導一個全自動零售店項目，將端對端自動化技術應用於線下零售營運。現時，他將這些扎實的工程及資助申請經驗帶到 3form Co，協助香港企業提升營運及爭取發展資源。",
      },
      // Key credential tags shown as pills under his name
      credentials: [
        { en: "IMechE Associate Member (HK Branch)",             tc: "IMechE 香港分會準會員" },
        { en: "BEng & MSc, Mechanical Engineering (HKU)",        tc: "香港大學機械工程學士及碩士" },
        { en: "Patent Holder — Machine Vision Inspection System", tc: "機器視覺檢測系統專利發明人" },
      ],
    },

    // ── Engagement roadmap — the four stages of a typical client engagement,
    // in order. Mirrors PRODUCT.md's positioning: diagnosis through funded
    // implementation to compliance sign-off, without a vendor handoff.
    roadmap: {
      heading: { en: "How We Work", tc: "我們的工作方式" },
      sub: {
        en: "One firm, one team, from first diagnosis to final sign-off — no handoff between separate vendors.",
        tc: "一家公司，一個團隊，由診斷到最終合規審核一站式完成，毋須在不同供應商之間轉手。",
      },
      steps: [
        {
          title: { en: "Diagnose", tc: "診斷評估" },
          desc: {
            en: "Assess your operations on-site and identify which government funding schemes you're eligible for.",
            tc: "實地評估您的營運狀況，識別合資格申請的政府資助計劃。",
          },
        },
        {
          title: { en: "Fund", tc: "申請資助" },
          desc: {
            en: "Prepare, submit, and manage grant applications — BUD Fund, TCPSP, and other SME-focused schemes.",
            tc: "準備、提交及管理資助申請，包括BUD專項基金、TCPSP及其他中小企專項計劃。",
          },
        },
        {
          title: { en: "Engineer", tc: "工程優化" },
          desc: {
            en: "Apply Six Sigma, Lean, and AI/data tools to re-engineer the process the funding is paying to fix.",
            tc: "應用六西格瑪、精益及人工智能／數據工具，重新設計資助所針對改善的流程。",
          },
        },
        {
          title: { en: "Certify", tc: "合規認證" },
          desc: {
            en: "Carry the work through to compliance sign-off — licensing, HACCP, and GMP included.",
            tc: "跟進至合規審核完成，包括牌照申請、HACCP及GMP標準。",
          },
        },
      ],
    },
  },

  // ── Services Section ─────────────────────────────────────────────────────────
  services: {
    heading: { en: "Our Services", tc: "我們的服務" },
    sub: {
      en: "End-to-end consulting solutions tailored to Hong Kong's business landscape.",
      tc: "專為香港商業環境度身訂造的全方位顧問解決方案。",
    },
    items: [
      {
        id: 1,
        title:  { en: "Funding Consulting",                                tc: "資助顧問" },
        detail: {
          en: "Identify, apply for, and manage government grants and funding schemes available to Hong Kong businesses — including BUD Fund, TCPSP, and SME-focused programmes.",
          tc: "識別、申請及管理香港企業可獲取的政府資助計劃，包括BUD專項基金、TCPSP及中小企專項計劃。",
        },
      },
      {
        id: 2,
        title:  { en: "Engineering & Process Enhancement (6 Sigma / Lean)", tc: "工程及流程優化（六西格瑪 / 精益）" },
        detail: {
          en: "Apply Six Sigma and Lean methodologies to eliminate waste, reduce defects, and systematically improve your operational processes.",
          tc: "應用六西格瑪及精益方法論消除浪費、減少缺陷，並系統性地提升您的運營流程。",
        },
      },
      {
        id: 3,
        title:  { en: "AI & Data Digitalization Tech Adoption",            tc: "人工智能及數據數碼化技術應用" },
        detail: {
          en: "Guide your business through AI tool selection, data pipeline setup, and digital transformation — turning raw data into actionable business intelligence.",
          tc: "引導您的業務完成人工智能工具選擇、數據流程建立及數碼轉型，將原始數據轉化為可行的商業洞察。",
        },
      },
      {
        id: 4,
        title:  { en: "Production Site Setup",                             tc: "生產場地設立" },
        detail: {
          en: "End-to-end support for setting up compliant production facilities — including licensing, HACCP food safety systems, GMP standards, and FIFO inventory management.",
          tc: "提供全面的合規生產設施設立支援，包括牌照申請、HACCP食品安全系統、GMP標準及先進先出存貨管理。",
        },
      },
    ],
    // ── CTA block at the bottom of the Services page ─────────────────────────
    cta: {
      heading: { en: "Ready to get started?", tc: "準備好開始了嗎？" },
      sub: {
        en: "Request a demo of our tools, or ask for a quotation on your project — we'll get back to you within one business day.",
        tc: "查詢我們工具的示範，或為您的項目索取報價 — 我們將在一個工作天內回覆您。",
      },
      button: { en: "Request a Demo / Quotation", tc: "查詢示範／報價" },
    },
  },

  // ── Live Demos — engineering builds behind the advisory work. `real: true`
  // items are working builds (see the disclosure line); `real: false` items
  // are announced but not yet built, and use the same illustrative treatment
  // as unbuilt project cards.
  demos: {
    heading: { en: "Live Demos", tc: "現場示範" },
    sub: {
      en: "A closer look at the engineering behind the advisory work — built, not just proposed.",
      tc: "深入了解顧問工作背後的工程開發 — 實際建構，並非紙上談兵。",
    },
    illustrative_badge: { en: "Coming Soon", tc: "即將推出" },
    items: [
      {
        id: 1,
        tag: { en: "IoT & WMS", tc: "物聯網及倉庫管理" },
        title: { en: "Warehouse Traceability & FEFO Alerting", tc: "倉庫可追溯性及FEFO預警系統" },
        desc: {
          en: "Extended an open-source warehouse platform with lot/expiry (FEFO) tracking, low-stock and expiry alerts, and void/audit trails — built for medical-device-grade inventory traceability.",
          tc: "在開源倉庫管理平台上加入批次／有效期（FEFO）追蹤、低庫存及到期預警，以及作廢／審核紀錄功能，達到醫療器材級別的存貨可追溯性。",
        },
        note: { en: "Built on the open-source GreaterWMS platform", tc: "基於開源平台 GreaterWMS 建構" },
        real: true,
      },
      {
        id: 2,
        tag: { en: "AI & Data", tc: "人工智能及數據" },
        title: { en: "HK ElderGuard AI — Cantonese Health Companion", tc: "HK ElderGuard AI — 粵語健康伴侶" },
        desc: {
          en: "A Cantonese-first AI health companion for Hong Kong elderly with hypertension or type 2 diabetes — a local LLM grounded in HK clinical guidelines, with medication logging, OCR document scanning, and caregiver alerts.",
          tc: "為患有高血壓或二型糖尿病的香港長者而設的粵語人工智能健康伴侶 — 採用本地大型語言模型並以香港臨床指引為基礎，具備藥物記錄、OCR文件掃描及照顧者警報功能。",
        },
        note: { en: "HKU MECH6048 dissertation project", tc: "香港大學 MECH6048 論文項目" },
        real: true,
      },
      {
        id: 3,
        tag: { en: "Compliance", tc: "合規" },
        title: { en: "ESG Auditing", tc: "ESG審核" },
        desc: { en: "Details coming soon.", tc: "詳情稍後公佈。" },
        note: { en: "", tc: "" },
        real: false,
      },
      {
        id: 4,
        tag: { en: "Machine Vision", tc: "機器視覺" },
        title: { en: "Defect Detection (OpenCV / Cognex)", tc: "缺陷檢測（OpenCV／Cognex）" },
        desc: { en: "UI/UX preview only — detection deployment in progress.", tc: "現僅提供UI/UX預覽 — 檢測部署開發中。" },
        note: { en: "", tc: "" },
        real: false,
      },
    ],
  },

  // ── Projects page ─────────────────────────────────────────────────────────────
  projects: {
    all_heading: { en: "All Projects",     tc: "所有項目" },
    all_sub: {
      en: "Real results from completed engagements, alongside illustrative examples of the work we take on.",
      tc: "已完成項目的真實成果，以及我們所承接工作類型的說明性範例。",
    },
    illustrative_badge: { en: "Illustrative Example", tc: "說明性範例" },
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
        featured: true,
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
        title:  { en: "TCPSP Grant for Technology Upgrade",         tc: "TCPSP科技升級資助" },
        desc:   { en: "Prepared and submitted a successful TCPSP application enabling a manufacturer to upgrade legacy production equipment with government co-funding.", tc: "準備並提交成功的TCPSP申請，協助製造商利用政府共同資助升級舊有生產設備。" },
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
  },

  // ── Contact Section ──────────────────────────────────────────────────────────
  contact: {
    heading: { en: "Contact Us",       tc: "聯絡我們" },
    sub: {
      en: "Ready to start a conversation? Reach out and we will get back to you within one business day.",
      tc: "準備好開始對話？歡迎聯絡，我們將在一個工作天內回覆您。",
    },
    name:    { en: "Edward Fong",      tc: "方寶樂" },
    phone:   "5744 9594",
    email:   "edwardfongpolok@gmail.com",
    website: "www.3formco.com.hk",
    form_name:    { en: "Your Name",   tc: "您的姓名" },
    form_email:   { en: "Your Email",  tc: "您的電郵" },
    form_message: { en: "Your Message", tc: "您的訊息" },
    form_send:    { en: "Send Message", tc: "發送訊息" },
    form_sending: { en: "Sending…",     tc: "發送中…" },
    sent_endpoint_heading: { en: "Message sent!", tc: "訊息已發送！" },
    sent_endpoint_body:    { en: "We will get back to you shortly.", tc: "我們將盡快回覆您。" },
    sent_mailto_heading:   { en: "Opening your email client…", tc: "正在開啟您的電郵程式…" },
    sent_mailto_body: {
      en: "We've prepared your message for edwardfongpolok@gmail.com. If nothing opened, please email us directly.",
      tc: "我們已為您準備好發送至 edwardfongpolok@gmail.com 的郵件。如未有反應，請直接發送電郵給我們。",
    },
    error_heading: { en: "Something went wrong", tc: "發生錯誤" },
    error_body: {
      en: "We couldn't send that. Please email us directly at edwardfongpolok@gmail.com.",
      tc: "訊息未能發送，請直接發送電郵至 edwardfongpolok@gmail.com。",
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
    // To add a partner: add an object below.
    // imgUrl: put the path to the logo file here, e.g. "/logos/hkpc.png"
    //         Leave as "" to show the fallback text plate instead.
    items: [
      { id: 1,  name: "HKPC",           shortName: "HKPC",      imgUrl: "/logos/hkpc.png",           desc: { en: "Hong Kong Productivity Council",       tc: "香港生產力促進局" } },
      { id: 2,  name: "Cognex",         shortName: "COGNEX",    imgUrl: "/logos/cognex.png",         desc: { en: "Machine Vision & Barcode Solutions",   tc: "機器視覺及條碼解決方案" } },
      { id: 3,  name: "HKSTP",          shortName: "HKSTP",     imgUrl: "/logos/stp.png",            desc: { en: "Hong Kong Science & Technology Parks Corporation", tc: "香港科技園公司" } },
      { id: 4,  name: "HKQAA",          shortName: "HKQAA",     imgUrl: "/logos/hkqaa.png",          desc: { en: "Hong Kong Quality Assurance Agency",   tc: "香港品質保證局" } },
      { id: 5,  name: "SGS",            shortName: "SGS",       imgUrl: "/logos/sgs.png",            desc: { en: "Testing, Inspection & Certification",  tc: "測試、檢驗及認證" } },
      { id: 6,  name: "Bureau Veritas", shortName: "BV",        imgUrl: "/logos/bureau-veritas.png", desc: { en: "Testing & Certification Body",         tc: "測試及認證機構" } },
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
          body:  { en: "By accessing and using www.3formco.com.hk ('the Website'), you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Website.", tc: "您訪問及使用 www.3formco.com.hk（「本網站」）即表示您接受並同意受本使用條款約束。如您不同意本條款，請勿使用本網站。" },
        },
        {
          title: { en: "2. Use of Content", tc: "2. 內容使用" },
          body:  { en: "All content on this Website, including text, graphics, logos, and images, is the property of 3form Co and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.", tc: "本網站上的所有內容，包括文字、圖形、標誌及圖像，均為 3form Co 的財產，受適用知識產權法律保護。未經我們事先書面同意，您不得複製、分發或創建衍生作品。" },
        },
        {
          title: { en: "3. Disclaimer", tc: "3. 免責聲明" },
          body:  { en: "The information provided on this Website is for general informational purposes only. 3form Co makes no representations or warranties of any kind regarding the accuracy or completeness of information on the Website.", tc: "本網站提供的資訊僅供一般參考之用。3form Co 對本網站上資訊的準確性或完整性不作任何形式的聲明或保證。" },
        },
        {
          title: { en: "4. Limitation of Liability", tc: "4. 責任限制" },
          body:  { en: "3form Co shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, this Website or its content.", tc: "3form Co 對因您使用或無法使用本網站或其內容而引起的任何直接、間接、附帶或後果性損害概不負責。" },
        },
        {
          title: { en: "5. Governing Law", tc: "5. 適用法律" },
          body:  { en: "These Terms of Use shall be governed by and construed in accordance with the laws of the Hong Kong Special Administrative Region.", tc: "本使用條款應受香港特別行政區法律管轄並依其詮釋。" },
        },
        {
          title: { en: "6. Changes to Terms", tc: "6. 條款變更" },
          body:  { en: "3form Co reserves the right to modify these terms at any time. Continued use of the Website after changes constitutes acceptance of the new terms.", tc: "3form Co 保留隨時修改本條款的權利。在條款變更後繼續使用本網站即表示接受新條款。" },
        },
      ],
    },

    privacy: {
      heading: { en: "Privacy Policy", tc: "私隱政策" },
      updated: { en: "Last updated: January 2025", tc: "最後更新：2025年1月" },
      // Content modelled on the Federation of Hong Kong Industries privacy policy structure
      // Reference: https://www.industryhk.org/tc/privacy-policy/
      sections: [
        {
          title: { en: "General", tc: "一般聲明" },
          body: {
            en: "3form Co is committed to protecting the privacy of visitors to www.3formco.com.hk ('the Website'). In general, you can browse this Website without providing any personal data about yourself. We do not require you to register to access general information on the Website.",
            tc: "3form Co 致力保護瀏覽 www.3formco.com.hk（「本網站」）人士的私隱。一般而言，您可在無需提供任何個人資料的情況下瀏覽本網站。您毋須登記即可查閱本網站上的一般資訊。",
          },
        },
        {
          title: { en: "Cookies and Automatic Data Collection", tc: "Cookies 及自動資料收集" },
          body: {
            en: "Like most websites, this Website uses cookies to record visit data. Information collected automatically may include your browser type, operating system, IP address, and domain name. This information is used solely for general statistical analysis to improve the Website and does not identify you personally.",
            tc: "與大多數網站一樣，本網站使用 Cookies 記錄訪問資料。自動收集的資訊可能包括您的瀏覽器類型、作業系統、IP地址及域名。這些資訊僅用於一般統計分析以改善本網站，不會識別您的個人身份。",
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
            en: "Personal data collected is used to respond to your enquiries and to provide the consulting services you have requested. With your consent, data may also be used to send you information about our services. You may opt out of receiving such communications at any time by contacting us at edwardfongpolok@gmail.com.",
            tc: "所收集的個人資料用於回應您的查詢及提供您所要求的顧問服務。在獲得您同意的情況下，資料亦可能用於向您發送有關我們服務的資訊。您可隨時發送電郵至 edwardfongpolok@gmail.com 選擇退出接收此類通訊。",
          },
        },
        {
          title: { en: "Security", tc: "資料安全" },
          body: {
            en: "We implement appropriate technical and organisational measures to protect personal data against unauthorised access, disclosure, alteration, or destruction. Only authorised personnel have access to personal data held by 3form Co.",
            tc: "我們採取適當的技術及組織措施，保護個人資料免遭未經授權的訪問、披露、更改或銷毀。只有獲授權人員方可訪問 3form Co 持有的個人資料。",
          },
        },
        {
          title: { en: "Disclosure to Third Parties", tc: "向第三方披露" },
          body: {
            en: "We do not sell or trade your personal data. Data may be shared with third-party service providers or technical staff who assist in operating the Website or delivering our services, and with parties required by law. Such parties are required to maintain the confidentiality of your data. 3form Co is not responsible for the privacy practices of external websites linked from this Website.",
            tc: "我們不會出售或交易您的個人資料。資料可能與協助運營本網站或提供服務的第三方服務供應商或技術人員共享，以及與法律規定的各方共享。此類各方須對您的資料保密。3form Co 對本網站所連結的外部網站的私隱慣例概不負責。",
          },
        },
        {
          title: { en: "Your Rights under the Personal Data (Privacy) Ordinance", tc: "您在《個人資料（私隱）條例》下的權利" },
          body: {
            en: "Under the Personal Data (Privacy) Ordinance (Cap. 486) of Hong Kong, you have the right to request access to and correction of your personal data held by us. To make a data access or correction request, please write to us at edwardfongpolok@gmail.com.",
            tc: "根據香港《個人資料（私隱）條例》（第486章），您有權要求查閱及更正我們持有的您的個人資料。如需提出查閱或更正資料的申請，請發送電郵至 edwardfongpolok@gmail.com 與我們聯絡。",
          },
        },
        {
          title: { en: "Changes to This Policy", tc: "政策變更" },
          body: {
            en: "3form Co reserves the right to amend this Privacy Policy at any time. Any changes will be posted on this page. We recommend that you check this page periodically for updates.",
            tc: "3form Co 保留隨時修改本私隱政策的權利。任何更改將發佈於本頁面。建議您定期查閱本頁面以了解最新資訊。",
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
      en: "© 2025 3form Co. All rights reserved.",
      tc: "© 2025 3form Co. 版權所有。",
    },
    domain: "www.3formco.com.hk",
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
