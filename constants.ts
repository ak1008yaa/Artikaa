
import { Product, CryptoWallet, Language, Artist, BlogPost } from './types';

export const EXCHANGE_RATE = 400; // 1 USD = 400 AMD (Approx)

export const UI_TEXT: Record<string, Record<Language, string>> = {
  nav_home: {
    EN: "Sanctuary", HY: "Սրբավայր", RU: "Святилище", FA: "پناهگاه"
  },
  nav_collection: {
    EN: "Artifacts", HY: "Նմուշներ", RU: "Артефакты", FA: "آثار هنری"
  },
  nav_about: {
    EN: "Philosophy", HY: "Փիլիսոփայություն", RU: "Философия", FA: "فلسفه"
  },
  nav_blog: {
    EN: "Journal", HY: "Ամսագիր", RU: "Журнал", FA: "وبلاگ"
  },
  nav_support: {
    EN: "Patronage", HY: "Մեկենասություն", RU: "Патронаж", FA: "حامیان"
  },
  nav_contact: {
    EN: "Concierge", HY: "Կոնսիերժ", RU: "Консьерж", FA: "کانسیرج"
  },
  btn_connect: {
    EN: "Acquire", HY: "Ձեռք բերել", RU: "Приобрести", FA: "به دست آوردن"
  },
  btn_signin: {
    EN: "Sign In / Join", HY: "Մուտք / Գրանցում", RU: "Войти", FA: "ورود / ثبت نام"
  },
  hero_title: {
    EN: "Intentional Living", HY: "Գիտակցված Կյանք", RU: "Осознанная Жизнь", FA: "زندگی آگاهانه"
  },
  hero_subtitle: {
    EN: "In an age of ephemeral noise, we curate silence and substance. Authentic Armenian heirlooms, handcrafted to carry a soul and outlast generations.",
    HY: "Աղմուկի դարաշրջանում մենք ընտրում ենք լռությունն ու բովանդակությունը: Հայկական ժառանգություն, որը կրում է ոգի և ստեղծված է սերունդների համար:",
    RU: "В эпоху эфемерного шума мы курируем тишину и суть. Подлинные армянские реликвии, созданные вручную, чтобы нести душу сквозь поколения.",
    FA: "در عصر هیاهوی گذرا، ما سکوت و جوهره را برمی‌گزینیم. میراث اصیل ارمنی، دست‌ساز برای حمل روح و ماندگاری در نسل‌ها."
  },
  about_title: {
    EN: "The Antidote to Fast Living", HY: "Արագ Կյանքի Հակադեղը", RU: "Антидот Быстрой Жизни", FA: "پادزهر زندگی شتاب‌زده"
  },
  about_desc: {
    EN: "We reject the disposable. Artikaa is a movement towards depth. Every object in our gallery is an invitation to slow down, to touch the texture of history, and to bring the sacred focus of the Armenian highlands into your daily ritual. These are not products; they are physical memories.",
    HY: "Մենք մերժում ենք ժամանակավորը: Արտիկան շարժում է դեպի խորություն: Յուրաքանչյուր առարկա հրավեր է դանդաղեցնելու ընթացքը և զգալու պատմությունը:",
    RU: "Мы отвергаем одноразовое. Artikaa — это движение к глубине. Каждый предмет в нашей галерее — это приглашение замедлиться, прикоснуться к текстуре истории.",
    FA: "ما دورریختنی‌ها را رد می‌کنیم. آرتیکا حرکتی به سوی عمق است. هر شیء در گالری ما دعوتی است برای آرام گرفتن و لمس بافت تاریخ."
  },
  support_title: {
    EN: "Direct Patronage", HY: "Ուղիղ Աջակցություն", RU: "Прямая Поддержка", FA: "حمایت مستقیم"
  },
  support_subtitle: {
    EN: "Your acquisition is a direct transfer of energy to the creator. Funds flow immediately to the master artisan, sustaining ancient techniques.",
    HY: "Ձեր գնումը էներգիայի ուղիղ փոխանցում է ստեղծագործողին: Միջոցները ուղղվում են վարպետին՝ պահպանելով հնագույն տեխնիկաները:",
    RU: "Ваше приобретение — это прямая передача энергии творцу. Средства поступают непосредственно мастеру, поддерживая древние техники.",
    FA: "خرید شما انتقال مستقیم انرژی به خالق اثر است. وجوه بلافاصله به استاد صنعتگر منتقل می‌شود و تکنیک‌های باستانی را حفظ می‌کند."
  },
  contact_title: {
    EN: "Private Concierge", HY: "Անձնական Կոնսիերժ", RU: "Личный Консьерж", FA: "کانسیرج خصوصی"
  },
  contact_subtitle: {
    EN: "We assist in the curation of your personal sanctuary.",
    HY: "Մենք օգնում ենք ձևավորել ձեր անձնական սրբավայրը:",
    RU: "Мы помогаем в кураторстве вашего личного святилища.",
    FA: "ما در چیدمان پناهگاه شخصی شما کمک می‌کنیم."
  },
  form_name: { EN: "Name", HY: "Անուն", RU: "Имя", FA: "نام" },
  form_email: { EN: "Email", HY: "Էլ. հասցե", RU: "Email", FA: "ایمیل" },
  form_phone: { EN: "Phone", HY: "Հեռախոս", RU: "Телефон", FA: "شماره تماس" },
  form_subject: { EN: "Inquiry Type", HY: "Հարցման Տեսակ", RU: "Тип Запроса", FA: "نوع درخواست" },
  form_message: { EN: "Your Narrative", HY: "Ձեր Պատմությունը", RU: "Ваша История", FA: "داستان شما" },
  form_send: { EN: "Send Inquiry", HY: "Ուղարկել", RU: "Отправить", FA: "ارسال درخواست" },
  form_register: { EN: "Join the Circle", HY: "Գրանցվել", RU: "Присоединиться", FA: "عضویت در دایره" },
  form_success: { 
    EN: "Your message has been received. We will respond with care.",
    HY: "Ձեր հաղորդագրությունը ստացված է: Մենք կպատասխանենք հոգատարությամբ:",
    RU: "Ваше сообщение получено. Мы ответим с заботой.",
    FA: "پیام شما دریافت شد. ما با دقت پاسخ خواهیم داد."
  },
  checkout_title: { EN: "Secure Acquisition", HY: "Անվտանգ Գնում", RU: "Безопасная Покупка", FA: "خرید ایمن" },
  checkout_address: { EN: "Delivery Address", HY: "Առաքման Հասցե", RU: "Адрес Доставки", FA: "آدرس تحویل" },
  checkout_complete: { EN: "Complete Acquisition", HY: "Ավարտել Գնումը", RU: "Завершить Покупку", FA: "تکمیل خرید" }
};

