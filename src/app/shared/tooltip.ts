

import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  @Input('appTooltip') text = '';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  private tooltipEl!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  show() {
    this.createTooltip();
  }

  @HostListener('mouseleave')
  hide() {
    if (this.tooltipEl) {
      this.renderer.removeChild(document.body, this.tooltipEl);
    }
  }

  private createTooltip() {
    this.tooltipEl = this.renderer.createElement('div');
    this.tooltipEl.innerText = this.text;

    this.renderer.addClass(this.tooltipEl, 'vscode-tooltip');
    this.renderer.addClass(this.tooltipEl, this.tooltipPosition);

    document.body.appendChild(this.tooltipEl);

    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltipEl.getBoundingClientRect();

    let top = 0, left = 0;

    switch (this.tooltipPosition) {
      case 'top':
        top = hostPos.top - tooltipPos.height - 8;
        left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        break;

      case 'bottom':
        top = hostPos.bottom + 8;
        left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        break;

      case 'left':
        top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
        left = hostPos.left - tooltipPos.width - 8;
        break;

      case 'right':
        top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
        left = hostPos.right + 8;
        break;
    }

    this.renderer.setStyle(this.tooltipEl, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipEl, 'left', `${left}px`);
  }
}

