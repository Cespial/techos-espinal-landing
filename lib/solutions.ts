import { SERVICE_DATA, type ServiceItem, type ServiceLineId } from "./conversion";

export const SOLUTIONS_UPDATED_AT = "2026-10-05";

type Explanation = { title: string; text: string };
type LinkItem = { href: string; label: string };

export type Solution = {
  slug: string;
  linea: ServiceLineId;
  serviceId: string;
  name: string;
  title: string;
  description: string;
  summary: string;
  intro: string;
  bullets: string[];
  situationHeading: string;
  situationIntro: string;
  situations: Explanation[];
  scope: string[];
  separateScope: string[];
  comparisonHeading: string;
  comparison: Explanation[];
  priceNote: string;
  priceFactors: Explanation[];
  messageItems: string[];
  faqs: { question: string; answer: string }[];
  guides: LinkItem[];
};

/** Páginas por necesidad. Los precios se consultan en SERVICE_DATA, nunca se duplican aquí. */
export const SOLUTIONS: Solution[] = [
  {
    slug: "reparacion-goteras",
    linea: "techos",
    serviceId: "reparacion-goteras",
    name: "Reparación de goteras",
    title: "Reparación de goteras en Medellín y Bello",
    description: "Reparación de goteras en Medellín, Bello y Valle de Aburrá. Consulta el alcance, qué cambia el precio y cuándo conviene revisar toda la cubierta.",
    summary: "Para filtraciones de lluvia que necesitan localizar la entrada de agua y definir una reparación.",
    intro: "Si entra agua cuando llueve, el primer paso es entender por dónde llega y qué parte del techo necesita atención. Cuéntanos dónde aparece la gotera; revisamos el caso y definimos el trabajo antes de cotizarlo.",
    bullets: ["Casas y negocios", "Alcance y precio por escrito", "Medellín, Bello y Valle de Aburrá"],
    situationHeading: "Una mancha no cuenta toda la historia del techo",
    situationIntro: "La zona donde ves el agua ayuda a orientar la revisión, pero no basta para elegir una reparación. Nos interesa saber cuándo ocurre, cómo es la cubierta y qué se ha hecho antes.",
    situations: [
      { title: "Agua durante la lluvia", text: "Indica si sucede con cualquier lluvia o solo cuando es fuerte, y si aparece en un único punto o en varios. Una foto interior permite ubicar el daño sin que tengas que subir al techo." },
      { title: "La gotera vuelve después de un arreglo", text: "Cuéntanos qué se reparó, hace cuánto y si conservas una foto o cotización. Ese antecedente ayuda a no plantear de nuevo un trabajo que ya resultó insuficiente." },
      { title: "Tejas, uniones o canales por revisar", text: "Si desde un lugar seguro observas una pieza dañada o un canal desbordado, inclúyelo en el mensaje. La reparación de una cubierta y el mantenimiento de sus desagües pueden necesitar alcances distintos." },
    ],
    scope: [
      "El punto o sector de la cubierta que se va a intervenir y el problema que buscamos resolver.",
      "La reparación propuesta: por ejemplo, una unión, un sello o una pieza puntual, según la revisión.",
      "Los materiales, el acceso necesario y la zona de trabajo que comprende la propuesta.",
      "La forma de revisar el resultado y las condiciones de la garantía que correspondan a ese trabajo.",
    ],
    separateScope: [
      "Cambiar todo el techo, reemplazar su estructura o intervenir otros sectores de la cubierta.",
      "Impermeabilizar una superficie completa o limpiar canales y bajantes, si no están incluidos en la propuesta.",
      "Reparar o pintar cielos y paredes interiores afectados por el agua.",
    ],
    comparisonHeading: "¿Reparar una gotera o impermeabilizar?",
    comparison: [
      { title: "Reparación puntual", text: "Busca corregir un punto definido después de revisar el origen de la entrada de agua. La cotización debe identificar ese punto y no presentarse como una renovación de todo el techo." },
      { title: "Intervención de una superficie", text: "Si la revisión indica que hace falta trabajar un área más amplia, cotizamos ese alcance. Impermeabilizar depende del estado y material de la cubierta; no es una alternativa que pueda elegirse solo por el precio inicial." },
    ],
    priceNote: "Referencia inicial del catálogo para una reparación puntual. No es el valor de cambiar un techo ni de impermeabilizar toda una cubierta. El precio final se confirma después de revisar el acceso y el daño.",
    priceFactors: [
      { title: "Acceso al punto de trabajo", text: "La altura, la pendiente y las condiciones para llegar a la cubierta hacen parte de la revisión del alcance." },
      { title: "Cantidad de puntos afectados", text: "Una unión por reparar y varios sectores deteriorados requieren presupuestos diferentes." },
      { title: "Material y reparación previa", text: "El tipo de teja o superficie y los arreglos existentes influyen en los materiales y la preparación necesarios." },
      { title: "Trabajos complementarios", text: "Canales, piezas adicionales o acabados interiores se detallan cuando sean necesarios; no se suman sin acordarlos." },
    ],
    messageItems: ["Municipio, barrio y tipo de inmueble.", "En qué habitación aparece el agua y desde cuándo.", "Si ocurre únicamente cuando llueve y cuántos puntos has visto.", "Fotos tomadas desde el interior o desde un lugar seguro y datos de reparaciones previas."],
    faqs: [
      { question: "¿Se puede reparar sin cambiar todo el techo?", answer: "Depende de la causa y el estado de la cubierta. Si el daño permite una reparación puntual, definimos ese alcance. Si hace falta una intervención mayor, te explicamos la diferencia antes de cotizar; una foto por sí sola no permite asegurar cuál solución corresponde." },
      { question: "¿La reparación incluye pintar la mancha interior?", answer: "No se debe dar por incluido. El arreglo de la entrada de agua y la recuperación del cielo o la pared son trabajos diferentes. La cotización indica si incluye resanes o pintura y en qué zona." },
      { question: "¿Pueden decirme el valor solo con una foto?", answer: "Las fotos sirven para orientar la conversación. El precio final depende de comprobar el origen, el acceso y el alcance. Si hace falta una revisión adicional, te explicamos en qué consiste y si tiene costo antes de realizarla." },
      { question: "¿Atienden goteras en Medellín y Bello?", answer: "Sí. Atendemos solicitudes en Medellín, Bello y el Valle de Aburrá. Comparte municipio y barrio para confirmar cobertura, acceso y disponibilidad antes de programar el trabajo." },
      { question: "¿Tengo que subir al techo para enviar fotos?", answer: "No. Puedes enviarnos fotos del daño desde el interior y describir la cubierta si la conoces. No necesitas subir al techo ni exponerte para solicitar una cotización." },
    ],
    guides: [
      { href: "/blog/como-arreglar-gotera-techo", label: "Qué revisar cuando aparece una gotera" },
      { href: "/blog/segunda-temporada-lluvias-valle-aburra-revisar-techo", label: "Preparar el techo para las lluvias" },
    ],
  },
  {
    slug: "pintura-interior",
    linea: "pintura",
    serviceId: "pintura-interior",
    name: "Pintura interior",
    title: "Pintura interior en Medellín y Bello",
    description: "Pintura interior de casas, apartamentos y locales en Medellín y Bello. Define superficies, preparación, materiales y presupuesto antes de empezar.",
    summary: "Para renovar paredes y cielos con una propuesta clara de preparación, pintura y acabado.",
    intro: "Pintar una habitación y renovar un apartamento completo son encargos distintos. Definimos las superficies, el estado de las paredes y el acabado que buscas para darte una cotización que puedas entender y comparar.",
    bullets: ["Casas, apartamentos y locales", "Preparación y materiales definidos", "Medellín, Bello y Valle de Aburrá"],
    situationHeading: "Antes de elegir el color, definamos qué se va a pintar",
    situationIntro: "La cotización parte de las superficies reales y su estado. Saber si el inmueble está ocupado, vacío o recién intervenido también ayuda a organizar el trabajo.",
    situations: [
      { title: "Renovar una habitación", text: "Indica si quieres pintar solo paredes, también el cielo o una zona específica. Las medidas aproximadas y fotografías generales permiten entender mejor el encargo que una imagen de un único detalle." },
      { title: "Pintar un apartamento o local", text: "Enumera los espacios y qué superficies quedan fuera. El área del piso no describe por sí sola todas las paredes, cielos, alturas y detalles que hay que presupuestar." },
      { title: "Paredes con daños visibles", text: "Muéstranos desprendimientos, huecos, grietas o manchas. Resanar, alisar o atender el origen de una humedad puede requerir trabajo previo y una cotización separada." },
    ],
    scope: [
      "Habitaciones, paredes y cielos incluidos, con sus medidas o áreas de referencia.",
      "La preparación y los resanes contemplados, distinguiéndolos de reparaciones mayores.",
      "El producto, los colores, el acabado y quién suministra la pintura y los demás materiales.",
      "La protección del entorno, la organización de los espacios y la revisión de detalles al terminar.",
    ],
    separateScope: [
      "Solucionar filtraciones, fugas o humedad de origen que no se resuelven con pintura.",
      "Estucar o alisar todas las paredes, intervenir grietas o sustituir elementos deteriorados.",
      "Pintar fachadas, rejas, puertas u otras superficies que no figuren en la cotización interior.",
    ],
    comparisonHeading: "¿Un retoque o pintar la superficie completa?",
    comparison: [
      { title: "Retoque localizado", text: "Se concentra en un detalle o zona concreta. Antes de elegirlo, conviene acordar qué diferencia de color o acabado puede quedar respecto a la pintura existente, especialmente si no se dispone del mismo producto." },
      { title: "Renovación de una pared o espacio", text: "Incluye la superficie acordada, su preparación y acabado. Debe quedar claro qué se pinta y qué no; el presupuesto de una habitación no representa el de todo el apartamento." },
    ],
    priceNote: "Referencia inicial del catálogo de pintura interior. No es una tarifa por metro cuadrado ni el precio de un apartamento completo. Superficies, preparación y materiales se confirman en la cotización.",
    priceFactors: [
      { title: "Superficies y altura", text: "El presupuesto distingue paredes, cielos y detalles, además del acceso a las zonas altas." },
      { title: "Estado de las paredes", text: "Una superficie lista para pintar y otra con resanes o alisado pendiente requieren alcances distintos." },
      { title: "Producto y acabado", text: "Colores, tipo de pintura y acabado se acuerdan antes de comprar o aplicar materiales." },
      { title: "Condiciones del inmueble", text: "Muebles, horarios de acceso y disponibilidad de los espacios influyen en la organización del trabajo." },
    ],
    messageItems: ["Municipio, barrio y si es casa, apartamento o local.", "Habitaciones y superficies que quieres pintar, con medidas aproximadas si las tienes.", "Fotos generales y de los detalles que necesitan reparación.", "Si el inmueble está ocupado y si ya tienes elegidos o comprados los materiales."],
    faqs: [
      { question: "¿El precio incluye la pintura?", answer: "La cotización debe decirlo expresamente. Acordamos el producto, el acabado y quién suministra los materiales. La referencia inicial del catálogo no sustituye ese detalle ni permite calcular por sí sola el costo de un apartamento." },
      { question: "¿Incluyen resanes antes de pintar?", answer: "Definimos cuáles resanes necesita la superficie y cuáles quedan incluidos. Unos huecos puntuales, el alisado de una pared y una reparación mayor no son el mismo trabajo y se presupuestan según el caso." },
      { question: "¿Pueden pintar una pared con humedad?", answer: "Primero necesitamos entender si hay una causa activa que requiera atención. La pintura interior no se ofrece como solución a una fuga o filtración. Si se necesita otro trabajo, su alcance se explica antes de pintar." },
      { question: "¿Puedo solicitar solo una habitación?", answer: "Sí. Describe el espacio y si quieres paredes, cielo o ambos. El presupuesto se prepara para ese alcance; también puedes pedir una alternativa que incluya más habitaciones para compararlas." },
      { question: "¿Trabajan en apartamentos ocupados de Medellín o Bello?", answer: "Puedes consultar el servicio para un inmueble ocupado. Cuéntanos cómo se usan los espacios y las condiciones de acceso del edificio; coordinamos el alcance y la disponibilidad antes de programarlo." },
    ],
    guides: [
      { href: "/blog/precio-pintar-apartamento-medellin", label: "Qué cambia el presupuesto de pintar un apartamento" },
      { href: "/blog/humedad-paredes-causas-soluciones", label: "Humedad en paredes: qué revisar antes de pintar" },
    ],
  },
  {
    slug: "reparacion-fugas-agua",
    linea: "plomeria",
    serviceId: "reparacion-fugas",
    name: "Reparación de fugas de agua",
    title: "Reparación de fugas de agua en Medellín y Bello",
    description: "Reparación de fugas de agua en Medellín, Bello y Valle de Aburrá. Diferencia una fuga visible de una oculta y conoce qué debe incluir la cotización.",
    summary: "Para escapes de agua en tuberías o conexiones, con revisión del punto afectado y sus accesos.",
    intro: "Una conexión que gotea y una mancha de origen desconocido necesitan revisiones diferentes. Cuéntanos dónde aparece el agua y si puedes ver el punto de la fuga; te ayudamos a definir qué hay que revisar y cotizar.",
    bullets: ["Tuberías y conexiones", "Revisión y reparación diferenciadas", "Medellín, Bello y Valle de Aburrá"],
    situationHeading: "¿La fuga se ve o solo ves sus efectos?",
    situationIntro: "Esa diferencia permite orientar la solicitud. No hace falta romper una pared para pedir ayuda: describe lo que observas y los trabajos que se han hecho anteriormente.",
    situations: [
      { title: "Una conexión está goteando", text: "Una fotografía general y otra del punto visible ayudan a identificar dónde está y cómo se accede. Describe si está bajo un lavaplatos, junto a una llave, en un sanitario o en otra conexión." },
      { title: "Apareció humedad en una pared", text: "Una mancha no confirma por sí sola el origen del agua. Comparte cuándo apareció y si cambia con la lluvia o con el uso de un punto de agua; la localización puede requerir un alcance distinto al de la reparación." },
      { title: "El escape vuelve a aparecer", text: "Explica qué pieza se cambió o qué zona se reparó. Si tienes fotografías de la intervención, nos ayudan a entender el antecedente antes de proponer un nuevo trabajo." },
    ],
    scope: [
      "La tubería o conexión afectada y si el origen ya está localizado o falta revisarlo.",
      "La reparación propuesta, las piezas y materiales que comprende y sus condiciones de acceso.",
      "Si es necesario abrir alguna superficie y qué intervención queda autorizada.",
      "La revisión del punto reparado y qué reposiciones o acabados se entregan con el trabajo.",
    ],
    separateScope: [
      "Localizar una fuga oculta mediante trabajos que no estén contemplados en la revisión inicial.",
      "Abrir y reconstruir paredes o pisos, reponer enchapes, resanar o pintar fuera del alcance acordado.",
      "Cambiar toda una red de tuberías o intervenir redes comunes del edificio sin definir responsables y permisos.",
    ],
    comparisonHeading: "Revisar el origen y reparar son dos alcances distintos",
    comparison: [
      { title: "Punto visible y accesible", text: "Cuando se puede identificar y acceder al punto, la propuesta describe esa reparación y sus piezas. La disponibilidad de una conexión visible no permite asumir el estado del resto de la instalación." },
      { title: "Origen aún por localizar", text: "La primera necesidad es definir cómo se revisará el caso. El método, el acceso y su costo se confirman según la situación; si hace falta abrir una superficie, debe acordarse antes." },
    ],
    priceNote: "Referencia inicial del catálogo para reparación de fugas. No equivale a localizar una fuga oculta, reconstruir una pared ni sustituir toda la tubería. El trabajo y las piezas se confirman en la cotización.",
    priceFactors: [
      { title: "Ubicación y acceso", text: "Una conexión a la vista y una tubería dentro de una pared requieren revisar trabajos y accesos diferentes." },
      { title: "Tipo de instalación", text: "La tubería, las conexiones y las piezas necesarias se identifican antes de cerrar el presupuesto." },
      { title: "Extensión del daño", text: "Se distingue una reparación puntual de la sustitución de un tramo o de varios puntos." },
      { title: "Reposición de acabados", text: "Si el trabajo requiere abrir una superficie, se especifica qué restauración queda incluida y cuál se cotiza por separado." },
    ],
    messageItems: ["Municipio, barrio y lugar del inmueble donde aparece el agua.", "Si ves salir el agua de una pieza o si solo observas humedad.", "Cuándo ocurre y si continúa o aparece por momentos.", "Fotos desde un sitio seguro y detalles de arreglos anteriores, si los hubo."],
    faqs: [
      { question: "¿Una mancha en la pared significa que hay una tubería rota?", answer: "No permite concluirlo por sí sola. Antes de ofrecer una reparación de tubería hay que entender de dónde proviene el agua. Explica si la mancha cambia con la lluvia o con el uso del baño o la cocina y qué has observado." },
      { question: "¿Detectan fugas sin romper paredes?", answer: "No prometemos ese resultado para todos los casos. La revisión depende del acceso y de la instalación. Si se requiere una prueba o apertura, su alcance y costo se explican antes de realizarla." },
      { question: "¿La reparación incluye volver a enchapar o pintar?", answer: "Solo cuando esos trabajos figuran en la cotización. Reparar la tubería y recuperar el acabado son alcances diferentes; dejamos claro qué se entrega y qué queda fuera antes de comenzar." },
      { question: "¿Pueden atender una fuga hoy en Medellín o Bello?", answer: "Consulta la disponibilidad por WhatsApp o teléfono e indica tu ubicación y qué está ocurriendo. Confirmamos cuándo podemos atender antes de programar; la atención el mismo día está sujeta a esa confirmación." },
      { question: "¿También reparan fugas en sanitarios o grifería?", answer: "El catálogo incluye ajuste de sanitario, reparación de llaves y conexiones y cambio de grifería. Según la pieza y el problema, podemos orientar la cotización hacia ese servicio concreto en lugar de presupuestar una intervención de tubería que no corresponde." },
    ],
    guides: [
      { href: "/blog/fuga-agua-pared-como-detectar", label: "Qué observar si aparece agua en una pared" },
      { href: "/blog/cuanto-cobra-plomero-medellin-precios", label: "Servicios de plomería y precios de referencia" },
    ],
  },
  {
    slug: "impermeabilizacion-techos",
    linea: "techos",
    serviceId: "impermeabilizacion-cubiertas",
    name: "Impermeabilización de techos",
    title: "Impermeabilización de techos en Medellín y Bello",
    description: "Impermeabilización de techos y cubiertas en Medellín y Bello. Compara reparación puntual y tratamiento por área, preparación, materiales y presupuesto.",
    summary: "Para definir la protección de una cubierta según su material, estado y superficie a intervenir.",
    intro: "Impermeabilizar requiere definir qué superficie se va a tratar y cómo está antes de aplicar un producto. Revisamos el caso para acordar preparación, materiales y alcance; una referencia inicial no es el precio de toda la cubierta.",
    bullets: ["Superficie y preparación definidas", "Materiales acordados por escrito", "Medellín, Bello y Valle de Aburrá"],
    situationHeading: "El presupuesto empieza por conocer la cubierta",
    situationIntro: "El área es importante, pero también lo son el material, los tratamientos anteriores y los puntos que necesitan atención. La cotización debe explicar sobre qué superficie se trabajará.",
    situations: [
      { title: "Una superficie necesita protección", text: "Describe si se trata de una cubierta de tejas, una placa u otro tipo de techo. Si tienes planos o medidas aproximadas puedes compartirlos; la extensión definitiva se confirma al definir el trabajo." },
      { title: "Existe un tratamiento anterior", text: "Cuéntanos qué producto o intervención se realizó y hace cuánto, si lo sabes. Evaluar ese antecedente forma parte de elegir la preparación y el alcance de una nueva aplicación." },
      { title: "Hay varios puntos con filtraciones", text: "Identifica las zonas donde aparece agua y si ya se han reparado. El problema puede necesitar comparar una intervención puntual con un trabajo sobre una superficie mayor." },
    ],
    scope: [
      "La superficie, sus límites y el área de referencia que comprende la impermeabilización.",
      "La preparación necesaria y qué limpieza, retiro de material o reparaciones previas se incluyen.",
      "El sistema propuesto, sus materiales y el tratamiento de los encuentros o puntos incluidos.",
      "Las condiciones de aplicación, la revisión final y las condiciones de garantía del alcance cotizado.",
    ],
    separateScope: [
      "Reemplazar la estructura o la cubierta completa, o solucionar daños ajenos al área contratada.",
      "Modificar pendientes, reconstruir superficies o renovar canales cuando no se haya cotizado ese trabajo.",
      "Restaurar cielos, enchapes, pintura u otros acabados interiores afectados por filtraciones anteriores.",
    ],
    comparisonHeading: "¿Sellar un punto o intervenir el área?",
    comparison: [
      { title: "Sellado o reparación puntual", text: "Se concentra en una unión, fisura o pieza identificada. Debe cotizarse como una intervención delimitada; no equivale a proteger toda la superficie ni reemplaza la revisión de otras causas." },
      { title: "Impermeabilización por superficie", text: "Define un área de trabajo y un sistema compatible con la condición observada. La preparación y los materiales son parte del presupuesto; comparar solo dos valores iniciales puede ocultar diferencias importantes de alcance." },
    ],
    priceNote: "Referencia inicial del catálogo para protección contra goteras. No es una tarifa por metro cuadrado ni el precio de una cubierta completa. El área, la preparación y el sistema se definen en la cotización.",
    priceFactors: [
      { title: "Área que se va a tratar", text: "El presupuesto identifica la superficie y sus límites, en lugar de asumir que comprende todo el inmueble." },
      { title: "Estado y preparación", text: "Los trabajos previos se detallan según el soporte y lo que se encuentre en la revisión." },
      { title: "Sistema y materiales", text: "La propuesta indica los productos y el alcance elegido; no todos los techos requieren la misma intervención." },
      { title: "Accesos y encuentros", text: "La forma de llegar a la cubierta, sus uniones y los puntos incluidos deben quedar reflejados en la propuesta." },
    ],
    messageItems: ["Municipio, barrio y tipo de inmueble.", "Qué tipo de cubierta tienes, si lo sabes, y su área aproximada.", "Dónde se presentan filtraciones y qué intervenciones se han hecho antes.", "Fotos disponibles desde lugares seguros y condiciones de acceso al inmueble."],
    faqs: [
      { question: "¿La referencia publicada es por metro cuadrado?", answer: "No. Es el precio inicial de referencia del catálogo, sin una unidad por metro cuadrado. Para cotizar una cubierta se define su área, preparación, materiales y accesos. El valor total queda por escrito antes de contratar." },
      { question: "¿Puedo escoger el producto antes de la revisión?", answer: "Puedes compartir el producto que tienes en mente. La propuesta debe comprobar si corresponde a la superficie y al trabajo necesario; no asumimos que el mismo sistema sirve para todas las cubiertas." },
      { question: "¿Impermeabilizar corrige cualquier gotera?", answer: "No se puede asegurar sin revisar el origen. Una pieza dañada, una unión o un problema de evacuación de agua pueden requerir otro trabajo. La cotización explica por qué se propone una reparación puntual o una intervención de superficie." },
      { question: "¿Cuánto dura el trabajo y qué garantía tiene?", answer: "Los plazos y las condiciones de garantía se establecen para la superficie, materiales y alcance que se coticen. No damos un número único de días o años para todos los casos. La propuesta debe dejar esas condiciones por escrito." },
      { question: "¿Atienden cubiertas en Bello además de Medellín?", answer: "Sí. Recibimos solicitudes de Medellín, Bello y el Valle de Aburrá. Indica tu barrio y las condiciones de acceso para confirmar cobertura y disponibilidad antes de programar." },
    ],
    guides: [
      { href: "/blog/impermeabilizacion-techos-medellin-precios", label: "Cómo comparar presupuestos de impermeabilización" },
      { href: "/blog/preparar-casa-temporada-lluvias-medellin", label: "Preparar la casa para la temporada de lluvias" },
    ],
  },
  {
    slug: "destape-desagues",
    linea: "plomeria",
    serviceId: "destape-desagues",
    name: "Destape de desagües",
    title: "Destape de desagües en Medellín y Bello",
    description: "Destape de desagües de baño, cocina y patio en Medellín y Bello. Conoce qué cotizar si el problema afecta un punto o varios y qué cambia el precio.",
    summary: "Para desagües de baño, cocina o patio que evacúan lento o presentan una obstrucción.",
    intro: "Cuéntanos qué desagüe está fallando y si el problema ocurre en un solo punto o en varios. Definimos la revisión y el trabajo que necesita ese tramo, sin dar por hecho que un destape puntual resuelve toda la red.",
    bullets: ["Baño, cocina y patio", "Punto y acceso definidos", "Medellín, Bello y Valle de Aburrá"],
    situationHeading: "El primer dato: cuántos puntos están fallando",
    situationIntro: "El comportamiento del agua y los antecedentes ayudan a orientar la solicitud. También es importante saber si se trata de una vivienda independiente o de una instalación compartida en un edificio.",
    situations: [
      { title: "Un lavaplatos, lavamanos o sifón evacúa lento", text: "Indica cuál es el punto y desde cuándo sucede. Comparte una fotografía general que permita ver el entorno y el acceso, sin desmontar la instalación para pedir una cotización." },
      { title: "Varios desagües tienen problemas", text: "Describe cuáles están afectados y si ocurre al mismo tiempo. El alcance puede ser distinto al de un único sifón; en un edificio puede requerirse coordinar con la administración." },
      { title: "La obstrucción vuelve", text: "Cuéntanos qué se hizo antes y cuánto tardó en regresar. Repetir un destape sin revisar el antecedente puede dejar sin definir la causa de un problema recurrente." },
    ],
    scope: [
      "El punto o tramo que se va a intervenir y el acceso disponible para hacerlo.",
      "El trabajo propuesto y si implica desmontar algún elemento accesible.",
      "La revisión de la evacuación del punto intervenido al terminar, según el alcance acordado.",
      "La indicación de trabajos adicionales si la revisión encuentra algo que un destape no resuelve.",
    ],
    separateScope: [
      "Reemplazar tuberías, modificar su recorrido o reconstruir pisos y paredes.",
      "Intervenir colectores, redes comunes o instalaciones que requieran autorización de otro responsable.",
      "Servicios especializados o equipos concretos que no estén expresamente confirmados en la cotización.",
    ],
    comparisonHeading: "Destapar un punto no es renovar la tubería",
    comparison: [
      { title: "Obstrucción localizada", text: "La propuesta define el punto que se va a intervenir y el acceso previsto. La revisión del resultado corresponde a ese punto; el estado del resto de la red requiere su propia evaluación." },
      { title: "Problema recurrente o de varios puntos", text: "Puede requerir ampliar la revisión antes de elegir el trabajo. Si hace falta reparar o sustituir un tramo, se explica y se cotiza como un alcance diferente, sujeto a autorización." },
    ],
    priceNote: "Referencia inicial del catálogo para destape de desagües. No es el valor de renovar la red, abrir pisos o intervenir una instalación común. El punto, su acceso y el trabajo se confirman en la cotización.",
    priceFactors: [
      { title: "Punto o tramo afectado", text: "Un desagüe accesible y varios puntos con problemas no representan el mismo encargo." },
      { title: "Acceso a la instalación", text: "Se identifica si el trabajo puede realizarse desde un punto disponible o requiere una intervención adicional." },
      { title: "Antecedentes del problema", text: "Los destapes anteriores, cambios de tubería y productos utilizados deben comunicarse al definir la revisión." },
      { title: "Reparaciones adicionales", text: "Cambiar piezas o reconstruir superficies se presupuesta por separado cuando no forma parte del destape acordado." },
    ],
    messageItems: ["Municipio, barrio y si es una casa, apartamento o negocio.", "Qué desagüe está fallando y si ocurre en uno o varios puntos.", "Desde cuándo pasa y si ya se ha realizado algún destape.", "Qué productos o intervenciones se han utilizado antes y una foto general del punto."],
    faqs: [
      { question: "¿Destapan desagües de cocina, baño y patio?", answer: "Sí, esos puntos hacen parte del catálogo. La cotización depende de identificar el punto afectado, el acceso y el trabajo necesario. Cuéntanos si se trata de un lavaplatos, lavamanos, sifón u otro desagüe." },
      { question: "¿El servicio incluye cambiar tubería?", answer: "No se da por incluido. El destape y la sustitución de un tramo son trabajos diferentes. Si la revisión señala que hace falta una reparación, explicamos su alcance y precio antes de intervenir." },
      { question: "¿Usan cámara o equipos de alta presión?", answer: "El método se define según la solicitud y los medios disponibles. Si buscas un equipo o servicio especializado, indícalo al consultar para confirmar si podemos atender ese alcance antes de contratarlo." },
      { question: "¿Qué pasa si el desagüe se tapa otra vez?", answer: "Comunícanos cuándo ocurrió, qué punto es y cuál fue la intervención. Las condiciones de seguimiento o garantía corresponden al alcance contratado. Un problema recurrente puede necesitar una revisión diferente; no se debe asumir que basta repetir el mismo trabajo." },
      { question: "¿Atienden solicitudes en Medellín y Bello?", answer: "Sí. Comparte municipio, barrio y qué está sucediendo para confirmar disponibilidad. También recibimos solicitudes del resto del Valle de Aburrá; la programación se acuerda antes de la visita." },
    ],
    guides: [
      { href: "/blog/destape-canerias-medellin-metodos-precios", label: "Qué revisar y cotizar ante un desagüe tapado" },
      { href: "/blog/cuanto-cobra-plomero-medellin-precios", label: "Precios de referencia de plomería" },
    ],
  },
];

export function getSolutionBySlug(slug: string) {
  return SOLUTIONS.find((solution) => solution.slug === slug);
}

export function getSolutionsByLine(linea: ServiceLineId) {
  return SOLUTIONS.filter((solution) => solution.linea === linea);
}

export function getSolutionService(solution: Solution): ServiceItem {
  const service = SERVICE_DATA[solution.linea].find((item) => item.id === solution.serviceId);
  if (!service) throw new Error(`Falta el servicio de catálogo para ${solution.slug}`);
  return service;
}
