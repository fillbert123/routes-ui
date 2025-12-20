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
  @Input() routeGroupCode: string = "";
  @Input() isFirst: boolean = false;
  @Input() isLast: boolean = false;
  filterizedInterchange: any;

  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    if(this.itemType === 'route-station') {
      this.getFilterizedInterchange();
    }
  }

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

  getBadgeText() {
    let code = this.itemData.interchanges.find((interchange: any) => {
      return interchange.route_group_code === this.routeGroupCode;
    })
    return code.line_station_code;
  }

  handleItemClick() {
    let data = {
      nextStage: 'route',
      lineColor: this.lineColor,
      itemData: this.itemData
    }
    this.subjectService.sendData(data);
  }

  getFilterizedInterchange() {
    this.filterizedInterchange = this.itemData.interchanges.filter((interchange: any) => {
      return interchange.route_group_code !== this.routeGroupCode
    })
  }

  getColor() {
    return 'var(--' + this.lineColor + ')';
  }
}
