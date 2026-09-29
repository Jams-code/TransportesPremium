import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NINERAS_CITIES, SEO_REGIONS } from '../../core/data/seo-regions';

@Component({
  selector: 'app-geo-menu',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="geo-menu container">
      <div class="geo-menu-header">
        <p class="eyebrow">Cobertura Colombia</p>
        <h2>Transporte de vehículos por departamento</h2>
      </div>
      <div class="department-links">
        @for (department of departments; track department.slug) {
          <a [routerLink]="'/transporte-de-vehiculos-en-' + department.slug" class="department-pill">
            {{ department.department }}
          </a>
        }
      </div>
    </section>

    <section class="geo-menu geo-menu-secondary container">
      <div class="geo-menu-header">
        <p class="eyebrow">Estamos en</p>
        <h2>Niñeras en Colombia</h2>
      </div>
      <div class="department-links">
        @for (city of ninerasCities; track city.slug) {
          <a [routerLink]="'/nineras-en-' + city.slug" class="department-pill">
            Niñeras {{ city.name }}
          </a>
        }
      </div>
    </section>
  `,
  styles: `
    .geo-menu {
      padding: 2rem 0 1rem;
    }

    .geo-menu-secondary {
      padding-top: 0.5rem;
      padding-bottom: 2rem;
    }

    .geo-menu-header {
      margin-bottom: 1.25rem;
    }

    .eyebrow {
      color: #54b8ff;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      font-weight: 700;
      font-size: 0.72rem;
      margin-bottom: 0.6rem;
    }

    h2 {
      margin: 0;
      font-size: clamp(1.8rem, 3vw, 2.8rem);
      line-height: 1.2;
    }

    .department-links {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .department-pill {
      padding: 0.8rem 1rem;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--theme-border);
      color: var(--theme-text);
      text-decoration: none;
      font-weight: 600;
      transition: transform 0.2s ease, border-color 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      line-height: 1.2;
      min-height: 3rem;
    }

    .department-pill:hover {
      transform: translateY(-2px);
      border-color: rgba(84, 184, 255, 0.8);
    }

    @media (max-width: 767px) {
      .geo-menu {
        padding-top: 1.5rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
      }

      .geo-menu-secondary {
        padding-bottom: 1.5rem;
      }

      .geo-menu-header {
        margin-bottom: 1rem;
      }

      .department-links {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.8rem 0.65rem;
        margin: 0 0.1rem;
      }

      .department-pill {
        width: 100%;
        min-height: 3.25rem;
        padding: 0.8rem 0.65rem;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.025);
        border-color: rgba(148, 163, 184, 0.38);
        box-sizing: border-box;
      }
    }
  `
})
export class GeoMenuComponent {
  departments = SEO_REGIONS;
  ninerasCities = NINERAS_CITIES;
}
