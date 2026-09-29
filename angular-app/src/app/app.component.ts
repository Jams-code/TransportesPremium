import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreloaderComponent } from './shared/components/preloader/preloader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PreloaderComponent],
  template: `
    <app-preloader></app-preloader>
    <router-outlet></router-outlet>

    <a
      class="whatsapp-float"
      href="https://wa.me/573114748893?text=Hola%20Transportes%20Premium%2C%20quiero%20más%20información"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <span class="whatsapp-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.672.15-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.654-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.297-.497.099-.198.05-.372-.025-.521-.075-.149-.672-1.611-.92-2.204-.242-.579-.487-.5-.672-.51-.173-.007-.372-.009-.57-.009-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.064 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.414-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12.004 2.003C6.486 2.003 2 6.488 2 12.006c0 1.996.523 3.923 1.522 5.618L2 22l4.612-1.515c1.625.884 3.45 1.36 5.394 1.36 5.517 0 10.002-4.484 10.002-10.002S17.52 2.003 12.004 2.003zM12.004 20.19c-1.81 0-3.571-.492-5.104-1.42l-.366-.214-2.739.9.923-2.676-.218-.347C3.256 14.391 2.71 13.217 2.71 12.006c0-5.133 4.18-9.313 9.295-9.313 5.117 0 9.294 4.18 9.294 9.313 0 5.133-4.177 9.313-9.294 9.313z"/>
        </svg>
      </span>
      <span class="whatsapp-text">WhatsApp</span>
    </a>
  `,
  styles: []
})
export class AppComponent implements AfterViewInit {
  title = 'transportes-premium';

  @ViewChild('cursor') cursor!: ElementRef;
  @ViewChild('cursorGlow') cursorGlow!: ElementRef;

  ngAfterViewInit() {
    const cursor = this.cursor?.nativeElement;
    const glow = this.cursorGlow?.nativeElement;

    if (cursor && glow) {
      document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        glow.style.left = e.clientX - 20 + 'px';
        glow.style.top = e.clientY - 20 + 'px';
      });

      const hoverElements = document.querySelectorAll('a, button, input, textarea, select');
      hoverElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          cursor.style.transform = 'scale(1.5)';
          glow.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
          cursor.style.transform = 'scale(1)';
          glow.style.transform = 'scale(1)';
        });
      });
    }
  }
}