import { Component, Input } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { SubjectService } from '../../service/shared/subject.service';

@Component({
  selector: 'component-search-bar',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  @Input() stage!: 'line' | 'routeGroup' | 'station' | 'documentation' | 'search';
  searchQuery: string = '';
  clearButtonStatus: 'active' | 'hidden' = 'hidden';
  searchButtonStatus: 'active' | 'inactive' = 'inactive';

  constructor(private subjectService: SubjectService) { }

  handleInput(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    if(this.searchQuery === '') {
      this.clearButtonStatus = 'hidden';
      this.searchButtonStatus = 'inactive';
    } else {
      this.clearButtonStatus = 'active';
      this.searchButtonStatus = 'active';
    }
  }

  clearQuery() {
    this.searchQuery = '';
    this.clearButtonStatus = 'hidden';
    this.searchButtonStatus = 'inactive';
  }

  handleKeyPress(event: any) {
    if(event.key === 'Enter' && this.searchQuery !== '') {
      this.emitItem('search');
    } else if(event.key === 'Enter' && this.searchQuery === '') {
      this.emitItem('line');
    }
  }

  emitItem(action: string) {
    switch(action) {
      case 'back':
        this.subjectService.sendData({
          'action': 'back'
        });
        break;
      case 'search':
        this.subjectService.sendData({
          'action': 'search',
          'data': this.searchQuery
        });
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
