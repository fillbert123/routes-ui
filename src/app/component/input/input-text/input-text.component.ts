import { Component, EventEmitter, input, Input, Output, SimpleChanges } from '@angular/core';
import { ButtonComponent } from "../../button/button.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'component-input-text',
  standalone: true,
  imports: [ButtonComponent, FormsModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss'
})
export class InputTextComponent {
  @Input() type: 'readonly' | 'standard' = 'standard';
  @Input() placeholder!: string;
  @Input() initialValue: string = '';
  @Input() isShowClearButton: boolean = false;
  @Output() updateValue = new EventEmitter<any>;
  isShowSearchButton: boolean = false;
  inputValue: string = '';

  ngOnChanges() {
    this.inputValue = this.initialValue;
  }

  clearInput(inputField: HTMLInputElement) {
    this.inputValue = '';
    this.isShowClearButton = false;
    inputField.focus();
    this.emitValue();
  }

  emitValue() {
    this.updateValue.emit(this.inputValue);
  }
}
