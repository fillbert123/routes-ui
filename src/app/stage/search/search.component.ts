import { Component, Input, SimpleChanges } from '@angular/core';
import { RouteService } from '../../service/api/route.service';
import { TitleComponent } from "../../component/title/title.component";
import { ListComponent } from "../../component/list/list.component";
import { BadgeComponent } from "../../component/badge/badge.component";

@Component({
  selector: 'stage-search',
  standalone: true,
  imports: [TitleComponent, ListComponent, BadgeComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Input() searchQuery: string = '';
  status: 'active' | 'loading' = 'loading';
  searchResultData: any;

  constructor(private routeService: RouteService) { };

  ngOnChanges(changes: SimpleChanges) {
    if(changes['searchQuery']) {
      this.fetchSearchResult(this.searchQuery);
    }
  }

  fetchSearchResult(query: string) {
    this.status = 'loading';
    this.routeService.getSearchResult(query).subscribe({
      next: (res) => {
        this.searchResultData = res;
        this.status = 'active';
      },
      error: (err) => {
        console.log('error', err);
      }
    })
  }
}
