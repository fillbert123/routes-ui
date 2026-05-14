import { Component, Input } from '@angular/core';
import { FigureDirectionComponent } from "../figure-direction/figure-direction.component";
import { BadgeComponent } from "../../badge/badge.component";

@Component({
  selector: 'component-figure-header',
  standalone: true,
  imports: [FigureDirectionComponent, BadgeComponent],
  templateUrl: './figure-header.component.html',
  styleUrl: './figure-header.component.scss'
})
export class FigureHeaderComponent {
  @Input() type!: 'main' | 'branch';
  @Input() status!: 'active' | 'loading';
  @Input() color: string | any;
  @Input() label: string | any;
  @Input() lowerTerminusData: any;
  @Input() upperTerminusData: any;
  @Input() branchTerminusData: any;
}
