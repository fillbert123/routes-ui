import { Component, Input } from '@angular/core';
import { BadgeComponent } from "../badge/badge.component";

@Component({
  selector: 'component-title',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent {
  @Input() kind!: 'routeGroup' | 'station' | 'standard';
  @Input() status!: 'active' | 'loading';
  @Input() title: string | any;
  @Input() badgeLabel: string | any;
  @Input() badgeColor: string | any;
  @Input() badgeData: any;
}
