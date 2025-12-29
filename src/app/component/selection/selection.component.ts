import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.scss'
})
export class SelectionComponent {
  @Input() selectionData: any;
  @Output() onClickItem = new EventEmitter();
  selectedIndex: number = 0;

  handleItemClick(index: number, id: number): void {
    this.selectedIndex = index;
    this.onClickItem.emit(id);
  }
}
