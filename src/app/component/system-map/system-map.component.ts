import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionService } from '../../service/shared/action.service';

@Component({
  selector: 'component-system-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-map.component.html',
  styleUrl: './system-map.component.scss'
})
export class SystemMapComponent {
  @Input() zoomLevel!: number;

  constructor(private actionService: ActionService) { }

  emitItem(id: number, type: string) {
    this.actionService.navigate(type, id)
  }
}
