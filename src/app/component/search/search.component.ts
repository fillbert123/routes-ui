import { Component, EventEmitter, Output } from '@angular/core';
import { RouteService } from '../../service/api/route.service';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchQuery: string = '';
  isSearchDisabled: boolean = true;
  isClearDisabled: boolean = true;
  @Output() onSearchStation = new EventEmitter();
  @Output() onClearSearch = new EventEmitter();

  constructor(private routeService: RouteService) { };

  onHandleInput(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    if(this.searchQuery === '') {
      this.isSearchDisabled = true;
      this.isClearDisabled = true;
    } else {
      this.isSearchDisabled = false;
      this.isClearDisabled = false;
    }
  }

  handleSearchButtonClick() {
    if(!this.isSearchDisabled) {
      this.fetchSearchStationResult();
    }
  }

  handleXmarkButtonClick() {
    if(!this.isClearDisabled) {
      this.searchQuery = '';
      this.onClearSearch.emit();
      this.isSearchDisabled = true;
      this.isClearDisabled = true;
    }
  }

  fetchSearchStationResult() {
    this.routeService.getSearchStationResult(this.searchQuery).subscribe({
      next: (res) => {
        let searchData = {
          'searchQuery': this.searchQuery,
          'searchResult': res
        }
        this.onSearchStation.emit(searchData);
      },
      error: (err) => {
        console.log('error', err);
      }
    })
  }

  handleKeyPress(event: any) {
    if(event.key === 'Enter' && this.searchQuery !== '') {
      this.fetchSearchStationResult();
    } else if(event.key === 'Enter' && this.searchQuery === '') {
      this.onClearSearch.emit();
    }
  }
}
