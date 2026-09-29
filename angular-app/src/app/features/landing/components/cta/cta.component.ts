import { Component } from '@angular/core';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [],
  template: `
    <section class="cta-section">
      <div class="cta-bg">
        <img src="/assets/img/fleet-5.png" alt="Transporte de vehículos" class="cta-image" loading="lazy">
        <div class="cta-overlay"></div>
      </div>
      <div class="cta-content container">
        <div class="cta-logo">
          <img src="assets/img/logo-1.png" alt="Transportes Premium" class="logo-icon">
        </div>
        <h2 class="cta-title">¿Listo para transportar tu vehículo?</h2>
        <p class="cta-description">Solicita tu cotización gratuita hoy mismo y descubre por qué somos la opción preferida.</p>
        <div class="cta-actions">
          <a href="#contacto" class="btn btn-primary btn-large">
            <span>Cotizar Ahora</span>
            <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="tel:+573114748893" class="btn btn-outline btn-large">
            <svg class="phone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>Llamar Ahora</span>
          </a>
        </div>
        <div class="cta-rating">
          <div class="stars">
            <svg class="icon icon-fill" aria-hidden="true"><use href="#i-star"></use></svg><svg class="icon icon-fill" aria-hidden="true"><use href="#i-star"></use></svg><svg class="icon icon-fill" aria-hidden="true"><use href="#i-star"></use></svg><svg class="icon icon-fill" aria-hidden="true"><use href="#i-star"></use></svg><svg class="icon icon-fill" aria-hidden="true"><use href="#i-star"></use></svg>
          </div>
          <span>Servicio Calificado</span>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .cta-section {
      position: relative;
      padding: clamp(4rem, 9vw, 10rem) 0;
      overflow: hidden;
    }

    .cta-bg {
      position: absolute;
      inset: 0;
    }

    .cta-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      animation: ctaZoom 26s ease-in-out infinite alternate;
      will-change: transform;
    }

    @keyframes ctaZoom {
      0% { transform: scale(1); }
      100% { transform: scale(1.1); }
    }

    .cta-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(0, 20, 80, 0.88) 0%, rgba(0, 40, 120, 0.82) 100%);
    }

    .cta-content {
      position: relative;
      z-index: 2;
      width: 100%;
      text-align: center;
      padding: 2rem 1rem;
    }

    /* Logo */
    .cta-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 3rem;
    }

    .logo-icon {
      width: 96px;
      height: 96px;
      object-fit: contain;
      filter: drop-shadow(0 0 24px rgba(0, 153, 255, 0.4));
      animation: ctaLogoFloat 3s ease-in-out infinite;
    }

    @keyframes ctaLogoFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }

    .logo-text {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.5rem;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: 0.02em;
    }

    .cta-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(2rem, 5.5vw, 3.5rem);
      font-weight: 800;
      margin-bottom: 1.25rem;
      line-height: 1.2;
      color: #ffffff;
      overflow-wrap: normal;
      word-break: normal;
    }

    .cta-description {
      font-size: 1.15rem;
      color: rgba(255, 255, 255, 0.85);
      max-width: 38rem;
      margin: 0 auto 2.5rem;
      line-height: 1.6;
    }

    .cta-actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      margin-bottom: 2.5rem;
      width: 100%;
    }

    .btn-large {
      padding: 1rem 2.5rem;
      font-size: 1.05rem;
      font-weight: 700;
      border-radius: 100px;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      cursor: pointer;
      max-width: 100%;
      min-height: 3.5rem;
      justify-content: center;
    }

    .btn-primary {
      background: linear-gradient(135deg, #0099ff 0%, #00d4ff 100%);
      color: #ffffff;
      border: none;
      box-shadow: 0 4px 20px rgba(0, 153, 255, 0.4);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(0, 153, 255, 0.6);
    }

    .btn-arrow {
      width: 20px;
      height: 20px;
      transition: transform 0.3s ease;
    }

    .btn-primary:hover .btn-arrow {
      transform: translateX(4px);
    }

    .btn-outline {
      background: transparent;
      color: #ffffff;
      border: 2px solid rgba(255, 255, 255, 0.6);
    }

    .btn-outline:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: #ffffff;
      transform: translateY(-2px);
    }

    .phone-icon {
      width: 20px;
      height: 20px;
    }

    /* Rating */
    .cta-rating {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .stars {
      display: flex;
      gap: 0.25rem;
    }

    .stars span {
      font-size: 1.5rem;
      color: #ffd700;
    }

    .stars span:last-child {
      opacity: 0.3;
    }

    .cta-rating span:last-child {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.8);
      font-weight: 500;
    }

    @media (min-width: 768px) {
      .cta-content { padding-left: 2rem; padding-right: 2rem; }
      .cta-actions {
        flex-direction: row;
        justify-content: center;
        gap: 1.25rem;
        width: auto;
      }
    }

    @media (max-width: 480px) {
      .cta-section { padding: 4rem 0; }
      .cta-content { padding: 1rem; }
      .cta-logo { margin-bottom: 2rem; }
      .logo-icon { width: 76px; height: 76px; }
      .cta-title {
        font-size: clamp(1.85rem, 9vw, 2.5rem);
        line-height: 1.15;
        margin-bottom: 1rem;
      }
      .cta-description {
        font-size: 1rem;
        line-height: 1.5;
        margin-bottom: 2rem;
      }
      .cta-actions { gap: 0.75rem; margin-bottom: 2rem; }
      .cta-actions .btn-large {
        width: min(100%, 20rem);
        padding: 0.9rem 1.25rem;
        font-size: 0.98rem;
      }
      .cta-rating { gap: 0.35rem; }
      .stars span { font-size: 1.35rem; }
    }
  `]
})
export class CtaComponent {}