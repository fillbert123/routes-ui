import { Component, Input } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'component-state',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './state.component.html',
  styleUrl: './state.component.scss'
})
export class StateComponent {
  @Input() error!: 'noResult' | 'invalidStation' | 'noDirection' | 'noStation' | 'invalid';
}
