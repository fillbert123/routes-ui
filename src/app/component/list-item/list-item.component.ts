import { Component, Input } from '@angular/core';
import { BadgeComponent } from "../badge/badge.component";
import { SubjectService } from '../../service/shared/subject.service';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {
  @Input() itemType: string = "route-group";
  @Input() itemData: any = {};
  @Input() lineColor: string = "";

  constructor(private subjectService: SubjectService) { }

  getRouteTerminus() {
    let routeTerminus = "";
    if(this.itemData.routes[0].route_via_station_name) {
      routeTerminus = this.itemData.routes[0].route_start_station_name;
    } else {
      this.itemData.routes.forEach((route: any) => {
        if(routeTerminus === "") {
          routeTerminus = route.route_start_station_name;
        } else {
          routeTerminus = routeTerminus + " - " + route.route_start_station_name;
        }
      })
    }
    return routeTerminus;
  }

  getRouteVia() {
    if(this.itemData.routes[0].route_via_station_name) {
      let routeVia = "via " + this.itemData.routes[0].route_via_station_name + ' or ' + this.itemData.routes[1].route_via_station_name;
      return routeVia;
    }
    return null;
  }

  handleClick() {
    let data = {
      nextStage: 'route',
      lineColor: this.lineColor,
      itemData: this.itemData
    }
    this.subjectService.sendData(data);
  }
}
