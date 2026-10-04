import { Component, EventEmitter, input, Input, Output, SimpleChanges } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ButtonComponent } from "../../button/button.component";
import { FormsModule } from '@angular/forms';
import { Status } from '../../../util/type.util';

@Component({
  selector: 'component-input-text',
  standalone: true,
  imports: [NgStyle, ButtonComponent, FormsModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss'
})
export class InputTextComponent {
  @Input() type: 'readonly' | 'standard' = 'standard';
  @Input() placeholder!: string;
  @Input() initialValue: string = '';
  @Input() status: Status | null = 'active';
  @Output() updateValue = new EventEmitter<any>;
  isShowSearchButton: boolean = false;
  inputValue: string = '';
  isHovered: boolean = false;

  ngOnChanges() {
    this.inputValue = this.initialValue;
  }

  clearInput(inputField: HTMLInputElement) {
    this.inputValue = '';
    inputField.focus();
    this.emitValue();
  }

  emitValue() {
    this.updateValue.emit(this.inputValue);
  }

  onFocusInput(inputField: HTMLInputElement) {    
    setTimeout(() => {
      inputField.select();
    }, 0);
  }

  getColor() {
    if(this.status === 'loading') {
      return 'var(--transparent)';
    } else {
      if(this.isHovered && this.status === 'active') {
        return `var(--transparent-dark)`;
      } else {
        return `var(--transparent)`;
      }
    }
  }

  switchIsHovered() {
    this.isHovered = !this.isHovered
  }
}
