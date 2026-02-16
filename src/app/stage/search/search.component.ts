import { Component, Input, SimpleChanges } from '@angular/core';
import { TitleComponent } from '../../component/title/title.component';
import { ListComponent } from '../../component/list/list.component';
import { BadgeComponent } from '../../component/badge/badge.component';

@Component({
  selector: 'search-stage',
  standalone: true,
  imports: [TitleComponent, ListComponent, BadgeComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchStage {
  @Input() searchData: any;
  isSearchResultEmpty: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    this.isSearchResultEmpty = (this.searchData.searchResult.length > 0) ? false : true;
  }

  getTitle(searchQuery: string) {
    return 'Result for ' + searchQuery + ":"
  }
}
