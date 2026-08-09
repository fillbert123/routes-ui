import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'component-atomic',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './atomic.component.html',
  styleUrl: './atomic.component.scss'
})
export class AtomicComponent {
  @Input() kind!: 'stationCode' | 'stationLine';
  @Input() type: 'standard' | 'single' | 'leading' | 'middle' | 'trailing' | any;
  @Input() status!: 'active' | 'inactive' | 'loading' | 'empty';
  @Input() color: string | any;
  @Input() colorLeading: string | any;
  @Input() colorTrailing: string | any;
  @Input() label: string | any;

  getOpacity() {
    return (this.status === 'inactive') ? 0.5 : 1;
  }
  
  getColor(position?: string) {
    if(this.color) {
      return(`var(--${this.color})`);
    } else {
      switch(position) {
        case 'leading':
          return(`var(--${this.colorLeading})`);
        case 'trailing':
          return(`var(--${this.colorTrailing})`);
        default:
          if(!this.colorLeading || this.colorLeading === 'white') {
            return(`var(--${this.colorTrailing})`);
          }
          return(`var(--${this.colorLeading})`);
      }
    }
  }

  getBorderRadius(){
    switch(this.type) {
      case('single'):
        return('10px');
      case('leading'):
        return('10px 2px 2px 10px');
      case('trailing'):
        return('2px 10px 10px 2px');
      case('middle'):
        return('2px');
      default:
        return('10px');
    }
  }

  getVisibility(position: string) {
    if(position === this.type) {
      return 'hidden';
    }
    return 'visible';
  }
}
