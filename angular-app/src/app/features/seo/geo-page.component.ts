import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ServicesComponent } from '../landing/components/services/services.component';
import { ProcessComponent } from '../landing/components/process/process.component';
import { SEO_COUNTRY_PAGE, SEO_REGIONS, findDepartmentBySlug } from '../../core/data/seo-regions';
import { getMobileAssetPath } from '../../core/utils/mobile-assets';

@Component({
  selector: 'app-geo-page',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent, ServicesComponent, ProcessComponent],
  template: `
    <app-header />

    <section class="route-hero">
      <div class="hero-bg">
        <img [src]="getMobileAssetPath('hero-bg.jpg')" alt="Transporte de vehículos" class="hero-image" />
        <div class="hero-gradient"></div>
        <div class="hero-grid"></div>
      </div>

      <div class="container route-hero-inner">
        <nav class="geo-breadcrumbs" aria-label="Breadcrumb">
          <a routerLink="/">Inicio</a>
          <span>/</span>
          <a routerLink="/transporte-de-vehiculos-en-colombia">Cobertura</a>
          <span>/</span>
          <span>{{ pageLabel }}</span>
        </nav>

        <div class="route-hero-copy">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            Cobertura nacional
          </div>

          <h1>{{ pageTitle }}</h1>
          <p class="lead">{{ pageDescription }}</p>

          <div class="hero-actions">
            <a href="#contacto" class="primary-action">
              <span>Cotizar Transporte</span>
              <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a routerLink="/transporte-de-vehiculos-en-colombia" class="secondary-action">Conocer Servicios</a>
          </div>
        </div>
      </div>
    </section>

    <app-services />
    <app-process />

    <main class="geo-page container">
      <section class="geo-hero">
        <div class="seo-callout">
          <p class="callout-label">¿Cómo llevamos tu servicio?</p>
          <h2>{{ departmentName ? '¿Cómo llevamos tu transporte de vehículos en ' + departmentName + '?' : '¿Cómo llevamos tu transporte de vehículos en Colombia?' }}</h2>
          <p>
            {{ departmentName ? 'Coordiamos tu traslado de vehículo en ' + departmentName + ' con atención personalizada, rutas seguras y soporte nacional para que recibas tu auto o moto sin complicaciones.' : 'Coordiamos tu traslado de vehículo en Colombia con atención personalizada, rutas seguras y soporte nacional para que recibas tu auto o moto sin complicaciones.' }}
          </p>
        </div>
      </section>

      <section class="geo-grid" *ngIf="departmentName">
        <div class="geo-panel">
          <h2>Transporte de vehículos en {{ departmentName }}</h2>
          <p>
            Transportamos vehículos en {{ departmentName }} con servicio seguro, puntual y con cobertura en ciudades y municipios clave del departamento.
          </p>
          <div class="city-links">
            @for (city of cities; track city.slug) {
              <a [routerLink]="['/transporte-de-vehiculos-en-' + departmentSlug, city.slug]" class="chip">
                {{ city.name }}
              </a>
            }
          </div>
        </div>

        <div class="geo-panel highlight">
          <h2>¿Qué incluye nuestro servicio?</h2>
          <ul>
            <li>Traslado seguro de autos, motos y flotas</li>
            <li>Rastreo y seguimiento en tiempo real</li>
            <li>Atención comercial en todo Colombia</li>
            <li>Servicio puerta a puerta y nacional</li>
          </ul>
        </div>
      </section>

      <section class="geo-listing" *ngIf="departmentName">
        <h2>Ciudades y municipios con servicio</h2>
        <div class="city-grid">
          @for (city of cities; track city.slug) {
            <a [routerLink]="['/transporte-de-vehiculos-en-' + departmentSlug, city.slug]" class="city-card">
              <strong>{{ city.name }}</strong>
              <span>Transportes Premium</span>
            </a>
          }
        </div>
      </section>

      <section class="geo-listing" *ngIf="!departmentName">
        <h2>Departamentos con cobertura nacional</h2>
        <div class="department-grid">
          @for (department of departments; track department.slug) {
            <a [routerLink]="'/transporte-de-vehiculos-en-' + department.slug" class="city-card department-card">
              <strong>{{ department.department }}</strong>
              <span>{{ department.cities.length }} municipios destacados</span>
            </a>
          }
        </div>
      </section>
    </main>

    <app-footer />
  `,
  styles: `
    :host {
      display: block;
      background: var(--theme-background);
      color: var(--theme-text);
      min-height: 100vh;
    }

    .container {
      width: min(1200px, calc(100vw - 2rem));
      margin: 0 auto;
    }

    .route-hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding: 7rem 0 3rem;
      overflow: hidden;
      background: #020b17;
    }

    .hero-bg {
      position: absolute;
      inset: 0;
      z-index: 0;
    }

    .hero-image {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.9;
      filter: saturate(0.9) contrast(1.08);
    }

    .hero-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(4, 13, 23, 0.72) 0%, rgba(2, 11, 23, 0.76) 40%, rgba(2, 11, 23, 0.86) 100%);
    }

    .hero-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(0, 102, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 102, 255, 0.03) 1px, transparent 1px);
      background-size: 60px 60px;
    }

    .route-hero-inner {
      position: relative;
      z-index: 1;
      width: min(1200px, calc(100vw - 2rem));
    }

    .geo-breadcrumbs {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 2rem;
    }

    .geo-breadcrumbs a {
      color: white;
      text-decoration: none;
    }

    .route-hero-copy {
      max-width: 900px;
      text-align: left;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.625rem;
      padding: 0.55rem 1.2rem;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      background: rgba(255, 255, 255, 0.04);
      color: rgba(255, 255, 255, 0.72);
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-weight: 700;
      margin-bottom: 1.75rem;
    }

    .badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #00d4ff;
      box-shadow: 0 0 18px rgba(0, 212, 255, 0.8);
    }

    h1 {
      margin: 0 0 1rem;
      font-size: clamp(3rem, 7vw, 7rem);
      line-height: 0.96;
      letter-spacing: -0.06em;
      max-width: 900px;
      color: white;
    }

    .lead {
      font-size: clamp(1.15rem, 2vw, 1.7rem);
      line-height: 1.5;
      color: rgba(255, 255, 255, 0.74);
      max-width: 760px;
      margin: 0;
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.9rem;
      margin-top: 2rem;
    }

    .primary-action,
    .secondary-action {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      min-height: 54px;
      padding: 0.9rem 1.8rem;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 800;
      transition: transform 0.2s ease, opacity 0.2s ease;
      font-size: 1.02rem;
    }

    .primary-action {
      background: linear-gradient(135deg, #0066ff 0%, #00d4ff 100%);
      color: white;
      box-shadow: 0 18px 35px rgba(0, 102, 255, 0.35);
    }

    .secondary-action {
      border: 1px solid rgba(255, 255, 255, 0.18);
      color: white;
      background: rgba(255, 255, 255, 0.08);
    }

    .btn-arrow {
      width: 1.1rem;
      height: 1.1rem;
      stroke-width: 2.2;
    }

    .primary-action:hover,
    .secondary-action:hover {
      transform: translateY(-1px);
    }

    .geo-page {
      padding: 3rem 0 5rem;
    }

    .geo-hero {
      max-width: 900px;
      margin-bottom: 2rem;
    }

    .seo-callout {
      margin-top: 2rem;
      padding: 1.75rem 1.5rem 1.25rem;
      border: 1px solid var(--theme-border);
      border-radius: 1.4rem;
      background: rgba(15, 23, 42, 0.72);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
      max-width: 820px;
    }

    .callout-label {
      margin: 0 0 0.75rem;
      color: #7dd3fc;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-size: 0.7rem;
    }

    .seo-callout h2 {
      margin: 0 0 0.75rem;
      font-size: clamp(1.8rem, 2.8vw, 3.5rem);
      line-height: 1.1;
      color: white;
    }

    .seo-callout p {
      margin: 0;
      color: var(--theme-text-secondary);
      line-height: 1.7;
      font-size: 1rem;
    }

    .geo-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .geo-panel {
      background: var(--theme-surface);
      border: 1px solid var(--theme-border);
      border-radius: 1.25rem;
      padding: 1.5rem;
      box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
    }

    .geo-panel.highlight {
      background: linear-gradient(135deg, rgba(0, 102, 255, 0.14), rgba(0, 212, 255, 0.08));
    }

    .geo-panel h2 {
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: clamp(1.3rem, 2vw, 1.9rem);
    }

    .geo-panel p,
    .geo-panel li {
      color: var(--theme-text-secondary);
      line-height: 1.7;
    }

    .city-links,
    .city-grid,
    .department-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 1.25rem;
    }

    .chip,
    .city-card {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.025);
      border: 1px solid var(--theme-border);
      border-radius: 999px;
      text-decoration: none;
      color: var(--theme-text);
      transition: transform 0.2s ease, border-color 0.2s ease;
    }

    .chip {
      padding: 0.7rem 1rem;
      font-size: 0.9rem;
      font-weight: 600;
    }

    .city-card {
      flex: 1 1 220px;
      min-height: 98px;
      padding: 1rem 1.1rem;
      border-radius: 1rem;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.3rem;
      text-align: left;
    }

    .city-card strong {
      font-size: 1rem;
    }

    .city-card span {
      color: var(--theme-text-secondary);
      font-size: 0.82rem;
    }

    .chip:hover,
    .city-card:hover {
      transform: translateY(-2px);
      border-color: rgba(84, 184, 255, 0.8);
    }

    .geo-listing {
      margin-top: 2rem;
    }

    .geo-listing h2 {
      margin-bottom: 1rem;
      font-size: clamp(1.4rem, 2vw, 2.2rem);
    }

    @media (max-width: 800px) {
      .geo-grid {
        grid-template-columns: 1fr;
      }
    }
  `
})
export class GeoPageComponent implements OnInit {
  getMobileAssetPath = getMobileAssetPath;
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  departments = SEO_REGIONS;
  departmentName = '';
  departmentSlug = '';
  pageTitle = SEO_COUNTRY_PAGE.title;
  pageDescription = SEO_COUNTRY_PAGE.description;
  pageLabel = 'Colombia';
  cities: Array<{ name: string; slug: string }> = [];

