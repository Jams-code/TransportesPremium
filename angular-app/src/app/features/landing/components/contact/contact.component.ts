import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../../core/services/data.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <section class="contact" id="contacto">
      <div class="container">
        <div class="contact-layout">
          <div class="contact-info">
            <span class="section-tag">Contacto</span>
            <h2 class="section-title">Hablemos de <span class="title-gradient">tu proyecto</span></h2>
            <p class="section-description">Estamos listos para ayudarte a transportar tu vehículo de forma segura y puntual.</p>
            <div class="contact-methods">
              <a href="mailto:niñerasygruaspremium@gmail.com" class="contact-method">
                <svg class="icon method-icon" aria-hidden="true"><use href="#i-mail"></use></svg>
                <div class="method-info">
                  <span class="method-label">Correo</span>
                  <span class="method-value">niñerasygruaspremium&#64;gmail.com</span>
                </div>
              </a>
              <a href="https://wa.me/573114748893" class="contact-method" target="_blank" rel="noopener">
                <svg class="icon method-icon" aria-hidden="true"><use href="#i-chat"></use></svg>
                <div class="method-info">
                  <span class="method-label">WhatsApp y llamadas</span>
                  <span class="method-value">+57 311 4748893</span>
                </div>
              </a>
            </div>
          </div>
          <div class="contact-form-wrapper">
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
              <div class="form-group">
                <label for="name" class="form-label">Nombre completo</label>
                <input type="text" id="name" formControlName="name" class="form-input" placeholder="Tu nombre" [class.invalid]="name?.invalid && name?.touched">
                <span class="error-message" *ngIf="name?.invalid && name?.touched">El nombre es requerido</span>
              </div>
              <div class="form-group">
                <label for="phone" class="form-label">Teléfono</label>
                <input type="tel" id="phone" formControlName="phone" class="form-input" placeholder="+57 311 4748893" [class.invalid]="phone?.invalid && phone?.touched">
                <span class="error-message" *ngIf="phone?.invalid && phone?.touched">El teléfono es requerido</span>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="origin" class="form-label">Ciudad de origen</label>
                  <select id="origin" formControlName="origin" class="form-input form-select">
                    <option value="">Selecciona una ciudad</option>
                    <option *ngFor="let city of cities()" [value]="city">{{ city }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="destination" class="form-label">Ciudad de entrega</label>
                  <select id="destination" formControlName="destination" class="form-input form-select">
                    <option value="">Selecciona una ciudad</option>
                    <option *ngFor="let city of cities()" [value]="city">{{ city }}</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="vehicle" class="form-label">Tipo de vehículo</label>
                <select id="vehicle" formControlName="vehicle" class="form-input form-select">
                  <option value="">Selecciona una opción</option>
                  <option value="sedan">Sedán / Hatchback</option>
                  <option value="suv">SUV / Camioneta</option>
                  <option value="pickup">Pickup</option>
                  <option value="deportivo">Deportivo / Lujo</option>
                  <option value="flota">Flota (varios vehículos)</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div class="form-group">
                <label for="message" class="form-label">Mensaje adicional</label>
                <textarea id="message" formControlName="message" class="form-input form-textarea" rows="4" placeholder="Cuéntanos más sobre tu necesidad..."></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-large btn-full" [disabled]="contactForm.invalid">
                <span>{{ isSubmitting ? 'Enviando...' : 'Enviar Cotización' }}</span>
                <svg class="btn-arrow" *ngIf="!isSubmitting" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <div class="success-message" *ngIf="isSubmitted">
                <svg class="icon success-icon" aria-hidden="true"><use href="#i-check-circle"></use></svg>
                <span>¡Cotización enviada con éxito! Te contactaremos pronto.</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact { padding: 5rem 0; background: var(--theme-surface); }

    .contact-layout {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }

    .contact-info { order: 2; min-width: 0; }

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
      line-height: 1.7;
    }

    .contact-methods {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      margin-top: 2rem;
    }

    .contact-method {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: var(--theme-surface-raised);
      border: 1px solid var(--theme-border);
      border-radius: 12px;
      transition: all 0.3s ease;
    }

    .contact-method:hover {
      border-color: rgba(0, 102, 255, 0.3);
      background: var(--theme-surface-hover);
    }

    .method-icon { font-size: 1.5rem; flex-shrink: 0; }

    .method-label {
      display: block;
      font-size: 0.8rem;
      color: var(--theme-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .method-value {
      display: block;
      font-weight: 600;
      font-size: 0.95rem;
      margin-top: 0.25rem;
    }

    .contact-form-wrapper {
      order: 1;
      min-width: 0;
      background: var(--theme-surface-raised);
      border: 1px solid var(--theme-border);
      border-radius: 20px;
      padding: 2rem;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      min-width: 0;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.25rem;
    }

    .form-label {
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--theme-text-secondary);
    }

    .form-input {
      width: 100%;
      min-width: 0;
      padding: 0.875rem 1rem;
      background: var(--theme-surface);
      border: 1px solid var(--theme-border);
      border-radius: 12px;
      color: var(--theme-text);
      transition: all 0.3s ease;
      outline: none;
    }

    .form-input:focus {
      border-color: var(--theme-primary);
      box-shadow: 0 0 0 3px rgba(11, 99, 206, 0.18);
    }

    .form-input::placeholder {
      color: var(--theme-placeholder);
    }

    .form-input.invalid {
      border-color: var(--theme-error);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--theme-error) 20%, transparent);
    }

    .form-select {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 1rem center;
      padding-right: 2.5rem;
      cursor: pointer;
    }

    .form-select option {
      color: #0f172a;
      background: #ffffff;
    }

    .form-textarea {
      resize: vertical;
      min-height: 120px;
    }

    .error-message {
      font-size: 0.8rem;
      color: var(--theme-error);
    }

    .success-message {
      padding: 1rem;
      background: color-mix(in srgb, var(--theme-success) 12%, transparent);
      border: 1px solid color-mix(in srgb, var(--theme-success) 36%, transparent);
      border-radius: 12px;
      color: var(--theme-success);
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
    }
    .success-icon { width: 1.2rem; height: 1.2rem; }

    @media (min-width: 768px) {
      .contact { padding: 7rem 0; }
      .contact-layout { flex-direction: row; }
      .contact-info { order: 1; flex: 1; }
      .contact-form-wrapper { order: 2; flex: 1; }
      .form-row { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 420px) {
      .contact { padding: 4rem 0; }
      .contact-form-wrapper { padding: 1.25rem; border-radius: 16px; }
      .section-title { font-size: clamp(1.85rem, 9vw, 2.4rem); }
      .method-value { overflow-wrap: anywhere; }
    }
  `]
})
export class ContactComponent {
  private dataService = inject(DataService);
  private fb = inject(FormBuilder);

  cities = this.dataService.cities;

  contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    origin: [''],
    destination: [''],
    vehicle: [''],
    message: ['']
  });

  isSubmitting = false;
  isSubmitted = false;

  get name() { return this.contactForm.get('name'); }
  get phone() { return this.contactForm.get('phone'); }

  onSubmit() {
    if (this.contactForm.invalid) return;

    this.isSubmitting = true;

    const form = this.contactForm.value;
    const vehicleLabels: Record<string, string> = {
      sedan: 'Sedán / Hatchback',
      suv: 'SUV / Camioneta',
      pickup: 'Pickup',
      deportivo: 'Deportivo / Lujo',
      flota: 'Flota (varios vehículos)',
      otro: 'Otro'
    };

    let message = 'Hola Transportes Premium, quiero una cotización:%0A';
    message += '%0A*Nombre:* ' + encodeURIComponent(form.name || '');
    message += '%0A*Teléfono:* ' + encodeURIComponent(form.phone || '');
    message += '%0A*Origen:* ' + encodeURIComponent(form.origin || 'No especificado');
    message += '%0A*Destino:* ' + encodeURIComponent(form.destination || 'No especificado');
    message += '%0A*Vehículo:* ' + encodeURIComponent(vehicleLabels[form.vehicle] || form.vehicle || 'No especificado');
    if (form.message) {
      message += '%0A*Mensaje:* ' + encodeURIComponent(form.message);
    }

    setTimeout(() => {
      this.isSubmitting = false;
      this.isSubmitted = true;
      this.contactForm.reset();

      window.open('https://wa.me/573114748893?text=' + message, '_blank');

      setTimeout(() => {
        this.isSubmitted = false;
      }, 5000);
    }, 1500);
  }
}
