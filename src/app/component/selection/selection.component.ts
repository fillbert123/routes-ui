import { Component, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { SelectionItemComponent } from "./selection-item/selection-item.component";

@Component({
  selector: 'component-selection',
  standalone: true,
  imports: [SelectionItemComponent],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.scss'
})
export class SelectionComponent {
  @Input() status!: 'active' | 'loading';
  @Input() selectionData: any;
  @Output() routeIdUpdate = new EventEmitter<any>;
  selectedIndex: number | any;
  selectedId: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if(changes['selectionData'] && this.selectionData) {
      this.selectedId = this.selectionData[this.selectionData.length - 1].id;
      this.emitRouteId();
    }
  }

  isSelected(id: number) {
    return id === this.selectedId;
  }

  handleItemClick(id: any) {
    this.selectedId = id;
    this.emitRouteId();
  }

  getSubtext(item: any) {
    if(item.currentTerminus.endName !== item.completeTerminus.endName) {
      return `${item.completeTerminus.endName} (U/C)`;
    } else if(item.via) {
      return `via ${item.via}`;
    } else {
      return;
    }
  }

  emitRouteId() {
    this.routeIdUpdate.emit(this.selectedId);
  }
}
