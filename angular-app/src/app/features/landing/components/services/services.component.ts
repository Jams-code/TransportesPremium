import { Component, ElementRef, inject, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../core/services/data.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="services" id="servicios">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Nuestros Servicios</span>
          <h2 class="section-title">Soluciones de transporte <span class="title-gradient">a tu medida</span></h2>
          <p class="section-description">Ofrecemos diferentes opciones de transporte para adaptarnos a tus necesidades específicas</p>
        </div>
        <div class="services-grid" (scroll)="onServicesScroll($event)" #servicesScroller>
          <article class="service-card" #serviceCard *ngFor="let service of orderedServices(); let i = index" [class.featured]="service.id === 1">
            <div class="service-image">
              <img [src]="service.image" [alt]="service.title" loading="lazy" [class.service-image-standard]="service.id === 1" [class.service-image-executive]="service.id === 2" [class.service-image-vip]="service.id === 3">
              <div class="service-overlay"></div>
              <div class="service-popular" *ngIf="service.id === 1"><svg class="icon icon-fill" aria-hidden="true"><use href="#i-star"></use></svg> <span>Más Popular</span></div>
              <div class="service-image-badge">
                <svg class="icon" aria-hidden="true"><use [attr.href]="'#i-' + (service.id === 2 ? 'bolt' : service.id === 1 ? 'truck' : 'gem')"></use></svg>
                {{ service.id === 2 ? 'Entrega express' : service.id === 1 ? 'Hasta 8 vehículos' : 'Máxima protección' }}
              </div>
            </div>
            <div class="service-content">
              <h3 class="service-title">{{ service.title }}</h3>
              <p class="service-description">{{ service.description }}</p>
              <ul class="service-features">
                <li *ngFor="let feature of service.features">
                  <svg class="icon check-icon" aria-hidden="true"><use href="#i-check"></use></svg>
                  <span>{{ feature }}</span>
                </li>
              </ul>
              <a href="#contacto" class="service-cta">
                <span>Solicitar Cotización</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </article>
        </div>
        <div class="services-dots" role="tablist" aria-label="Seleccionar servicio">
          <button *ngFor="let service of orderedServices(); let i = index" type="button" class="service-dot" [class.active]="activeService === i" [attr.aria-label]="'Mostrar ' + service.title" [attr.aria-selected]="activeService === i" role="tab" (click)="selectService(i)"></button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services { padding: 5rem 0; }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

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
      margin-bottom: 1rem;
    }

    .section-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 1rem;
      letter-spacing: -0.02em;
    }

    .title-gradient {
      background: linear-gradient(135deg, #0066ff 0%, #00d4ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .section-description {
      font-size: 1.05rem;
      color: var(--theme-text-secondary);
      max-width: 600px;
      margin: 0 auto;
    }

    .services-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .service-card {
      background: var(--theme-surface-raised);
      border: 1px solid var(--theme-border);
      border-radius: 20px;
      overflow: hidden;
      transition: all 0.3s ease;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
    }

    .service-card:hover {
      transform: translateY(-8px);
      border-color: rgba(0, 102, 255, 0.3);
      box-shadow: 0 16px 64px rgba(0, 0, 0, 0.5);
    }

    .service-image {
      position: relative;
      height: 220px;
      overflow: hidden;
    }

    .service-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 30%;
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      filter: contrast(1.05) brightness(0.9);
    }

    .service-image-standard { object-position: center 58%; }
    .service-image-executive { object-position: center 58%; }
    .service-image-vip { object-position: center 54%; }

    .service-card:hover .service-image img {
      transform: scale(1.05);
      filter: contrast(1.1) brightness(1);
    }

    .service-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(10, 10, 26, 0.1) 0%, transparent 50%, rgba(10, 10, 26, 0.85) 100%);
      z-index: 1;
      transition: all 0.4s ease;
    }

    .service-card:hover .service-overlay {
      background: linear-gradient(180deg, rgba(0, 102, 255, 0.15) 0%, transparent 50%, rgba(10, 10, 26, 0.9) 100%);
    }

    .service-icon {
      position: absolute;
      bottom: 1rem;
      left: 1.25rem;
      z-index: 3;
    }

    .icon-circle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      background: rgba(10, 10, 26, 0.8);
      backdrop-filter: blur(16px);
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      font-size: 1.4rem;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    }

    .service-card:hover .icon-circle {
      transform: scale(1.1) rotate(-5deg);
      background: rgba(0, 102, 255, 0.4);
      border-color: rgba(0, 212, 255, 0.6);
      box-shadow: 0 8px 30px rgba(0, 102, 255, 0.4);
    }

    .service-content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
    }

    .service-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: linear-gradient(135deg, #0066ff 0%, #00d4ff 100%);
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 1rem;
    }

    .service-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
    }

    .service-description {
      font-size: 0.9rem;
      color: var(--theme-text-secondary);
      line-height: 1.6;
      margin-bottom: 1.25rem;
    }

    .service-features { margin-bottom: 1.5rem; }

    .service-features li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      color: var(--theme-text-secondary);
      padding: 0.35rem 0;
    }



    .service-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--theme-primary);
      transition: all 0.3s ease;
    }

    .service-cta:hover {
      color: var(--theme-primary-hover);
      gap: 0.75rem;
    }

    .service-cta svg {
      width: 18px;
      height: 18px;
    }

    @media (min-width: 768px) {
      .services { padding: 6rem 0; }
      .services-grid { grid-template-columns: repeat(2, 1fr); }
    }

    @media (min-width: 1024px) {
      .services-grid { grid-template-columns: repeat(3, 1fr); }
    }

    @media (max-width: 480px) {
      .services { padding: 4rem 0; }
      .section-header { margin-bottom: 2rem; }
      .service-image { height: clamp(190px, 54vw, 230px); }
      .service-content { padding: 1.25rem; }
      .service-title { font-size: 1.35rem; }
      .service-description { font-size: 0.88rem; }
    }

    .services {
      position: relative;
      scroll-margin-top: 6rem;
      overflow: hidden;
      background:
        radial-gradient(circle at 8% 30%, rgba(0, 153, 255, 0.08) 0 2px, transparent 3px) 0 0 / 22px 22px,
        radial-gradient(ellipse at 92% 72%, rgba(0, 212, 255, 0.08), transparent 28%),
        var(--theme-bg);
    }

    .services::before,
    .services::after {
      position: absolute;
      width: 20rem;
      height: 20rem;
      border: 1px solid rgba(0, 153, 255, 0.08);
      border-radius: 50%;
      content: '';
      pointer-events: none;
    }

    .services::before { top: 8rem; left: -13rem; }
    .services::after { right: -13rem; bottom: 2rem; }

    .services > .container { position: relative; z-index: 1; }

    .section-header {
      animation: service-fade-up 0.6s ease both;
    }

    .services-grid {
      align-items: stretch;
      position: relative;
    }

    .service-card {
      grid-template-rows: auto 1fr;
      min-width: 0;
      animation: service-card-in 0.6s ease both;
      height: 610px;
    }

    .service-card:nth-child(1) { animation-delay: 0.18s; }
    .service-card:nth-child(2) { animation-delay: 0.08s; }
    .service-card:nth-child(3) { animation-delay: 0.28s; }

    .service-card.featured {
      z-index: 2;
      border: 1.5px solid #0d8cff;
      box-shadow: 0 20px 50px rgba(0, 100, 220, 0.16);
      transform: translateY(-0.5rem) scale(1.05);
    }

    .service-card:not(.featured) { transform: translateY(0) scale(0.97); }

    .service-card:not(.featured):hover,
    .service-card.featured:hover {
      transform: translateY(-0.75rem) scale(1.01);
      box-shadow: 0 18px 48px rgba(0, 100, 220, 0.18);
    }

    .service-card.featured:hover { transform: translateY(-0.75rem) scale(1.06); }

    .service-image {
      height: 205px;
      isolation: isolate;
    }

    .service-card.featured { height: 650px; }
    .service-card.featured .service-image { height: 225px; }

    .service-image img { object-position: center; }

    .service-image-badge,
    .service-popular {
      position: absolute;
      z-index: 3;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      border: 1px solid rgba(190, 215, 255, 0.6);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.94);
      box-shadow: 0 6px 18px rgba(4, 24, 70, 0.18);
      color: #14284d;
      font-size: 0.72rem;
      font-weight: 700;
    }

    .service-image-badge { right: 0.75rem; bottom: 0.75rem; padding: 0.55rem 0.75rem; }
    .service-image-badge span { color: #0879e8; font-size: 0.95rem; }

    .service-popular {
      top: 0.8rem;
      left: 0.8rem;
      padding: 0.55rem 0.85rem;
      border: 0;
      background: linear-gradient(135deg, #0066ff 0%, #00d4ff 100%);
      color: #ffffff;
    }

    .service-content { min-height: 0; padding: 1.25rem 1.4rem 1.4rem; }
    .service-description {
      display: -webkit-box;
      max-width: 34rem;
      overflow: hidden;
      line-height: 1.45;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
    .service-features { margin-bottom: 1rem; }

    .check-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
      width: 1.25rem;
      height: 1.25rem;
      padding: 0.24rem;
      border-radius: 50%;
      background: #0d8cff;
      color: #ffffff;
      stroke-width: 3;
    }

    .service-cta { margin-top: auto; }

    .service-card.featured .service-cta {
      justify-content: center;
      width: 100%;
      padding: 0.85rem 1.25rem;
      border-radius: 999px;
      background: linear-gradient(135deg, #0066ff 0%, #00d4ff 100%);
      color: #ffffff;
      box-shadow: 0 8px 20px rgba(0, 120, 240, 0.25);
    }

    .service-card.featured .service-cta:hover { color: #ffffff; transform: translateY(-2px); }

    .services-dots { display: none; }

    @keyframes service-fade-up {
      from { opacity: 0; transform: translateY(18px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes service-card-in {
      from { opacity: 0; transform: translateY(24px) scale(0.98); }
      to { opacity: 1; }
    }

    @media (min-width: 768px) and (max-width: 1023px) {
      .service-card.featured { transform: translateY(-0.35rem) scale(1.02); }
      .service-card.featured:hover { transform: translateY(-0.6rem) scale(1.03); }
    }

    @media (max-width: 767px) {
      .services-grid {
        display: flex;
        gap: 1rem;
        margin: 0 -1rem;
        padding: 0 1rem 1rem;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
      }

      .services-grid::-webkit-scrollbar { display: none; }

      .service-card,
      .service-card:not(.featured),
      .service-card.featured {
        flex: 0 0 min(86vw, 360px);
        width: min(86vw, 360px);
        min-height: 0;
        transform: none;
        scroll-snap-align: center;
      }

      .service-card:hover,
      .service-card.featured:hover,
      .service-card:not(.featured):hover { transform: none; }

      .service-card.featured { border-width: 1px; box-shadow: var(--shadow-md); }
      .service-card.featured .service-image { height: clamp(190px, 54vw, 230px); }
      .service-card,
      .service-card.featured { height: auto; }
      .service-content { min-height: 330px; padding: 1.25rem; }
      .service-title { font-size: 1.4rem; }
      .service-description { font-size: 0.88rem; }

      .services-dots {
        display: flex;
        justify-content: center;
        gap: 0.55rem;
        margin-top: 0.75rem;
      }

      .service-dot {
        width: 0.65rem;
        height: 0.65rem;
        padding: 0;
        border: 0;
        border-radius: 50%;
        background: #cbd6e6;
      }

      .service-dot.active { width: 1.35rem; border-radius: 999px; background: var(--theme-primary); }
      .service-dot:focus-visible { outline: 3px solid var(--theme-focus); outline-offset: 3px; }
    }

    @media (max-width: 380px) {
      .service-card,
      .service-card:not(.featured),
      .service-card.featured { flex-basis: calc(100vw - 2rem); width: calc(100vw - 2rem); }
      .service-content { min-height: 350px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .section-header,
      .service-card { animation: none; }
    }
  `]
})
export class ServicesComponent {
  private dataService = inject(DataService);
  services = this.dataService.services;
  orderedServices = () => {
    const services = this.services();
    return [services[1], services[0], services[2]].filter(Boolean);
  };
  activeService = 0;

  @ViewChildren('serviceCard') serviceCards!: QueryList<ElementRef<HTMLElement>>;

  onServicesScroll(event: Event) {
    const scroller = event.target as HTMLElement;
    const cards = [...this.serviceCards].map((card) => card.nativeElement);
    if (!cards.length || scroller.offsetWidth > 700) return;
    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    this.activeService = cards.reduce((closest, card, index) => {
      const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      const closestDistance = Math.abs(cards[closest].offsetLeft + cards[closest].offsetWidth / 2 - center);
      return distance < closestDistance ? index : closest;
    }, 0);
  }

  selectService(index: number) {
    const card = this.serviceCards?.get(index)?.nativeElement;
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    this.activeService = index;
  }
}
