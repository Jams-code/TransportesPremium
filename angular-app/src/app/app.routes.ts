import { Routes } from '@angular/router';
import { NINERAS_CITIES, SEO_REGIONS } from './core/data/seo-regions';

const seoRoutes: Routes = SEO_REGIONS.flatMap((department) => [
  {
    path: `transporte-de-vehiculos-en-${department.slug}`,
    loadComponent: () => import('./features/seo/geo-page.component').then(m => m.GeoPageComponent),
    data: { department: department.slug }
  },
  {
    path: `transporte-de-vehiculos-en-${department.slug}/:city`,
    loadComponent: () => import('./features/seo/geo-page.component').then(m => m.GeoPageComponent),
    data: { department: department.slug }
  }
]);

const ninerasRoutes: Routes = [
  {
    path: 'nineras-en-colombia',
    loadComponent: () => import('./features/seo/service-location-page.component').then(m => m.ServiceLocationPageComponent)
  },
  ...NINERAS_CITIES.map((city) => ({
    path: `nineras-en-${city.slug}`,
    loadComponent: () => import('./features/seo/service-location-page.component').then(m => m.ServiceLocationPageComponent)
  }))
];

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'transporte-de-vehiculos-en-colombia',
    loadComponent: () => import('./features/seo/geo-page.component').then(m => m.GeoPageComponent)
  },
  ...seoRoutes,
  ...ninerasRoutes,
  {
    path: '**',
    redirectTo: ''
  }
];