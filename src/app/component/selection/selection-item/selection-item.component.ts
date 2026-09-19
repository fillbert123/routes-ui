import { Component, Input } from '@angular/core';
import { BadgeComponent } from "../../badge/badge.component";
import { Status } from '../../../util/type.util';

@Component({
  selector: 'component-selection-item',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './selection-item.component.html',
  styleUrl: './selection-item.component.scss'
})
export class SelectionItemComponent {
  @Input() status!: Status;
  @Input() label: string | any;
  @Input() isSelected!: boolean;
  @Input() id: number | any;
  @Input() currentTerminusData: any;
  @Input() completeTerminusData: any;
  @Input() viaData: any;
  @Input() loopDirection: any;
}
