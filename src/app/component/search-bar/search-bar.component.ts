import { Component, Input } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { SubjectService } from '../../service/shared/subject.service';
import { InputTextComponent } from "../input/input-text/input-text.component";
import { TitleComponent } from '../title/title.component';

@Component({
  selector: 'component-search-bar',
  standalone: true,
  imports: [ButtonComponent, InputTextComponent, TitleComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  @Input() stage!: 'line' | 'routeGroup' | 'station' | 'documentation' | 'search' | 'direction';
  searchQuery: string = '';

  constructor(private subjectService: SubjectService) { }

  handleUpdate(event: string) {
    this.searchQuery = event;
    this.emitItem('search');
  }

  emitItem(action: string) {
    switch(action) {
      case 'back':
        this.subjectService.sendData({
          'action': 'back'
        });
        break;
      case 'search':
        if(this.searchQuery === '') {
          this.subjectService.sendData({
            'action': 'navigate',
            'to': 'line'
          });
        } else {
          this.subjectService.sendData({
            'action': 'search',
            'data': this.searchQuery
          });
        }
        break;
      case 'line':
        this.subjectService.sendData({
          'action': 'navigate',
          'to': 'line'
        });
        break;
    }
  }
}