export const LEGAL_TEXT = {
  terms: {
    title: "Terms & Conditions of Acquisition",
    content: `
      **Last Updated: October 2024**

      **1. Preamble & Philosophy**
      Artikaa is a curator of tangible heritage, acting as the intermediary between Armenian master artisans and the global collector. By accessing our gallery and acquiring items, you acknowledge that you are purchasing unique, handcrafted heirlooms, not mass-produced commodities. These Terms constitute a binding agreement between you ("The Collector") and Artikaa ("The Gallery").

      **2. The Nature of Artisanal Goods**
      - **1-of-1 Guarantee**: Every item listed is unique or part of a strictly limited series.
      - **Inherent Imperfections**: Our collection consists of natural materials (walnut, obsidian, gold, wool). Variations in texture, wood grain, stone inclusions, glaze consistency, and minor dimensional differences are inherent to the handmade process. These are considered marks of authenticity and the "fingerprint" of the artisan, not defects.
      - **Visual Representation**: We strive for absolute fidelity in our photography. However, screen calibrations vary, and the physical object may possess nuances of color and texture not fully captured digitally.

      **3. Ordering & Acceptance**
      - **Offer & Acceptance**: Submitting an order constitutes an offer to purchase. The contract is formed only when Artikaa confirms receipt of full payment and issues an Order Confirmation.
      - **Verification**: For high-value acquisitions, The Gallery reserves the right to contact The Collector to verify identity and shipping details before processing.
      - **Refusal of Service**: We reserve the right to refuse service if we suspect fraudulent activity, or if the item has been sold concurrently through our private offline channels.

      **4. Pricing, Payment & Crypto Protocols**
      - **Currency**: The base currency of our artisans is the Armenian Dram (AMD). USD prices are estimates based on real-time exchange rates.
      - **Cryptocurrency**: We accept BTC, ETH, SOL, and USDT. By paying in crypto, The Collector acknowledges the volatility of these assets. Refunds, if applicable, will be calculated based on the fiat value of the item at the time of purchase, not the token amount.
      - **AML/KYC**: For transactions exceeding $10,000 USD equivalent, Artikaa reserves the right to request Know Your Customer (KYC) documentation in compliance with international Anti-Money Laundering regulations.

      **5. Shipping, Duties & Risk of Loss**
      - **Global Logistics**: We ship worldwide from Yerevan, Armenia, using specialized art logistics partners (e.g., DHL, FedEx, Brinks).
      - **Insurance**: All shipments are fully insured against loss or damage in transit up to the point of delivery signature.
      - **Duties & Taxes (DDU)**: Shipments are sent "Delivered Duty Unpaid" (DDU). The Collector is solely responsible for all customs duties, VAT, and import taxes levied by their local government. 
      - **Risk Transfer**: Risk of loss passes to The Collector upon signature at the delivery address.

      **6. Returns & Cancellation Policy**
      - **Final Sale**: Due to the bespoke, fragile, and high-value nature of our inventory, **all sales are final**. We do not offer returns for "change of mind."
      - **Damaged Goods**: If an item arrives damaged, The Collector must notify our Concierge within 24 hours of delivery with high-resolution photographic evidence. Upon verification, we will facilitate a professional repair or a full refund via insurance claim.
      - **Provenance**: In the event of an approved return, the item must be returned with its original Certificate of Authenticity and bespoke packaging.

      **7. Intellectual Property**
      The Artikaa brand, platform design, and curated content are the property of Artikaa. The specific designs of the artifacts remain the intellectual property of the respective artisans (e.g., Davtian Jewelers, Artikaa Woodworks).

      **8. Governing Law & Dispute Resolution**
      These Terms shall be governed by the laws of the Republic of Armenia. Any disputes arising from these Terms shall be resolved exclusively in the courts of Yerevan.
    `
  },
  privacy: {
    title: "Privacy & Data Protection Policy",
    content: `
      **Effective Date: October 2024**

      **1. Our Commitment to Privacy**
      Artikaa treats your privacy with the same respect we accord our artifacts. We operate on a principle of "Data Minimization"—collecting only what is essential to provide our Concierge and logistics services. We do not monetize your personal data.

      **2. Information We Collect**
      - **Identity Data**: First name, last name, and title.
      - **Contact Data**: Billing address, delivery address, email address, and telephone numbers necessary for shipping.
      - **Transaction Data**: Details about payments (excluding full credit card numbers, which are handled by secure processors) and blockchain wallet addresses used for transfers.
      - **Profile Data**: Your interests in specific art forms (e.g., "Rugs," "Jewelry") to tailor our Concierge recommendations.

      **3. How We Use Your Data**
      - **Order Fulfillment**: To process payments, coordinate shipping, and facilitate customs clearance.
      - **Concierge Services**: To provide "White Glove" support, answer inquiries, and offer personalized curation.
      - **Provenance**: To issue Certificates of Authenticity in your name.
      - **Legal Compliance**: To comply with export regulations of the Republic of Armenia and international tax laws.

      **4. Data Sharing & Disclosure**
      We share data only with:
      - **Logistics Partners**: Couriers (DHL/FedEx) strictly for delivery purposes.
      - **The Artisans**: In limited cases, the artisan may receive the first name of the collector for the purpose of personalizing the work or the Certificate of Authenticity.
      - **Legal Authorities**: If required by law for customs, tax compliance, or AML investigations.

      **5. Blockchain & Anonymity**
      If you choose to pay via Cryptocurrency, please be aware that transactions are recorded on a public blockchain. While we do not publicly link your identity to your wallet address on our site, the nature of the blockchain is transparent and immutable.

      **6. Data Security**
      We employ enterprise-grade encryption (SSL/TLS) for all data in transit. Access to personal client data is restricted to key Artikaa personnel bound by strict confidentiality agreements. We utilize secure third-party payment gateways for all fiat transactions.

      **7. Your Rights (GDPR & CCPA)**
      Regardless of your location, Artikaa extends these rights to all collectors:
      - **Right to Access**: Request a copy of the personal data we hold about you.
      - **Right to Correction**: Request correction of inaccurate data.
      - **Right to Erasure**: Request deletion of your data ("Right to be Forgotten"), subject to mandatory legal record-keeping requirements (e.g., tax audits).

      **8. Contact**
      For any privacy concerns, data requests, or to exercise your rights, please contact our Data Protection Officer at privacy@artikaa.com.
    `
  }
};

export const WALLETS: CryptoWallet[] = [
  { network: 'Solana', token: 'SOL', address: '8x...ArtikaaSol' },
  { network: 'Ethereum', token: 'ETH', address: '0x...ArtikaaEth' },
  { network: 'TRON', token: 'USDT', address: 'T...ArtikaaTron' },
];

