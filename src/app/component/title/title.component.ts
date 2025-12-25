import { Component, Input } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent {
  @Input() titleType!: string;
  @Input() lineColor!: string;
  @Input() itemData: any;
  @Input() stationData: any;
}
