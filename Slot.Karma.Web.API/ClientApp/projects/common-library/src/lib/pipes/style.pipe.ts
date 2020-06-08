import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'style' })
export class StylePipe implements PipeTransform {
  transform(value: string, sequence: string, style): string {
    const regEx = new RegExp(sequence.replace(/\s+/, '|'), "ig");
    return value.replace(regEx, `<span class="style-pipe" style="${style}">$&</span>`);
  }
}
