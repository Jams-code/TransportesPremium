import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../core/services/data.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="stats-band">
      <div class="container">
        <div class="stats-grid">
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
    .stats-band {
      padding: 3rem 0;
      background: #f2f4fb;
      border-top: 1px solid rgba(15, 23, 42, 0.08);
      border-bottom: 1px solid rgba(15, 23, 42, 0.08);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .stat-item {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-number {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.8rem;
      font-weight: 700;
      background: linear-gradient(135deg, #00338a 0%, #0066cc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.1;
    }

    .stat-suffix {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.6rem;
      font-weight: 700;
      background: linear-gradient(135deg, #00338a 0%, #0066cc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
    }

    .stat-label {
      display: block;
      font-size: 0.95rem;
      font-weight: 700;
      color: #475569;
      margin-top: 0.5rem;
    }

    @media (min-width: 768px) {
      .stats-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 3rem;
      }
    }
  `]
})
export class StatsComponent implements OnInit, OnDestroy {
  private dataService = inject(DataService);
  stats = this.dataService.stats;
  animatedValues: string[] = ['0', '0', '0'];
  private animationFrameIds = new Map<number, number>();

  ngOnInit() {
    this.initCountAnimation();
  }

  ngOnDestroy() {
    this.animationFrameIds.forEach((frameId) => {
      cancelAnimationFrame(frameId);
    });
  }

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
      { threshold: 0.4 }
    );

    const statsElement = document.querySelector('.stats-grid');
    if (statsElement) {
      observer.observe(statsElement);
    }
  }

  private animateStats() {
    const statsData = this.stats();
    statsData.forEach((stat, index) => {
      this.animateCounter(index, 0, stat.value, 2000);
    });
  }

  private animateCounter(index: number, start: number, end: number, duration: number) {
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
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

  private formatNumber(num: number): string {
    return num.toLocaleString('es-MX');
  }
}