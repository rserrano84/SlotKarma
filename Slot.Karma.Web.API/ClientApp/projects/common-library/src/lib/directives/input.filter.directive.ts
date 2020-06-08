import { Directive, HostListener, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgModel, NgControl, AbstractControl, FormControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';


@Directive({
  selector: '[inputFilter]',
  providers: [{ provide: NG_VALIDATORS, useExisting: InputFilterDirective, multi: true }]
})
export class InputFilterDirective implements Validator {
  private regEx: RegExp = new RegExp('.*');
  private previous: string = '\u2665';
  @Input('inputFilter')
  public set mask(value: string) {
    if (value) {
      this.regEx = new RegExp(value);
    }  
  }

  constructor(private el: ElementRef) {
  }

  validate(control: AbstractControl): { [key: string]: any } {
    let maskedValue = ''
    let value = control.value === null || control.value === undefined ? '' : (control.value + '');
    if (value /*&& this.previous != maskedValue*/) {
      for (let c of (value + '')) {
        if (this.regEx.test(c)) {
          maskedValue += c;
        }
      }
      if (maskedValue !== value) {
        this.previous = maskedValue;
        this.el.nativeElement.value = maskedValue;
        this.el.nativeElement.dispatchEvent(new Event('input'));
      }
    }
    return null;
  }
}

