export const SITE_NAME = "Tu Página en 48";
export const SITE_URL = "https://tupaginaen48.com";

export const WHATSAPP_NUMBER = "573001234567";
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const NAV_LINKS = [
  { label: "Profesiones", href: "#catalogo" },
  { label: "Cómo funciona", href: "#proceso" },
  { label: "Planes", href: "#planes" },
  { label: "Resultados", href: "#portafolio" },
  { label: "Contacto", href: "#contacto" },
];

export const HERO = {
  badge: "Cupos limitados esta semana — solo 3 disponibles",
  subheadline:
    "Diseñamos y construimos tu página web profesional para que tus clientes te encuentren. Sin complicaciones, sin demoras, sin jerga técnica.",
};

export const STEPS = [
  {
    number: "01",
    title: "Nos cuentas lo que necesitas",
    description:
      "Nos escribes por WhatsApp, nos cuentas tu negocio y eliges el plan que más te conviene.",
    time: "5 min",
    icon: "chat" as const,
  },
  {
    number: "02",
    title: "Diseñamos tu página",
    description:
      "Creamos una página clara, profesional y pensada para convertir visitas en clientes.",
    time: "24h",
    icon: "paintbrush" as const,
  },
  {
    number: "03",
    title: "La publicamos en 48 horas",
    description:
      "Te entregamos todo listo para que tus clientes te encuentren y te escriban desde el primer día.",
    time: "48h",
    icon: "rocket" as const,
  },
];

export const HOW_IT_WORKS_FAQ = [
  {
    question: "¿Qué necesito para empezar?",
    answer: "Solo necesitas tu logo (o una idea de cómo quieres que se vea), los textos principales de tu negocio y tu número de WhatsApp. Nosotros nos encargamos del resto.",
  },
  {
    question: "¿Puedo ver avances antes de publicar?",
    answer: "Sí. Te compartimos una vista previa de tu página antes de publicarla para que nos des tu aprobación.",
  },
  {
    question: "¿Qué pasa si no me gusta el diseño?",
    answer: "Dependiendo de tu plan, tienes entre 1 y 3 oportunidades de revisión. En el plan Premium, las revisiones son ilimitadas.",
  },
];

export const PLANS = [
  {
    name: "Básico",
    price: "1.000.000",
    priceNote: "~$33.000/día por 1 mes",
    description: "Para estar visible en Google y recibir tus primeros clientes.",
    features: [
      "Página clara para presentar tu servicio",
      "Se ve perfecto en celular y computador",
      "Botón directo a WhatsApp para que te escriban al instante",
      "Formulario de contacto para no perder oportunidades",
      "Aparece en Google cuando te buscan",
      "1 oportunidad para que quede como quieres",
      "Tu página activa 1 mes sin pagar nada más",
    ],
    cta: "Empezar con Básico",
    popular: false,
  },
  {
    name: "Profesional",
    price: "1.800.000",
    priceNote: "~$20.000/día por 3 meses",
    description: "El plan recomendado para crecer con orden y resultados.",
    features: [
      "Página completa para vender mejor tus servicios",
      "Se ve perfecto en celular y computador",
      "Aparece en Google cuando te buscan",
      "Listo para publicidad en Instagram y Facebook",
      "Sabrás cuántas personas visitan tu página",
      "Dominio .com incluido por 1 año",
      "3 oportunidades para que quede como quieres",
      "Tu página activa 3 meses sin pagar nada más",
    ],
    cta: "Elegir Profesional",
    popular: true,
  },
  {
    name: "Premium",
    price: "3.000.000",
    priceNote: "~$17.000/día por 6 meses",
    description: "Para negocios que quieren dominar su mercado local.",
    features: [
      "Sitio de varias páginas para mostrar todo tu negocio",
      "Blog y catálogo para atraer más clientes con contenido",
      "Candadito de seguridad incluido 🔒",
      "Listo para publicidad en Instagram y Facebook",
      "Sabrás cuántas personas visitan tu página",
      "Soporte prioritario para que no te quedes solo",
      "Revisiones sin límite hasta que te encante",
      "Tu página activa 6 meses sin pagar nada más",
    ],
    cta: "Quiero Premium",
    popular: false,
  },
];

