import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber',
  standalone: true
})
export class FormatNumberPipe implements PipeTransform {
  transform(value: number, locale: string = 'es-MX'): string {
    if (value == null) return '';
    return new Intl.NumberFormat(locale).format(value);
  }
}