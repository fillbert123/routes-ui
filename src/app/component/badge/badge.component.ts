import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class BadgeComponent {
  @Input() badgeType: string = "";
  @Input() badgeIsActive: boolean = true;
  @Input() badgeColor: string = "";
  @Input() badgeLabel!: string;
  @Input() badgeData!: any;

  getColor(color: string) {
    return 'var(--' + color + ')';
  }
}
