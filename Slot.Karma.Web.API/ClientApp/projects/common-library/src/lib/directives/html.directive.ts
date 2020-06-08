import {
  Directive, ElementRef, Input, OnChanges, Sanitizer, SecurityContext,
  SimpleChanges
} from '@angular/core';

@Directive({ selector: '[safeHtml]' })
export class SafeHtmlDirective implements OnChanges {
  @Input() safeHtml: string;

  constructor(private elementRef: ElementRef, private sanitizer: Sanitizer) { }

  ngOnChanges(changes: SimpleChanges): any {
    if ('safeHtml' in changes) {
      this.elementRef.nativeElement.innerHTML =
        this.sanitizer.sanitize(SecurityContext.HTML, this.safeHtml);
    }
  }
}


@Directive({ selector: '[unsafeHtml]' })
export class UnSafeHtmlDirective implements OnChanges {
  @Input() unsafeHtml: string;

  constructor(private elementRef: ElementRef, private sanitizer: Sanitizer) { }

  ngOnChanges(changes: SimpleChanges): any {
    if ('unsafeHtml' in changes) {
      this.elementRef.nativeElement.innerHTML =
        this.sanitizer.sanitize(SecurityContext.NONE, this.unsafeHtml);
    }
  }
}
