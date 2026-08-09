import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { InputTextComponent } from "../input/input-text/input-text.component";

@Component({
  selector: 'component-direction-bar',
  standalone: true,
  imports: [ButtonComponent, InputTextComponent],
  templateUrl: './direction-bar.component.html',
  styleUrl: './direction-bar.component.scss'
})
export class DirectionBarComponent {
  @Input() directionData: any;
  @Output() updateSearchQuery = new EventEmitter<any>;
  @Output() updateActiveField = new EventEmitter<any>;
  @Output() reverseDirection = new EventEmitter<any>;

  handleUpdate(field: string, event: string) {
    if(event) {
      this.updateSearchQuery.emit(event);
    }
    this.updateActiveField.emit(field);
  }

  handleReverseClick() {
    this.reverseDirection.emit();
  }
}
