import { Component, Input } from '@angular/core';
import { FigureDirectionComponent } from "../figure-direction/figure-direction.component";
import { BadgeComponent } from "../../badge/badge.component";
import { Status, Type } from '../../../util/type.util';

@Component({
  selector: 'component-figure-header',
  standalone: true,
  imports: [FigureDirectionComponent, BadgeComponent],
  templateUrl: './figure-header.component.html',
  styleUrl: './figure-header.component.scss'
})
export class FigureHeaderComponent {
  @Input() type!: Type;
  @Input() status!: Status;
  @Input() color: string | any;
  @Input() label: string | any;
  @Input() lowerTerminusData: any;
  @Input() upperTerminusData: any;
  @Input() branchTerminusData: any;
}
