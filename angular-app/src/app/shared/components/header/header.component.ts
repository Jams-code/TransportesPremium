import { Component, inject, signal, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NINERAS_CITIES, SEO_REGIONS } from '../../../core/data/seo-regions';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="header" [class.scrolled]="isScrolled()" [class.menu-open]="menuOpen()">
      <nav class="nav container">
        <a routerLink="/" class="nav-logo">
          <img src="assets/img/logo-1.png" alt="Transportes Premium" class="logo-icon">
          <span class="logo-text">
            <span class="logo-main">TRANSPORTES</span>
            <span class="logo-highlight">PREMIUM</span>
          </span>
        </a>

        <div class="nav-overlay" [class.visible]="menuOpen()" (click)="closeMenu()"></div>

        <ul class="nav-menu" [class.active]="menuOpen()">
          <li><a href="/" class="nav-link" (click)="handleNavClick($event, '/')">Inicio</a></li>
          <li><a href="/#servicios" class="nav-link" (click)="handleNavClick($event, '/#servicios')">Servicios</a></li>
          <li><a href="/#flota" class="nav-link" (click)="handleNavClick($event, '/#flota')">Flota</a></li>
          <li class="nav-dropdown">
            <button type="button" class="nav-link nav-dropdown-trigger" aria-label="Cobertura por ciudades">
              Cobertura
            </button>
            <div class="nav-dropdown-panel">
              <div class="dropdown-group">
                <span class="dropdown-label">Transporte</span>
                <div class="dropdown-grid">
                  @for (item of transportCities; track item.path) {
                    <a [routerLink]="item.path" class="dropdown-item" (click)="closeMenu()">
                      {{ item.label }}
                    </a>
                  }
                </div>
              </div>
              <div class="dropdown-group">
                <span class="dropdown-label">Niñeras</span>
                <div class="dropdown-grid">
                  @for (item of nannyCities; track item.path) {
                    <a [routerLink]="item.path" class="dropdown-item" (click)="closeMenu()">
                      {{ item.label }}
                    </a>
                  }
                </div>
              </div>
            </div>
          </li>
          <li><a href="/#testimonios" class="nav-link" (click)="handleNavClick($event, '/#testimonios')">Testimonios</a></li>
          <li><a href="/#contacto" class="nav-link nav-cta" (click)="handleNavClick($event, '/#contacto')">Contacto</a></li>
        </ul>

        <div class="nav-actions">
          <button
            class="theme-toggle"
            type="button"
            (click)="toggleTheme()"
            [attr.aria-label]="theme() === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'"
          >
            <svg class="icon theme-icon" aria-hidden="true"><use [attr.href]="theme() === 'dark' ? '#i-sun' : '#i-moon'"></use></svg>
          </button>
          <a class="nav-call" href="tel:+573114748893">
            <svg class="icon" aria-hidden="true"><use href="#i-phone"></use></svg>
            <span>Llamar Ahora</span>
          </a>
        </div>

        <button
          class="nav-toggle"
          (click)="toggleMenu()"
          [attr.aria-label]="menuOpen() ? 'Cerrar menú' : 'Abrir menú'"
          [class.active]="menuOpen()">
          <span class="hamburger"></span>
        </button>
      </nav>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      padding: 1rem 0;
      transition: all 0.3s ease;
      background: rgba(12, 18, 30, 0.38);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    }

    .header.scrolled {
      padding: 0.75rem 0;
    }

    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 0;
      min-height: 48px;
    }

    @media (min-width: 1024px) {
      .nav {
        justify-content: flex-start;
        gap: 2rem;
      }
    }

    .nav-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      z-index: 1001;
      min-width: 0;
    }

    @media (max-width: 1023px) {
      .nav-logo {
        gap: 0.5rem;
      }
      .logo-icon {
        font-size: 1.2rem;
      }
      .logo-main {
        font-size: 0.55rem;
      }
      .logo-highlight {
        font-size: 0.75rem;
      }
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
      min-width: 0;
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

    .nav-toggle,
    .theme-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      z-index: 1001;
      background: none;
      border: none;
      cursor: pointer;
       color: var(--theme-text);
    }

    .theme-toggle {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
       border: 1px solid var(--theme-border);
       background: var(--theme-surface-raised);
      transition: background 0.3s ease, transform 0.2s ease, color 0.3s ease;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      margin-left: 2rem;
    }

    .nav-call {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.65rem;
      min-height: 3rem;
      padding: 0.75rem 1.75rem;
      border-radius: 999px;
      background: #0756c9;
      color: #ffffff;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 600;
      white-space: nowrap;
      transition: background 0.25s ease, transform 0.25s ease;
    }

    .nav-call:hover {
      background: #0647a5;
      transform: translateY(-2px);
    }

    .nav-call svg { width: 1.2rem; height: 1.2rem; }

    .theme-toggle:hover {
       background: var(--theme-surface-hover);
      transform: translateY(-1px);
    }

    .theme-icon {
      display: inline-flex;
      font-size: 1.1rem;
      line-height: 1;
    }

    .hamburger {
      width: 24px;
      height: 2px;
       background: var(--theme-text);
      transition: all 0.3s ease;
      position: relative;
    }

    .hamburger::before,
    .hamburger::after {
      content: '';
      position: absolute;
      width: 24px;
      height: 2px;
       background: var(--theme-text);
      transition: all 0.3s ease;
    }

    .hamburger::before { top: -8px; }
    .hamburger::after { bottom: -8px; }

    .nav-toggle.active .hamburger {
      background: transparent;
    }

    .nav-toggle.active .hamburger::before {
      transform: rotate(45deg);
      top: 0;
    }

    .nav-toggle.active .hamburger::after {
      transform: rotate(-45deg);
      bottom: 0;
    }

    .nav-menu {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
       background: color-mix(in srgb, var(--theme-bg) 98%, transparent);
      backdrop-filter: blur(30px);
      -webkit-backdrop-filter: blur(30px);
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      z-index: 1000;
      padding: 2rem;
    }

    .nav-menu.active {
      display: flex;
      animation: fadeIn 0.3s ease;
    }

    @media (max-width: 1023px) {
      .header.menu-open {
        z-index: 1100;
        background: transparent;
        border-bottom-color: transparent;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
      }

      .header.menu-open .nav-menu {
        z-index: 1101;
        min-height: 100dvh;
        padding: 7rem 2rem 3rem;
        overflow-y: auto;
      }

      .header.menu-open .nav-logo,
      .header.menu-open .theme-toggle,
      .header.menu-open .nav-toggle {
        z-index: 1102;
      }
    }

    .nav-link {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.25rem;
      font-weight: 500;
       color: var(--theme-text-secondary);
      transition: all 0.3s ease;
      position: relative;
    }

    .nav-link:hover,
    .nav-link.active {
       color: var(--theme-text);
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(135deg, #0066ff 0%, #00d4ff 100%);
      transition: width 0.3s ease;
    }

    .nav-link:hover::after,
    .nav-link.active::after {
      width: 100%;
    }

    .nav-dropdown {
      position: relative;
    }

    .nav-dropdown-trigger {
      border: none;
      background: transparent;
      cursor: pointer;
      padding: 0;
      font: inherit;
    }

    .nav-dropdown-panel {
      position: absolute;
      top: calc(100% + 0.8rem);
      left: 50%;
      transform: translateX(-50%);
      width: min(1240px, 90vw);
      max-height: 82vh;
      overflow-y: auto;
      overflow-x: hidden;
      background: rgba(8, 15, 28, 0.96);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 1.3rem;
      box-shadow: 0 18px 46px rgba(0, 0, 0, 0.32);
      padding: 1.1rem 1.1rem 0.9rem;
      display: none;
      z-index: 1100;
      color: #fff;
    }

    .nav-dropdown:hover .nav-dropdown-panel,
    .nav-dropdown:focus-within .nav-dropdown-panel {
      display: block;
    }

    .dropdown-group {
      margin-bottom: 1.15rem;
    }

    .dropdown-group:last-child {
      margin-bottom: 0;
    }

    .dropdown-label {
      display: inline-block;
      margin-bottom: 0.8rem;
      font-size: 0.68rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #7dd3fc;
      font-weight: 700;
    }

    .dropdown-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(200px, 1fr));
      gap: 0.75rem;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      text-align: left;
      min-height: 58px;
      padding: 0.7rem 0.9rem;
      border-radius: 0.8rem;
      background: rgba(255, 255, 255, 0.03);
      color: #fff !important;
      text-decoration: none;
      font-size: 0.78rem;
      font-weight: 500;
      line-height: 1.25;
      border: 1px solid transparent;
      transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
    }

    .dropdown-item:hover {
      background: rgba(84, 184, 255, 0.12);
      border-color: rgba(84, 184, 255, 0.5);
      transform: translateY(-1px);
    }

    .nav-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.42);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: opacity 0.25s ease, visibility 0.25s ease;
      z-index: 998;
    }

    .nav-overlay.visible {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    .nav-cta {
      margin-top: 0;
      padding: 0;
      background: none;
      border-radius: 0;
      color: rgba(255, 255, 255, 0.92);
      font-weight: 500;
    }

    .nav-cta::after { display: block; }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @media (min-width: 1024px) {
      .nav-toggle { display: none; }
      .nav-menu {
        display: flex !important;
        position: static;
        background: none;
        backdrop-filter: none;
        flex-direction: row;
        gap: 2rem;
        padding: 0;
        margin-left: auto;
      }
      .nav-link { font-size: 0.9rem; }
    }

    @media (max-width: 1023px) {
      .nav-actions { margin-left: auto; gap: 0.35rem; }
      .nav-call { display: none; }
      .nav-cta {
        margin-top: 1rem;
        padding: 0.75rem 2rem;
        background: linear-gradient(135deg, #0066ff 0%, #00d4ff 100%);
        border-radius: 100px;
        color: #ffffff;
        font-weight: 600;
      }
      .nav-cta::after { display: none; }
      .nav-dropdown { width: 100%; }
      .nav-dropdown-trigger {
        width: 100%;
        padding: 0.8rem 0.85rem;
        justify-content: space-between;
        text-align: left;
      }
      .nav-dropdown-panel {
        position: static;
        transform: none;
        width: 100%;
        max-height: 68vh;
        margin-top: 0.5rem;
        display: block;
        background: rgba(15, 23, 42, 0.92);
      }
      .dropdown-grid { grid-template-columns: 1fr; }
    }

    @media (max-width: 380px) {
      .nav { padding-left: 0.75rem; padding-right: 0.75rem; }
      .logo-icon { width: 38px; height: 38px; }
      .theme-toggle { width: 2.75rem; height: 2.75rem; }
      .nav-toggle { padding: 0.4rem; }
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private dataService = inject(DataService);
  isScrolled = signal(false);
  menuOpen = signal(false);
  theme = signal<'dark' | 'light'>('light');
  transportCities = SEO_REGIONS.flatMap((department) =>
    department.cities.map((city) => ({
      label: `${city.name} · ${department.department}`,
      path: `/transporte-de-vehiculos-en-${department.slug}/${city.slug}`
    }))
  );
  nannyCities = NINERAS_CITIES.map((city) => ({
    label: `Niñeras ${city.name}`,
    path: `/nineras-en-${city.slug}`
  }));

  ngOnInit() {
    window.addEventListener('scroll', this.onScroll);

    const savedTheme = localStorage.getItem('tp-theme');
    const initialTheme = savedTheme === 'dark' ? 'dark' : 'light';

    this.theme.set(initialTheme);
    this.applyTheme(initialTheme);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }

  toggleTheme() {
    const nextTheme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(nextTheme);
    localStorage.setItem('tp-theme', nextTheme);
    this.applyTheme(nextTheme);
  }

  applyTheme(theme: 'dark' | 'light') {
    document.body.dataset['theme'] = theme;
  }

  onScroll = () => {
    this.isScrolled.set(window.pageYOffset > 50);
  };

  toggleMenu() {
    this.menuOpen.update(v => !v);
    document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
  }

  closeMenu() {
    this.menuOpen.set(false);
    document.body.style.overflow = '';
  }

  handleNavClick(event: Event, href: string) {
    this.closeMenu();
    setTimeout(() => {
      window.location.href = href;
    }, 100);
  }
}
