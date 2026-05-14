import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'component-selection-item',
  standalone: true,
  imports: [],
  templateUrl: './selection-item.component.html',
  styleUrl: './selection-item.component.scss'
})
export class SelectionItemComponent {
  @Input() status!: 'active' | 'loading';
  @Input() label: string | any;
  @Input() subtext: string | any;
  @Input() isSelected!: boolean;
  @Input() id: number | any;
  @Output() selectionItemClick = new EventEmitter<any>();

  emitSelectedItem() {
    this.selectionItemClick.emit(this.id);
  }
}
