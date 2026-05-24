import { Component, Input, SimpleChanges } from '@angular/core';
import { SubjectService } from '../../service/shared/subject.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'component-system-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-map.component.html',
  styleUrl: './system-map.component.scss'
})
export class SystemMapComponent {
  @Input() zoomLevel!: number;

  constructor(private subjectService: SubjectService) { }

  emitItem(id: number, type: string) {
    this.subjectService.sendData({
      'action': 'navigate',
      'to': type,
      'data': id
    });
  }
}
