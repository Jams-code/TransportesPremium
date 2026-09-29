import { Injectable, signal } from '@angular/core';
import {
  Service,
  FleetUnit,
  CoverageCity,
  Testimonial,
  ProcessStep,
  TrustItem,
  Stat
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Services
  services = signal<Service[]>([
    {
      id: 1,
      title: 'Transporte Estándar',
      description: 'Movemos hasta 8 vehículos en nuestras unidades de doble piso con plataforma abierta. Perfecto para flotas corporativas, concesionarios y transporte de vehículos nuevos. Incluye seguro básico, seguimiento GPS en tiempo real y recolección en puntos estratégicos a nivel nacional.',
      image: '/assets/img/service-estandar.png',
      badge: 'Más Popular',
      featured: true,
      features: ['Capacidad hasta 8 vehículos', 'Cobertura nacional', 'Seguro incluido', 'Seguimiento GPS']
    },
    {
      id: 2,
      title: 'Transporte Ejecutivo',
      description: 'Servicio premium diseñado para quienes buscan mayor cuidado y privacidad. Transportamos hasta 4 vehículos por unidad con espacio adicional, protección reforzada y entregas prioritarias. Ideal para vehículos de lujo, coleccionables o equipos corporativos de alto valor.',
      image: '/assets/img/service-ejecutivo.png',
      features: ['Capacidad hasta 4 vehículos', 'Unidades climatizadas', 'Seguro premium', 'Entrega express']
    },
    {
      id: 3,
      title: 'Transporte VIP',
      description: 'La máxima expresión en cuidado y seguridad para tus vehículos más valiosos. Utilizamos unidades cerradas con suspensión neumática, control climático y sistema de anclaje profesional. Cada vehículo viaja asegurado a todo riesgo con atención personalizada y entrega puerta a puerta.',
      image: '/assets/img/service-vip.png',
      features: ['Unidades cerradas', 'Suspensión neumática', 'Seguro a todo riesgo', 'Transporte puerta a puerta']
    }
  ]);

  // Fleet
  fleet = signal<FleetUnit[]>([
    {
      id: 1,
      title: 'Unidades Especializadas',
      description: 'Nuestra flota cuenta con camiones de doble piso, unidades cerradas y vehículos equipados con tecnología de punta para garantizar la seguridad de tu carga.',
      image: '/assets/img/fleet-main.jpg',
      specs: [
        { value: '50+', label: 'Unidades Activas' },
        { value: '2024', label: 'Año Promedio' },
        { value: 'GPS', label: 'Monitoreo 24/7' }
      ]
    }
  ]);

  // Testimonials
  testimonials = signal<Testimonial[]>([
    {
      id: 1,
      name: 'Carlos Rodríguez',
      role: 'Empresario, Bogotá',
      avatar: 'CR',
      text: 'Excelente servicio. Mi auto llegó impecable a su destino. El seguimiento en tiempo real me dio mucha tranquilidad durante todo el proceso.',
      rating: 5
    },
    {
      id: 2,
      name: 'Andrea López',
      role: 'Directora, AutoMotor Colombia',
      avatar: 'AL',
      text: 'Transportamos nuestra flota de 15 vehículos con Transportes Premium. Puntuales, profesionales y con un trato de primera. Totalmente recomendados.',
      rating: 5
    },
    {
      id: 3,
      name: 'Andrés Martínez',
      role: 'Coleccionista, Medellín',
      avatar: 'AM',
      text: 'Mi vehículo de lujo necesitaba un trato especial. El servicio VIP fue excepcional, llegó como nuevo. Sin duda los volveré a usar.',
      rating: 5
    }
  ]);

  // Process Steps
  processSteps = signal<ProcessStep[]>([
    {
      id: 1,
      number: '01',
      icon: 'form',
      title: 'Cotiza',
      description: 'Completa nuestro formulario con los datos de origen, destino y vehículo a transportar.'
    },
    {
      id: 2,
      number: '02',
      icon: 'handshake',
      title: 'Agendamos',
      description: 'Revisamos nuestra disponibilidad y coordinamos contigo la fecha que mejor se ajuste a tus necesidades.'
    },
    {
      id: 3,
      number: '03',
      icon: 'truck',
      title: 'Recogemos',
      description: 'Nuestro equipo recoge tu vehículo en el lugar y fecha acordados, de forma segura y coordinada.'
    },
    {
      id: 4,
      number: '04',
      icon: 'check-circle',
      title: 'Entregamos',
      description: 'Transportamos tu vehículo hasta el destino acordado y realizamos la entrega en perfectas condiciones.'
    }
  ]);

  // Trust Items
  trustItems = signal<TrustItem[]>([
    { id: 1, icon: 'shield', title: 'Seguro Total', description: 'Cobertura completa' },
    { id: 2, icon: 'pin', title: 'GPS en Tiempo Real', description: 'Monitoreo 24/7' },
    { id: 3, icon: 'bolt', title: 'Entrega Puntual', description: 'Cumplimiento garantizado' },
    { id: 4, icon: 'trophy', title: '+10 Años', description: 'De experiencia' }
  ]);

  // Stats
  stats = signal<Stat[]>([
    { id: 1, value: 15000, suffix: '+', label: 'Vehículos Transportados' },
    { id: 2, value: 98, suffix: '%', label: 'Satisfacción del Cliente' },
    { id: 3, value: 32, suffix: '', label: 'Departamentos' }
  ]);

  // Coverage Cities
  coverageRegions = signal<{ region: string; cities: string[] }[]>([
    {
      region: 'Zona Andina',
      cities: ['Bogotá', 'Medellín', 'Manizales', 'Pereira', 'Armenia']
    },
    {
      region: 'Zona Caribe',
      cities: ['Cartagena', 'Barranquilla', 'Santa Marta', 'Riohacha', 'Buenaventura']
    },
    {
      region: 'Zona Central',
      cities: ['Cali', 'Bogotá', 'Tunja', 'Facatativá', 'Zipaquirá']
    },
    {
      region: 'Zona Oriental',
      cities: ['Villavicencio', 'Tunja', 'Montería', 'Cúcuta', 'Valledupar']
    }
  ]);

  // Colombian Cities
  cities = signal<string[]>([
    'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Cúcuta',
    'Bucaramanga', 'Pereira', 'Santa Marta', 'Ibagué', 'Manizales',
    'Villavicencio', 'Montería', 'Neiva', 'Pasto', 'Armenia', 'Sincelejo',
    'Valledupar', 'Riohacha', 'Tunja', 'Popayán', 'Quibdó', 'Yopal',
    'Buenaventura', 'Palmira', 'Soledad', 'Soacha', 'Envigado', 'Bello',
    'Itagüí', 'Floridablanca', 'Girón', 'Tuluá', 'Duitama', 'Sogamoso',
    'Barrancabermeja', 'Fusagasugá', 'Apartadó', 'Tumaco', 'Chía',
    'Zipaquira', 'Facatativá', 'Zipaquirá', 'Ocaña', 'Magangué',
    'Turbo', 'Rionegro', 'Girardot', 'Ciénaga', 'Maicao'
  ]);

  // Social Links
  socialLinks = signal([
    { name: 'Facebook', url: '#', icon: 'facebook' },
    { name: 'Instagram', url: '#', icon: 'instagram' },
    { name: 'Twitter', url: '#', icon: 'twitter' },
    { name: 'LinkedIn', url: '#', icon: 'linkedin' }
  ]);
}