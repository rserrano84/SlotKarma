import { Directive, HostListener, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgModel, NgControl, AbstractControl, FormControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';
import { Util } from '../util/util';
@Directive({
  selector: '[inputNumberFormat]',
  providers: [{ provide: NG_VALIDATORS, useExisting: InputNumberFormatDirective, multi: true }]
})
export class InputNumberFormatDirective implements Validator {
  private count: number = 0;
  private _fractions: number = 0;
  @Input('fractions')
  public set fractions(value: number) {
    this._fractions = value;
  }
  private _digits: number = 15;
  @Input('digits')
  public set digits(value: number) {
    this._digits = value > 15 ? 15 : (value < 1 ? 1 : value);
  }

  private previous: string = '';
  constructor(private el: ElementRef) {
  }
  validate(control: AbstractControl): { [key: string]: any } {
    let value = control.value === null || control.value === undefined ? '' : (control.value + '');
    if (value != this.previous) {
    //if (value.replace(/\,/g, '') != this.previous.replace(/\,/g, '')) {
      // keep track of the last cursor position:
      let cursor = this.el.nativeElement.selectionStart;
      const segments = value.split('.');
      // get the last two digits after a decimal, and only allow one decimal in the number:
      let mantissa = segments.length > 1 ? `${segments[segments.length - 1].slice(0, this._fractions)}` : '';
      // limit the number of digits and parse integer:
      let num = parseInt(segments[0].replace(/\D/g, '').slice(0, this._digits), 10);
      
      // Save the last known value so this function does not result in a stack overflow.
      // Dispatching the input event will result in this function to be called again:
      this.previous = value;      
      let newValue = Number.isInteger(num) ? Util.formattedDecimal(num, 'en-US', 0) : ''; //num.toLocaleString()
      newValue += this._fractions>0 && segments.length>1 ? `.${mantissa.replace(/\D/g, '')}` : '';
      this.el.nativeElement.value = newValue;
      //console.log(`${value}(${value.length}) ${newValue}(${newValue.length}) cursor:${cursor}`);
      // Dispatch an input event so the input's model is updated:
      this.el.nativeElement.dispatchEvent(new Event('input'));
      

      if (event && event['inputType']=='deleteContentBackward') {
        cursor -= value.length!=newValue.length ? 1 : 0;
        cursor = cursor < 0 ? 0 : cursor;
      }
      else if (event && event['inputType']=='deleteContentForward') {
        cursor -= value.length!=newValue.length ? 1 : 0;
        cursor = cursor < 0 ? 0 : cursor;
      }
      else { 
        cursor += cursor%4==0 ? 1 : 0;        
      }
      
      //console.log(`previous:${this.previous} value:${value} cursor:${cursor}`);
      // Increment the cursor by 1 if a comma was inserted.
      // Restore the cursor position:
      this.el.nativeElement.selectionStart = cursor;
      this.el.nativeElement.selectionEnd = cursor;
    }  
    return null;
  }
}

