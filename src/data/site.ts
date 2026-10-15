// Datos del negocio. Todo lo marcado PENDIENTE hay que confirmarlo con el cliente
// antes de publicar (ver docs/PENDIENTES.md).
export const site = {
  nombre: 'UNIK',
  nombreCompleto: 'UNIK Sofás',
  razonSocial: 'UNIK Interior Design SL',
  tagline: 'Sofás · Mobiliario · Interiorismo · Reformas',
  url: 'https://www.uniksofas.es', // PENDIENTE: dominio definitivo
  direccion: {
    calle: 'Avenida de los Pirineos, 27',
    cp: '28703', // PENDIENTE: 28702 o 28703
    ciudad: 'San Sebastián de los Reyes',
    provincia: 'Madrid',
  },
  telefono: '911 73 49 85',
  telefonoHref: 'tel:+34911734985',
  whatsapp: '34600000000', // PENDIENTE: número de WhatsApp real
  email: 'hola@uniksofas.es', // PENDIENTE
  horario: [
    // PENDIENTE: horario real
    { dias: 'Lunes a viernes', horas: '10:00–14:00 · 17:00–20:30' },
    { dias: 'Sábados', horas: '10:00–14:00' },
  ],
  instagram: 'https://www.instagram.com/unik_design.es/',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Avenida+de+los+Pirineos+27+San+Sebasti%C3%A1n+de+los+Reyes',
  pendiente: true, // true = muestra el aviso de "preview" en la web
};

export const waLink = (texto: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}`;

export const marcas = [
  { slug: 'bobbio', nombre: 'Bobbio', foco: 'Sofás y butacas', confirmada: true },
  { slug: 'afosxsofas', nombre: 'Afosxsofas', foco: 'Sofás, relax y sofás cama', confirmada: true },
  { slug: 'pedro-ortiz', nombre: 'Pedro Ortiz', foco: 'Sofás', confirmada: false },
  { slug: 'guardia', nombre: 'Guardia', foco: 'Salón y dormitorio', confirmada: false },
  { slug: 'rodri-diseno', nombre: 'Rodri Diseño', foco: 'Mesas, sillas y muebles', confirmada: false },
  { slug: 'modesto-navarro', nombre: 'Modesto Navarro', foco: 'Sillas', confirmada: false },
  { slug: 'oslo', nombre: 'Oslo', foco: 'Mesas y composiciones', confirmada: false },
];
