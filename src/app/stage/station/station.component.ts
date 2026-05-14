import { Component, Input, SimpleChanges } from '@angular/core';
import { RouteService } from '../../service/api/route.service';
import { TitleComponent } from "../../component/title/title.component";
import { ListComponent } from "../../component/list/list.component";

@Component({
  selector: 'stage-station',
  standalone: true,
  imports: [TitleComponent, ListComponent],
  templateUrl: './station.component.html',
  styleUrl: './station.component.scss'
})
export class StationComponent {
  @Input() stationId!: number;
  status: 'active' | 'loading' = 'loading';
  stationData: any;
  badgeData: any = [];

  constructor(private routeService: RouteService) { };

  ngOnChanges(changes: SimpleChanges) {
    if(changes['stationId']) {
      this.fetchStationById(this.stationId);
    }
  }

  fetchStationById(id: number) {
    this.status = 'loading';
    this.routeService.getStationById(id).subscribe({
      next: (res) => {
        this.stationData = res;
        this.setBadgeData();
        this.status = 'active';
      },
      error: (err) => {
        console.log('error', err);
      }
    })
  }

  setBadgeData() {
    this.badgeData = [];
    this.stationData.line.forEach((station: any) => {
      station.routeGroup.forEach((routeGroup: any) => {
        this.badgeData.push({
          'label': routeGroup.currentStation.code,
          'color': station.color,
          'status': (routeGroup.isActive) ? 'active' : 'inactive'
        });
      });
    });
  }
}
