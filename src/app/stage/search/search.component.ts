import { Component, Input } from '@angular/core';
import { ListComponent } from '../../component/list/list.component';

@Component({
  selector: 'search-stage',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchStage {
  @Input() searchData: any;
}
