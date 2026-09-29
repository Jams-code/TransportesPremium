export interface SeoCity {
  name: string;
  slug: string;
}

export interface SeoDepartment {
  department: string;
  slug: string;
  cities: SeoCity[];
}

const slugify = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-');

export const SEO_REGIONS: SeoDepartment[] = [
  {
    department: 'Antioquia',
    slug: 'antioquia',
    cities: [
      { name: 'Medellín', slug: slugify('Medellín') },
      { name: 'Envigado', slug: slugify('Envigado') },
      { name: 'Itagüí', slug: slugify('Itagüí') },
      { name: 'Bello', slug: slugify('Bello') },
      { name: 'Rionegro', slug: slugify('Rionegro') },
      { name: 'Sabaneta', slug: slugify('Sabaneta') },
      { name: 'Turbo', slug: slugify('Turbo') },
      { name: 'Apartadó', slug: slugify('Apartadó') },
      { name: 'Guatapé', slug: slugify('Guatapé') },
      { name: 'Santa Fe de Antioquia', slug: slugify('Santa Fe de Antioquia') }
    ]
  },
  {
    department: 'Atlántico',
    slug: 'atlantico',
    cities: [
      { name: 'Barranquilla', slug: slugify('Barranquilla') },
      { name: 'Soledad', slug: slugify('Soledad') },
      { name: 'Puerto Colombia', slug: slugify('Puerto Colombia') },
      { name: 'Galapa', slug: slugify('Galapa') },
      { name: 'Sabanagrande', slug: slugify('Sabanagrande') },
      { name: 'Malambo', slug: slugify('Malambo') },
      { name: 'Baranoa', slug: slugify('Baranoa') },
      { name: 'Ponedera', slug: slugify('Ponedera') }
    ]
  },
  {
    department: 'Bogotá D.C.',
    slug: 'bogota-dc',
    cities: [
      { name: 'Bogotá', slug: slugify('Bogotá') },
      { name: 'Soacha', slug: slugify('Soacha') },
      { name: 'Chía', slug: slugify('Chía') },
      { name: 'Zipaquirá', slug: slugify('Zipaquirá') },
      { name: 'Funza', slug: slugify('Funza') },
      { name: 'Mosquera', slug: slugify('Mosquera') },
      { name: 'Cota', slug: slugify('Cota') },
      { name: 'Tocancipá', slug: slugify('Tocancipá') }
    ]
  },
  {
    department: 'Bolívar',
    slug: 'bolivar',
    cities: [
      { name: 'Cartagena', slug: slugify('Cartagena') },
      { name: 'Magangué', slug: slugify('Magangué') },
      { name: 'Sincelejo', slug: slugify('Sincelejo') },
      { name: 'Turbaco', slug: slugify('Turbaco') },
      { name: 'Arjona', slug: slugify('Arjona') },
      { name: 'Tiquisio', slug: slugify('Tiquisio') },
      { name: 'San Juan Nepomuceno', slug: slugify('San Juan Nepomuceno') },
      { name: 'María la Baja', slug: slugify('María la Baja') }
    ]
  },
  {
    department: 'Boyacá',
    slug: 'boyaca',
    cities: [
      { name: 'Tunja', slug: slugify('Tunja') },
      { name: 'Duitama', slug: slugify('Duitama') },
      { name: 'Sogamoso', slug: slugify('Sogamoso') },
      { name: 'Chiquinquirá', slug: slugify('Chiquinquirá') },
      { name: 'Villa de Leyva', slug: slugify('Villa de Leyva') },
      { name: 'Moniquirá', slug: slugify('Moniquirá') },
      { name: 'Paipa', slug: slugify('Paipa') },
      { name: 'Samacá', slug: slugify('Samacá') }
    ]
  },
  {
    department: 'Caldas',
    slug: 'caldas',
    cities: [
      { name: 'Manizales', slug: slugify('Manizales') },
      { name: 'La Dorada', slug: slugify('La Dorada') },
      { name: 'Villamaría', slug: slugify('Villamaría') },
      { name: 'Risaralda', slug: slugify('Risaralda') },
      { name: 'Chinchiná', slug: slugify('Chinchiná') },
      { name: 'Filadelfia', slug: slugify('Filadelfia') },
      { name: 'Belalcázar', slug: slugify('Belalcázar') },
      { name: 'Pensilvania', slug: slugify('Pensilvania') }
    ]
  },
  {
    department: 'Caquetá',
    slug: 'caqueta',
    cities: [
      { name: 'Florencia', slug: slugify('Florencia') },
      { name: 'La Montañita', slug: slugify('La Montañita') },
      { name: 'San Vicente del Caguán', slug: slugify('San Vicente del Caguán') },
      { name: 'Curillo', slug: slugify('Curillo') },
      { name: 'El Doncello', slug: slugify('El Doncello') },
      { name: 'Morelia', slug: slugify('Morelia') },
      { name: 'Belén de Los Andaquíes', slug: slugify('Belén de Los Andaquíes') }
    ]
  },
  {
    department: 'Cauca',
    slug: 'cauca',
    cities: [
      { name: 'Popayán', slug: slugify('Popayán') },
      { name: 'Santander de Quilichao', slug: slugify('Santander de Quilichao') },
      { name: 'Patía', slug: slugify('Patía') },
      { name: 'Piendamó', slug: slugify('Piendamó') },
      { name: 'Toribío', slug: slugify('Toribío') },
      { name: 'Puerto Tejada', slug: slugify('Puerto Tejada') },
      { name: 'Inzá', slug: slugify('Inzá') },
      { name: 'Silvia', slug: slugify('Silvia') }
    ]
  },
  {
    department: 'Cesar',
    slug: 'cesar',
    cities: [
      { name: 'Valledupar', slug: slugify('Valledupar') },
      { name: 'Barrancas', slug: slugify('Barrancas') },
      { name: 'La Jagua de Ibirico', slug: slugify('La Jagua de Ibirico') },
      { name: 'Aguachica', slug: slugify('Aguachica') },
      { name: 'San Diego', slug: slugify('San Diego') },
      { name: 'Codazzi', slug: slugify('Codazzi') },
      { name: 'Bosconia', slug: slugify('Bosconia') },
      { name: 'El Copey', slug: slugify('El Copey') }
    ]
  },
  {
    department: 'Córdoba',
    slug: 'cordoba',
    cities: [
      { name: 'Montería', slug: slugify('Montería') },
      { name: 'Cereté', slug: slugify('Cereté') },
      { name: 'Planeta Rica', slug: slugify('Planeta Rica') },
      { name: 'Lorica', slug: slugify('Lorica') },
      { name: 'Sahagún', slug: slugify('Sahagún') },
      { name: 'Chinú', slug: slugify('Chinú') },
      { name: 'San Bernardo del Viento', slug: slugify('San Bernardo del Viento') },
      { name: 'Los Córdobas', slug: slugify('Los Córdobas') }
    ]
  },
  {
    department: 'Cundinamarca',
    slug: 'cundinamarca',
    cities: [
      { name: 'Bogotá', slug: slugify('Bogotá') },
      { name: 'Girardot', slug: slugify('Girardot') },
      { name: 'Fusagasugá', slug: slugify('Fusagasugá') },
      { name: 'Soacha', slug: slugify('Soacha') },
      { name: 'Zipaquirá', slug: slugify('Zipaquirá') },
      { name: 'Chía', slug: slugify('Chía') },
      { name: 'Facatativá', slug: slugify('Facatativá') },
      { name: 'Sibaté', slug: slugify('Sibaté') }
    ]
  },
  {
    department: 'Chocó',
    slug: 'choco',
    cities: [
      { name: 'Quibdó', slug: slugify('Quibdó') },
      { name: 'Nuquí', slug: slugify('Nuquí') },
      { name: 'Bahía Solano', slug: slugify('Bahía Solano') },
      { name: 'Istmina', slug: slugify('Istmina') },
      { name: 'Medio Atrato', slug: slugify('Medio Atrato') },
      { name: 'Condoto', slug: slugify('Condoto') },
      { name: 'Riosucio', slug: slugify('Riosucio') },
      { name: 'Unguía', slug: slugify('Unguía') }
    ]
  },
  {
    department: 'Huila',
    slug: 'huila',
    cities: [
      { name: 'Neiva', slug: slugify('Neiva') },
      { name: 'Pitalito', slug: slugify('Pitalito') },
      { name: 'Garzón', slug: slugify('Garzón') },
      { name: 'Campoalegre', slug: slugify('Campoalegre') },
      { name: 'La Plata', slug: slugify('La Plata') },
      { name: 'Rivera', slug: slugify('Rivera') },
      { name: 'Acevedo', slug: slugify('Acevedo') },
      { name: 'Algeciras', slug: slugify('Algeciras') }
    ]
  },
  {
    department: 'La Guajira',
    slug: 'la-guajira',
    cities: [
      { name: 'Riohacha', slug: slugify('Riohacha') },
      { name: 'Maicao', slug: slugify('Maicao') },
      { name: 'Uribia', slug: slugify('Uribia') },
      { name: 'Manaure', slug: slugify('Manaure') },
      { name: 'Albania', slug: slugify('Albania') },
      { name: 'San Juan del Cesar', slug: slugify('San Juan del Cesar') },
      { name: 'Villanueva', slug: slugify('Villanueva') },
      { name: 'Hatonuevo', slug: slugify('Hatonuevo') }
    ]
  },
  {
    department: 'Magdalena',
    slug: 'magdalena',
    cities: [
      { name: 'Santa Marta', slug: slugify('Santa Marta') },
      { name: 'Ciénaga', slug: slugify('Ciénaga') },
      { name: 'Fundación', slug: slugify('Fundación') },
      { name: 'Aracataca', slug: slugify('Aracataca') },
      { name: 'El Banco', slug: slugify('El Banco') },
      { name: 'Plato', slug: slugify('Plato') },
      { name: 'Salamina', slug: slugify('Salamina') },
      { name: 'Pivijay', slug: slugify('Pivijay') }
    ]
  },
  {
    department: 'Meta',
    slug: 'meta',
    cities: [
      { name: 'Villavicencio', slug: slugify('Villavicencio') },
      { name: 'Acacías', slug: slugify('Acacías') },
      { name: 'Granada', slug: slugify('Granada') },
      { name: 'Puerto Lleras', slug: slugify('Puerto Lleras') },
      { name: 'Restrepo', slug: slugify('Restrepo') },
      { name: 'La Macarena', slug: slugify('La Macarena') },
      { name: 'Puerto Concordia', slug: slugify('Puerto Concordia') },
      { name: 'San Martín', slug: slugify('San Martín') }
    ]
  },
  {
    department: 'Nariño',
    slug: 'narino',
    cities: [
      { name: 'Pasto', slug: slugify('Pasto') },
      { name: 'Ipiales', slug: slugify('Ipiales') },
      { name: 'Tumaco', slug: slugify('Tumaco') },
      { name: 'Tuquerres', slug: slugify('Tuquerres') },
      { name: 'Barbacoas', slug: slugify('Barbacoas') },
      { name: 'La Cruz', slug: slugify('La Cruz') },
      { name: 'Sandoná', slug: slugify('Sandoná') },
      { name: 'Taminango', slug: slugify('Taminango') }
    ]
  },
  {
    department: 'Norte de Santander',
    slug: 'norte-de-santander',
    cities: [
      { name: 'Cúcuta', slug: slugify('Cúcuta') },
      { name: 'Ocaña', slug: slugify('Ocaña') },
      { name: 'Pamplona', slug: slugify('Pamplona') },
      { name: 'Villa del Rosario', slug: slugify('Villa del Rosario') },
      { name: 'Los Patios', slug: slugify('Los Patios') },
      { name: 'El Zulia', slug: slugify('El Zulia') },
      { name: 'Chinácota', slug: slugify('Chinácota') },
      { name: 'Bucarasica', slug: slugify('Bucarasica') }
    ]
  },
  {
    department: 'Putumayo',
    slug: 'putumayo',
    cities: [
      { name: 'Mocoa', slug: slugify('Mocoa') },
      { name: 'Puerto Asís', slug: slugify('Puerto Asís') },
      { name: 'Villa Garzón', slug: slugify('Villa Garzón') },
      { name: 'Orito', slug: slugify('Orito') },
      { name: 'San Miguel', slug: slugify('San Miguel') },
      { name: 'Valparaíso', slug: slugify('Valparaíso') },
      { name: 'Sibundoy', slug: slugify('Sibundoy') },
      { name: 'La Hormiga', slug: slugify('La Hormiga') }
    ]
  },
  {
    department: 'Quindío',
    slug: 'quindio',
    cities: [
      { name: 'Armenia', slug: slugify('Armenia') },
      { name: 'Calarcá', slug: slugify('Calarcá') },
      { name: 'Montenegro', slug: slugify('Montenegro') },
      { name: 'Pijao', slug: slugify('Pijao') },
      { name: 'Circasia', slug: slugify('Circasia') },
      { name: 'La Tebaida', slug: slugify('La Tebaida') },
      { name: 'Salento', slug: slugify('Salento') },
      { name: 'Génova', slug: slugify('Génova') }
    ]
  },
  {
    department: 'Risaralda',
    slug: 'risaralda',
    cities: [
      { name: 'Pereira', slug: slugify('Pereira') },
      { name: 'Dosquebradas', slug: slugify('Dosquebradas') },
      { name: 'La Virginia', slug: slugify('La Virginia') },
      { name: 'Santa Rosa de Cabal', slug: slugify('Santa Rosa de Cabal') },
      { name: 'Belén de Umbría', slug: slugify('Belén de Umbría') },
      { name: 'Marsella', slug: slugify('Marsella') },
      { name: 'Quinchía', slug: slugify('Quinchía') },
      { name: 'Balboa', slug: slugify('Balboa') }
    ]
  },
  {
    department: 'Santander',
    slug: 'santander',
    cities: [
      { name: 'Bucaramanga', slug: slugify('Bucaramanga') },
      { name: 'Floridablanca', slug: slugify('Floridablanca') },
      { name: 'Girón', slug: slugify('Girón') },
      { name: 'Barrancabermeja', slug: slugify('Barrancabermeja') },
      { name: 'Piedecuesta', slug: slugify('Piedecuesta') },
      { name: 'San Gil', slug: slugify('San Gil') },
      { name: 'Socorro', slug: slugify('Socorro') },
      { name: 'Barbosa', slug: slugify('Barbosa') }
    ]
  },
  {
    department: 'Sucre',
    slug: 'sucre',
    cities: [
      { name: 'Sincelejo', slug: slugify('Sincelejo') },
      { name: 'Corozal', slug: slugify('Corozal') },
      { name: 'Sampués', slug: slugify('Sampués') },
      { name: 'Tolú', slug: slugify('Tolú') },
      { name: 'Majagual', slug: slugify('Majagual') },
      { name: 'San Onofre', slug: slugify('San Onofre') },
      { name: 'Coveñas', slug: slugify('Coveñas') },
      { name: 'Morroa', slug: slugify('Morroa') }
    ]
  },
  {
    department: 'Tolima',
    slug: 'tolima',
    cities: [
      { name: 'Ibagué', slug: slugify('Ibagué') },
      { name: 'Espinal', slug: slugify('Espinal') },
      { name: 'Melgar', slug: slugify('Melgar') },
      { name: 'Honda', slug: slugify('Honda') },
      { name: 'Mariquita', slug: slugify('Mariquita') },
      { name: 'Líbano', slug: slugify('Líbano') },
      { name: 'Armero', slug: slugify('Armero') },
      { name: 'Guamo', slug: slugify('Guamo') }
    ]
  },
  {
    department: 'Valle del Cauca',
    slug: 'valle-del-cauca',
    cities: [
      { name: 'Cali', slug: slugify('Cali') },
      { name: 'Palmira', slug: slugify('Palmira') },
      { name: 'Buga', slug: slugify('Buga') },
      { name: 'Tulúa', slug: slugify('Tulúa') },
      { name: 'Cartago', slug: slugify('Cartago') },
      { name: 'Jamundí', slug: slugify('Jamundí') },
      { name: 'Yumbo', slug: slugify('Yumbo') },
      { name: 'Buenaventura', slug: slugify('Buenaventura') }
    ]
  },
  {
    department: 'Arauca',
    slug: 'arauca',
    cities: [
      { name: 'Arauca', slug: slugify('Arauca') },
      { name: 'Arauquita', slug: slugify('Arauquita') },
      { name: 'Fortul', slug: slugify('Fortul') },
      { name: 'Saravena', slug: slugify('Saravena') },
      { name: 'Tame', slug: slugify('Tame') },
      { name: 'Cravo Norte', slug: slugify('Cravo Norte') },
      { name: 'Paz de Ariporo', slug: slugify('Paz de Ariporo') }
    ]
  },
  {
    department: 'Casanare',
    slug: 'casanare',
    cities: [
      { name: 'Yopal', slug: slugify('Yopal') },
      { name: 'Aguazul', slug: slugify('Aguazul') },
      { name: 'Villanueva', slug: slugify('Villanueva') },
      { name: 'Hato Corozal', slug: slugify('Hato Corozal') },
      { name: 'Pore', slug: slugify('Pore') },
      { name: 'Tauramena', slug: slugify('Tauramena') },
      { name: 'Trinidad', slug: slugify('Trinidad') },
      { name: 'San Luis de Palenque', slug: slugify('San Luis de Palenque') }
    ]
  },
  {
    department: 'Guainía',
    slug: 'guainia',
    cities: [
      { name: 'Inírida', slug: slugify('Inírida') },
      { name: 'Barranco Minas', slug: slugify('Barranco Minas') },
      { name: 'Mapiripana', slug: slugify('Mapiripana') },
      { name: 'San Felipe', slug: slugify('San Felipe') },
      { name: 'La Guadalupe', slug: slugify('La Guadalupe') },
      { name: 'Pana Pana', slug: slugify('Pana Pana') }
    ]
  },
  {
    department: 'Guaviare',
    slug: 'guaviare',
    cities: [
      { name: 'San José del Guaviare', slug: slugify('San José del Guaviare') },
      { name: 'Miraflores', slug: slugify('Miraflores') },
      { name: 'Calamar', slug: slugify('Calamar') },
      { name: 'El Retorno', slug: slugify('El Retorno') },
      { name: 'La Guadalupe', slug: slugify('La Guadalupe') }
    ]
  },
  {
    department: 'Vaupés',
    slug: 'vaupes',
    cities: [
      { name: 'Mitú', slug: slugify('Mitú') },
      { name: 'Taraira', slug: slugify('Taraira') },
      { name: 'Yavaraté', slug: slugify('Yavaraté') },
      { name: 'Carurú', slug: slugify('Carurú') },
      { name: 'Papunaua', slug: slugify('Papunaua') }
    ]
  },
  {
    department: 'Vichada',
    slug: 'vichada',
    cities: [
      { name: 'Puerto Carreño', slug: slugify('Puerto Carreño') },
      { name: 'La Primavera', slug: slugify('La Primavera') },
      { name: 'Santa Rosalía', slug: slugify('Santa Rosalía') },
      { name: 'Cumaribo', slug: slugify('Cumaribo') },
      { name: 'Barrancominas', slug: slugify('Barrancominas') }
    ]
  },
  {
    department: 'Amazonas',
    slug: 'amazonas',
    cities: [
      { name: 'Leticia', slug: slugify('Leticia') },
      { name: 'Puerto Nariño', slug: slugify('Puerto Nariño') },
      { name: 'El Encanto', slug: slugify('El Encanto') },
      { name: 'La Chorrera', slug: slugify('La Chorrera') },
      { name: 'Tarapacá', slug: slugify('Tarapacá') },
      { name: 'Puerto Santander', slug: slugify('Puerto Santander') }
    ]
  }
];

