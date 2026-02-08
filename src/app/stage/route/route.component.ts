import { Component, Input, SimpleChanges } from '@angular/core';
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
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['routeData'] && this.routeData?.route_group_id) {
      this.fetchRouteByRouteGroupId(this.routeData?.route_group_id);
    }
  }

  fetchRouteByRouteGroupId(id: number) {
    this.isLoading = true;
    this.routeService.getRouteByRouteGroupId(id).subscribe({
      next: (res) => {
        if (!res || res.length === 0) {
          this.isLoading = false;
          return;
        }
        const routeId = res[0].route_id;
        this.selectedRouteId = routeId;
        this.setRouteData(res);
        this.fetchRouteStation(routeId);
      },
      error: () => {
        this.isLoading = false
      }
    });
  }

  setRouteData(data: any) {
    data.forEach((item: any, index: number) => {
      this.terminusData.push({
        id: item.route_id,
        label: this.getLabel(item, index),
        alt: this.getAltLabel(item)
      });
    });
  }

  getLabel(item: any, index: number) {
    if(item.start_station_name === item.end_station_name) {
      return this.getDirectionLabel(index);
    } else {
      return item.end_station_name;
    }
  }

  getDirectionLabel(index: number) {
    if(index === 0) {
      return (this.routeData.route_group_code === 'SE') ? 'Clockwise' : 'Counterclockwise';
    } else {
      return (this.routeData.route_group_code === 'SE') ? 'Counterclockwise' : 'Clockwise';
    }
  }

  getAltLabel(item: any) {
    if(item.start_station_name === item.end_station_name) {
      return item.end_station_name;
    } else if (item.complete_end_station_name !== item.end_station_name) {
      return item.complete_end_station_name + ' U/C';
    } else {
      return null;
    }
  }

  handleSelectedRouteId(routeId: number) {
    this.selectedRouteId = routeId;
    this.fetchRouteStation(routeId);
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
