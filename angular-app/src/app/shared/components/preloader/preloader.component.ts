import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="preloader" *ngIf="show">
      <div class="preloader-content">
        <div class="preloader-logo">
          <div class="preloader-icon-wrapper">
            <div class="preloader-glow"></div>
            <img src="assets/img/logo-1.png" alt="Transportes Premium" class="preloader-icon">
          </div>
          <span class="preloader-text">TRANSPORTES</span>
          <span class="preloader-highlight">PREMIUM</span>
        </div>
        <div class="preloader-bar">
          <div class="preloader-progress" [style.width.%]="progress"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .preloader {
      position: fixed;
      inset: 0;
      background: #0a0a1a;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      transition: opacity 0.5s ease;
    }

    .preloader.fade-out {
      opacity: 0;
      pointer-events: none;
    }

    .preloader-content {
      text-align: center;
    }

    .preloader-logo {
      margin-bottom: 2rem;
    }

    .preloader-icon-wrapper {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .preloader-glow {
      position: absolute;
      width: 110px;
      height: 110px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 102, 255, 0.35) 0%, rgba(0, 212, 255, 0.12) 45%, transparent 70%);
      filter: blur(6px);
      animation: glowPulse 2s ease-in-out infinite;
    }

    .preloader-icon {
      position: relative;
      width: 84px;
      height: 84px;
      object-fit: contain;
      animation: logoFloat 2.4s ease-in-out infinite;
      filter: drop-shadow(0 0 18px rgba(0, 153, 255, 0.45));
    }

    .preloader-text {
      display: block;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      color: #8888aa;
    }

    .preloader-highlight {
      display: block;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #0066ff, #00d4ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-top: 0.25rem;
    }

    .preloader-bar {
      width: 200px;
      height: 3px;
      background: #1a1a2e;
      border-radius: 2px;
      overflow: hidden;
      margin: 0 auto;
    }

    .preloader-progress {
      height: 100%;
      background: linear-gradient(135deg, #0066ff, #00d4ff);
      border-radius: 2px;
      transition: width 0.1s ease-out;
    }

    @keyframes logoFloat {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-6px) scale(1.04); }
    }

    @keyframes glowPulse {
      0%, 100% { opacity: 0.6; transform: scale(0.95); }
      50% { opacity: 1; transform: scale(1.08); }
    }

    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
  `]
})
export class PreloaderComponent implements OnInit, OnDestroy {
  show = true;
  progress = 0;
  private timeoutId: any;

  ngOnInit() {
    document.body.style.overflow = 'hidden';
    
    let width = 0;
    const interval = setInterval(() => {
      width += Math.random() * 20;
      if (width >= 100) {
        width = 100;
        clearInterval(interval);
        
        this.timeoutId = setTimeout(() => {
          document.querySelector('.preloader')?.classList.add('fade-out');
          setTimeout(() => {
            this.show = false;
            document.body.style.overflow = '';
          }, 500);
        }, 300);
      }
      this.progress = Math.min(width, 100);
    }, 80);
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    document.body.style.overflow = '';
  }
}