import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'component-figure-direction',
  standalone: true,
  imports: [NgClass],
  templateUrl: './figure-direction.component.html',
  styleUrl: './figure-direction.component.scss'
})
export class FigureDirectionComponent {
  @Input() direction!: 'low' | 'up';
  @Input() status!: 'active' | 'loading';
  @Input() bulkData!: any;

  isAligned(align: string) {
    return this.direction === align;
  }
}
