import { Component, Input } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { SubjectService } from '../../service/shared/subject.service';
import { InputTextComponent } from "../input/input-text/input-text.component";
import { TitleComponent } from '../title/title.component';
import { subjectEmitData } from '../../util/interface.util';
import { ActionService } from '../../service/shared/action.service';

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

  constructor(private subjectService: SubjectService, private actionService: ActionService) { }

  handleUpdate(event: string) {
    this.searchQuery = event;
    this.emitItem('search');
  }

  emitItem(action: string) {
    switch(action) {
      case 'back':
        this.actionService.back();
        break;
      case 'search':
        this.actionService.search(this.searchQuery);
        break;
      case 'line':
        this.actionService.navigate('line');
        break;
    }
  }
}