  ngOnInit() {
    const urlSegments = this.route.snapshot.url.map((segment) => segment.path);
    const currentPath = urlSegments.join('/');
    const match = currentPath.match(/^transporte-de-vehiculos-en-(.+?)(?:\/(.+))?$/);

    const departmentParam = match?.[1];
    const cityParam = match?.[2];
    const department = departmentParam ? findDepartmentBySlug(departmentParam) : undefined;

    if (department && cityParam) {
      const selectedCity = department.cities.find((city) => city.slug === cityParam);
      const cityName = selectedCity?.name ?? cityParam.replace(/-/g, ' ');

      this.departmentName = department.department;
      this.departmentSlug = department.slug;
      this.cities = department.cities;
      this.pageLabel = `${department.department} / ${cityName}`;
      this.pageTitle = `Transporte de vehículos en ${cityName}, ${department.department}`;
      this.pageDescription = `Servicio de transporte de vehículos en ${cityName}, ${department.department}. Empresa profesional con cobertura, seguridad y atención nacional.`;
      this.setSeo(this.pageTitle, this.pageDescription, `https://transportespremium.com/transporte-de-vehiculos-en-${department.slug}/${cityParam}`);
      return;
    }

    if (department) {
      this.departmentName = department.department;
      this.departmentSlug = department.slug;
      this.cities = department.cities;
      this.pageLabel = department.department;
      this.pageTitle = `Transporte de vehículos en ${department.department}`;
      this.pageDescription = `Servicio de transporte de vehículos en ${department.department} con atención en ciudades y municipios clave del departamento. Cotiza ahora.`;
      this.setSeo(this.pageTitle, this.pageDescription, `https://transportespremium.com/transporte-de-vehiculos-en-${department.slug}`);
      return;
    }

    this.setSeo(SEO_COUNTRY_PAGE.title, SEO_COUNTRY_PAGE.description, 'https://transportespremium.com/transporte-de-vehiculos-en-colombia');
  }

  private setSeo(title: string, description: string, canonical: string) {
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' });
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:url', content: canonical });
    this.metaService.updateTag({ property: 'og:site_name', content: 'Transportes Premium' });
    this.metaService.updateTag({ property: 'og:locale', content: 'es_CO' });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    this.setCanonical(canonical);
    this.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'AutomotiveBusiness',
      name: 'Transportes Premium',
      url: canonical,
      description,
      areaServed: this.departmentName ? [this.departmentName, 'Colombia'] : ['Colombia'],
      telephone: '+57 311 474 8893',
      priceRange: '$$$',
      makesOffer: {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: this.departmentName ? `Transporte de vehículos en ${this.departmentName}` : 'Transporte de vehículos en Colombia',
          description
        }
      }
    });
  }

  private setCanonical(href: string) {
    let link = document.head.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  private setJsonLd(data: Record<string, unknown>) {
    let script = document.head.querySelector('script[data-seo-jsonld="geo-page"]') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', 'geo-page');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }
}
