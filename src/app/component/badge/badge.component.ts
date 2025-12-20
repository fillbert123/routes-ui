import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class BadgeComponent {
  @Input() badgeType: string = "";
  @Input() badgeText: string = "";
  @Input() badgeIsActive: boolean = true;
  @Input() lineColor: string = "";

  getColor() {
    return 'var(--' + this.lineColor + ')';
  }
}
