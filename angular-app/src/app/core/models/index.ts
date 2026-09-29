export interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  badge?: string;
  featured?: boolean;
  features: string[];
}

export interface FleetUnit {
  id: number;
  title: string;
  description: string;
  image: string;
  specs: FleetSpec[];
}

export interface FleetSpec {
  value: string;
  label: string;
}

export interface CoverageCity {
  id: number;
  name: string;
  region: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  text: string;
  rating: number;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  origin: string;
  destination: string;
  vehicle: string;
  message: string;
}

export interface ProcessStep {
  id: number;
  number: string;
  icon: string;
  title: string;
  description: string;
}

export interface TrustItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface Stat {
  id: number;
  value: number;
  suffix: string;
  label: string;
}