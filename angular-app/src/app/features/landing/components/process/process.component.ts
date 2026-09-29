import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../core/services/data.service';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="process">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">¿Cómo Funciona?</span>
          <h2 class="section-title">Tu vehículo en <span class="title-gradient">4 pasos</span></h2>
          <p class="section-description">Un proceso simple y transparente para tu tranquilidad</p>
        </div>

        <ol class="process-timeline">
          <li
            class="process-step"
            *ngFor="let step of steps(); let i = index"
            [style.--accent-from]="accents[i].from"
            [style.--accent-to]="accents[i].to"
          >
            <span class="step-number" aria-hidden="true">{{ step.number }}</span>

            <div class="step-visual">
              <svg class="icon step-icon" aria-hidden="true"><use [attr.href]="'#i-' + step.icon"></use></svg>
            </div>

            <h3>{{ step.title }}</h3>
            <p class="step-description">{{ step.description }}</p>

            <span class="step-status">
              <svg class="icon status-icon" aria-hidden="true"><use [attr.href]="'#i-' + stepStatus[i].icon"></use></svg>
              {{ stepStatus[i].text }}
            </span>
          </li>
        </ol>

        <div class="process-assurance">
          <svg class="icon assurance-icon" aria-hidden="true"><use href="#i-shield"></use></svg>
          <span class="assurance-copy">
            <strong>Tu tranquilidad es nuestra prioridad</strong>
            <small>Seguimiento en todo el proceso&nbsp;&nbsp;|&nbsp;&nbsp; Atención personalizada&nbsp;&nbsp;|&nbsp;&nbsp; Transporte seguro</small>
          </span>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .process { padding: 5rem 0; background: var(--theme-surface); overflow: hidden; }

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

    .process-timeline {
      list-style: none;
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
      margin: 3rem 0 0;
      padding: 0;
      position: relative;
    }

    .process-step {
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: 1.65rem 1.5rem 1.45rem;
      background: var(--theme-surface-raised);
      border: 1px solid var(--theme-border);
      border-radius: 22px;
      box-shadow: 0 12px 34px rgba(0, 63, 140, 0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    }

    .process-step::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--accent-from), var(--accent-to));
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .process-step:hover {
      transform: translateY(-6px);
      border-color: color-mix(in srgb, var(--accent-from) 45%, transparent);
      box-shadow: 0 20px 44px -12px color-mix(in srgb, var(--accent-from) 55%, transparent);
    }

    .process-step:hover::before { opacity: 1; }

    .step-number {
      position: absolute;
      top: 1.1rem;
      right: 1.3rem;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 1;
      letter-spacing: -0.03em;
      color: var(--theme-text);
      opacity: 0.08;
      pointer-events: none;
    }

    .step-visual {
      position: relative;
      display: grid;
      place-items: center;
      width: 86px;
      height: 86px;
      margin: 0.2rem 0 1.3rem;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-from), var(--accent-to));
      box-shadow: 0 14px 30px -10px var(--accent-from);
    }

    .step-visual::after {
      content: '';
      position: absolute;
      inset: 6px;
      border-radius: 50%;
      background: var(--theme-surface-raised);
    }

    .step-icon {
      position: relative;
      z-index: 1;
      width: 2.4rem;
      height: 2.4rem;
      stroke-width: 1.7;
    }

    .process-step h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--theme-text);
      margin: 0 0 0.6rem;
    }

    .step-description {
      flex: 1;
      font-size: 0.9rem;
      color: var(--theme-text-secondary);
      line-height: 1.65;
      margin: 0 0 1.15rem;
    }

    .step-status {
      display: inline-flex;
      align-items: center;
      align-self: flex-start;
      gap: 0.5rem;
      padding: 0.5rem 0.9rem;
      border-radius: 999px;
      background: color-mix(in srgb, var(--accent-from) 12%, transparent);
      border: 1px solid color-mix(in srgb, var(--accent-from) 30%, transparent);
      color: var(--theme-text);
      font-size: 0.74rem;
      font-weight: 600;
      line-height: 1.3;
    }

    .status-icon { width: 1rem; height: 1rem; }

    .process-assurance {
      display: flex;
      align-items: center;
      gap: 0.9rem;
      width: fit-content;
      max-width: 100%;
      margin: 2.75rem auto 0;
      padding: 1rem 1.5rem;
      border-radius: 18px;
      background: var(--theme-surface-raised);
      border: 1px solid var(--theme-border);
      color: var(--theme-text);
    }
    .assurance-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.6rem;
      height: 2.6rem;
      flex: 0 0 auto;
      border-radius: 50%;
      background: linear-gradient(135deg, #0066ff, #00d4ff);
      color: #ffffff;
      width: 1.3rem;
      height: 1.3rem;
    }
    .assurance-copy { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
    .assurance-copy strong { font-size: 0.9rem; }
    .assurance-copy small { color: var(--theme-text-secondary); font-size: 0.72rem; }

    @media (min-width: 768px) {
      .process { padding: 7rem 0; }
      .process-timeline { grid-template-columns: repeat(2, 1fr); gap: 1.75rem; }
    }

    @media (min-width: 1024px) {
      .process-timeline { grid-template-columns: repeat(4, 1fr); }
    }

    @media (max-width: 767px) {
      .process { padding: 4rem 0; }
      .process-timeline { margin-top: 2rem; }
      .process-assurance { flex-wrap: wrap; justify-content: flex-start; margin-top: 2rem; padding: 0.9rem 1rem; }
      .assurance-copy { flex: 1; }
    }
  `]
})
export class ProcessComponent {
  private dataService = inject(DataService);
  steps = this.dataService.processSteps;
  accents = [
    { from: '#0066ff', to: '#00d4ff' },
    { from: '#7c4dff', to: '#b388ff' },
    { from: '#00b894', to: '#4ade80' },
    { from: '#ff8a3d', to: '#ffc46b' }
  ];
  stepStatus = [
    { icon: 'clock', text: 'En pocos minutos' },
    { icon: 'calendar-check', text: 'Fecha confirmada' },
    { icon: 'route', text: 'En la ruta' },
    { icon: 'target', text: 'Tu vehículo en destino' }
  ];
}
