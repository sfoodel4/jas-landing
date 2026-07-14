// ══════════════════════════════════════════════════════════════════
//   i18n — EN / AR catalog.
//   Technical strings (terminal, code, system output) stay English.
//   Brand wordmark "JAS AGENTS" and product names stay Latin.
// ══════════════════════════════════════════════════════════════════

const I18N = {
  en: {
    // Nav
    "nav.tagline":      "INTELLIGENCE ORCHESTRATED",
    "nav.products":     "Products",
    "nav.manifest":     "Manifest",
    "nav.primitives":   "Primitives",
    "nav.studio":       "Studio",
    "nav.journal":      "Journal",
    "nav.pricing":      "Pricing",
    "nav.cta":          "Begin →",

    // Nav — product menu
    "product.omnibox.tag":    "INBOX",
    "product.omnibox.desc":   "One smart inbox for every channel — AI that replies 24/7",
    "product.orchestra.tag":  "DISPATCH",
    "product.orchestra.desc": "Last-mile delivery — dispatched and watched",

    // Hero marginalia
    "hero.vol":         "VOL. I  ·  ISSUE 04",
    "hero.broadside":   "THE JAS BROADSIDE",
    "hero.day":         "THURSDAY  ·  PRINT & DIGITAL",

    // Headline
    "hero.h_an":        "An",
    "hero.h_operating": "operating",
    "hero.h_sysfor":    "system for",
    "hero.h_intel":     "intelligent",
    "hero.h_agents":    "agents.",

    // Lede — rendered as drop-cap (first letter) + rest
    "hero.lede_cap":    "J",
    "hero.lede_rest":   "AS orchestrates fleets of AI agents that think, coordinate, and act — from the first message to the last mile — in real time, at enterprise scale. Deterministic at the edges. Fluid inside.",

    // Buttons
    "hero.cta_primary":   "Deploy an agent →",
    "hero.cta_secondary": "Read the manifest",

    // Stats
    "hero.stat.dispatched": "AGENTS DISPATCHED",
    "hero.stat.latency":    "MEDIAN LATENCY",
    "hero.stat.regions":    "REGIONS",
    "hero.stat.production": "ON PRODUCTION",
    "hero.stat.firms":      "340+ FIRMS",

    // Hero bottom marginalia
    "hero.plate":           "PLATE 001 — THE MASTHEAD",
    "hero.continued":       "CONTINUED ON PLATE 002 ↓",

    // LogoStrip
    "logo.inprod":          "IN PRODUCTION",
    "logo.with":            "WITH",

    // ── Fleet section (the two products) ──
    "fleet.section":        "§ II  ·  THE FLEET",
    "fleet.fig":            "TWO AGENTS · IN PRODUCTION",
    "fleet.h1":             "Two agents.",
    "fleet.h2":             "One fleet.",
    "fleet.body":           "JAS ships two agents in production today — one runs the conversation, one runs the delivery. The same apparatus underneath; different work at the edge.",

    // Fleet — OmniBox plate
    "fleet.omnibox.plate":   "PLATE 002",
    "fleet.omnibox.tag":     "OMNIBOX · CX",
    "fleet.omnibox.name":    "OmniBox",
    "fleet.omnibox.tagline": "Every conversation. One smart inbox.",
    "fleet.omnibox.body":    "Every channel your customers use — Instagram, WhatsApp, Facebook, Telegram, web chat — in a single inbox. An agent trained on your business answers in seconds, around the clock, in any language — and hands to a human the moment it should.",
    "fleet.omnibox.cap1":    "AI replies, 24/7",
    "fleet.omnibox.cap2":    "Verified before it sends",
    "fleet.omnibox.cap3":    "Trained on your own content",
    "fleet.omnibox.cap4":    "Comments turned into leads",
    "fleet.omnibox.s1k":     "REPLY TIME",
    "fleet.omnibox.s1v":     "<1s",
    "fleet.omnibox.s2k":     "CHANNELS",
    "fleet.omnibox.s2v":     "7",
    "fleet.omnibox.s3k":     "TO LAUNCH",
    "fleet.omnibox.s3v":     "1 DAY",
    "fleet.omnibox.cta":     "Open OmniBox →",

    // Fleet — Orchestra plate
    "fleet.orchestra.plate":   "PLATE 003",
    "fleet.orchestra.tag":     "ORCHESTRA · LAST-MILE",
    "fleet.orchestra.name":    "Orchestra AI",
    "fleet.orchestra.tagline": "Every order routed. Every delivery watched.",
    "fleet.orchestra.body":    "A control tower for last-mile delivery — on-demand and next-day. Orders arrive from every channel; Orchestra routes each to the right provider by zone, distance and value, then watches every order and escalates the moment one stalls.",
    "fleet.orchestra.cap1":    "Smart auto-dispatch",
    "fleet.orchestra.cap2":    "Live SLA watchdog",
    "fleet.orchestra.cap3":    "Every channel, one board",
    "fleet.orchestra.cap4":    "On-demand + scheduled",
    "fleet.orchestra.s1k":     "ORDERS / MO",
    "fleet.orchestra.s1v":     "15K+",
    "fleet.orchestra.s2k":     "WATCHDOG",
    "fleet.orchestra.s2v":     "<60s",
    "fleet.orchestra.s3k":     "BILINGUAL",
    "fleet.orchestra.s3v":     "AR · EN",
    "fleet.orchestra.cta":     "See Orchestra →",

    // ── The Agents (merged interactive picker) ──
    "agents.section": "§ II  ·  THE AGENTS",
    "agents.fig":     "SELECT AN AGENT · CLICK TO SWITCH",

    // ── OmniBox deep-dive ──
    "ob.section":     "§ II  ·  OMNIBOX",
    "ob.fig":         "FIGURE 01  ·  THE REPLY PIPELINE",
    "ob.h_a":         "AI you can put in front of",
    "ob.h_b":         "real customers.",
    "ob.body":        "The fear with AI is that it says the wrong thing. OmniBox is built so it can't — every reply is grounded in your own content, checked for accuracy, polished, and passed through your guardrails before it ever sends.",
    "ob.flow1.step":  "KNOWLEDGE",
    "ob.flow1.t":     "Grounded answers",
    "ob.flow1.d":     "Replies come only from your knowledge base — facts are never invented.",
    "ob.flow2.step":  "DRAFT",
    "ob.flow2.t":     "Tone beautifier",
    "ob.flow2.d":     "Wording and formatting are polished to read perfectly on every channel.",
    "ob.flow3.step":  "VERIFY",
    "ob.flow3.t":     "Reply verification",
    "ob.flow3.d":     "Every answer is quality-checked for accuracy before it sends.",
    "ob.flow4.step":  "SEND",
    "ob.flow4.t":     "Safety guardrails",
    "ob.flow4.d":     "A baseline blocks unsafe or off-policy content — you set the rules.",
    "ob.channels.k":  "SEVEN CHANNELS · ONE INBOX",
    "ob.prob.k":      "THE PROBLEM",
    "ob.prob.line":   "Customers message you on six apps at once, expect an answer in minutes, and drift to a competitor after hours. No team keeps up by hand.",
    "ob.prob1.v": "6+",    "ob.prob1.k": "channels to watch",
    "ob.prob2.v": "78%",   "ob.prob2.k": "buy from who replies first",
    "ob.prob3.v": "5 min", "ob.prob3.k": "attention before they leave",
    "ob.prob4.v": "24/7",  "ob.prob4.k": "and no one is awake",
    "ob.cap.k":       "WHAT'S INSIDE",
    "ob.cap1.tag": "AGENT",      "ob.cap1.t": "Replies like your best employee", "ob.cap1.d": "Trained on your business, on-brand, around the clock — and it knows when to hand off to a human.",
    "ob.cap2.tag": "KNOWLEDGE",  "ob.cap2.t": "Teach it once",                   "ob.cap2.d": "Upload PDFs, price lists and FAQs. Update once and every answer updates. It flags what it didn't know.",
    "ob.cap3.tag": "MULTIMODAL", "ob.cap3.t": "Voice, image, any language",      "ob.cap3.d": "Reads voice notes and screenshots, detects the customer's language, and replies in it.",
    "ob.cap4.tag": "INBOX",      "ob.cap4.t": "One shared workspace",            "ob.cap4.d": "Every channel and full history on one screen — triage, SLA timers, notes and clean handoffs.",
    "ob.cap5.tag": "FLOW",       "ob.cap5.t": "Design the journey",             "ob.cap5.d": "A visual, no-code canvas to shape exactly how the agent asks and acts. A premium tier.",
    "ob.cap6.tag": "GROWTH",     "ob.cap6.t": "Turn chats into customers",       "ob.cap6.d": "AI content and scheduling, comment-to-DM automation, and a simple CRM — leads captured for you.",
    "ob.cmp.old":     "THE OLD WAY",
    "ob.cmp.new":     "WITH OMNIBOX",
    "ob.cmp1.a": "Six apps, six logins",            "ob.cmp1.b": "One inbox, one screen",
    "ob.cmp2.a": "Generic bots that go off-script", "ob.cmp2.b": "Trained on you, verified before it sends",
    "ob.cmp3.a": "Replies in hours, or never",      "ob.cmp3.b": "Instant replies, around the clock",
    "ob.cmp4.a": "Comments left unanswered",        "ob.cmp4.b": "Every comment becomes a lead",
    "ob.cmp5.a": "No idea what's working",          "ob.cmp5.b": "Clear analytics and ROI",

    // ── Orchestra deep-dive ──
    "or.section":     "§ III  ·  ORCHESTRA",
    "or.fig":         "FIGURE 02  ·  ORDER LIFECYCLE",
    "or.h_a":         "From placed to delivered —",
    "or.h_b":         "watched the whole way.",
    "or.body":        "Orders arrive from every channel into one board. Orchestra decides who delivers — by zone, distance, value and payment — hands the order off, and then watches. If one stalls, it escalates on its own.",
    "or.flow1.step":  "INTAKE",
    "or.flow1.t":     "Every channel",
    "or.flow1.d":     "WhatsApp, call-center, voice and POS — into one board.",
    "or.flow2.step":  "ROUTE",
    "or.flow2.t":     "Smart auto-dispatch",
    "or.flow2.d":     "Picks the provider by zone, distance, value and payment.",
    "or.flow3.step":  "HANDOFF",
    "or.flow3.t":     "The right provider",
    "or.flow3.d":     "Hands off to Careem, Talabat or your own fleet.",
    "or.flow4.step":  "WATCH",
    "or.flow4.t":     "SLA watchdog",
    "or.flow4.d":     "Watches every order and escalates the moment it stalls.",
    "or.watchdog.k":  "WATCHDOG · IF AN ORDER STALLS",
    "or.rung1":       "AI voice call",
    "or.rung2":       "WhatsApp nudge",
    "or.rung3":       "Supervisor handoff",
    "or.prob.k":      "THE OLD WAY",
    "or.prob.line":   "Orders arrive on four channels with four sets of rules, no shared history and no safety net. The operator becomes a human router and a human alarm clock across four screens.",
    "or.prob1.v": "4",    "or.prob1.k": "channels, four rule sets",
    "or.prob2.v": "0",    "or.prob2.k": "shared order history",
    "or.prob3.v": "100%", "or.prob3.k": "routing & chasing by hand",
    "or.cap.k":       "WHAT'S INSIDE",
    "or.cap1.tag": "CONTROL TOWER", "or.cap1.t": "One board, every order",    "or.cap1.d": "Every order from every channel on one live screen, through a single strict lifecycle — placed to delivered.",
    "or.cap2.tag": "ROUTING",       "or.cap2.t": "Deterministic dispatch",    "or.cap2.d": "Rules pick the provider by zone, distance, value and payment. Every decision recorded and explainable.",
    "or.cap3.tag": "WATCHDOG",      "or.cap3.t": "An automatic alarm",        "or.cap3.d": "Sweeps every order, re-checks the provider to avoid false alarms, and escalates stuck ones up a three-rung ladder.",
    "or.cap4.tag": "INTAKE",        "or.cap4.t": "Every channel in",          "or.cap4.d": "WhatsApp, a Careem channel, call-center receipt capture and voice — all become orders on the board.",
    "or.cap5.tag": "TENANT",        "or.cap5.t": "Many brands, zero leakage", "or.cap5.d": "Multi-tenant by design with role-based access — one client never sees another's orders.",
    "or.cap6.tag": "SCALE",         "or.cap6.t": "Built for the rush",        "or.cap6.d": "Engineered for a thousand orders an hour. Bilingual Arabic and English, RTL, COD-ready for MENA.",
    "or.cmp.old":     "THE OLD WAY",
    "or.cmp.new":     "WITH ORCHESTRA",
    "or.cmp1.a": "Four screens, four rule sets", "or.cmp1.b": "One board, one rulebook",
    "or.cmp2.a": "Routing decided by hand",      "or.cmp2.b": "Routed automatically, and recorded",
    "or.cmp3.a": "Stuck orders found too late",  "or.cmp3.b": "The watchdog escalates on its own",
    "or.cmp4.a": "No shared order history",      "or.cmp4.b": "Every order, full timeline",
    "or.cmp5.a": "Drivers chased by phone",      "or.cmp5.b": "Escalation: call, message, supervisor",

    // Engine section
    "engine.section":       "§ IV  ·  APPARATUS",
    "engine.fig":           "FIGURE 03  ·  DRAG TO INSPECT",
    "engine.h_pre":         "A",
    "engine.h_mechanism":   "mechanism",
    "engine.h_not":         "not a model.",
    "engine.body":          "Every JAS agent is built on the same apparatus — six primitives bolted together like parts of a precision instrument. Memory substrate. Fleet coordinator. Tool registry. Trace recorder. Stream router. Policy gate.",
    "engine.quote":         "“It is the composition, not the component, that produces intelligence.”",
    "engine.source":        "— FROM THE JAS MANIFEST, 2026",

    // Muthur section
    "muthur.section":       "§ III  ·  INTERROGATION",
    "muthur.h1a":           "Six primitives",
    "muthur.h1b":           "Interrogate",
    "muthur.h1c":           "the machine.",
    "muthur.body":          "MU/TH/UR responds to queries. Select a subsystem; the transcript prints to the paper.",

    // Terminal section
    "terminal.section":     "§ IV  ·  LIVE LOG",
    "terminal.h1":          "What an agent",
    "terminal.h2":          "actually",
    "terminal.h3":          "does.",
    "terminal.body":        "OmniBox answers conversations across every channel; Orchestra dispatches and watches every delivery. Real production traces below — each line a decision committed to the ledger.",
    "terminal.cat.reply":    "REPLIES",
    "terminal.cat.voice":    "VOICE",
    "terminal.cat.comment":  "COMMENTS",
    "terminal.cat.dispatch": "DISPATCH",
    "terminal.cat.watchdog": "WATCHDOG",
    "terminal.cat.intake":   "INTAKE",
    "terminal.cat.creembox": "CREEMBOX",

    // CTA section
    "cta.section":          "§ V  ·  COLOPHON",
    "cta.h1":               "Build the agents",
    "cta.h2":               "your enterprise",
    "cta.h3":               "already needed.",
    "cta.body":             "Free on the workbench. Paid only when an agent ships. The apparatus is waiting — bring your use case.",
    "cta.btn_primary":      "Take the workbench →",
    "cta.btn_secondary":    "Talk to the pressmen",
    "cta.stamp":            "APPROVED FOR PRESS",

    // Footer
    "footer.location":      "SAN FRANCISCO · REMOTE",
    "footer.copy":          "© MMXXVI. Printed on the finest paper-thin latency budgets.",
    "footer.docs":          "Docs",
    "footer.status":        "Status",
    "footer.terms":         "Terms",
    "footer.privacy":       "Privacy",
    "footer.refund":        "Refunds",
    "footer.cancellation":  "Cancellation",
    "footer.delivery":      "Delivery",
    "footer.accept":        "WE ACCEPT",
  },

  ar: {
    // Nav
    "nav.tagline":      "ذكاء منسَّق",
    "nav.products":     "المنتجات",
    "nav.manifest":     "البيان",
    "nav.primitives":   "العناصر",
    "nav.studio":       "الاستوديو",
    "nav.journal":      "السجل",
    "nav.pricing":      "الأسعار",
    "nav.cta":          "ابدأ ←",

    // Nav — product menu
    "product.omnibox.tag":    "INBOX",
    "product.omnibox.desc":   "صندوقٌ ذكيٌّ لكل قناة — وكيلٌ يردّ على مدار الساعة",
    "product.orchestra.tag":  "DISPATCH",
    "product.orchestra.desc": "توصيل الميل الأخير — إرسالٌ ومراقبة",

    // Hero marginalia
    "hero.vol":         "المجلد ١  ·  العدد ٠٤",
    "hero.broadside":   "نشرة جاس",
    "hero.day":         "الخميس  ·  مطبوع ورقمي",

    // Headline — Arabic reads as one flowing sentence
    "hero.h_an":        "نظامُ",
    "hero.h_operating": "تشغيلٍ",
    "hero.h_sysfor":    "للوكلاء",
    "hero.h_intel":     "الذكيين",
    "hero.h_agents":    ".",

    // Lede — drop-cap letter in Arabic
    "hero.lede_cap":    "ت",
    "hero.lede_rest":   "ُنسّق جاس أساطيلَ من الوكلاء الأذكياء الذين يفكّرون ويتنسّقون ويتصرّفون — من أول رسالةٍ إلى آخر ميل — في الوقت الحقيقي، على مستوى المؤسسات. حتميٌّ عند الأطراف. مرنٌ في الداخل.",

    // Buttons
    "hero.cta_primary":   "انشر وكيلًا ←",
    "hero.cta_secondary": "اقرأ البيان",

    // Stats
    "hero.stat.dispatched": "الوكلاء المُرسَلون",
    "hero.stat.latency":    "زمن الاستجابة الوسيط",
    "hero.stat.regions":    "المناطق",
    "hero.stat.production": "في الإنتاج",
    "hero.stat.firms":      "٣٤٠+ شركة",

    // Hero bottom marginalia
    "hero.plate":           "اللوحة ٠٠١ — رأس الصحيفة",
    "hero.continued":       "متابعة في اللوحة ٠٠٢ ↓",

    // LogoStrip
    "logo.inprod":          "في الإنتاج",
    "logo.with":            "مع",

    // ── Fleet section (the two products) ──
    "fleet.section":        "§ II  ·  الأسطول",
    "fleet.fig":            "وكيلان · في الإنتاج",
    "fleet.h1":             "وكيلان.",
    "fleet.h2":             "أسطولٌ واحد.",
    "fleet.body":           "تشحن جاس وكيلين في الإنتاج اليوم — واحدٌ يدير المحادثة، وآخر يدير التوصيل. الجهاز ذاته في الأساس؛ وعملٌ مختلفٌ عند الطرف.",

    // Fleet — OmniBox plate
    "fleet.omnibox.plate":   "اللوحة ٠٠٢",
    "fleet.omnibox.tag":     "OMNIBOX · CX",
    "fleet.omnibox.name":    "OmniBox",
    "fleet.omnibox.tagline": "كل محادثة. صندوقٌ واحدٌ ذكي.",
    "fleet.omnibox.body":    "كل قناةٍ يستخدمها عملاؤك — إنستغرام، واتساب، فيسبوك، تيليغرام، ومحادثة الويب — في صندوقٍ واحد. وكيلٌ مدرَّبٌ على عملك يجيب خلال ثوانٍ، على مدار الساعة، بأي لغة — ويسلّم المحادثة إلى موظفٍ بشري في اللحظة المناسبة.",
    "fleet.omnibox.cap1":    "ردودٌ آليّة، ٢٤/٧",
    "fleet.omnibox.cap2":    "تدقيقٌ قبل الإرسال",
    "fleet.omnibox.cap3":    "مدرَّبٌ على محتواك",
    "fleet.omnibox.cap4":    "تعليقاتٌ تتحوّل إلى عملاء",
    "fleet.omnibox.s1k":     "زمن الرد",
    "fleet.omnibox.s1v":     "<1s",
    "fleet.omnibox.s2k":     "القنوات",
    "fleet.omnibox.s2v":     "7",
    "fleet.omnibox.s3k":     "حتى الإطلاق",
    "fleet.omnibox.s3v":     "يوم واحد",
    "fleet.omnibox.cta":     "افتح OmniBox ←",

    // Fleet — Orchestra plate
    "fleet.orchestra.plate":   "اللوحة ٠٠٣",
    "fleet.orchestra.tag":     "ORCHESTRA · LAST-MILE",
    "fleet.orchestra.name":    "Orchestra AI",
    "fleet.orchestra.tagline": "كل طلبٍ موجَّه. كل تسليمٍ مُراقَب.",
    "fleet.orchestra.body":    "برج تحكّمٍ للتوصيل في الميل الأخير — عند الطلب وفي اليوم التالي. تصل الطلبات من كل قناة؛ يوجّه أوركسترا كلَّ طلبٍ إلى المزوّد المناسب حسب المنطقة والمسافة والقيمة، ثم يراقب كل طلبٍ ويصعّد في اللحظة التي يتعثّر فيها.",
    "fleet.orchestra.cap1":    "توجيهٌ تلقائيٌّ ذكي",
    "fleet.orchestra.cap2":    "مراقبةٌ حيّة للمهلة",
    "fleet.orchestra.cap3":    "كل القنوات، لوحةٌ واحدة",
    "fleet.orchestra.cap4":    "عند الطلب + مجدوَل",
    "fleet.orchestra.s1k":     "الطلبات شهريًا",
    "fleet.orchestra.s1v":     "15K+",
    "fleet.orchestra.s2k":     "المراقبة",
    "fleet.orchestra.s2v":     "<60s",
    "fleet.orchestra.s3k":     "بِلُغتين",
    "fleet.orchestra.s3v":     "AR · EN",
    "fleet.orchestra.cta":     "شاهد Orchestra ←",

    // ── The Agents (merged interactive picker) ──
    "agents.section": "§ II  ·  الوكلاء",
    "agents.fig":     "اختر وكيلًا · انقر للتبديل",

    // ── OmniBox deep-dive ──
    "ob.section":     "§ II  ·  OMNIBOX",
    "ob.fig":         "الشكل ٠١  ·  مسار الرد",
    "ob.h_a":         "ذكاءٌ يمكنك وضعه أمام",
    "ob.h_b":         "عملائك الحقيقيين.",
    "ob.body":        "الخوف من الذكاء الاصطناعي أن يقول الخطأ. صُمِّم OmniBox كي لا يستطيع — كل ردٍّ مبنيٌّ على محتواك، مُدقَّقٌ للدقّة، مصقولٌ، ويمرّ عبر ضوابطك قبل أن يُرسَل.",
    "ob.flow1.step":  "KNOWLEDGE",
    "ob.flow1.t":     "إجاباتٌ موثَّقة",
    "ob.flow1.d":     "الردود من قاعدة معرفتك فقط — لا اختلاق للحقائق.",
    "ob.flow2.step":  "DRAFT",
    "ob.flow2.t":     "تجميل النبرة",
    "ob.flow2.d":     "تُصقل الصياغة والتنسيق لتظهر مثاليّةً على كل قناة.",
    "ob.flow3.step":  "VERIFY",
    "ob.flow3.t":     "تحقّقٌ من الرد",
    "ob.flow3.d":     "كل إجابةٍ تُفحص للدقّة قبل أن تُرسَل.",
    "ob.flow4.step":  "SEND",
    "ob.flow4.t":     "ضوابط أمان",
    "ob.flow4.d":     "خطٌّ أساسٌ يحجب المحتوى غير الآمن أو المخالف — أنت تضع القواعد.",
    "ob.channels.k":  "سبع قنوات · صندوق واحد",
    "ob.prob.k":      "المشكلة",
    "ob.prob.line":   "يراسلك العملاء على ستة تطبيقاتٍ في آنٍ واحد، ويتوقّعون ردًّا خلال دقائق، ثم ينصرفون إلى منافسٍ بعد ساعات العمل. لا فريقَ يلحق بذلك يدويًّا.",
    "ob.prob1.v": "+6",    "ob.prob1.k": "قنوات للمتابعة",
    "ob.prob2.v": "78%",   "ob.prob2.k": "يشترون ممّن يردّ أولًا",
    "ob.prob3.v": "5 min", "ob.prob3.k": "انتباهٌ قبل أن يغادروا",
    "ob.prob4.v": "24/7",  "ob.prob4.k": "ولا أحدَ مستيقظ",
    "ob.cap.k":       "ما بالداخل",
    "ob.cap1.tag": "AGENT",      "ob.cap1.t": "يردّ كأفضل موظّفيك",       "ob.cap1.d": "مدرَّبٌ على عملك، بنبرتك، على مدار الساعة — ويعرف متى يسلّم لموظفٍ بشري.",
    "ob.cap2.tag": "KNOWLEDGE",  "ob.cap2.t": "علّمه مرّةً واحدة",         "ob.cap2.d": "ارفع ملفّات PDF وقوائم الأسعار والأسئلة الشائعة. حدّث مرّةً فتتحدّث كل الردود، ويرصد ما لم يعرفه.",
    "ob.cap3.tag": "MULTIMODAL", "ob.cap3.t": "صوتٌ وصورةٌ وأيُّ لغة",     "ob.cap3.d": "يقرأ الرسائل الصوتية ولقطات الشاشة، ويكتشف لغة العميل ويردّ بها.",
    "ob.cap4.tag": "INBOX",      "ob.cap4.t": "مساحةُ عملٍ واحدة",         "ob.cap4.d": "كل قناةٍ وكامل السجلّ على شاشةٍ واحدة — فرزٌ ومؤقّتات مهلةٍ وملاحظاتٌ وتسليمٌ نظيف.",
    "ob.cap5.tag": "FLOW",       "ob.cap5.t": "صمّم رحلة العميل",         "ob.cap5.d": "لوحةٌ مرئيّةٌ بلا كود لتشكيل كيف يسأل الوكيل ويتصرّف بالضبط. باقةٌ متميّزة.",
    "ob.cap6.tag": "GROWTH",     "ob.cap6.t": "حوّل المحادثات إلى عملاء",  "ob.cap6.d": "محتوى وجدولةٌ بالذكاء الاصطناعي، وأتمتةُ التعليقات إلى رسائل، وCRM بسيط — تُلتقط العملاء تلقائيًّا.",
    "ob.cmp.old":     "الطريقة القديمة",
    "ob.cmp.new":     "مع OMNIBOX",
    "ob.cmp1.a": "ستة تطبيقات، ستة حسابات",        "ob.cmp1.b": "صندوقٌ واحد، شاشةٌ واحدة",
    "ob.cmp2.a": "روبوتاتٌ عامّةٌ تخرج عن النص",     "ob.cmp2.b": "مدرَّبٌ عليك، مدقَّقٌ قبل الإرسال",
    "ob.cmp3.a": "ردودٌ بعد ساعات، أو أبدًا",        "ob.cmp3.b": "ردودٌ فوريّة، على مدار الساعة",
    "ob.cmp4.a": "تعليقاتٌ بلا ردّ",                "ob.cmp4.b": "كل تعليقٍ يصبح عميلًا",
    "ob.cmp5.a": "لا تعرف ما الذي ينجح",            "ob.cmp5.b": "تحليلاتٌ واضحةٌ وعائد",

    // ── Orchestra deep-dive ──
    "or.section":     "§ III  ·  ORCHESTRA",
    "or.fig":         "الشكل ٠٢  ·  دورة حياة الطلب",
    "or.h_a":         "من الطلب إلى التسليم —",
    "or.h_b":         "مراقَبٌ طوال الطريق.",
    "or.body":        "تصل الطلبات من كل قناة إلى لوحةٍ واحدة. يقرّر أوركسترا مَن يوصّل — حسب المنطقة والمسافة والقيمة والدفع — يسلّم الطلب، ثم يراقب. وإذا تعثّر طلبٌ، صعّد من تلقاء نفسه.",
    "or.flow1.step":  "INTAKE",
    "or.flow1.t":     "كل قناة",
    "or.flow1.d":     "واتساب، مركز الاتصال، الصوت ونقاط البيع — في لوحةٍ واحدة.",
    "or.flow2.step":  "ROUTE",
    "or.flow2.t":     "توجيهٌ تلقائيٌّ ذكي",
    "or.flow2.d":     "يختار المزوّد حسب المنطقة والمسافة والقيمة والدفع.",
    "or.flow3.step":  "HANDOFF",
    "or.flow3.t":     "المزوّد المناسب",
    "or.flow3.d":     "يسلّم إلى كريم أو طلبات أو أسطولك الخاص.",
    "or.flow4.step":  "WATCH",
    "or.flow4.t":     "مراقبُ المهلة",
    "or.flow4.d":     "يراقب كل طلبٍ ويصعّد في اللحظة التي يتعثّر فيها.",
    "or.watchdog.k":  "المراقب · إذا تعثّر الطلب",
    "or.rung1":       "مكالمة صوتية آلية",
    "or.rung2":       "تنبيه واتساب",
    "or.rung3":       "تحويل إلى المشرف",
    "or.prob.k":      "الطريقة القديمة",
    "or.prob.line":   "تصل الطلبات على أربع قنواتٍ بأربع مجموعات قواعد، بلا سجلٍّ مشترك ولا شبكة أمان. يتحوّل المشغّل إلى موجّهٍ بشريٍّ ومنبّهٍ بشريٍّ عبر أربع شاشات.",
    "or.prob1.v": "4",    "or.prob1.k": "قنوات، أربع مجموعات قواعد",
    "or.prob2.v": "0",    "or.prob2.k": "سجلّ طلباتٍ مشترك",
    "or.prob3.v": "100%", "or.prob3.k": "توجيهٌ ومتابعةٌ يدويّة",
    "or.cap.k":       "ما بالداخل",
    "or.cap1.tag": "CONTROL TOWER", "or.cap1.t": "لوحةٌ واحدة، كل طلب",       "or.cap1.d": "كل طلبٍ من كل قناةٍ على شاشةٍ حيّةٍ واحدة، عبر دورة حياةٍ واحدةٍ صارمة — من الطلب إلى التسليم.",
    "or.cap2.tag": "ROUTING",       "or.cap2.t": "توجيهٌ حتميّ",             "or.cap2.d": "تختار القواعد المزوّد حسب المنطقة والمسافة والقيمة والدفع. كل قرارٍ مسجَّلٌ وقابلٌ للتفسير.",
    "or.cap3.tag": "WATCHDOG",      "or.cap3.t": "منبّهٌ تلقائي",            "or.cap3.d": "يمسح كل طلب، ويعيد التحقّق من المزوّد لتفادي الإنذارات الكاذبة، ويصعّد المتعثّر عبر سلّمٍ من ثلاث درجات.",
    "or.cap4.tag": "INTAKE",        "or.cap4.t": "كل قناةٍ تدخل",            "or.cap4.d": "واتساب، وقناة كريم، والتقاط فواتير مركز الاتصال، والصوت — كلّها تصبح طلباتٍ على اللوحة.",
    "or.cap5.tag": "TENANT",        "or.cap5.t": "علاماتٌ كثيرة، صفرُ تسريب", "or.cap5.d": "متعدّد المستأجرين بالتصميم مع صلاحياتٍ حسب الدور — لا يرى عميلٌ طلبات آخر أبدًا.",
    "or.cap6.tag": "SCALE",         "or.cap6.t": "مبنيٌّ للذروة",            "or.cap6.d": "مُهندَسٌ لألف طلبٍ في الساعة. بالعربية والإنجليزية، يمينًا ليسار، وجاهزٌ للدفع عند الاستلام في المنطقة.",
    "or.cmp.old":     "الطريقة القديمة",
    "or.cmp.new":     "مع ORCHESTRA",
    "or.cmp1.a": "أربع شاشات، أربع قواعد",          "or.cmp1.b": "لوحةٌ واحدة، كتابُ قواعدَ واحد",
    "or.cmp2.a": "توجيهٌ يدويّ",                     "or.cmp2.b": "توجيهٌ تلقائيّ، ومسجَّل",
    "or.cmp3.a": "الطلبات المتعثّرة تُكتشف متأخّرًا", "or.cmp3.b": "المراقب يصعّد من تلقاء نفسه",
    "or.cmp4.a": "لا سجلّ طلباتٍ مشترك",             "or.cmp4.b": "كل طلب، خطٌّ زمنيٌّ كامل",
    "or.cmp5.a": "مطاردةُ السائقين هاتفيًّا",         "or.cmp5.b": "تصعيد: مكالمة، رسالة، مشرف",

    // Engine section
    "engine.section":       "§ IV  ·  الجهاز",
    "engine.fig":           "الشكل ٠٣  ·  اسحب للفحص",
    "engine.h_pre":         "",
    "engine.h_mechanism":   "آلةٌ",
    "engine.h_not":         "لا نموذجٌ.",
    "engine.body":          "كلّ وكيل من وكلاء جاس مبنيٌّ على الجهاز ذاته — ستة عناصر مترابطة كأجزاء آلة دقيقة: ركيزة الذاكرة. منسّق الأسطول. سجل الأدوات. مسجّل الآثار. موجّه البث. بوابة السياسة.",
    "engine.quote":         "«التركيبُ هو ما ينتج الذكاء، لا المكوِّن.»",
    "engine.source":        "— من بيان جاس، ٢٠٢٦",

    // Muthur section
    "muthur.section":       "§ III  ·  الاستجواب",
    "muthur.h1a":           "ستة عناصر أساسية",
    "muthur.h1b":           "استجوِب",
    "muthur.h1c":           "الآلة.",
    "muthur.body":          "تستجيب MU/TH/UR للاستعلامات. اختر نظامًا فرعيًا؛ ستطبع نص الحوار على الورق.",

    // Terminal section
    "terminal.section":     "§ IV  ·  السجل الحي",
    "terminal.h1":          "ما يفعله",
    "terminal.h2":          "فعلاً",
    "terminal.h3":          "الوكيل.",
    "terminal.body":        "يردّ OmniBox على المحادثات عبر كل قناة؛ ويُرسل Orchestra كل طلبٍ ويراقب التسليم. آثار إنتاج حقيقية أدناه — كل سطر قرار مسجّل في السجل.",
    "terminal.cat.reply":    "ردود",
    "terminal.cat.voice":    "مكالمات",
    "terminal.cat.comment":  "تعليقات",
    "terminal.cat.dispatch": "إرسال",
    "terminal.cat.watchdog": "مراقبة",
    "terminal.cat.intake":   "استقبال",
    "terminal.cat.creembox": "كريم بوكس",

    // CTA section
    "cta.section":          "§ V  ·  خاتمة",
    "cta.h1":               "ابنِ الوكلاء",
    "cta.h2":               "التي تحتاجها",
    "cta.h3":               "مؤسستك.",
    "cta.body":             "مجاني في الورشة. الدفع فقط عند شحن الوكيل. الجهاز جاهز — أحضر حالة استخدامك.",
    "cta.btn_primary":      "ابدأ بالورشة ←",
    "cta.btn_secondary":    "تحدث إلى الفريق",
    "cta.stamp":            "معتمد للنشر",

    // Footer
    "footer.location":      "سان فرانسيسكو · عن بُعد",
    "footer.copy":          "© MMXXVI. مطبوع على أرقّ ميزانيات الكمون.",
    "footer.docs":          "التوثيق",
    "footer.status":        "الحالة",
    "footer.terms":         "الشروط",
    "footer.privacy":       "الخصوصية",
    "footer.refund":        "الاسترجاع",
    "footer.cancellation":  "الإلغاء",
    "footer.delivery":      "التسليم",
    "footer.accept":        "نقبل الدفع عبر",
  },
};

// React hook — re-renders when language changes
function useLang() {
  const [lang, setLang] = React.useState(window.__lang || 'en');
  React.useEffect(() => {
    const fn = (l) => setLang(l);
    window.__langSubs.add(fn);
    return () => window.__langSubs.delete(fn);
  }, []);
  const t = React.useCallback((key) => {
    return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
  }, [lang]);
  return { lang, t, isAr: lang === 'ar' };
}

window.useLang = useLang;
window.I18N = I18N;