export const SEO_COUNTRY_PAGE = {
  title: 'Transporte de vehículos en Colombia',
  description: 'Servicio de transporte de vehículos en Colombia para ciudades, departamentos y municipios del país. Cotiza transporte seguro, puntual y nacional.',
  slug: 'transporte-de-vehiculos-en-colombia'
};

export const NINERAS_CITIES: SeoCity[] = [
  { name: 'Bogotá', slug: 'bogota' },
  { name: 'Medellín', slug: 'medellin' },
  { name: 'Cali', slug: 'cali' },
  { name: 'Barranquilla', slug: 'barranquilla' },
  { name: 'Cartagena', slug: 'cartagena' },
  { name: 'Bucaramanga', slug: 'bucaramanga' },
  { name: 'Pereira', slug: 'pereira' },
  { name: 'Manizales', slug: 'manizales' },
  { name: 'Ibagué', slug: 'ibague' },
  { name: 'Villavicencio', slug: 'villavicencio' },
  { name: 'Cúcuta', slug: 'cucuta' },
  { name: 'Santa Marta', slug: 'santa-marta' },
  { name: 'Pasto', slug: 'pasto' },
  { name: 'Montería', slug: 'monteria' },
  { name: 'Armenia', slug: 'armenia' },
  { name: 'Tunja', slug: 'tunja' },
  { name: 'Soacha', slug: 'soacha' },
  { name: 'Chía', slug: 'chia' },
  { name: 'Envigado', slug: 'envigado' },
  { name: 'Soledad', slug: 'soledad' }
];

export const NINERAS_COUNTRY_PAGE = {
  title: 'Niñeras en Colombia',
  description: 'Encuentra niñeras y cuidadores en Bogotá, Medellín, Cali y más ciudades de Colombia con atención responsable, segura y cercana.',
  slug: 'nineras-en-colombia'
};

export const findDepartmentBySlug = (slug: string) => SEO_REGIONS.find((department) => department.slug === slug);

export const findCityBySlug = (departmentSlug: string, citySlug: string) => {
  const department = findDepartmentBySlug(departmentSlug);
  return department?.cities.find((city) => city.slug === citySlug);
};
