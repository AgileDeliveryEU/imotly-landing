export const telegramUrl = "https://t.me/imotlyai_bot";

export const navLinks = [
  { label: "Как работи", href: "#kak-raboti" },
  { label: "Демо", href: "#demo" },
  { label: "Цена", href: "#pricing" },
  { label: "Въпроси", href: "#faq" },
];

export const hero = {
  label: "Не търси повече. Изпреварвай.",
  title: "Добрите имоти не чакат.",
  description:
    "Избираш какво търсиш. IMOT.LY следи новите обяви от основните имотни сайтове и ти изпраща подходящите веднага.",
  imageUrl: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
  imageAlt: "Светъл модерен апартамент с дневна и големи прозорци",
};

export const trustPoints = [
  {
    title: "Новите обяви на едно място",
    description: "imot.bg, olx.bg и alo.bg в едно търсене.",
  },
  {
    title: "Известия според твоите критерии",
    description: "Квартал, бюджет, тип имот, площ, стаи и още детайли.",
  },
  {
    title: "Реагираш по-рано",
    description: "Получаваш съвпаденията в Telegram, без да обновяваш сайтове.",
  },
];

export const howItWorks = [
  {
    title: "Задаваш какво търсиш",
    description: "Избираш град, квартали, бюджет, тип имот, източници и честота.",
  },
  {
    title: "imot.ly следи новите обяви",
    description: "Ботът проверява основните източници и сравнява новите обяви с твоите критерии.",
  },
  {
    title: "Получаваш подходящите веднага",
    description: "Когато има съвпадение, то пристига директно в Telegram.",
  },
];

export const demoFilters = ["София", "Лозенец", "Двустаен", "до 1 500 лв.", "imot.bg", "olx.bg"];

export const demoListings = [
  {
    source: "imot.bg",
    title: "Двустаен, Лозенец",
    details: "64 кв.м · близо до метро · 1 430 лв.",
    time: "преди 4 мин",
  },
  {
    source: "olx.bg",
    title: "Обзаведен двустаен",
    details: "южно изложение · след ремонт · 1 380 лв.",
    time: "преди 11 мин",
  },
];

export const scenario = {
  eyebrow: "На практика",
  title: "Търсиш 3-стаен под наем в Лозенец до 1200 €",
  description:
    "Вместо да проверяваш няколко сайта през деня, настройваш търсенето веднъж. Когато излезе нова подходяща обява, IMOT.LY те известява и можеш да реагираш веднага.",
  imageUrl: "https://images.pexels.com/photos/7147291/pexels-photo-7147291.jpeg?auto=compress&cs=tinysrgb&w=1100",
  imageAlt: "Уютен апартамент с дневна, кухня и естествена светлина",
};

export const audiences = [
  {
    title: "Наематели",
    description: "Следиш новите обяви за кварталите и бюджета си, без постоянно скролване.",
  },
  {
    title: "Купувачи",
    description: "Запазваш фокус върху подходящите имоти и не изпускаш новите предложения.",
  },
  {
    title: "Брокери",
    description: "Създаваш отделни активни търсения за различни клиенти и реагираш светкавично.",
  },
];

export const photoShowcase = [
  {
    title: "Градски контекст",
    description: "Търсене по квартали, бюджет и тип имот.",
    imageUrl: "https://images.pexels.com/photos/7258248/pexels-photo-7258248.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Жилищна градска фасада с много прозорци",
  },
  {
    title: "Подходящото жилище",
    description: "Само новите съвпадения по зададените филтри.",
    imageUrl: "https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Модерен светъл хол в апартамент",
  },
  {
    title: "Работа с клиенти",
    description: "Няколко отделни сценария паралелно.",
    imageUrl: "/img/clients-meeting.png",
    alt: "Брокер разговаря с клиенти за имот",
  },
];

export const pricing = {
  eyebrow: "Пилотна промоция",
  title: "Избери стартов план.",
  description: "Специални стартови цени за първите потребители на IMOT.ly.",
  note: "Спести до 34% от стандартната цена. Промоционалните цени важат за старта на продукта.",
  plans: [
    {
      name: "Месечен",
      duration: "1 месец",
      originalPrice: "15 €",
      promotionalPrice: "9,50 €",
      suitableFor: "Наематели",
      cta: "Избери план",
      href: telegramUrl,
    },
    {
      name: "Тримесечен",
      duration: "3 месеца",
      originalPrice: "37,50 €",
      promotionalPrice: "22,50 €",
      suitableFor: "Купувачи и наематели",
      cta: "Избери план",
      href: telegramUrl,
    },
    {
      name: "Основател",
      duration: "12 месеца",
      originalPrice: "90 €",
      promotionalPrice: "59,50 €",
      suitableFor: "Брокери, флипъри и инвеститори",
      cta: "Избери план",
      href: telegramUrl,
      badge: "Само за първите 100",
      note: "Ограничено до първите 100 закупили.",
      featured: true,
    },
  ],
};

export const faqs = [
  {
    question: "Кои сайтове следи imot.ly?",
    answer: "Началните източници са imot.bg, olx.bg и alo.bg. Можеш да избираш кои от тях да участват в търсенето.",
  },
  {
    question: "Колко бързо идват новите обяви?",
    answer: "Можеш да получаваш резултати почасово, дневно или при поискване, според това колко бързо искаш да реагираш.",
  },
  {
    question: "Мога ли да променям критериите си?",
    answer: "Да. Настройките на търсенето могат да се променят, когато бюджетът, кварталите или други критерии се сменят.",
  },
  {
    question: "Как получавам известията?",
    answer: "Първата версия работи като Telegram бот. Новите подходящи обяви пристигат директно в чата.",
  },
  {
    question: "Мога ли да имам повече от едно търсене?",
    answer: "Да. imot.ly поддържа няколко активни търсения, включително отделни сценарии за различни клиенти.",
  },
  {
    question: "Мога ли да прекратя абонамента си?",
    answer: "Абонаментът е месечен. Детайлите за управление на плащането се показват в текущия абонаментен поток.",
  },
];

export const finalCta = {
  title: "Готов ли си да намираш добрите обяви навреме?",
  description: "Избери план и настрой търсенето си за минута.",
};
