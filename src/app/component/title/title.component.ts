import { Component, Input } from '@angular/core';
import { BadgeComponent } from "../badge/badge.component";
import { ButtonComponent } from '../button/button.component';
import { SubjectService } from '../../service/shared/subject.service';

@Component({
  selector: 'component-title',
  standalone: true,
  imports: [BadgeComponent, ButtonComponent],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent {
  @Input() id: number | any;
  @Input() kind!: 'routeGroup' | 'station' | 'standard';
  @Input() status!: 'active' | 'loading';
  @Input() title: string | any;
  @Input() altTitle: any;
  @Input() badgeLabel: string | any;
  @Input() badgeColor: string | any;
  @Input() badgeData: any;
  @Input() isStationActive: boolean = false;

  constructor(private subjectService: SubjectService) { }

  emitDirection() {
    this.subjectService.sendData({
      'action': 'navigate',
      'to': 'direction',
      'data': this.id
    });
  }
}
