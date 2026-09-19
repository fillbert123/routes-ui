import { Component, Input } from '@angular/core';
import { BadgeComponent } from "../../badge/badge.component";
import { Status } from '../../../util/type.util';
import { ActionService } from '../../../service/shared/action.service';

@Component({
  selector: 'component-figure-item',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './figure-item.component.html',
  styleUrl: './figure-item.component.scss'
})
export class FigureItemComponent {
  @Input() status!: Status;
  @Input() color: string | any;
  @Input() id: number | any;
  @Input() label: string | any;
  @Input() name: string | any;

  constructor(private actionService: ActionService) { }
  
  emitItem() {
    this.actionService.navigate('station', this.id)
  }
}
