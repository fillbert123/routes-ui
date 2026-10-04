import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'component-icon',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  @Input() icon!: string;
  @Input() size!: 'xsmall' | 'small' | 'large';
  @Input() isHover: boolean = false;

  getSize() {
    switch(this.size) {
      case 'xsmall':
        return '10px';
      case 'small':
        return '12px';
      case 'large':
        return '16px';
      default:
        return '16px';
    }
  }

  getIcon() {
    switch(this.icon) {
      case 'back':
        return "url('/assets/icons/chevron.backward.svg')";
      case 'search':
        return "url('/assets/icons/magnifyingglass.svg')";
      case 'xmark':
        return "url('/assets/icons/xmark.svg')";
      case 'reverse':
        return "url('/assets/icons/arrow.left.arrow.right.svg')";
      case 'zoom-plus':
        return "url('/assets/icons/plus.magnifyingglass.svg')";
      case 'zoom-minus':
        return "url('/assets/icons/minus.magnifyingglass.svg')";
      case 'direct':
        if(this.isHover) {
          return "url('/assets/icons/arrowshape.turn.up.forward.fill.svg')";
        } else {
          return "url('/assets/icons/arrowshape.turn.up.forward.svg')";
        }
      case 'home':
        if(this.isHover) {
          return "url('/assets/icons/house.fill.svg')";
        } else {
          return "url('/assets/icons/house.svg')";
        }
      case 'left-arrow':
        return "url('/assets/icons/arrow.left.svg')";
      case 'right-arrow':
        return "url('/assets/icons/arrow.right.svg')";
      default:
        return;
    }
  }
}
