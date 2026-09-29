import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="fleet" id="flota" itemscope itemtype="https://schema.org/AutomotiveBusiness">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Nuestra Flota</span>
          <h1 class="section-title">Unidades de <span class="title-gradient">última generación</span></h1>
          <p class="section-description" itemprop="description">
            Contamos con la flota más moderna y equipada del sector, especializada en transporte de vehículos con tecnología de última generación.
          </p>
        </div>
        <div
          class="fleet-showcase"
          itemprop="vehicleInventory"
          tabindex="0"
          role="region"
          aria-label="Carrusel de imágenes de la flota"
          (mouseenter)="pauseAutoplay()"
          (mouseleave)="resumeAutoplay()"
          (focusin)="pauseAutoplay()"
          (focusout)="resumeAutoplay()"
          (keydown)="onKeydown($event)"
          (touchstart)="onTouchStart($event)"
          (touchend)="onTouchEnd($event)"
        >
          <button class="fleet-arrow fleet-arrow-prev" type="button" aria-label="Imagen anterior" (click)="previousSlide()">&#8249;</button>
          <div class="fleet-stage">
            <article class="fleet-slide" *ngFor="let slide of slides; let i = index" [ngClass]="getSlideClass(i)">
              <img [src]="slide.image" [alt]="slide.alt" [loading]="i === activeSlide() ? 'eager' : 'lazy'" itemprop="image">
              <div class="fleet-slide-shade"></div>
              <div class="fleet-info-card" *ngFor="let card of slide.cards" [ngClass]="card.position">
                <svg class="icon fleet-info-icon" aria-hidden="true"><use [attr.href]="'#i-' + card.icon"></use></svg>
                <span class="fleet-info-copy">
                  <strong>{{ card.title }}</strong>
                  <small>{{ card.text }}</small>
                </span>
              </div>
            </article>
          </div>
          <button class="fleet-arrow fleet-arrow-next" type="button" aria-label="Imagen siguiente" (click)="nextSlide()">&#8250;</button>
          <div class="fleet-dots" role="tablist" aria-label="Seleccionar imagen de flota">
            <button *ngFor="let slide of slides; let i = index" type="button" class="fleet-dot" [class.active]="activeSlide() === i" [attr.aria-label]="'Mostrar imagen ' + (i + 1)" [attr.aria-selected]="activeSlide() === i" role="tab" (click)="selectSlide(i)"></button>
          </div>
        </div>
        <div class="fleet-benefits">
          <div class="fleet-benefit">
            <svg class="icon benefit-icon" aria-hidden="true"><use href="#i-gem"></use></svg>
            <span><strong>Unidades modernas</strong><small>Mantenimiento constante</small></span>
          </div>
          <div class="fleet-benefit">
            <svg class="icon benefit-icon" aria-hidden="true"><use href="#i-sparkle"></use></svg>
            <span><strong>Equipamiento de última generación</strong><small>Mayor seguridad en cada traslado</small></span>
          </div>
          <div class="fleet-benefit">
            <svg class="icon benefit-icon" aria-hidden="true"><use href="#i-pin"></use></svg>
            <span><strong>Cobertura en todo el país</strong><small>Donde nos necesites</small></span>
          </div>
          <div class="fleet-benefit">
            <svg class="icon benefit-icon" aria-hidden="true"><use href="#i-sparkle"></use></svg>
            <span><strong>Operación eficiente</strong><small>Flota preparada para transporte profesional</small></span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .fleet {
      padding: 5rem 0;
      background: var(--theme-surface);
    }

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

    .fleet-gallery {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
    }

    .gallery-item {
      border-radius: 16px;
      overflow: hidden;
      height: 360px;
      position: relative;
      border: 1px solid var(--theme-border);
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .gallery-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.03) 100%);
      pointer-events: none;
      border-radius: 16px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .gallery-item:hover::before {
      opacity: 1;
    }

    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: transform 0.5s ease, filter 0.3s ease;
    }

    .gallery-item:hover img {
      transform: scale(1.07);
      filter: brightness(1.05);
    }

    .gallery-item:hover {
      border-color: rgba(0, 102, 255, 0.5);
      box-shadow: 0 12px 40px rgba(0, 102, 255, 0.3);
      transform: translateY(-6px) rotateX(2deg) rotateY(1deg);
    }

    .gallery-item:active {
      transform: translateY(2px) rotateX(0deg) rotateY(0deg);
      transition: transform 0.1s ease;
    }

    .gallery-item img.sealed {
      filter: grayscale(0%);
    }

    .fleet-showcase {
      position: relative;
      min-height: 510px;
      outline: none;
      touch-action: pan-y;
    }

    .fleet-stage {
      position: relative;
      height: 430px;
      overflow: visible;
    }

    .fleet-slide {
      position: absolute;
      top: 26px;
      left: 50%;
      width: 62%;
      height: 390px;
      overflow: hidden;
      border: 1px solid rgba(190, 215, 255, 0.24);
      border-radius: 24px;
      background: var(--theme-surface-raised);
      box-shadow: 0 20px 60px rgba(0, 20, 70, 0.25);
      opacity: 0;
      transform: translateX(-50%) scale(0.86);
      transition: transform 0.45s ease, opacity 0.45s ease, filter 0.45s ease;
      pointer-events: none;
    }

    .fleet-slide.is-active {
      z-index: 3;
      opacity: 1;
      transform: translateX(-50%) scale(1);
      pointer-events: auto;
    }

    .fleet-slide.is-previous,
    .fleet-slide.is-next {
      z-index: 2;
      width: 42%;
      opacity: 0.52;
      filter: saturate(0.82) blur(0.2px);
      pointer-events: auto;
    }

    .fleet-slide.is-previous { transform: translateX(-128%) scale(0.86); }
    .fleet-slide.is-next { transform: translateX(28%) scale(0.86); }
    .fleet-slide.is-hidden { transform: translateX(-50%) scale(0.7); }

    .fleet-slide img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 54%;
    }

    .fleet-slide-shade {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(4, 18, 50, 0.04) 40%, rgba(4, 18, 50, 0.5) 100%);
      pointer-events: none;
    }

    .fleet-info-card {
      position: absolute;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: 0.7rem;
      max-width: 205px;
      padding: 0.75rem 0.9rem;
      border: 1px solid rgba(190, 215, 255, 0.38);
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.94);
      box-shadow: 0 10px 28px rgba(4, 24, 70, 0.2);
      color: #102448;
    }

    .fleet-slide:not(.is-active) .fleet-info-card { display: none; }
    .fleet-info-card.top-left { top: 1rem; left: 1rem; }
    .fleet-info-card.top-right { top: 1rem; right: 1rem; }
    .fleet-info-card.bottom-left { bottom: 1rem; left: 1rem; }
    .fleet-info-card.bottom-right { right: 1rem; bottom: 1rem; }

    .fleet-info-icon,
    .benefit-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
      width: 2.25rem;
      height: 2.25rem;
      padding: 0.52rem;
      border-radius: 50%;
      background: rgba(22, 132, 237, 0.12);
      color: #0879e8;
      stroke-width: 1.9;
    }

    .fleet-info-copy,
    .fleet-benefit > span:last-child {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .fleet-info-copy strong,
    .fleet-benefit strong {
      font-size: 0.78rem;
      line-height: 1.2;
    }

    .fleet-info-copy small,
    .fleet-benefit small {
      margin-top: 0.22rem;
      color: #60708a;
      font-size: 0.68rem;
      line-height: 1.2;
    }

    .fleet-arrow {
      position: absolute;
      top: 50%;
      z-index: 5;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      border: 1px solid var(--theme-border);
      border-radius: 50%;
      background: var(--theme-surface);
      color: var(--theme-primary);
      box-shadow: var(--shadow-sm);
      font-size: 2rem;
      line-height: 1;
      transform: translateY(-50%);
      transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
    }

    .fleet-arrow:hover { background: var(--theme-primary); color: #ffffff; transform: translateY(-50%) scale(1.05); }
    .fleet-arrow:focus-visible { outline: 3px solid var(--theme-focus); outline-offset: 3px; }
    .fleet-arrow-prev { left: 0; }
    .fleet-arrow-next { right: 0; }

    .fleet-dots {
      position: absolute;
      bottom: 0;
      left: 50%;
      display: flex;
      gap: 0.65rem;
      transform: translateX(-50%);
    }

    .fleet-dot {
      width: 0.72rem;
      height: 0.72rem;
      padding: 0;
      border: 0;
      border-radius: 50%;
      background: #cbd6e6;
      transition: width 0.25s ease, background 0.25s ease;
    }

    .fleet-dot.active { width: 1.4rem; border-radius: 999px; background: var(--theme-primary); }
    .fleet-dot:focus-visible { outline: 3px solid var(--theme-focus); outline-offset: 3px; }

    .fleet-benefits {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem;
      margin-top: 2.25rem;
    }

    .fleet-benefit {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      min-width: 0;
      padding: 0.5rem 0;
    }

    .fleet-benefit:not(:last-child) { border-right: 1px solid var(--theme-border); padding-right: 1rem; }

    .fleet-benefit strong { font-size: 0.85rem; }
    .fleet-benefit small { font-size: 0.72rem; }

    @media (max-width: 767px) {
      .fleet-showcase { min-height: 390px; }
      .fleet-stage { height: 320px; }
      .fleet-slide { top: 10px; width: calc(100% - 4.5rem); height: 290px; border-radius: 20px; }
      .fleet-slide.is-previous,
      .fleet-slide.is-next { opacity: 0; pointer-events: none; }
      .fleet-slide.is-hidden { opacity: 0; }
      .fleet-arrow { width: 2.65rem; height: 2.65rem; }
      .fleet-arrow-prev { left: 0.1rem; }
      .fleet-arrow-next { right: 0.1rem; }
      .fleet-info-card { max-width: 170px; padding: 0.55rem 0.65rem; gap: 0.5rem; border-radius: 13px; }
      .fleet-info-card.top-right,
      .fleet-info-card.bottom-left { display: none !important; }
      .fleet-info-icon { width: 1.85rem; height: 1.85rem; padding: 0.42rem; }
      .fleet-info-copy strong { font-size: 0.68rem; }
      .fleet-info-copy small { font-size: 0.6rem; }
      .fleet-benefits { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-top: 1.5rem; }
      .fleet-benefit { align-items: flex-start; padding: 0.35rem 0; }
      .fleet-benefit:not(:last-child) { border-right: 0; padding-right: 0; }
      .benefit-icon { width: 2rem; height: 2rem; padding: 0.45rem; }
      .fleet-benefit strong { font-size: 0.72rem; }
      .fleet-benefit small { font-size: 0.62rem; }
    }

    @media (min-width: 768px) and (max-width: 1023px) {
      .fleet-slide { width: 61%; height: 360px; }
      .fleet-slide.is-previous,
      .fleet-slide.is-next { width: 42%; }
      .fleet-stage { height: 400px; }
      .fleet-benefits { grid-template-columns: repeat(2, 1fr); }
      .fleet-benefit:nth-child(2) { border-right: 0; padding-right: 0; }
    }

    @media (max-width: 430px) {
      .fleet { padding: 4rem 0; }
      .fleet-showcase { min-height: 370px; }
      .fleet-stage { height: 300px; }
      .fleet-slide { height: 270px; }
      .fleet-benefits { grid-template-columns: 1fr; }
    }

    @media (prefers-reduced-motion: reduce) {
      .fleet-slide,
      .fleet-arrow,
      .fleet-dot { transition: none; }
    }

    @media (min-width: 1024px) {
      .fleet { padding: 7rem 0; }
    }
  `]
})
export class FleetComponent implements OnInit, OnDestroy {
  readonly slides = [
    {
      image: '/assets/img/fleet-2.png',
      alt: 'Niñera de transporte cargada con vehículos en ruta',
      cards: [
        { icon: 'pin', title: 'GPS en tiempo real', text: 'Monitoreo 24/7', position: 'top-left' },
        { icon: 'layers', title: 'Capacidad 8 vehículos', text: 'Máxima eficiencia', position: 'top-right' },
        { icon: 'gem', title: 'Cobertura nacional', text: 'Llegamos a todo el país', position: 'bottom-right' }
      ]
    },
    {
      image: '/assets/img/fleet-3.png',
      alt: 'Camión niñera azul transportando una flota de vehículos',
      cards: [
        { icon: 'sparkle', title: 'Flota especializada', text: 'Rendimiento y confiabilidad', position: 'top-right' },
        { icon: 'sparkle', title: 'Traslado seguro', text: 'Vehículos protegidos', position: 'bottom-left' },
        { icon: 'pin', title: 'Monitoreo 24/7', text: 'Seguimiento en ruta', position: 'bottom-right' }
      ]
    },
    {
      image: '/assets/img/fleet-5.png',
      alt: 'Niñera de transporte cargada con vehículos de diferentes tamaños',
      cards: [
        { icon: 'sparkle', title: 'Operación eficiente', text: 'Listos para cada traslado', position: 'top-left' },
        { icon: 'gem', title: 'Cobertura nacional', text: 'Donde nos necesites', position: 'bottom-right' },
        { icon: 'layers', title: 'Carga asegurada', text: 'Cuidado profesional', position: 'top-right' }
      ]
    },
    {
      image: '/assets/img/fleet-5.png',
      alt: 'Flota de transporte vehicular preparada para operar',
      cards: [
        { icon: 'sparkle', title: 'Flota moderna', text: 'Preparada para cada ruta', position: 'top-left' },
        { icon: 'gem', title: 'Transporte seguro', text: 'Cuidado profesional', position: 'bottom-right' },
        { icon: 'pin', title: 'Cobertura nacional', text: 'Llegamos donde necesites', position: 'top-right' }
      ]
    }
  ];

  readonly activeSlide = signal(0);
  private autoplayId?: ReturnType<typeof setInterval>;
  private touchStartX = 0;
  private touchEndX = 0;

  ngOnInit() {
    this.startAutoplay();
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  getSlideClass(index: number) {
    const active = this.activeSlide();
    if (index === active) return 'is-active';
    if (index === (active + this.slides.length - 1) % this.slides.length) return 'is-previous';
    if (index === (active + 1) % this.slides.length) return 'is-next';
    return 'is-hidden';
  }

  previousSlide() {
    this.activeSlide.update((index) => (index + this.slides.length - 1) % this.slides.length);
    this.restartAutoplay();
  }

  nextSlide() {
    this.activeSlide.update((index) => (index + 1) % this.slides.length);
    this.restartAutoplay();
  }

  selectSlide(index: number) {
    this.activeSlide.set(index);
    this.restartAutoplay();
  }

  pauseAutoplay() {
    this.stopAutoplay();
  }

  resumeAutoplay() {
    this.startAutoplay();
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    const distance = this.touchEndX - this.touchStartX;
    if (Math.abs(distance) < 40) return;
    distance > 0 ? this.previousSlide() : this.nextSlide();
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previousSlide();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.nextSlide();
    }
  }

  private startAutoplay() {
    if (this.autoplayId) return;
    this.autoplayId = setInterval(() => this.activeSlide.update((index) => (index + 1) % this.slides.length), 5500);
  }

  private stopAutoplay() {
    if (!this.autoplayId) return;
    clearInterval(this.autoplayId);
    this.autoplayId = undefined;
  }

  private restartAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }
}