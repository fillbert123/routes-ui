import { Component, Input } from '@angular/core';
import { BadgeComponent } from "../badge/badge.component";
import { ButtonComponent } from '../button/button.component';
import { SubjectService } from '../../service/shared/subject.service';
import { ActionService } from '../../service/shared/action.service';

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

  constructor(private subjectService: SubjectService, private actionService: ActionService) { }

  emitDirection() {
    this.actionService.navigate('direction', this.id)
  }
}