export const TESTIMONIALS = [
  {
    text: "Les escribí un martes por la noche y el jueves al mediodía ya tenía mi página web funcionando. No lo podía creer.",
    name: "María L.",
    role: "Psicóloga en Medellín",
    rating: 5,
    avatarColor: "#E8D5C4",
  },
  {
    text: "Mis clientes ahora me encuentran buscando en Google. El primer mes recibí más de 40 consultas por la página.",
    name: "Carlos R.",
    role: "Abogado en Bogotá",
    rating: 5,
    avatarColor: "#C4D5E8",
  },
  {
    text: "Yo no sé nada de tecnología. Me pidieron el logo, los textos y el número de WhatsApp. Todo lo demás lo hicieron ellos.",
    name: "Valentina M.",
    role: "Fotógrafa en Cali",
    rating: 5,
    avatarColor: "#D5E8C4",
  },
  {
    text: "Tenía miedo de que fuera otra promesa vacía. Pero a las 36 horas ya estaba compartiendo mi página en redes. Increíble servicio.",
    name: "Andrés P.",
    role: "Consultor en Barranquilla",
    rating: 5,
    avatarColor: "#E8C4D5",
  },
  {
    text: "Mi página se ve mejor que la de clínicas que pagan millones. Mis pacientes me dicen que se ve muy profesional.",
    name: "Laura G.",
    role: "Nutricionista en Medellín",
    rating: 5,
    avatarColor: "#D5C4E8",
  },
  {
    text: "Llevaba un año posponiendo hacer mi página. Con ellos lo resolví en un día. Ojalá los hubiera encontrado antes.",
    name: "Diego M.",
    role: "Entrenador personal en Bogotá",
    rating: 5,
    avatarColor: "#C4E8D5",
  },
];

export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://instagram.com/tupaginaen48",
    description: "Tips de conversión y ejemplos reales de páginas.",
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@tupaginaen48",
    description: "Contenido práctico para vender más con tu web.",
  },
];

export const PLAN_COMPARISON_FEATURES: {
  feature: string;
  basic: boolean | string;
  professional: boolean | string;
  premium: boolean | string;
}[] = [
  { feature: "Páginas incluidas", basic: "1", professional: "Hasta 3", premium: "Múltiples" },
  { feature: "Diseño responsivo", basic: true, professional: true, premium: true },
  { feature: "Botón de WhatsApp", basic: true, professional: true, premium: true },
  { feature: "Formulario de contacto", basic: true, professional: true, premium: true },
  { feature: "SEO básico", basic: true, professional: true, premium: true },
  { feature: "Preparado para ads", basic: false, professional: true, premium: true },
  { feature: "Google Analytics", basic: false, professional: true, premium: true },
  { feature: "Dominio .com incluido", basic: false, professional: "1 año", premium: "1 año" },
  { feature: "Blog / catálogo", basic: false, professional: false, premium: true },
  { feature: "Certificado SSL", basic: false, professional: false, premium: true },
  { feature: "Soporte prioritario", basic: false, professional: false, premium: true },
  { feature: "Revisiones", basic: "1", professional: "3", premium: "Ilimitadas" },
  { feature: "Hosting incluido", basic: "1 mes", professional: "3 meses", premium: "6 meses" },
];

export const FAQ = [
  {
    question: "¿En cuánto tiempo me entregan mi página?",
    answer: "En un máximo de 48 horas hábiles desde que recibimos toda la información necesaria (logo, textos, fotos y número de WhatsApp).",
  },
  {
    question: "¿Qué incluye el precio?",
    answer: "Diseño personalizado, desarrollo, hosting por el periodo de tu plan, dominio (en planes Profesional y Premium), SEO básico, y soporte durante el periodo contratado.",
  },
  {
    question: "¿Puedo cambiar de plan después?",
    answer: "Sí. Puedes actualizar tu plan en cualquier momento. Solo pagas la diferencia entre tu plan actual y el nuevo.",
  },
  {
    question: "¿Tienen garantía de satisfacción?",
    answer: "Sí. Si no estás conforme con el resultado, trabajamos contigo hasta que quedes satisfecho dentro de las revisiones incluidas en tu plan.",
  },
  {
    question: "¿Necesito saber de tecnología?",
    answer: "Para nada. Nosotros nos encargamos de todo lo técnico. Solo necesitas decirnos qué quieres comunicar y nosotros lo hacemos realidad.",
  },
  {
    question: "¿Qué pasa con el hosting después del periodo incluido?",
    answer: "Al finalizar el periodo incluido, puedes renovar el hosting con nosotros por un costo mensual accesible. Te avisamos con tiempo para que no pierdas tu página.",
  },
  {
    question: "¿Puedo ver ejemplos de páginas que han hecho?",
    answer: "Sí. En nuestra sección de resultados puedes ver testimonios reales de clientes que ya tienen su página funcionando y recibiendo clientes.",
  },
  {
    question: "¿El pago es único o tiene cuotas mensuales?",
    answer: "El pago es único. No hay cuotas mensuales durante el periodo de hosting incluido en tu plan (1, 3 o 6 meses según el plan). Después, puedes renovar el hosting por un costo mensual accesible.",
  },
];

export const FORM_PLAN_OPTIONS = ["Básico", "Profesional", "Premium", "No estoy seguro"];
