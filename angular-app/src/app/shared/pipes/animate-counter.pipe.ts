import { Pipe, PipeTransform } from '@angular/core';
import { NgIf } from '@angular/common';

@Pipe({
  name: 'animateCounter',
  standalone: true,
  imports: [NgIf]
})
export class AnimateCounterPipe implements PipeTransform {
  transform(value: number, suffix: string = ''): string {
    return `${value}${suffix}`;
  }
}