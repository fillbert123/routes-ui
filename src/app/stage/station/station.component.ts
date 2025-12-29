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
  @Input() itemData: any;

  @Input() stationData: any;

  constructor(private routeService: RouteService) { };

  ngOnInit() {
    this.fetchRouteDetail(this.stationData.station_id);
  }

  fetchRouteDetail(id: number) {
    this.isLoading = true;

    this.routeService.getRouteDetail(id).subscribe({
      next: (res) => {
        this.stationTrack = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log('error', err);
        this.isLoading = false;
      }
    })
  }
}
