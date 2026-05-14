import { Component, Input } from '@angular/core';
import { BadgeComponent } from "../../badge/badge.component";
import { SubjectService } from '../../../service/shared/subject.service';

@Component({
  selector: 'component-figure-item',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './figure-item.component.html',
  styleUrl: './figure-item.component.scss'
})
export class FigureItemComponent {
  @Input() status!: 'active' | 'inactive' | 'empty';
  @Input() color: string | any;
  @Input() id: number | any;
  @Input() label: string | any;
  @Input() name: string | any;

  constructor(private subjectService: SubjectService) { }
  
  emitItem() {
    this.subjectService.sendData({
      'action': 'navigate',
      'data': this.id
    });
  }
}
