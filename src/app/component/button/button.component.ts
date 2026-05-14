import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'component-button',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() size!: 'small' | 'large';
  @Input() status!: 'active' | 'inactive' | 'loading';
  @Input() color: any;
  @Input() icon: string | any;

  isHovered: boolean = false;

  getSize() {
    switch(this.size) {
      case 'small':
        return '34px';
      case 'large':
        return '46px';
      default:
        return '46px';
    }
  }

  getOpacity() {
    if(this.status === 'inactive') {
      return 0.5;
    } else {
      if(!this.color) {
        return 1;
      } else {
        if(this.isHovered) {
          return 0.8;
        } else {
          return 1;
        }
      }
    }
  }
  
  getColor() {
    if(this.status === 'loading' && this.color === 'transparent') {
      return 'var(--transparent)';
    } else {
      if(!this.color) {
        if(this.isHovered && this.status === 'active') {
          return 'var(--transparent)';
        } else {
          return 'transparent';
        }
      } else {
        return `var(--${this.color})`;
      }
    }
  }

  getCursor() {
    if(this.status == 'active') {
      return 'pointer';
    } else {
      return 'not-allowed';
    }
  }

  switchIsHovered() {
    this.isHovered = !this.isHovered
  }
}
