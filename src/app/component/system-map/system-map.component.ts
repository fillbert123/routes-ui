import { Component } from '@angular/core';
import { SubjectService } from '../../service/shared/subject.service';

@Component({
  selector: 'component-system-map',
  standalone: true,
  imports: [],
  templateUrl: './system-map.component.html',
  styleUrl: './system-map.component.scss'
})
export class SystemMapComponent {
  constructor(private subjectService: SubjectService) { }

  emitItem(id: number, type: string) {
    this.subjectService.sendData({
      'action': 'navigate',
      'to': type,
      'data': id
    });
  }
}
