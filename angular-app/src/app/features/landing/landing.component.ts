import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { TrustBarComponent } from './components/trust-bar/trust-bar.component';
import { StatsComponent } from './components/stats/stats.component';
import { ServicesComponent } from './components/services/services.component';
import { FleetComponent } from './components/fleet/fleet.component';
import { CoverageComponent } from './components/coverage/coverage.component';
import { ProcessComponent } from './components/process/process.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { CtaComponent } from './components/cta/cta.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    TrustBarComponent,
    StatsComponent,
    ServicesComponent,
    FleetComponent,
    CoverageComponent,
    ProcessComponent,
    TestimonialsComponent,
    CtaComponent,
    ContactComponent
  ],
  template: `
    <app-header />
    <main>
      <app-hero />
      <app-trust-bar />
      <app-stats />
      <app-services />
      <app-fleet />
      <app-coverage />
      <app-process />
      <app-testimonials />
      <app-cta />
      <app-contact />
    </main>
    <app-footer />
  `,
  styles: [`
    main {
      background: var(--theme-background);
      color: var(--theme-text);
      transition: background 0.4s ease, color 0.4s ease;
    }
  `]
})
export class LandingComponent {}