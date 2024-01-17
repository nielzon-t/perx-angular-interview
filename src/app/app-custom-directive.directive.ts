import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCustomDirective]'
})
export class AppCustomDirectiveDirective {
  private isCustomText = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    const element = this.el.nativeElement;
    if (this.isCustomText) {
      this.renderer.setProperty(element, 'textContent', 'This is the default text.');
      this.renderer.setStyle(element, 'color', 'black'); // Reset text color
      this.renderer.setStyle(element, 'font-weight', 'normal'); // Reset font weight
    } else {
      this.renderer.setProperty(element, 'textContent', '🚀Some Funky Text made possible with Directives! 🎉 (Hire me 😊)');
      this.renderer.setStyle(element, 'color', 'purple'); // Change text color
      this.renderer.setStyle(element, 'font-weight', 'bold'); // Change font weight
    }
    this.isCustomText = !this.isCustomText;
  }
}
