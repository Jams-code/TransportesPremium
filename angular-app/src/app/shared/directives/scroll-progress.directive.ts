import { Directive, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appScrollProgressBar]',
  standalone: true
})
export class ScrollProgressBarDirective implements OnInit, OnDestroy {
  private progressBar: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.progressBar = this.renderer.createElement('div');
    this.progressBar.className = 'scroll-progress';
    this.renderer.appendChild(document.body, this.progressBar);
  }

  ngOnInit() {
    window.addEventListener('scroll', this.onScroll);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll);
    if (this.progressBar && this.progressBar.parentNode) {
      this.progressBar.parentNode.removeChild(this.progressBar);
    }
  }

  onScroll = () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    this.progressBar.style.width = scrollPercent + '%';
  };
}