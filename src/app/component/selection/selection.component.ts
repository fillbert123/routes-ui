import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.scss'
})
export class SelectionComponent {
  @Input() routes: any;
  @Output() sendSelectedRouteId = new EventEmitter();
  selectedIndex: number = 0;

  handleItemClick(index: number, id: number): void {
    this.selectedIndex = index;
    this.sendSelectedRouteId.emit(id);
  }
}