export const ARTISTS: Artist[] = [
  {
    id: 'Vardanyan Atelier',
    name: 'Vardanyan Atelier',
    role: 'Contemporary Painters',
    location: 'Yerevan, Armenia',
    bio: {
      EN: "A collective of visionary painters blending traditional Armenian color palettes with surrealist and abstract modernism.",
      HY: "Տեսլական նկարիչների խումբ, որոնք միաձուլում են հայկական ավանդական գունապնակը սյուրռեալիստական ​​և աբստրակտ մոդեռնիզմի հետ:",
      RU: "Коллектив художников-визионеров, смешивающих традиционные армянские цветовые палитры с сюрреалистическим и абстрактным модернизмом.",
      FA: "گروهی از نقاشان نوآور که پالت‌های رنگی سنتی ارمنی را با مدرنیسم سورئالیستی و انتزاعی ترکیب می‌کنند."
    },
    vision: {
      EN: "To capture the subconscious soul on canvas.",
      HY: "Կտավի վրա որսալ ենթագիտակցական հոգին:",
      RU: "Запечатлеть подсознательную душу на холсте.",
      FA: "تسخیر روح ناخودآگاه بر روی بوم."
    },
    portraitUrl: 'https://picsum.photos/seed/artist_portrait/600/600',
    coverUrl: 'https://picsum.photos/seed/artist_cover/1920/800'
  },
  {
    id: 'Davtian Jewelers',
    name: 'Davtian Jewelers',
    role: 'Guardians of Gold',
    location: 'Yerevan, Armenia',
    bio: {
      EN: "In the Davtian workshop, silence is a tool as important as the hammer. For three generations, they have not just shaped metal, but captured light.",
      HY: "Դավթյանների արհեստանոցում լռությունը նույնքան կարևոր է, որքան մուրճը: Երեք սերունդ նրանք ոչ միայն ձևավորում են մետաղը, այլև որսում են լույսը:",
      RU: "В мастерской Давтян тишина так же важна, как и молот. На протяжении трех поколений они не просто придают форму металлу, но ловят свет.",
      FA: "در کارگاه داوتیان، سکوت ابزاری به اندازه چکش مهم است. برای سه نسل، آنها نه تنها به فلز شکل داده‌اند، بلکه نور را تسخیر کرده‌اند."
    },
    vision: {
      EN: "To forge heirlooms that act as anchors in a drifting world.",
      HY: "Կերտել ժառանգություն, որը խարիսխ է այս փոփոխական աշխարհում:",
      RU: "Ковать реликвии, служащие якорями в дрейфующем мире.",
      FA: "ساخت میراثی که به عنوان لنگر در دنیایی شناور عمل می‌کند."
    },
    portraitUrl: 'https://picsum.photos/seed/davtian/600/600',
    coverUrl: 'https://picsum.photos/seed/davtianCover/1920/800'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Waterfall (Round)
  {
    id: 'art-waterfall',
    title: 'Cascade of Serenity',
    category: 'Art',
    priceAMD: 85000,
    dimensions: '30 cm Diameter',
    bentoSize: 'small',
    description: {
      EN: "A circular portal to a pristine cascade. This hand-painted piece captures the eternal flow of water, bringing the calming energy of the forest into your sanctuary.",
      HY: "Շրջանաձև դարպաս դեպի անաղարտ ջրվեժ: Այս ձեռագործ աշխատանքը որսում է ջրի հավերժական հոսքը՝ անտառի հանգստացնող էներգիան բերելով ձեր սրբավայր:",
      RU: "Круглый портал к первозданному каскаду. Эта ручная работа запечатлела вечный поток воды, принося успокаивающую энергию леса в ваше святилище.",
      FA: "دروازه‌ای دایره‌ای به آبشاری بکر. این اثر دست‌ساز جریان ابدی آب را تسخیر می‌کند و انرژی آرام‌بخش جنگل را به پناهگاه شما می‌آورد."
    },
    imageUrl: 'https://picsum.photos/seed/art-waterfall/800/800', 
    stock: 1,
    artist: 'Vardanyan Atelier'
  },
  // 2. Red Tree (Rectangular)
  {
    id: 'art-redtree',
    title: 'Crimson Horizon',
    category: 'Art',
    priceAMD: 120000,
    dimensions: '60 x 40 cm',
    bentoSize: 'medium',
    description: {
      EN: "A vibrant crimson tree stands bold against a calming seascape. A study in contrast between the fiery passion of life and the eternal calm of the ocean.",
      HY: "Վառ կարմրավուն ծառը համարձակորեն կանգնած է հանգիստ ծովային տեսարանի ֆոնին: Հակադրություն կյանքի կրակոտ կրքի և օվկիանոսի հավերժական հանգստության միջև:",
      RU: "Яркое малиновое дерево смело стоит на фоне спокойного морского пейзажа. Исследование контраста между огненной страстью жизни и вечным спокойствием океана.",
      FA: "درختی به رنگ سرخ آتشین در برابر چشم‌انداز آرام دریا ایستاده است. مطالعه‌ای در تضاد بین اشتیاق سوزان زندگی و آرامش ابدی اقیانوس."
    },
    imageUrl: 'https://picsum.photos/seed/art-redtree/800/600',
    stock: 1,
    artist: 'Vardanyan Atelier'
  },
  // 3. Smiley Graffiti (Rectangular)
  {
    id: 'art-smiley',
    title: 'Urban Euphoria',
    category: 'Art',
    priceAMD: 95000,
    dimensions: '60 x 40 cm',
    bentoSize: 'medium',
    description: {
      EN: "Contemporary graffiti art exploring the chaos of modern joy. Layers of pink and melting expressions capture the raw energy of the street.",
      HY: "Ժամանակակից գրաֆիտի արվեստ, որն ուսումնասիրում է ժամանակակից ուրախության քաոսը: Վարդագույն շերտերը արտացոլում են փողոցի հում էներգիան:",
      RU: "Современное граффити, исследующее хаос современной радости. Слои розового и тающие выражения лиц передают сырую энергию улицы.",
      FA: "هنر گرافیتی معاصر که هرج و مرج شادی مدرن را بررسی می‌کند. لایه‌های صورتی و چهره‌های در حال ذوب، انرژی خام خیابان را تسخیر می‌کنند."
    },
    imageUrl: 'https://picsum.photos/seed/art-smiley/800/600',
    stock: 1,
    artist: 'Vardanyan Atelier'
  },
  // 4. Flowers on Black (Rectangular)
  {
    id: 'art-dark-flora',
    title: 'Midnight Bloom',
    category: 'Art',
    priceAMD: 110000,
    dimensions: '60 x 40 cm',
    bentoSize: 'medium',
    description: {
      EN: "Vivid floral life emerging from the void. The stark contrast of red and pink blooms against a pitch-black background symbolizes hope in darkness.",
      HY: "Վառ ծաղկային կյանք, որը ծնվում է դատարկությունից: Կարմիր և վարդագույն ծաղիկների հակադրությունը սև ֆոնի վրա խորհրդանշում է հույսը խավարում:",
      RU: "Яркая цветочная жизнь, возникающая из пустоты. Резкий контраст красных и розовых цветов на черном фоне символизирует надежду во тьме.",
      FA: "حیات پرشور گل‌ها که از خلأ برمی‌خیزد. کنتراست شدید شکوفه‌های سرخ و صورتی در برابر پس‌زمینه سیاه، نماد امید در تاریکی است."
    },
    imageUrl: 'https://picsum.photos/seed/art-dark-flora/800/600',
    stock: 1,
    artist: 'Vardanyan Atelier'
  },
  // 5. Galaxy Triangle
  {
    id: 'art-galaxy-tri',
    title: 'Cosmic Hearth',
    category: 'Art',
    priceAMD: 75000,
    dimensions: '30 cm Base',
    bentoSize: 'small',
    description: {
      EN: "A triangular window into the universe. A lonely campfire burns beneath a swirling galaxy, connecting the primal fire of man with the stars.",
      HY: "Եռանկյունի պատուհան դեպի տիեզերք: Միայնակ խարույկը վառվում է պտտվող գալակտիկայի տակ՝ կապելով մարդու նախնադարյան կրակը աստղերի հետ:",
      RU: "Треугольное окно во вселенную. Одинокий костер горит под вихрем галактики, соединяя первобытный огонь человека со звездами.",
      FA: "پنجره‌ای مثلثی به سوی کیهان. آتش اردوگاهی تنها در زیر کهکشان چرخان می‌سوزد و آتش اولیه انسان را به ستارگان پیوند می‌دهد."
    },
    imageUrl: 'https://picsum.photos/seed/art-galaxy-tri/600/600',
    stock: 1,
    artist: 'Vardanyan Atelier'
  },
  // 6. Eye Triangle
  {
    id: 'art-eye-tri',
    title: 'The All-Seeing',
    category: 'Art',
    priceAMD: 80000,
    dimensions: '30 cm Base',
    bentoSize: 'small',
    description: {
      EN: "A surrealist interpretation of perception. The eye within the pyramid, bathed in neon blue, questions the nature of reality and observation.",
      HY: "Ընկալման սյուրռեալիստական ​​մեկնաբանություն: Բուրգի ներսում գտնվող աչքը, ողողված նեոնային կապույտով, հարցականի տակ է դնում իրականության բնույթը:",
      RU: "Сюрреалистическая интерпретация восприятия. Глаз внутри пирамиды, залитый неоновым синим светом, ставит под сомнение природу реальности.",
      FA: "تفسیر سورئالیستی از ادراک. چشم درون هرم، غرق در نور نئون آبی، ماهیت واقعیت و مشاهده را زیر سوال می‌برد."
    },
    imageUrl: 'https://picsum.photos/seed/art-eye-tri/600/600',
    stock: 1,
    artist: 'Vardanyan Atelier'
  },
  // 7. Tropical Leaves (Round)
  {
    id: 'art-tropical',
    title: 'Verdant Circle',
    category: 'Art',
    priceAMD: 65000,
    dimensions: '30 cm Diameter',
    bentoSize: 'small',
    description: {
      EN: "Lush tropical foliage captured in a tondo. The vibrant greens against a warm background evoke the humid, life-giving breath of the jungle.",
      HY: "Փարթամ արևադարձային տերևներ: Վառ կանաչը տաք ֆոնի վրա հիշեցնում է ջունգլիների խոնավ, կյանք տվող շունչը:",
      RU: "Пышная тропическая листва, запечатленная в тондо. Яркая зелень на теплом фоне вызывает в памяти влажное, живительное дыхание джунглей.",
      FA: "شاخ و برگ‌های سرسبز استوایی در یک قاب دایره‌ای. سبزهای پرشور در برابر پس‌زمینه گرم، نفس زندگی‌بخش جنگل را تداعی می‌کنند."
    },
    imageUrl: 'https://picsum.photos/seed/art-tropical/600/600',
    stock: 1,
    artist: 'Vardanyan Atelier'
  },
  // 8. Up House (Round)
  {
    id: 'art-balloon',
    title: 'Ascension',
    category: 'Art',
    priceAMD: 70000,
    dimensions: '30 cm Diameter',
    bentoSize: 'small',
    description: {
      EN: "A whimsical tribute to freedom. A house lifted by thousands of balloons floats into the azure sky, reminding us that adventure is out there.",
      HY: "Ազատության քմահաճ տուրք: Հազարավոր փուչիկներով բարձրացված տունը լողում է դեպի երկնագույն երկինք՝ հիշեցնելով, որ արկածները սպասում են:",
      RU: "Причудливая дань свободе. Дом, поднятый тысячами воздушных шаров, плывет в лазурное небо, напоминая нам, что приключения ждут.",
      FA: "ادای احترامی خیال‌انگیز به آزادی. خانه‌ای که توسط هزاران بادکنک بلند شده، در آسمان لاجوردی شناور است و یادآوری می‌کند که ماجراجویی در انتظار است."
    },
    imageUrl: 'https://picsum.photos/seed/art-balloon/600/600',
    stock: 1,
    artist: 'Vardanyan Atelier'
  },
  // 9. Neon Skull (Round)
  {
    id: 'art-skull',
    title: 'Vivid Mortality',
    category: 'Art',
    priceAMD: 72000,
    dimensions: '30 cm Diameter',
    bentoSize: 'small',
    description: {
      EN: "A punk-rock interpretation of the memento mori. The skull is rendered in electric, life-affirming colors against a void black.",
      HY: "«Memento mori»-ի պանկ-ռոք մեկնաբանություն: Գանգը պատկերված է էլեկտրական, կյանքը հաստատող գույներով՝ սև դատարկության ֆոնին:",
      RU: "Панк-рок интерпретация memento mori. Череп изображен в электрических, жизутверждающих цветах на фоне черной пустоты.",
      FA: "تفسیر پانک-راک از یادآوری مرگ. جمجمه با رنگ‌های الکتریکی و زندگی‌بخش در برابر سیاهی مطلق به تصویر کشیده شده است."
    },
    imageUrl: 'https://picsum.photos/seed/art-skull/600/600',
    stock: 1,
    artist: 'Vardanyan Atelier'
  },
  // 10. Hug Abstract (Round)
  {
    id: 'art-hug',
    title: 'Eternal Embrace',
    category: 'Art',
    priceAMD: 68000,
    dimensions: '30 cm Diameter',
    bentoSize: 'small',
    description: {
      EN: "Abstract figures locked in a colorful embrace. A celebration of human connection, warmth, and the blending of souls.",
      HY: "Աբստրակտ ֆիգուրներ՝ գունեղ գրկախառնության մեջ: Մարդկային կապի, ջերմության և հոգիների միաձուլման տոն:",
      RU: "Абстрактные фигуры, заключенные в красочные объятия. Праздник человеческой связи, тепла и слияния душ.",
      FA: "فیگورهای انتزاعی که در آغوشی رنگارنگ قفل شده‌اند. جشنی از ارتباط انسانی، گرما و آمیختگی ارواح."
    },
    imageUrl: 'https://picsum.photos/seed/art-hug/600/600',
    stock: 1,
    artist: 'Vardanyan Atelier'
  },
  // 11. Cheshire Cat (Round)
  {
    id: 'art-cat',
    title: 'Wonderland Grin',
    category: 'Art',
    priceAMD: 65000,
    dimensions: '30 cm Diameter',
    bentoSize: 'small',
    description: {
      EN: "The mischievous smile of the Cheshire cat, fading into the ether. A playful reminder that 'we're all mad here'.",
      HY: "Չեշիրյան կատվի չարաճճի ժպիտը, որը անհետանում է եթերում: Խաղային հիշեցում, որ «մենք բոլորս խենթ ենք այստեղ»:",
      RU: "Озорная улыбка Чеширского кота, исчезающая в эфире. Игривое напоминание о том, что «мы все здесь безумны».",
      FA: "لبخند شیطنت‌آمیز گربه چشایر که در اثیر محو می‌شود. یادآوری بازیگوشانه که «ما همه اینجا دیوانه‌ایم»."
    },
    imageUrl: 'https://picsum.photos/seed/art-cat/600/600',
    stock: 1,
    artist: 'Vardanyan Atelier'
  },
  // 12. Aurora Mountain (Round)
  {
    id: 'art-aurora',
    title: 'Alpine Aurora',
    category: 'Art',
    priceAMD: 82000,
    dimensions: '30 cm Diameter',
    bentoSize: 'small',
    description: {
      EN: "Snow-capped peaks reflecting the Northern Lights. The cool blues and purples create a window to the frozen, magical north.",
      HY: "Ձյունածածկ գագաթներ, որոնք արտացոլում են Հյուսիսափայլը: Սառը կապույտներն ու մանուշակագույնները պատուհան են բացում դեպի սառցե, կախարդական հյուսիս:",
      RU: "Заснеженные вершины, отражающие Северное сияние. Холодные синие и пурпурные тона создают окно на ледяной, волшебный север.",
      FA: "قله‌های پوشیده از برف که شفق قطبی را بازتاب می‌دهند. آبی‌ها و بنفش‌های سرد پنجره‌ای به سوی شمال یخ‌زده و جادویی می‌گشایند."
    },
    imageUrl: 'https://picsum.photos/seed/art-aurora/600/600',
    stock: 1,
    artist: 'Vardanyan Atelier'
  },
  // 13. Abstract Face/Lisa (Round)
  {
    id: 'art-lisa',
    title: 'Psychedelic Pop',
    category: 'Art',
    priceAMD: 70000,
    dimensions: '30 cm Diameter',
    bentoSize: 'small',
    description: {
      EN: "A vibrant, pop-art explosion swirling with psychedelic colors. A modern icon deconstructed into pure emotion and color.",
      HY: "Վառ, փոփ-արտ պայթյուն՝ պտտվող հոգեբուժական գույներով: Ժամանակակից սրբապատկեր, որը ապակառուցված է մաքուր հույզերի և գույնի:",
      RU: "Яркий поп-арт взрыв, кружащийся психоделическими цветами. Современная икона, деконструированная в чистую эмоцию и цвет.",
      FA: "انفجار پرشور پاپ-آرت که با رنگ‌های روان‌گردان می‌چرخد. آیکونی مدرن که به احساس و رنگ خالص ساختارشکنی شده است."
    },
    imageUrl: 'https://picsum.photos/seed/art-lisa/600/600',
    stock: 1,
    artist: 'Vardanyan Atelier'
  },
  // 14. Ring (Existing)
  {
    id: '1',
    title: 'Ararat Sunrise Ring',
    category: 'Jewelry',
    priceAMD: 1800000,
    dimensions: 'Size 7 US / 2.5ct Jade',
    bentoSize: 'small',
    description: {
      EN: "More than an ornament, this is a fragment of the earth. 18k solid gold embracing a natural jade stone that carries the energy of the highlands.",
      HY: "Ավելին քան զարդ, սա երկրի մի մասնիկ է:",
      RU: "Больше чем украшение, это фрагмент земли.",
      FA: "بیش از یک زینت، این قطعه‌ای از زمین است."
    },
    imageUrl: 'https://picsum.photos/seed/ring1/800/800',
    stock: 1,
    artist: 'Davtian Jewelers'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: {
      EN: "The Renaissance of Armenian Rugs",
      HY: "Հայկական գորգերի վերածնունդը",
      RU: "Ренессанс армянских ковров",
      FA: "رنسانس فرش‌های ارمنی"
    },
    excerpt: {
      EN: "How ancient motifs are finding their way into modern minimalist interiors, bridging centuries of tradition.",
      HY: "Ինչպես են հնագույն զարդանախշերը տեղ գտնում ժամանակակից ինտերիերում:",
      RU: "Как древние мотивы находят путь в современные минималистичные интерьеры.",
      FA: "چگونه نقش‌مایه‌های باستانی راه خود را به فضاهای داخلی مینیمالیستی مدرن باز می‌کنند."
    },
    content: {
      EN: "The Armenian rug is not merely a floor covering; it is a cosmological map. Woven with the double knot (Arnenian knot), these carpets possess a structural integrity that withstands centuries. In modern minimalist interiors, a vintage Karabakh or Kazak rug acts as a soulful anchor, introducing organic complexity to sterile spaces.\n\nThe symbols woven into these rugs—the wheel of eternity, the dragon (vishap), and the tree of life—are not decorative but linguistic. They speak of protection, fertility, and the cyclical nature of existence. Using natural dyes extracted from the Ararat cochineal (vordan karmir) and indigo, the colors do not fade; they mature, acquiring a patina that synthetic fibers can never replicate.\n\nAt Artikaa, we believe that integrating such a piece into a contemporary home is an act of preservation. It silences the room, demanding a pause, a moment of reflection on the hands that tied tens of thousands of knots to create a single square meter of history.",
      HY: "Հայկական գորգը պարզապես հատակի ծածկույթ չէ, այն տիեզերաբանական քարտեզ է: Կրկնակի հանգույցով (հայկական հանգույց) գործված այս կարպետները ունեն կառուցվածքային ամրություն, որը դիմանում է դարեր: Ժամանակակից մինիմալիստական ինտերիերում հին Ղարաբաղի կամ Ղազախի գորգը ծառայում է որպես հոգևոր խարիսխ՝ ստերիլ տարածքներին հաղորդելով օրգանական բարդություն:\n\nԱյս գորգերի մեջ գործված խորհրդանիշները՝ հավերժության անիվը, վիշապը և կենաց ծառը, դեկորատիվ չեն, այլ լեզվական: Նրանք խոսում են պաշտպանության, պտղաբերության և գոյության ցիկլային բնույթի մասին: Օգտագործելով Արարատյան որդան կարմիրից և ինդիգոյից ստացված բնական ներկեր՝ գույները չեն խամրում, այլ հասունանում են՝ ձեռք բերելով պատինա, որը սինթետիկ մանրաթելերը երբեք չեն կարող կրկնօրինակել:",
      RU: "Армянский ковер — это не просто напольное покрытие, это космологическая карта. Сотканные двойным узлом (армянский узел), эти ковры обладают структурной целостностью, которая выдерживает века. В современных минималистичных интерьерах винтажный ковер Карабаха или Казаха выступает в качестве душевного якоря, привнося органическую сложность в стерильные пространства.\n\nСимволы, вплетенные в эти ковры — колесо вечности, дракон (вишап) и древо жизни — не декоративны, а лингвистичны. Они говорят о защите, плодородии и цикличности бытия. Используя натуральные красители, добытые из араратской кошенили (вордан кармир) и индиго, цвета не тускнеют; они созревают, приобретая патину, которую синтетические волокна никогда не смогут воспроизвести.",
      FA: "فرش ارمنی تنها یک کفپوش نیست؛ بلکه نقشه‌ای کیهانی است. این قالی‌ها که با گره دوتا (گره ارمنی) بافته شده‌اند، دارای استحکامی ساختاری هستند که قرن‌ها دوام می‌آورند. در فضاهای داخلی مینیمالیستی مدرن، یک فرش قدیمی قره‌باغ یا قزاق به عنوان لنگری روح‌نواز عمل می‌کند و پیچیدگی ارگانیک را به فضاهای بی‌روح وارد می‌سازد.\n\nنمادهای بافته شده در این فرش‌ها—چرخ ابدیت، اژدها (ویشاپ) و درخت زندگی—تزئینی نیستند، بلکه زبانی هستند. آنها از محافظت، باروری و ماهیت چرخه‌ای هستی سخن می‌گویند. با استفاده از رنگ‌های طبیعی استخراج شده از قرمز دانه آرارات و نیل، رنگ‌ها محو نمی‌شوند؛ بلکه بالغ می‌شوند و پاتینه‌ای پیدا می‌کنند که الیاف مصنوعی هرگز نمی‌توانند آن را بازتولید کنند.\n\nدر آرتیکا، ما معتقدیم که ادغام چنین قطعه‌ای در یک خانه معاصر، یک عمل حفاظتی است. این فرش اتاق را ساکت می‌کند و وقفه‌ای را طلب می‌کند؛ لحظه‌ای برای تأمل بر دستانی که ده‌ها هزار گره زدند تا تنها یک متر مربع از تاریخ را خلق کنند."
    },
    date: "Oct 12, 2024",
    imageUrl: "https://picsum.photos/seed/rugs/800/600",
    author: "Artikaa Editorial"
  },
  {
    id: 'post-2',
    title: {
      EN: "Obsidian: The Black Gold of the Highlands",
      HY: "Օբսիդիան. Լեռնաշխարհի սև ոսկին",
      RU: "Обсидиан: Черное золото нагорья",
      FA: "ابسیدین: طلای سیاه کوهستان"
    },
    excerpt: {
      EN: "Exploring the spiritual and physical properties of the volcanic glass that defines our jewelry collection.",
      HY: "Ուսումնասիրելով հրաբխային ապակու հոգևոր և ֆիզիկական հատկությունները:",
      RU: "Изучение духовных и физических свойств вулканического стекла.",
      FA: "کاوش در خواص معنوی و فیزیکی شیشه آتشفشانی که مجموعه جواهرات ما را تعریف می‌کند."
    },
    content: {
        EN: "Born from the cooling lava of volcanoes like Aragats and Geghama, Armenian obsidian is the 'black gold' of the highlands. Historically used for arrowheads due to its razor-sharp edges, today it serves a different purpose in the Artikaa collection: grounding.\n\nObsidian is volcanic glass, formed so rapidly that no crystalline structure can develop. This chaos held in stasis gives the stone its deep, void-like blackness. In crystal healing traditions, obsidian is a psychic vacuum cleaner, absorbing negativity and clarifying thoughts. It is a stone of truth.\n\nOur artisans at Davtian Jewelers do not over-polish the stone. We often leave raw, textured facets to remind the wearer of its violent, fiery origins. Set in 18k gold, the contrast between the warm, soft metal and the cold, dark glass creates a visual tension that is undeniably modern yet deeply primitive.",
        HY: "Ծնված Արագածի և Գեղամա լեռների պես հրաբուխների սառչող լավայից՝ հայկական օբսիդիանը լեռնաշխարհի «սև ոսկին» է: Պատմականորեն օգտագործվելով նետասլաքների համար իր ածելիի պես սուր եզրերի պատճառով, այսօր Artikaa-ի հավաքածուում այն ծառայում է այլ նպատակի՝ հողանցման:\n\nՕբսիդիանը հրաբխային ապակի է, որը ձևավորվել է այնքան արագ, որ բյուրեղային կառուցվածք չի հասցրել զարգանալ: Այս քաոսը ստատիկ վիճակում քարին տալիս է իր խորը, դատարկության նման սևությունը: Բյուրեղներով բուժման ավանդույթներում օբսիդիանը հոգեկան փոշեկուլ է, որը կլանում է բացասականը և պարզեցնում մտքերը: Այն ճշմարտության քար է:\n\nDavtian Jewelers-ի մեր վարպետները չափից դուրս չեն հղկում քարը: Մենք հաճախ թողնում ենք հում, ակոսավոր երեսներ՝ կրողին հիշեցնելու դրա բուռն, կրակոտ ծագման մասին: 18 կարատանոց ոսկու մեջ դրված՝ տաք, փափուկ մետաղի և սառը, մուգ ապակու միջև հակադրությունը ստեղծում է տեսողական լարվածություն, որը աներկբայորեն ժամանակակից է, բայց խորապես նախնադարյան:",
        RU: "Рожденный из остывающей лавы вулканов, таких как Арагац и Гегамский хребет, армянский обсидиан — это «черное золото» нагорья. Исторически использовавшийся для наконечников стрел из-за своих бритвенно-острых краев, сегодня в коллекции Artikaa он служит другой цели: заземлению.\n\nОбсидиан — это вулканическое стекло, образовавшееся так быстро, что кристаллическая структура не успела развиться. Этот хаос, удерживаемый в стазисе, придает камню его глубокую, подобную пустоте черноту. В традициях кристаллотерапии обсидиан — это психический пылесос, поглощающий негатив и проясняющий мысли. Это камень истины.\n\nНаши мастера в Davtian Jewelers не полируют камень чрезмерно. Мы часто оставляем необработанные, текстурированные грани, чтобы напомнить владельцу о его яростном, огненном происхождении.",
        FA: "ابسیدین ارمنی که از گدازه‌های سرد شده آتشفشان‌هایی مانند آراگاتس و گقاما متولد شده، «طلای سیاه» کوهستان است. از نظر تاریخی به دلیل لبه‌های تیغ‌مانندش برای سر پیکان استفاده می‌شد، اما امروزه در مجموعه آرتیکا هدف متفاوتی دارد: اتصال به زمین.\n\nابسیدین شیشه آتشفشانی است که آنقدر سریع شکل گرفته که هیچ ساختار کریستالی نتوانسته در آن ایجاد شود. این هرج‌ومرجِ متوقف‌شده به سنگ سیاهیِ عمیق و خلأگونه‌ای می‌بخشد. در سنت‌های شفابخشی با کریستال، ابسیدین جاروبرقی روانی است که انرژی منفی را جذب و افکار را شفاف می‌کند. این سنگ حقیقت است.\n\nصنعتگران ما در جواهرسازی داوتیان سنگ را بیش از حد صیقل نمی‌دهند. ما اغلب وجوه خام و بافت‌دار را باقی می‌گذاریم تا منشأ خشن و آتشین آن را به صاحبش یادآوری کنیم. کنتراست بین فلز گرم و نرم طلا و شیشه سرد و تاریک، تنشی بصری ایجاد می‌کند که بی‌تردید مدرن و در عین حال عمیقاً بدوی است."
    },
    date: "Oct 05, 2024",
    imageUrl: "https://picsum.photos/seed/obsidian/800/600",
    author: "Davtian Jewelers"
  },
  {
    id: 'post-3',
    title: {
      EN: "Slow Luxury: Why Waiting Matters",
      HY: "Դանդաղ շքեղություն. Ինչու է սպասելը կարևոր",
      RU: "Медленная роскошь: Почему ожидание имеет значение",
      FA: "تجمل آهسته: چرا صبر کردن مهم است"
    },
    excerpt: {
      EN: "In a world of instant gratification, the bespoke process restores the sacred bond between maker and owner.",
      HY: "Ակնթարթային բավարարվածության աշխարհում պատվերով գործընթացը վերականգնում է կապը:",
      RU: "В мире мгновенного удовлетворения процесс создания на заказ восстанавливает связь.",
      FA: "در دنیای ارضای فوری، فرآیند سفارشی پیوند مقدس بین سازنده و مالک را بازیابی می‌کند."
    },
    content: {
        EN: "In an era defined by next-day delivery and automated manufacturing, Artikaa embraces the radical act of waiting. A true heirloom cannot be rushed. The wood must dry naturally to prevent warping. The gold must be heated and cooled repeatedly to achieve the perfect temper. The rug takes months to grow, row by row.\n\nThis delay is not an inefficiency; it is the accumulation of soul. When you wait for an object, you begin a relationship with it before it even arrives. You envision it in your space. You respect the human rhythm of its creation.\n\n'Slow Luxury' is about rejecting the disposable culture that surrounds us. It is about choosing one object that will last a hundred years over ten objects that will last a year. At Artikaa, every scratch on our furniture and every inclusion in our stones is a testament to natural materials and human hands. We invite you to wait. It will be worth it.",
        HY: "Հաջորդ օրվա առաքմամբ և ավտոմատացված արտադրությամբ բնորոշվող դարաշրջանում Artikaa-ն ընդունում է սպասելու արմատական գործողությունը: Իսկական ժառանգությունը չի կարելի շտապեցնել: Փայտը պետք է բնական ճանապարհով չորանա՝ դեֆորմացիան կանխելու համար: Ոսկին պետք է բազմիցս տաքացվի և սառչի՝ կատարյալ կոփում ստանալու համար: Գորգը ամիսներ է պահանջում աճելու համար, շարք առ շարք:\n\nԱյս ուշացումը անարդյունավետություն չէ. դա ոգու կուտակում է: Երբ սպասում ես առարկայի, հարաբերություններ ես սկսում նրա հետ դեռ այն չստացած: Դուք պատկերացնում եք այն ձեր տարածքում: Դուք հարգում եք դրա ստեղծման մարդկային ռիթմը:\n\n«Դանդաղ շքեղությունը» մեզ շրջապատող մեկանգամյա օգտագործման մշակույթը մերժելն է: Խոսքը մեկ առարկա ընտրելու մասին է, որը կծառայի հարյուր տարի, ի հակադրություն տասը առարկայի, որոնք կծառայեն մեկ տարի: Artikaa-ում մեր կահույքի յուրաքանչյուր քերծվածք և մեր քարերի յուրաքանչյուր ներառում բնական նյութերի և մարդկային ձեռքերի վկայությունն է: Մենք հրավիրում ենք ձեզ սպասել: Դա արժե:",
        RU: "В эпоху, определяемую доставкой на следующий день и автоматизированным производством, Artikaa принимает радикальный акт ожидания. Настоящую реликвию нельзя торопить. Дерево должно высохнуть естественным путем, чтобы предотвратить деформацию. Золото нужно многократно нагревать и охлаждать, чтобы достичь идеальной закалки. Ковер растет месяцами, ряд за рядом.\n\nЭта задержка не является неэффективностью; это накопление души. Когда вы ждете предмет, вы начинаете отношения с ним еще до его прибытия. Вы представляете его в своем пространстве. Вы уважаете человеческий ритм его создания.\n\n«Медленная роскошь» — это отказ от одноразовой культуры, которая нас окружает. Речь идет о выборе одного предмета, который прослужит сто лет, вместо десяти предметов, которые прослужат год. В Artikaa каждая царапина на нашей мебели и каждое включение в наших камнях — это свидетельство натуральных материалов и человеческих рук. Мы приглашаем вас подождать. Это того стоит.",
        FA: "در عصری که با تحویل روز بعد و تولید خودکار تعریف می‌شود، آرتیکا عمل رادیکال صبر کردن را می‌پذیرد. یک میراث واقعی را نمی‌توان با عجله ساخت. چوب باید به طور طبیعی خشک شود تا از تاب برداشتن جلوگیری شود. طلا باید بارها گرم و سرد شود تا به آبدگی کامل برسد. فرش ماه‌ها طول می‌کشد تا رشد کند، رج به رج.\n\nاین تأخیر ناکارآمدی نیست؛ انباشت روح است. وقتی منتظر یک شیء هستید، قبل از رسیدن آن رابطه‌ای را با آن آغاز می‌کنید. شما آن را در فضای خود تصور می‌کنید. شما به ریتم انسانی خلق آن احترام می‌گذارید.\n\n«تجمل آهسته» رد کردن فرهنگ یک‌بارمصرفی است که ما را احاطه کرده است. انتخاب یک شیء که صد سال دوام می‌آورد بر ده شیء که یک سال دوام می‌آورند. در آرتیکا، هر خراش روی مبلمان ما و هر ناخالصی در سنگ‌های ما گواهی بر مواد طبیعی و دستان انسان است. ما شما را به صبر دعوت می‌کنیم. ارزشش را خواهد داشت."
    },
    date: "Sep 28, 2024",
    imageUrl: "https://picsum.photos/seed/craft/800/600",
    author: "Artikaa Editorial"
  },
  {
    id: 'post-4',
    title: {
      EN: "The Pomegranate: A Universe in a Fruit",
      HY: "Նուռ. Տիեզերք մեկ պտղի մեջ",
      RU: "Гранат: Вселенная во фрукте",
      FA: "انار: جهانی در یک میوه"
    },
    excerpt: {
      EN: "Unpeeling the layers of Armenia's most potent symbol, from ancient mythology to Parajanov's cinema.",
      HY: "Բացահայտելով Հայաստանի ամենահզոր խորհրդանիշի շերտերը՝ հնագույն դիցաբանությունից մինչև Փարաջանովի կինոն:",
      RU: "Раскрывая слои самого мощного символа Армении, от древней мифологии до кино Параджанова.",
      FA: "لایه برداری از نمادین‌ترین سمبل ارمنستان، از اساطیر باستان تا سینمای پاراجانف."
    },
    content: {
      EN: "To hold a pomegranate is to hold the weight of Armenian culture in your palm. It is not merely a fruit; it is a symbol of plurality within unity. One hard shell protecting hundreds of juicy seeds, representing the Armenian diaspora—scattered across the globe yet bound by a single, tough skin of identity.\n\nIn the visual language of Sergei Parajanov, the pomegranate 'bleeds' onto a white cloth, symbolizing the resilience of life amidst tragedy. In our collection, you will see this motif repeated—in the ruby inlays of our jewelry and the deep red dyes of our textiles. It represents fertility, abundance, and marriage. But more deeply, it represents survival.\n\nWhen you acquire a piece featuring the pomegranate, you are acknowledging this resilience. You are bringing into your home a talisman that says: 'We are many, but we are one.' It is a reminder that beauty often protects a complex, hidden inner world.",
      HY: "Նուռ պահելը նշանակում է ափի մեջ պահել հայկական մշակույթի ծանրությունը: Դա պարզապես միրգ չէ. դա միասնության մեջ բազմակարծության խորհրդանիշ է: Մեկ կոշտ կեղև, որը պաշտպանում է հարյուրավոր հյութալի սերմեր՝ ներկայացնելով հայկական սփյուռքը՝ ցրված աշխարհով մեկ, բայց կապված ինքնության մեկ կոշտ մաշկով:\n\nՍերգեյ Փարաջանովի տեսողական լեզվում նուռը «արյունահոսում է» սպիտակ կտորի վրա՝ խորհրդանշելով կյանքի դիմադրողականությունը ողբերգության մեջ: Մեր հավաքածուում դուք կտեսնեք այս մոտիվի կրկնությունը՝ մեր զարդերի սուտակե ներդիրներում և մեր գործվածքների մուգ կարմիր ներկերում: Այն ներկայացնում է պտղաբերություն, առատություն և ամուսնություն: Բայց ավելի խորը, դա ներկայացնում է գոյատևում:\n\nԵրբ ձեռք եք բերում նռան պատկերով իր, դուք ընդունում եք այդ դիմադրողականությունը: Դուք ձեր տուն եք բերում մի թալիսման, որն ասում է. «Մենք շատ ենք, բայց մենք մեկ ենք»: Սա հիշեցում է, որ գեղեցկությունը հաճախ պաշտպանում է բարդ, թաքնված ներքին աշխարհը:",
      RU: "Держать гранат — значит держать на ладони вес армянской культуры. Это не просто фрукт; это символ множественности в единстве. Одна твердая оболочка, защищающая сотни сочных зерен, олицетворяет армянскую диаспору — разбросанную по всему земному шару, но связанную единой, прочной кожей идентичности.\n\nВ визуальном языке Сергея Параджанова гранат «кровоточит» на белую ткань, символизируя стойкость жизни среди трагедии. В нашей коллекции вы увидите повторение этого мотива — в рубиновых вставках наших украшений и темно-красных красителях нашего текстиля. Он олицетворяет плодородие, изобилие и брак. Но еще глубже он олицетворяет выживание.\n\nПриобретая изделие с изображением граната, вы признаете эту стойкость. Вы приносите в свой дом талисман, который гласит: «Нас много, но мы едины». Это напоминание о том, что красота часто защищает сложный, скрытый внутренний мир.",
      FA: "در دست گرفتن یک انار به معنای نگه داشتن وزن فرهنگ ارمنی در کف دست است. این فقط یک میوه نیست؛ نمادی از کثرت در وحدت است. یک پوسته سخت که از صدها دانه آبدار محافظت می‌کند، نماینده دیاسپورای ارمنی است—پراکنده در سراسر جهان اما متصل با یک پوست سخت هویت.\n\nدر زبان بصری سرگئی پاراجانف، انار بر روی پارچه‌ای سفید «خونریزی» می‌کند که نماد مقاومت زندگی در میان تراژدی است. در مجموعه ما، این نقش‌مایه را مکرراً خواهید دید—در منبت‌کاری‌های یاقوت جواهرات ما و رنگ‌های قرمز تیره منسوجات ما. این نماد باروری، فراوانی و ازدواج است. اما عمیق‌تر از آن، نماد بقاست.\n\nوقتی قطعه‌ای با طرح انار خریداری می‌کنید، این مقاومت را تصدیق می‌کنید. شما طلسمی را به خانه خود می‌آورید که می‌گوید: «ما بسیاریم، اما یکی هستیم.» این یادآوری است که زیبایی اغلب از دنیای درونی پیچیده و پنهانی محافظت می‌کند."
    },
    date: "Aug 15, 2024",
    imageUrl: "https://picsum.photos/seed/pomegranate/800/600",
    author: "Artikaa Editorial"
  },
  {
    id: 'post-5',
    title: {
      EN: "Khachkars: Prayers in Stone",
      HY: "Խաչքարեր. Աղոթքներ քարի մեջ",
      RU: "Хачкары: Молитвы в камне",
      FA: "خاچکارها: دعاهایی در سنگ"
    },
    excerpt: {
      EN: "How medieval monks turned solid basalt into lace, and how this geometry influences our furniture design.",
      HY: "Ինչպես միջնադարյան վանականները պինդ բազալտը վերածեցին ժանյակի, և ինչպես է այս երկրաչափությունը ազդում մեր կահույքի դիզայնի վրա:",
      RU: "Как средневековые монахи превращали твердый базальт в кружево и как эта геометрия влияет на дизайн нашей мебели.",
      FA: "چگونه راهبان قرون وسطی بازالت سخت را به توری تبدیل کردند و چگونه این هندسه بر طراحی مبلمان ما تأثیر می‌گذارد."
    },
    content: {
      EN: "The Khachkar (cross-stone) is a phenomenon unique to the Armenian Highland. There are over 50,000 of them, and no two are alike. Historically, they served as focal points for worship, memorial stones, or markers of military victories. But artistically, they represent the triumph of spirit over matter.\n\nThe carver takes a slab of volcanic tuff or basalt—unforgiving, heavy materials—and carves geometrical patterns so fine they resemble needlepoint lace. This creates a play of light and shadow that makes the stone appear weightless, almost vibrating with energy. The intricate interlacings signify the infinite nature of divine life.\n\nAt Artikaa, our furniture collection draws heavily from this tradition. Our hand-carved walnut tables feature rosettes and interlace patterns derived directly from 13th-century Khachkars found at Geghard Monastery. We honor the master carvers of the past by applying their sacred geometry to objects of daily living, grounding the ethereal in the practical.",
      HY: "Խաչքարը եզակի երևույթ է Հայկական լեռնաշխարհում: Դրանք ավելի քան 50,000-ն են, և ոչ մի երկուսը նման չեն: Պատմականորեն դրանք ծառայել են որպես երկրպագության կենտրոններ, հուշաքարեր կամ ռազմական հաղթանակների նշաններ: Բայց գեղարվեստորեն դրանք ներկայացնում են ոգու հաղթանակը նյութի նկատմամբ:\n\nՔանդակագործը վերցնում է հրաբխային տուֆի կամ բազալտի սալաքար՝ անողոք, ծանր նյութեր, և փորագրում է երկրաչափական նախշեր, որոնք այնքան նուրբ են, որ նման են ասեղնագործ ժանյակի: Սա ստեղծում է լույսի և ստվերի խաղ, որը քարը դարձնում է անկշիռ, կարծես էներգիայով թրթռացող: Բարդ միահյուսումները նշանակում են աստվածային կյանքի անսահման բնույթը:\n\nArtikaa-ում մեր կահույքի հավաքածուն մեծապես հիմնված է այս ավանդույթի վրա: Մեր ձեռագործ ընկուզենու սեղանները պարունակում են վարդյակներ և միահյուսված նախշեր, որոնք վերցված են ուղղակիորեն Գեղարդի վանքի 13-րդ դարի խաչքարերից: Մենք հարգում ենք անցյալի վարպետ քանդակագործներին՝ կիրառելով նրանց սրբազան երկրաչափությունը առօրյա կյանքի առարկաների վրա՝ եթերայինը հիմնավորելով գործնականի մեջ:",
      RU: "Хачкар (крест-камень) — явление, уникальное для Армянского нагорья. Их более 50 000, и нет двух одинаковых. Исторически они служили центрами поклонения, мемориальными камнями или знаками военных побед. Но художественно они олицетворяют торжество духа над материей.\n\nРезчик берет плиту вулканического туфа или базальта — неумолимых, тяжелых материалов — и вырезает геометрические узоры настолько тонкие, что они напоминают игольное кружево. Это создает игру света и тени, благодаря которой камень кажется невесомым, почти вибрирующим энергией. Сложные переплетения символизируют бесконечную природу божественной жизни.\n\nКоллекция мебели Artikaa во многом опирается на эту традицию. Наши столы из орехового дерева ручной работы украшены розетками и переплетенными узорами, заимствованными непосредственно у хачкаров XIII века, найденных в монастыре Гегард. Мы чтим мастеров-резчиков прошлого, применяя их сакральную геометрию к предметам повседневного обихода.",
      FA: "خاچکار (سنگ صلیب) پدیده‌ای منحصر به فرد در ارتفاعات ارمنستان است. بیش از ۵۰,۰۰۰ خاچکار وجود دارد و هیچ دو تایی شبیه هم نیستند. از نظر تاریخی، آنها به عنوان کانون عبادت، سنگ یادبود یا نشانگر پیروزی‌های نظامی عمل می‌کردند. اما از نظر هنری، آنها نشان‌دهنده پیروزی روح بر ماده هستند.\n\nحجار تخته سنگی از توف آتشفشانی یا بازالت—مواد سخت و سنگین—را برمی‌دارد و الگوهای هندسی چنان ظریفی را حک می‌کند که شبیه توری سوزن‌دوزی شده است. این بازی نور و سایه‌ای ایجاد می‌کند که سنگ را بی‌وزن نشان می‌دهد، گویی با انرژی می‌لرزد. درهم‌تنیدگی‌های پیچیده نشان‌دهنده ماهیت بی‌پایان زندگی الهی است.\n\nدر آرتیکا، مجموعه مبلمان ما به شدت از این سنت الهام گرفته است. میزهای گردو دست‌ساز ما دارای گل‌بوته‌ها و الگوهای درهم‌تنیده‌ای هستند که مستقیماً از خاچکارهای قرن سیزدهم صومعه گغارد گرفته شده‌اند. ما با به کارگیری هندسه مقدس استادان حجار گذشته بر روی اشیاء زندگی روزمره، به آنها ادای احترام می‌کنیم و امر اثیری را در امر عملی استوار می‌سازیم."
    },
    date: "Jul 22, 2024",
    imageUrl: "https://picsum.photos/seed/khachkar/800/600",
    author: "Davood H. (Curator)"
  },
  {
    id: 'post-6',
    title: {
      EN: "Urartu: The First Masters of Metal",
      HY: "Ուրարտու. Մետաղի առաջին վարպետները",
      RU: "Урарту: Первые мастера металла",
      FA: "اورارتو: نخستین استادان فلز"
    },
    excerpt: {
      EN: "Tracing the lineage of Armenian jewelry from the Bronze Age kingdom of Van to the modern ateliers of Yerevan.",
      HY: "Հետևելով հայկական ոսկերչության ծագմանը՝ Վանի բրոնզեդարյան թագավորությունից մինչև Երևանի ժամանակակից արհեստանոցները:",
      RU: "Прослеживая родословную армянских ювелирных изделий от королевства Ван бронзового века до современных ателье Еревана.",
      FA: "ردیابی اصل و نسب جواهرات ارمنی از پادشاهی عصر برنز وان تا کارگاه‌های مدرن ایروان."
    },
    content: {
      EN: "Long before Rome or Byzantium, there was Urartu (The Kingdom of Van). Known in the ancient world as masters of metallurgy, Urartian artisans crafted bronze cauldrons with bull heads and shields engraved with lions and chariots. This obsession with metal is in the DNA of the Armenian people.\n\nModern Armenian jewelry is not a new invention; it is a continuation. The filigree techniques (manr-hute) used by our partners at Davtian Jewelers echo the granulation found on gold artifacts excavated at Erebuni Fortress. The aesthetic is distinct: it is heavy, substantial, yet incredibly detailed. It respects the weight of the gold.\n\nWearing an Artikaa piece is wearing a link in a 3,000-year-old chain. It is a rebellion against the hollow, mass-produced 'jewelry' of the fast-fashion world. It is solid. It is eternal. It is the fire of the highlands frozen in metal.",
      HY: "Հռոմից կամ Բյուզանդիայից շատ առաջ կար Ուրարտուն (Վանի թագավորությունը): Հին աշխարհում հայտնի որպես մետալուրգիայի վարպետներ՝ ուրարտացի արհեստավորները պատրաստում էին բրոնզե կաթսաներ՝ ցուլի գլուխներով, և վահաններ՝ առյուծների և մարտակառքերի փորագրություններով: Մետաղի հանդեպ այս մոլուցքը հայ ժողովրդի ԴՆԹ-ի մեջ է:\n\nԺամանակակից հայկական ոսկերչությունը նոր գյուտ չէ. դա շարունակություն է: Davtian Jewelers-ի մեր գործընկերների կողմից օգտագործվող ֆիլիգրան տեխնիկան (մանր-հյուս) արձագանքում է Էրեբունի ամրոցի պեղումների ժամանակ հայտնաբերված ոսկյա իրերի հատիկավորմանը: Էսթետիկան հստակ է. այն ծանր է, էական, բայց աներևակայելի մանրամասն: Այն հարգում է ոսկու քաշը:\n\nArtikaa-ի զարդ կրելը նշանակում է կրել 3000-ամյա շղթայի մի օղակ: Սա ապստամբություն է արագ նորաձևության աշխարհի սին, զանգվածային արտադրության «զարդերի» դեմ: Այն պինդ է: Այն հավերժական է: Դա մետաղի մեջ սառած լեռնաշխարհի կրակն է:",
      RU: "Задолго до Рима или Византии существовало Урарту (Ванское царство). Известные в древнем мире как мастера металлургии, урартские ремесленники создавали бронзовые котлы с головами быков и щиты с гравировкой львов и колесниц. Эта одержимость металлом заложена в ДНК армянского народа.\n\nСовременные армянские украшения — это не новое изобретение; это продолжение. Филигранные техники, используемые нашими партнерами в Davtian Jewelers, перекликаются с зернью, найденной на золотых артефактах при раскопках крепости Эребуни. Эстетика отчетлива: она тяжелая, существенная, но невероятно детализированная. Она уважает вес золота.\n\nНосить изделие Artikaa — значит носить звено в 3000-летней цепи. Это бунт против полых «украшений» массового производства мира быстрой моды. Это солидно. Это вечно. Это огонь нагорья, застывший в металле.",
      FA: "مدت‌ها پیش از روم یا بیزانس، اورارتو (پادشاهی وان) وجود داشت. صنعتگران اورارتویی که در جهان باستان به عنوان استادان متالورژی شناخته می‌شدند، دیگ‌های برنزی با سر گاو و سپرهایی با نقش شیر و ارابه می‌ساختند. این شیفتگی به فلز در DNA مردم ارمنی است.\n\nجواهرات مدرن ارمنی یک اختراع جدید نیست؛ بلکه یک تداوم است. تکنیک‌های ملیله‌کاری که توسط شرکای ما در جواهرسازی داوتیان استفاده می‌شود، پژواک دانه‌بندی‌های یافت شده بر روی مصنوعات طلایی حفاری شده در قلعه اربونی است. این زیبایی‌شناسی متمایز است: سنگین، اساسی، و در عین حال فوق‌العاده پرجزئیات. به وزن طلا احترام می‌گذارد.\n\nپوشیدن یک قطعه آرتیکا، پوشیدن حلقه‌ای از یک زنجیر ۳۰۰۰ ساله است. این طغیانی است علیه «جواهرات» توخالی و تولید انبوه دنیای مد سریع. این جامد است. ابدی است. آتش کوهستان است که در فلز منجمد شده."
    },
    date: "Jun 10, 2024",
    imageUrl: "https://picsum.photos/seed/urartu/800/600",
    author: "Artikaa Editorial"
  }
];
