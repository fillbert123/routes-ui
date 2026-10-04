import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Size, Status } from '../../util/type.util';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'component-button',
  standalone: true,
  imports: [NgStyle, IconComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() size!: Size;
  @Input() status!: Status;
  @Input() color: 'primary' | 'transparent' | any;
  @Input() icon: string | any;
  @Input() leftIcon: string | any;
  @Input() rightIcon: string | any;
  @Input() label: string | any;

  isHovered: boolean = false;

  getSize(attribute: string) {
    if(this.label) {
      switch(attribute) {
        case 'width':
          return 'fit-content';
        case 'height':
          return '38px';
        default:
          return '38px';
      }
    } else {
      switch(this.size) {
        case 'small':
          return '34px';
        case 'large':
          return '46px';
        default:
          return '46px';
      }
    }
  }

  getPadding() {
    if(this.label) {
      return '0 16px';
    } else {
      return '0';
    }
  }

  getOpacity() {
    if(this.status === 'inactive') {
      return 0.5;
    } else {
      return 1;
    }
  }
  
  getColor() {
    if(this.status === 'loading' && this.color === 'transparent') {
      return 'var(--transparent)';
    } else {
      if(!this.color) {
        if(this.isHovered && this.status === 'active') {
          return 'var(--clear)';
        } else {
          return 'transparent';
        }
      } else {
        if(this.isHovered && this.status === 'active') {
          return `var(--${this.color}-dark)`;
        } else {
          return `var(--${this.color})`;
        }
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
