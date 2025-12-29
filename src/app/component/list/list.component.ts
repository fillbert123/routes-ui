import { Component, Input } from '@angular/core';
import { ListItemComponent } from "../list-item/list-item.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input() listType!: string;
  @Input() listData: any = [];
  @Input() lineColor: string = "";
  @Input() routeGroupCode!: string;
}
