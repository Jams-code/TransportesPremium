import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../core/services/data.service';
import { ColombiaMapComponent } from '../colombia-map/colombia-map.component';

@Component({
  selector: 'app-coverage',
  standalone: true,
  imports: [CommonModule, ColombiaMapComponent],
  template: `
    <section class="coverage" id="cobertura">
      <div class="container">
        <div class="coverage-layout">
          <div class="coverage-content">
            <span class="section-tag">Cobertura Nacional</span>
            <h2 class="section-title">Llegamos a <span class="title-gradient">todos lados</span></h2>
            <p class="section-description">Nuestra red de cobertura abarca todo el territorio nacional, conectando cada rincón del país con servicio de primera calidad.</p>
            <div class="coverage-metrics">
              <div class="coverage-metric"><svg class="icon metric-icon" aria-hidden="true"><use href="#i-pin"></use></svg><span><strong>18 ciudades</strong><small>con cobertura nacional</small></span></div>
              <div class="coverage-metric"><svg class="icon metric-icon" aria-hidden="true"><use href="#i-layers"></use></svg><span><strong>4 zonas</strong><small>del país conectadas</small></span></div>
              <div class="coverage-metric"><svg class="icon metric-icon" aria-hidden="true"><use href="#i-shield"></use></svg><span><strong>Transporte seguro</strong><small>en todo el territorio</small></span></div>
            </div>
            <div class="coverage-cities">
              <article class="city-group" *ngFor="let region of coverageRegions(); let i = index" [class]="zoneClasses[i]">
                <div class="zone-icon"><svg class="icon" aria-hidden="true"><use [attr.href]="'#i-' + zoneMeta[i].icon"></use></svg></div>
                <h4>{{ region.region }}</h4>
                <p class="zone-subtitle">{{ zoneMeta[i].subtitle }}</p>
                <ul>
                  <li *ngFor="let city of region.cities">{{ city }}</li>
                </ul>
                <div class="zone-image"><img [src]="zoneMeta[i].image" [alt]="zoneMeta[i].alt"><span>{{ zoneMeta[i].caption }}</span></div>
              </article>
            </div>
          </div>
          <div class="coverage-map">
            <div class="map-note">Conectamos<br>Colombia <svg class="icon map-note-arrow" aria-hidden="true"><use href="#i-arrow-down-right"></use></svg></div>
            <div class="map-summary"><strong><svg class="icon icon-sm" aria-hidden="true"><use href="#i-layers"></use></svg> 18 ciudades</strong><small>Cobertura nacional</small><svg class="icon map-summary-arrow" aria-hidden="true"><use href="#i-chevron-right"></use></svg></div>
            <app-colombia-map [regions]="coverageRegions()"></app-colombia-map>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .coverage {
      position: relative;
      overflow: hidden;
      padding: 5.5rem 0;
      background: radial-gradient(circle at top right, rgba(0, 140, 255, 0.05), transparent 35%), linear-gradient(180deg, var(--theme-surface) 0%, var(--theme-bg) 100%);
      scroll-margin-top: 5rem;
    }

    .coverage > .container {
      width: min(94%, 1600px);
      max-width: none;
      padding: 0;
    }

    .coverage-layout {
      display: grid;
      grid-template-columns: minmax(0, 1.28fr) minmax(500px, 0.82fr);
      gap: clamp(4.5rem, 5vw, 5.5rem);
      width: 100%;
      max-width: none;
      margin: 0 auto 2.4rem;
      padding: 0;
    }

    .coverage-content { order: 1; width: 100%; min-width: 0; }

    .section-tag {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: var(--theme-surface-raised);
      border: 1px solid var(--theme-border);
      border-radius: 100px;
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--theme-accent);
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
    }

    .section-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(3rem, 4.5vw, 4.5rem);
      font-weight: 700;
      line-height: 1;
      margin-bottom: 1.75rem;
      letter-spacing: -0.02em;
      color: var(--theme-text);
    }

    .title-gradient {
      background: linear-gradient(135deg, #0066ff 0%, #00d4ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .section-description {
      font-size: clamp(1rem, 1.3vw, 1.15rem);
      color: var(--theme-text-secondary);
      max-width: 650px;
      line-height: 1.7;
    }

    .coverage-map {
      order: 2;
      position: relative;
      height: 650px;
      background: var(--theme-surface);
      border: 1px solid var(--theme-border);
      border-radius: 28px;
      box-shadow: 0 20px 60px rgba(0, 40, 100, 0.08);
      width: 100%;
      max-width: 680px;
      justify-self: end;
      min-width: 0;
      overflow: hidden;
    }

    .coverage-cities {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: clamp(1.1rem, 1.7vw, 1.75rem);
      width: 100%;
      margin-top: 2.6rem;
    }

    .coverage-metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.75rem; margin-top: 2.4rem; margin-bottom: 2.6rem; }
    .coverage-metric { display: flex; align-items: center; gap: 0.9rem; min-width: 0; padding: 0 1.25rem; border-right: 1px solid var(--theme-border); }
    .coverage-metric:first-child { padding-left: 0; }
    .coverage-metric:last-child { border-right: 0; }
    .metric-icon, .zone-icon { display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 2.5rem; height: 2.5rem; padding: 0.58rem; border-radius: 50%; background: #e7f2ff; color: #0879e8; stroke-width: 1.9; }
    .coverage-metric > span:last-child { display: flex; flex-direction: column; min-width: 0; }
    .coverage-metric strong { color: var(--theme-text); font-size: 0.88rem; white-space: nowrap; }
    .coverage-metric small { color: var(--theme-text-muted); font-size: 0.68rem; margin-top: 0.2rem; white-space: nowrap; }

    .city-group h4 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--theme-text);
      margin: 0.8rem 0 0;
      font-size: 0.92rem;
    }

    .city-group { display: flex; flex-direction: column; min-width: 0; min-height: 390px; overflow: hidden; padding: 1.35rem 1.15rem 0; border: 1px solid var(--theme-border); border-radius: 22px; background: var(--theme-surface); box-shadow: 0 8px 24px rgba(0, 40, 100, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .city-group:hover { transform: translateY(-6px); box-shadow: 0 16px 32px rgba(0, 100, 220, 0.12); }
    .zone-icon { width: 2.25rem; height: 2.25rem; padding: 0.52rem; }
    .zone-subtitle { margin: 0.2rem 0 0.5rem; color: var(--theme-text-muted); font-size: 0.67rem; white-space: nowrap; }
    .zone-caribe .zone-icon { background: #e1fbff; color: #00a8c8; }
    .zone-central .zone-icon { background: #f0eaff; color: #7258d8; }
    .zone-oriental .zone-icon { background: #e5f8ed; color: #2a9b60; }

    .city-group ul li {
      font-size: 0.7rem;
      color: var(--theme-text-secondary);
      padding: 0.2rem 0;
      padding-left: 0.9rem;
      position: relative;
    }

    .city-group ul li::before {
      content: '';
      position: absolute;
      left: 0;
      color: #0879e8;
    }

    .zone-image { position: relative; height: 108px; margin: auto -1.15rem 0; overflow: hidden; }
    .zone-image img { width: 100%; height: 100%; object-fit: cover; filter: saturate(0.9); }
    .zone-image::after { position: absolute; inset: 0; background: linear-gradient(180deg, transparent, rgba(5, 26, 67, 0.72)); content: ''; }
    .zone-image span { position: absolute; z-index: 1; bottom: 0.55rem; left: 0.55rem; color: #ffffff; font-size: 0.52rem; font-weight: 700; letter-spacing: 0.08em; }
    .map-note { position: absolute; z-index: 3; top: 1.9rem; left: 1.75rem; color: var(--theme-text-secondary); font-family: cursive; font-size: 0.95rem; opacity: 0.75; transform: rotate(-6deg); }
    .map-note span { display: block; font-family: sans-serif; font-size: 1.4rem; transform: rotate(35deg); }
    .map-summary { position: absolute; z-index: 4; top: 1.75rem; right: 1.5rem; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 0.7rem; min-width: 185px; padding: 0.8rem 1rem; border: 1px solid var(--theme-border); border-radius: 16px; background: var(--theme-surface-raised); box-shadow: 0 12px 28px rgba(0, 40, 100, 0.12); color: var(--theme-text); }
    .map-summary strong { font-size: 0.78rem; }
    .map-summary small { grid-column: 2; color: var(--theme-text-muted); font-size: 0.64rem; }
    .map-summary-arrow { grid-column: 3; grid-row: 1 / 3; color: #0879e8; width: 1.4rem; height: 1.4rem; }

    @media (min-width: 768px) {
      .coverage { padding: 7rem 0; }
      .coverage-layout { flex-direction: row; align-items: stretch; }
    }

    @media (min-width: 1025px) and (max-width: 1300px) {
      .coverage-layout { grid-template-columns: minmax(0, 1.05fr) minmax(440px, 0.95fr); gap: 3.5rem; }
      .coverage-cities { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .coverage-map { height: 600px; }
    }

    @media (max-width: 1024px) {
      .coverage-layout { flex-direction: column; }
      .coverage-content, .coverage-map { width: 100%; flex-basis: auto; }
      .coverage-layout { display: flex; }
      .coverage-map { height: 560px; }
      .coverage-cities { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 767px) {
      .coverage { padding: 4rem 0; }
      .coverage-layout { padding: 0 1rem; gap: 2rem; }
      .coverage-map { height: 500px; border-radius: 20px; }
      .coverage-metrics { grid-template-columns: 1fr; gap: 0.8rem; }
      .coverage-metric, .coverage-metric:first-child { padding: 0.5rem 0; border-right: 0; border-bottom: 1px solid var(--theme-border); }
      .coverage-metric:last-child { border-bottom: 0; }
      .section-title { font-size: clamp(2.8rem, 12vw, 4rem); }
    }

    @media (max-width: 480px) {
      .coverage-cities { grid-template-columns: 1fr; }
      .coverage-map { height: 500px; }
      .map-summary { right: 0.8rem; left: 0.8rem; }
    }
  `]
})
export class CoverageComponent {
  private dataService = inject(DataService);
  coverageRegions = this.dataService.coverageRegions;
  zoneClasses = ['zone-andina', 'zone-caribe', 'zone-central', 'zone-oriental'];
  zoneMeta = [
    { icon: 'mountain', subtitle: 'El corazón del país', image: '/assets/img/fleet-2.png', alt: 'Transporte de vehículos en la zona Andina', caption: 'CONEXIÓN QUE IMPULSA' },
    { icon: 'globe', subtitle: 'Puertos que conectan', image: '/assets/img/fleet-6.jpg', alt: 'Transporte de vehículos hacia la zona Caribe', caption: 'DEL CARIBE AL MUNDO' },
    { icon: 'layers', subtitle: 'Movemos oportunidades', image: '/assets/img/service-estandar.png', alt: 'Transporte de vehículos en la zona Central', caption: 'MÁS CERCA DE TUS METAS' },
    { icon: 'sun', subtitle: 'Nuevos horizontes', image: '/assets/img/fleet-1.jpg', alt: 'Transporte de vehículos en la zona Oriental', caption: 'CONSTRUYENDO MÁS DESTINOS' }
  ];
}
