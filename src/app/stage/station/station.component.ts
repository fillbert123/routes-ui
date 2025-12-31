import { Component, Input } from '@angular/core';
import { RouteService } from '../../service/api/route.service';
import { TitleComponent } from "../../component/title/title.component";
import { StackComponent } from "../../component/stack/stack.component";

@Component({
  selector: 'app-station',
  standalone: true,
  imports: [TitleComponent, StackComponent],
  templateUrl: './station.component.html',
  styleUrl: './station.component.scss'
})
export class StationComponent {
  isLoading: boolean = false;
  stationTrack: any;
  interchangeData: any = [];
  @Input() stationData: any;

  constructor(private routeService: RouteService) { };

  ngOnChanges() {
    this.fetchRouteDetail(this.stationData.station_id);
  }

  fetchRouteDetail(id: number) {
    this.isLoading = true;

    this.routeService.getRouteDetail(id).subscribe({
      next: (res) => {
        this.stationTrack = res;
        this.interchangeData = [];
        this.stationTrack.forEach((line: any) => {
          line.track.forEach((track: any) => {
            this.interchangeData.push({
              'line_color': line.line_color,
              'line_station_code': track.current_station_code,
              'route_group_code': track.route_group
            })
          })
        })
        this.isLoading = false;
      },
      error: (err) => {
        console.log('error', err);
        this.isLoading = false;
      }
    })
  }
}
