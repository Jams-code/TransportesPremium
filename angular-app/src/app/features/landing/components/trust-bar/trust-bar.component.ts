import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../core/services/data.service';

@Component({
  selector: 'app-trust-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="trust-bar">
      <div class="trust-container container">
        <div class="trust-item" *ngFor="let item of trustItems()">
          <svg class="icon trust-icon" aria-hidden="true"><use [attr.href]="'#i-' + item.icon"></use></svg>
          <div class="trust-content">
            <span class="trust-title">{{ item.title }}</span>
            <span class="trust-desc">{{ item.description }}</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .trust-bar {
      background: var(--theme-surface);
      border-top: 1px solid var(--theme-border);
      border-bottom: 1px solid var(--theme-border);
      padding: 2rem 0;
    }

    .trust-container {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .trust-item {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .trust-icon {
      width: 2rem;
      height: 2rem;
      flex-shrink: 0;
      color: var(--theme-accent);
    }

    .trust-title {
      display: block;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.95rem;
      font-weight: 600;
    }

    .trust-desc {
      font-size: 0.8rem;
      color: var(--theme-text-muted);
    }

    @media (min-width: 768px) {
      .trust-container { grid-template-columns: repeat(2, 1fr); }
    }

    @media (min-width: 1024px) {
      .trust-container { grid-template-columns: repeat(4, 1fr); }
      .trust-item { justify-content: center; text-align: center; }
    }
  `]
})
export class TrustBarComponent {
  private dataService = inject(DataService);
  trustItems = this.dataService.trustItems;
}
