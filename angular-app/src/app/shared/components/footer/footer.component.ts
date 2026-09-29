import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a routerLink="/" class="footer-logo">
              <img src="assets/img/logo-1.png" alt="Transportes Premium" class="logo-icon">
              <span class="logo-text">
                <span class="logo-main">TRANSPORTES</span>
                <span class="logo-highlight">PREMIUM</span>
              </span>
            </a>
            <p class="footer-description">
              Transporte profesional de vehículos a nivel nacional. Tu carga segura, puntual y con la mejor tecnología del mercado.
            </p>
            <div class="footer-social">
              <a href="#" class="social-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="#" class="social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="#" class="social-link" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </a>
              <a href="#" class="social-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg>
              </a>
            </div>
          </div>
          <div class="footer-links">
            <h4>Servicios</h4>
            <ul>
              <li><a href="#servicios">Transporte Estándar</a></li>
              <li><a href="#servicios">Transporte Ejecutivo</a></li>
              <li><a href="#servicios">Transporte VIP</a></li>
              <li><a href="#servicios">Transporte de Flotas</a></li>
            </ul>
          </div>
          <div class="footer-links">
            <h4>Empresa</h4>
            <ul>
              <li><a href="#">Sobre Nosotros</a></li>
              <li><a href="#flota">Nuestra Flota</a></li>
              <li><a href="#cobertura">Cobertura</a></li>
              <li><a href="#testimonios">Testimonios</a></li>
            </ul>
          </div>
          <div class="footer-links">
            <h4>Soporte</h4>
            <ul>
              <li><a href="#contacto">Contacto</a></li>
              <li><a href="#">Preguntas Frecuentes</a></li>
              <li><a href="#">Términos y Condiciones</a></li>
              <li><a href="#">Política de Privacidad</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} Transportes Premium. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      padding: 4rem 0 2rem;
      border-top: 1px solid var(--theme-border);
      background: var(--theme-surface);
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;
      margin-bottom: 3rem;
    }

    .footer-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .logo-icon {
      width: 44px;
      height: 44px;
      object-fit: contain;
      border-radius: 10px;
    }

    .logo-text {
      display: flex;
      flex-direction: column;
      line-height: 1;
    }

    .logo-main {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.65rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      color: var(--theme-text-secondary);
    }

    .logo-highlight {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.85rem;
      font-weight: 700;
      background: linear-gradient(135deg, #0066ff 0%, #00d4ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .footer-description {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.6);
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }

    .footer-social {
      display: flex;
      gap: 1rem;
    }

    .social-link {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--theme-surface-raised);
      border: 1px solid var(--theme-border);
      border-radius: 50%;
      transition: all 0.3s ease;
    }

    .social-link:hover {
      background: #0066ff;
      border-color: #0066ff;
      transform: translateY(-3px);
    }

    .social-link svg {
      width: 18px;
      height: 18px;
    }

    .footer-links h4 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.95rem;
      font-weight: 600;
      margin-bottom: 1.25rem;
    }

    .footer-links ul li {
      margin-bottom: 0.75rem;
    }

    .footer-links ul li a {
      font-size: 0.9rem;
      color: var(--theme-text-secondary);
      transition: color 0.3s ease;
    }

    .footer-links ul li a:hover {
      color: var(--theme-primary);
    }

    .footer-bottom {
      padding-top: 2rem;
      border-top: 1px solid var(--theme-border);
      text-align: center;
    }

    .footer-bottom p {
      font-size: 0.85rem;
      color: var(--theme-text-muted);
    }

    @media (min-width: 768px) {
      .footer-grid {
        grid-template-columns: 2fr 1fr 1fr 1fr;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
