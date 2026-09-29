import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../core/services/data.service';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  template: `
    <section class="hero" id="inicio">
      <div class="hero-bg">
        <img src="/assets/img/hero-bg.png" alt="Transporte de vehículos" class="hero-image">
        <div class="hero-gradient"></div>
        <div class="hero-particles" #particles></div>
        <div class="hero-grid"></div>
      </div>
      <div class="hero-content container">
        <div class="hero-badge" appRevealOnScroll data-delay="0">
          <span class="badge-dot"></span>
          Líderes en transporte vehicular
        </div>
        <h1 class="hero-title" appRevealOnScroll data-delay="200">
          <span class="title-line">Transportamos</span>
          <span class="title-line title-highlight"><span class="highlight-text">tu vehículo</span></span>
          <span class="title-line">con excelencia</span>
        </h1>
        <p class="hero-description" appRevealOnScroll data-delay="400">
          Servicio profesional de transporte de vehículos a nivel nacional.
          Tu carga segura, puntual y con la mejor tecnología del mercado.
        </p>
        <div class="hero-actions" appRevealOnScroll data-delay="600">
          <a href="#contacto" class="btn btn-primary btn-large">
            <span>Cotizar Transporte</span>
            <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#servicios" class="btn btn-outline btn-large">
            Conocer Servicios
          </a>
        </div>
        <div class="hero-stats" appRevealOnScroll data-delay="800">
          <div class="stat-item" *ngFor="let stat of stats(); let i = index">
            <span class="stat-number">{{ animatedValues[i] }}</span>
            <span class="stat-suffix">{{ stat.suffix }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding: 8rem 0 4rem;
      overflow: hidden;
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
      object-position: 30% center;
      z-index: 0;
      animation: kenburns 24s ease-in-out infinite alternate;
      will-change: transform;
    }

    @keyframes kenburns {
      0% { transform: scale(1) translateX(0); }
      100% { transform: scale(1.04) translateX(-0.5%); }
    }

    .hero-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(270deg, rgba(3, 18, 45, 0.94) 0%, rgba(3, 18, 45, 0.78) 25%, rgba(3, 18, 45, 0.4) 45%, rgba(3, 18, 45, 0.1) 60%, rgba(3, 18, 45, 0) 72%);
      z-index: 1;
    }

    .hero-particles {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    .hero-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(0, 102, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 102, 255, 0.03) 1px, transparent 1px);
      background-size: 60px 60px;
    }

    .hero-content {
      position: relative;
      z-index: 2;
      width: min(620px, 42%);
      margin-left: auto;
      margin-right: 6%;
      text-align: left;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1.25rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 100px;
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 2rem;
      backdrop-filter: blur(10px);
    }

    .badge-dot {
      width: 8px;
      height: 8px;
      background: #0066ff;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    .hero-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(3rem, 4.5vw, 5rem);
      font-weight: 800;
      line-height: 0.95;
      margin-bottom: 1.5rem;
      letter-spacing: -0.02em;
      max-width: 620px;
    }

    .title-line {
      display: block;
      color: #ffffff;
      margin: 0.08em 0;
    }

    .highlight-text {
      background: linear-gradient(135deg, #0066ff 0%, #00d4ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .title-highlight {
      background: linear-gradient(135deg, #0066ff 0%, #00d4ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: #00d4ff;
    }

    .hero-description {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.6);
      max-width: 600px;
      margin: 0 0 2.5rem;
      line-height: 1.7;
    }

    .hero-actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
      margin-bottom: 4rem;
    }

    .hero-stats {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 2rem 0;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      width: 100%;
    }

    .stat-item {
      text-align: left;
    }

    .stat-number {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #0066ff 0%, #00d4ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stat-suffix {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #0066ff 0%, #00d4ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stat-label {
      display: block;
      font-size: 0.9rem;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.55);
      margin-top: 0.25rem;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    @media (min-width: 768px) {
      .hero { padding: 10rem 0 6rem; }
      .hero-description { font-size: 1.2rem; }
      .hero-actions { flex-direction: row; justify-content: flex-start; }
      .hero-stats {
        grid-template-columns: repeat(3, 1fr);
        gap: 3rem;
      }
      .stat-label { font-size: 0.9rem; }
    }

    @media (min-width: 768px) and (max-width: 899px) {
      .hero-content { width: min(620px, 44%); }
      .hero-actions {
        flex-direction: column;
        align-items: flex-start;
      }
      .hero-actions .btn { width: 100%; }
    }

    @media (min-width: 900px) and (max-width: 1199px) {
      .hero-content { width: min(620px, 46%); }
      .hero-actions { gap: 0.75rem; }
      .hero-actions .btn {
        padding-left: 1rem;
        padding-right: 1rem;
        font-size: 0.9rem;
      }
    }

    @media (max-width: 767px) {
      .hero {
        min-height: 100svh;
        align-items: flex-end;
        padding: 0;
      }

      .hero-image { object-position: 30% center; }

      .hero-gradient {
        background: linear-gradient(180deg, rgba(3, 18, 45, 0.1) 0%, rgba(3, 18, 45, 0.35) 35%, rgba(3, 18, 45, 0.85) 65%, rgba(3, 18, 45, 0.97) 100%);
      }

      .hero-content {
        width: 100%;
        margin: 0;
        padding: 45vh 1rem 3rem;
        text-align: center;
        align-items: center;
      }

      .hero-title {
        max-width: 100%;
        font-size: clamp(2.15rem, 10vw, 3.5rem);
        line-height: 1;
      }

      .hero-description {
        max-width: 38rem;
        margin: 0 auto 2rem;
        font-size: 1rem;
      }

      .hero-actions {
        width: 100%;
        align-items: center;
        margin-bottom: 2.5rem;
      }

      .hero-actions .btn { width: min(100%, 22rem); }

      .hero-stats {
        width: 100%;
        gap: 1rem;
        padding: 1.25rem 0;
      }

      .stat-item { text-align: center; }
    }

    @media (max-width: 420px) {
      .hero-content { padding-top: 40vh; }
      .hero-badge { max-width: 100%; text-align: center; }
      .hero-title { font-size: clamp(2rem, 10vw, 3rem); }
      .hero-description { font-size: 1rem; }
      .hero-actions { margin-bottom: 2rem; }
      .hero-stats { gap: 0.75rem; }
      .stat-number { font-size: 2rem; }
      .stat-suffix { font-size: 1.2rem; }
      .stat-label { font-size: 0.75rem; }
    }

    @media (min-width: 1024px) {
      .hero { padding: 12rem 0 8rem; }
      .hero-actions { gap: 1.5rem; }
    }
  `]
})
export class HeroComponent implements OnInit, OnDestroy {
  private dataService = inject(DataService);
  stats = this.dataService.stats;
  private particleInterval: any;
  
  // Animated values (array for template binding)
  animatedValues: string[] = ['0', '0', '0'];
  private animationFrameIds = new Map<number, number>();

  ngOnInit() {
    this.createParticles();
    this.initCountAnimation();
  }

  ngOnDestroy() {
    if (this.particleInterval) {
      clearInterval(this.particleInterval);
    }
    // Clean up animation frames
    this.animationFrameIds.forEach((frameId) => {
      cancelAnimationFrame(frameId);
    });
  }

  // Initialize count animation for all stats
  private initCountAnimation() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateStats();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsElement = document.querySelector('.hero-stats');
    if (statsElement) {
      observer.observe(statsElement);
    }
  }

  // Animate all statistics
  private animateStats() {
    const statsData = this.stats();
    statsData.forEach((stat, index) => {
      this.animateCounter(index, 0, stat.value, stat.suffix, 2000);
    });
  }

  // Animate a single counter
  private animateCounter(index: number, start: number, end: number, suffix: string, duration: number) {
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(start + (end - start) * easedProgress);
      
      this.animatedValues[index] = this.formatNumber(currentValue);

      if (progress < 1) {
        const frameId = requestAnimationFrame(animate);
        this.animationFrameIds.set(index, frameId);
      } else {
        this.animatedValues[index] = this.formatNumber(end);
      }
    };

    const frameId = requestAnimationFrame(animate);
    this.animationFrameIds.set(index, frameId);
  }

  // Format number with commas
  private formatNumber(num: number): string {
    return num.toLocaleString('es-MX');
  }

  createParticles() {
    const container = document.querySelector('.hero-particles');
    if (!container) return;

    const count = window.innerWidth < 768 ? 15 : 30;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 4 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      particle.style.animationDelay = (Math.random() * 5) + 's';
      particle.style.opacity = String(Math.random() * 0.3 + 0.1);
      container.appendChild(particle);
    }
  }
}