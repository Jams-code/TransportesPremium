import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../core/services/data.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="testimonials" id="testimonios">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Testimonios</span>
          <h2 class="section-title">Lo que dicen <span class="title-gradient">nuestros clientes</span></h2>
        </div>
        <div class="testimonials-slider">
          <div class="testimonial-card" *ngFor="let testimonial of testimonials()">
            <div class="testimonial-stars"><svg class="icon icon-fill" aria-hidden="true" *ngFor="let s of [].constructor(testimonial.rating)"><use href="#i-star"></use></svg></div>
            <p class="testimonial-text">"{{ testimonial.text }}"</p>
            <div class="testimonial-author">
              <div class="author-avatar">{{ testimonial.avatar }}</div>
              <div class="author-info">
                <span class="author-name">{{ testimonial.name }}</span>
                <span class="author-role">{{ testimonial.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials { padding: 5rem 0; }

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

    .testimonials-slider {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .testimonial-card {
      padding: 2rem;
      background: var(--theme-surface-raised);
      border: 1px solid var(--theme-border);
      border-radius: 20px;
      transition: all 0.3s ease;
    }

    .testimonial-card:hover {
      border-color: rgba(0, 102, 255, 0.3);
      transform: translateY(-4px);
    }

    .testimonial-stars {
      color: #ffd700;
      font-size: 1.25rem;
      margin-bottom: 1rem;
      letter-spacing: 2px;
    }

    .testimonial-text {
      font-size: 0.95rem;
      color: var(--theme-text-secondary);
      line-height: 1.7;
      margin-bottom: 1.5rem;
      font-style: italic;
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .author-avatar {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #0066ff 0%, #00d4ff 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.9rem;
      color: #ffffff;
    }

    .author-name {
      display: block;
      font-weight: 600;
      font-size: 0.95rem;
    }

    .author-role {
      display: block;
      font-size: 0.8rem;
      color: var(--theme-text-muted);
      margin-top: 0.25rem;
    }

    @media (min-width: 768px) {
      .testimonials { padding: 7rem 0; }
      .testimonials-slider { grid-template-columns: repeat(3, 1fr); }
    }
  `]
})
export class TestimonialsComponent {
  private dataService = inject(DataService);
  testimonials = this.dataService.testimonials;
}
