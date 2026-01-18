import { Component, Input } from '@angular/core';
import { RouteService } from '../../service/api/route.service';
import { TitleComponent } from "../../component/title/title.component";
import { SelectionComponent } from '../../component/selection/selection.component';
import { ListComponent } from "../../component/list/list.component";
import { LoadingComponent } from '../../component/loading/loading.component';

@Component({
  selector: 'app-route',
  standalone: true,
  imports: [TitleComponent, SelectionComponent, ListComponent, LoadingComponent],
  templateUrl: './route.component.html',
  styleUrl: './route.component.scss'
})
export class RouteComponent {
  isLoading: boolean = false;
  @Input() lineColor!: string;
  @Input() routeGroupId!: number;
  @Input() routeGroupName!: string;
  @Input() routeGroupCode!: string;
  @Input() routeIsActive!: boolean;
  @Input() routeData: any;

  terminusData: any = [];
  selectedRouteId!: number;
  routeStationData: any = [];

  constructor(private routeService: RouteService) { };
  
  ngOnInit() {
    this.fetchRouteByRouteGroupId(this.routeData.route_group_id);
  }

  handleSelectedRouteId(index: number) {
    this.selectedRouteId = index;
    this.fetchRouteStation(this.selectedRouteId);
  }

  fetchRouteByRouteGroupId(id: number) {
    this.isLoading = true;

    this.routeService.getRouteByRouteGroupId(id).subscribe({
      next: (res) => {
        this.selectedRouteId = res[0].id;
        this.setRouteData(res);
        this.fetchRouteStation(this.selectedRouteId);
      },
      error: (err) => {
        console.log('error', err);
        this.isLoading = false;
      }
    })
  }

  setRouteData(data: any) {
    data.forEach((item: any) => {
      this.terminusData.push({
        'id': item.id,
        'label': item.name_en
      })
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
