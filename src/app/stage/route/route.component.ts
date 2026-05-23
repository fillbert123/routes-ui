import { Component, Input, SimpleChanges } from '@angular/core';
import { RouteService } from '../../service/api/route.service';
import { TitleComponent } from "../../component/title/title.component";
import { SelectionComponent } from "../../component/selection/selection.component";
import { ListComponent } from "../../component/list/list.component";

@Component({
  selector: 'stage-route',
  standalone: true,
  imports: [TitleComponent, SelectionComponent, ListComponent],
  templateUrl: './route.component.html',
  styleUrl: './route.component.scss'
})
export class RouteComponent {
  @Input() routeGroupId!: number;
  headerStatus: 'active' | 'loading' = 'loading'; 
  routeGroupData: any;
  dataStatus: 'active' | 'loading' = 'loading';
  routeData: any;
  routeId: any;

  constructor(private routeService: RouteService) { };

  ngOnChanges(changes: SimpleChanges) {
    if(changes['routeGroupId']) {
      this.fetchRouteGroupById(this.routeGroupId);
    }
  }

  fetchRouteGroupById(id: number) {
    this.headerStatus = 'loading';
    this.routeService.getRouteGroupById(id).subscribe({
      next: (res) => {
        this.routeGroupData = res;
        this.headerStatus = 'active';
      },
      error: (err) => {
        console.log('error', err);
      }
    })
  }

  fetchRouteById(id: number) {
    this.dataStatus = 'loading';
    this.routeService.getRouteById(id).subscribe({
      next: (res) => {
        this.routeData = res;
        this.dataStatus = 'active';
      },
      error: (err) => {
        console.log('error', err);
      }
    })
  }

  handleIdUpdate(id: any) {
    this.routeId = id;
    this.fetchRouteById(this.routeId);
  }
}
