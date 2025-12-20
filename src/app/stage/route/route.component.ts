import { Component, Input } from '@angular/core';
import { RouteService } from '../../service/api/route.service';
import { TitleComponent } from "../../component/title/title.component";
import { SelectionComponent } from '../../component/selection/selection.component';
import { ListComponent } from "../../component/list/list.component";

@Component({
  selector: 'app-route',
  standalone: true,
  imports: [TitleComponent, SelectionComponent, ListComponent],
  templateUrl: './route.component.html',
  styleUrl: './route.component.scss'
})
export class RouteComponent {
  isLoading: boolean = false;
  @Input() lineColor!: string;
  @Input() itemData: any;
  routeData: any = [];
  selectedRouteId!: number;
  routeStationData: any = [];

  constructor(private routeService: RouteService) { };
  
  ngOnInit() {
    this.fetchRouteByRouteGroupId(this.itemData.route_group_id);
  }

  handleSelectedRouteId(index: number) {
    this.selectedRouteId = index;
    this.fetchRouteStation(this.selectedRouteId);
  }

  fetchRouteByRouteGroupId(id: number) {
    this.isLoading = true;

    this.routeService.getRouteByRouteGroupId(id).subscribe({
      next: (res) => {
        this.routeData = res;
        this.selectedRouteId = res[0].id;
        this.fetchRouteStation(this.selectedRouteId);
        this.isLoading = false;
      },
      error: (err) => {
        console.log('error', err);
        this.isLoading = false;
      }
    })
  }

  fetchRouteStation(id: number) {
    this.isLoading = true;

    this.routeService.getRouteStation(id).subscribe({
      next: (res) => {
        this.routeStationData = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log('error', err);
        this.isLoading = false;
      }
    })
  }
}
