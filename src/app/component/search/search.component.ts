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
  isButtonDisabled: boolean = true;
  @Output() onSearchStation = new EventEmitter();

  constructor(private routeService: RouteService) { };

  onHandleInput(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    if(this.searchQuery === '') {
      this.isButtonDisabled = true;
    } else {
      this.isButtonDisabled = false;
    }
  }

  handleButtonClick() {
    if(!this.isButtonDisabled) {
      this.fetchSearchStationResult();
    }
  }

  fetchSearchStationResult() {
    this.routeService.getSearchStationResult(this.searchQuery).subscribe({
      next: (res) => {
        this.onSearchStation.emit(res);
      },
      error: (err) => {
        console.log('error', err);
      }
    })
  }
}
