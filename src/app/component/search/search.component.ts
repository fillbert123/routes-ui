import { Component } from '@angular/core';
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

  onHandleInput(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    if(this.searchQuery === '') {
      this.isButtonDisabled = true;
    } else {
      this.isButtonDisabled = false;
    }
  }
}
