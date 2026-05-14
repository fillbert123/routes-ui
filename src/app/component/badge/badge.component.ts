import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';
import { AtomicComponent } from '../atomic/atomic.component';

@Component({
  selector: 'component-badge',
  standalone: true,
  imports: [NgStyle, AtomicComponent],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class BadgeComponent {
  @Input() kind!: 'routeGroup' | 'line' | 'station' | 'terminus';
  @Input() status!: 'active' | 'inactive' | 'loading' | 'empty';
  @Input() bulkData: any;
  @Input() color: string | any;
  @Input() label: string | any;

  getOpacity() {
    return (this.status === 'inactive') ? 0.5 : 1;
  }
  
  getColor() {
    return(`var(--${this.color})`);
  }

  getType(isFirst: boolean, isLast: boolean): "single" | "leading" | "middle" | "trailing" {
    if(isFirst && isLast) return 'single';
    else if(isFirst) return 'leading';
    else if(isLast) return 'trailing';
    else return 'middle';
  }
}
