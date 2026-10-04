import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Direction, Status } from '../../../util/type.util';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'component-figure-direction',
  standalone: true,
  imports: [NgClass, IconComponent],
  templateUrl: './figure-direction.component.html',
  styleUrl: './figure-direction.component.scss'
})
export class FigureDirectionComponent {
  @Input() direction!: Direction;
  @Input() status!: Status;
  @Input() bulkData!: any;

  isAligned(align: string) {
    return this.direction === align;
  }
}
