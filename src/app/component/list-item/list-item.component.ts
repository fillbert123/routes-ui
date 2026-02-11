import { Component, Input } from '@angular/core';
import { BadgeComponent } from "../badge/badge.component";
import { SubjectService } from '../../service/shared/subject.service';
import { RouteService } from '../../service/api/route.service';

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
  @Input() lineName: string = "";
  @Input() routeGroupCode: string = "";
  @Input() isFirst: boolean = false;
  @Input() isLast: boolean = false;
  filterizedInterchange: any;
  terminusOrder: any;
  lowerTerminusName: string = '';
  upperTerminusName: string = '';
  branchTerminusName: string = '';
  completeLowerTerminusName: string = '';
  completeUpperTerminusName: string = '';
  completeBranchTerminusName: string = '';
  stationDataList: any = [];
  branchStationDataList: any = [];
  lineDataList: any = [];
  branchLineDataList: any = [];

  constructor(private subjectService: SubjectService, private routeService: RouteService) { }

  ngOnInit() {
    if(this.itemType === 'route-station') {
      this.setFilterizedInterchange();
    }
  }

  ngOnChanges() {
    if(this.itemType === 'track') {
      this.setTerminusOrder();
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

  getIsStationActive() {
    let code = this.itemData.interchanges.find((interchange: any) => {
      return interchange.route_group_code === this.routeGroupCode;
    })
    return code.line_station_is_active;
  }

  handleItemClick(type: string, stationData: any) {
    let data;
    switch(type) {
      case 'route-group':
        data = {
          nextStage: 'route',
          lineColor: this.lineColor,
          itemData: this.itemData
        }
        this.subjectService.sendData(data);
        break;
      case 'route-station':
        data = {
          nextStage: 'station',
          lineColor: this.lineColor,
          itemData: this.itemData
        }
        this.subjectService.sendData(data);
        break;
      case 'track':
        if(stationData.station_id) {
          data = {
            nextStage: 'station',
            lineColor: this.lineColor,
            itemData: {
              station_id: stationData.station_id,
              station_name: stationData.station_name
            }
          }
          this.subjectService.sendData(data);
        }
        break;
      case 'station':
        data = {
          nextStage: 'station',
          itemData: this.itemData
        }
        this.subjectService.sendData(data);
        break;
    }
  }

  setFilterizedInterchange() {
    this.filterizedInterchange = this.itemData.interchanges.filter((interchange: any) => {
      return interchange.route_group_code !== this.routeGroupCode
    })
  }

  setTerminusOrder() {
    this.routeService.getRouteByRouteGroupId(this.itemData.route_group_id).subscribe({
      next: (res) => {
        this.terminusOrder = res.reverse();
        this.setStationOrder();
        this.setLineOrder();
        if(this.itemData.current_station_name === 'Bahar Junction' || (this.terminusOrder.length === 2 && this.itemData.next_station.length === 3)) {
          this.setBranchLineOrder();
        }
      },
      error: (err) => {
        console.log('error', err);
      }
    })
  }

  setStationOrder() {
    if(this.terminusOrder.length === 2 && this.itemData.next_station.length === 2) {
      const [lowerTerminus, upperTerminus] = this.terminusOrder;

      this.lowerTerminusName = lowerTerminus.end_station_name;
      this.upperTerminusName = upperTerminus.end_station_name;

      this.completeLowerTerminusName = lowerTerminus.complete_end_station_name;
      this.completeUpperTerminusName = upperTerminus.complete_end_station_name;

      if(this.itemData.current_station_name === 'South View' || this.itemData.current_station_name === 'Keat Hong' || this.itemData.current_station_name === 'Teck Whye') {
        this.itemData.next_station.reverse();
      }

      let prev;
      let next;

      if(this.lowerTerminusName === this.upperTerminusName) {
        prev = this.itemData.next_station[1];
        next = this.itemData.next_station[0];
      } else {
        prev = this.findNextStationByTerminusName(lowerTerminus.end_station_name, this.itemData.next_station);
        next = this.findNextStationByTerminusName(upperTerminus.end_station_name, this.itemData.next_station);
      }

      this.setStationDataList('station', prev, next);
    } else if(this.terminusOrder.length === 2 && this.itemData.next_station.length === 1) {
      const [lowerTerminus, upperTerminus] = this.terminusOrder;

      this.lowerTerminusName = lowerTerminus.end_station_name;
      this.upperTerminusName = upperTerminus.end_station_name;

      this.completeLowerTerminusName = lowerTerminus.complete_end_station_name;
      this.completeUpperTerminusName = upperTerminus.complete_end_station_name;

      if(this.itemData.current_station_name === this.terminusOrder[0].end_station_name) {
        this.setStationDataList('station', null, this.itemData.next_station[0])
      }
      if(this.itemData.current_station_name === this.terminusOrder[1].end_station_name) {
        this.setStationDataList('station', this.itemData.next_station[0], null)
      }
    } else if(this.terminusOrder.length === 2 && this.itemData.next_station.length === 3) {
      const [prev, next, branch] = this.itemData.next_station;

      this.lowerTerminusName = this.terminusOrder[0].end_station_name;
      this.upperTerminusName = this.terminusOrder[0].end_station_name;
      this.branchTerminusName = this.terminusOrder[0].end_station_name;

      this.completeLowerTerminusName = this.terminusOrder[0].end_station_name;
      this.completeUpperTerminusName = this.terminusOrder[0].end_station_name;
      this.completeBranchTerminusName = this.terminusOrder[0].end_station_name;

      this.setStationDataList('station', prev, next)
      this.setStationDataList('branch', null, branch);
    } else if(this.itemData.current_station_name === 'Bahar Junction') {
      const [upperTerminus, lowerTerminus, branchTerminus] = this.terminusOrder;
        
      this.lowerTerminusName = lowerTerminus.end_station_name;
      this.upperTerminusName = upperTerminus.end_station_name;
      this.branchTerminusName = branchTerminus.end_station_name;

      this.completeLowerTerminusName = lowerTerminus.complete_end_station_name;
      this.completeUpperTerminusName = upperTerminus.complete_end_station_name;
      this.completeBranchTerminusName = branchTerminus.complete_end_station_name;

      const prev = this.findNextStationByTerminusName(this.lowerTerminusName, this.itemData.next_station);
      const next = this.findNextStationByTerminusName(this.upperTerminusName, this.itemData.next_station);
      const branch = this.findNextStationByTerminusName(this.branchTerminusName, this.itemData.next_station);

      this.setStationDataList('station', prev, next)
      this.setStationDataList('branch', null, branch);
    } else if(this.terminusOrder.length === 3 && this.itemData.next_station.length === 3) {
      const [upperTerminus, lowerTerminus, branchTerminus] = this.terminusOrder;
      const result: any[] = Object.values(
        this.itemData.next_station.reduce((acc: Record<string, any>, curr: any) => {
          acc[curr.next_station_name] ??= {
            next_station_name: curr.next_station_name,
            next_station_code: curr.next_station_code,
            next_station_id: curr.next_station_id,
            end_station_name: []
          };
          acc[curr.next_station_name].end_station_name.push(curr.end_station_name);
          return acc;
        }, {})
      );

      let prev;
      let next;

      if(result[1].end_station_name.length === 1 && result[1].end_station_name[0] === upperTerminus.end_station_name) {
        prev = result[0];
        next = result[1];
        prev.end_station_name = prev.end_station_name[0] + ", " + prev.end_station_name[1];
        next.end_station_name = next.end_station_name[0];
      } else {
        prev = result[1];
        next = result[0];
        if(prev.end_station_name.length === 1) {
          prev.end_station_name = prev.end_station_name[0];
          next.end_station_name = next.end_station_name[0] + ", " + next.end_station_name[1];
        } else {
          prev.end_station_name = prev.end_station_name[0] + ", " + prev.end_station_name[1];
          next.end_station_name = next.end_station_name[0];
        }
      }
      this.lowerTerminusName = prev.end_station_name;
      this.upperTerminusName = next.end_station_name;

      this.completeLowerTerminusName = this.lowerTerminusName;
      this.completeUpperTerminusName = this.upperTerminusName;
      this.setStationDataList('station', prev, next)
    } else if(this.terminusOrder.length === 3 && this.itemData.next_station.length === 2) {
      const [upperTerminus, lowerTerminus, branchTerminus] = this.terminusOrder;
      const result: any[] = Object.values(
        this.itemData.next_station.reduce((acc: Record<string, any>, curr: any) => {
          acc[curr.next_station_name] ??= {
            next_station_name: curr.next_station_name,
            next_station_code: curr.next_station_code,
            next_station_id: curr.next_station_id,
            end_station_name: []
          };
          acc[curr.next_station_name].end_station_name.push(curr.end_station_name);
          return acc;
        }, {})
      );
      if(this.itemData.current_station_name === lowerTerminus.end_station_name) {
        this.lowerTerminusName = this.itemData.current_station_name;
        this.upperTerminusName = result[0].end_station_name[0] + ", " + result[0].end_station_name[1];
        this.completeLowerTerminusName = this.lowerTerminusName;
        this.completeUpperTerminusName = this.upperTerminusName;
        this.setStationDataList('station', null, result[0]);
      } else {
        this.lowerTerminusName = result[0].end_station_name[0] + ", " + result[0].end_station_name[1];
        this.upperTerminusName = this.itemData.current_station_name;
        this.completeLowerTerminusName = this.lowerTerminusName;
        this.completeUpperTerminusName = this.upperTerminusName;
        this.setStationDataList('station', result[0], null)
      }
    }
  }

  setLineOrder() {
    this.stationDataList.forEach((station: any, index: number) => {
      if(station.station_name === this.completeLowerTerminusName && station.station_code !== 'STC' && station.station_code !== 'PTC' && station.station_code !== 'BP6') {
        this.lineDataList.push(null);
        this.lineDataList.push('solid');
      } else if(station.station_name === this.completeUpperTerminusName && station.station_code !== 'STC' && station.station_code !== 'PTC' && station.station_code !== 'BP6') {
        this.lineDataList.push('solid');
        this.lineDataList.push(null);
      } else if(station.station_name) {
        if(index === 0) {
          this.lineDataList.push('dashed-leading');
          this.lineDataList.push('solid');
        } else if(index === 2) {
          this.lineDataList.push('solid');
          this.lineDataList.push('dashed-trailing');
        } else {
          this.lineDataList.push('solid');
          this.lineDataList.push('solid');
        }
      } else {
        this.lineDataList.push(null);
        this.lineDataList.push(null);
      }
    })
  }

  setBranchLineOrder() {
    this.branchLineDataList.push('curve');
    this.branchLineDataList.push('dashed-trailing');
  }

  findNextStationByTerminusName(stationTerminusName: string, nextStationData: any) {
    return nextStationData.find((station: any) => {
      return station.end_station_name === stationTerminusName;
    })
  }

  setStationDataList(dataListType: string, prev: any, next: any) {
    switch(dataListType) {
      case 'station': {
        this.stationDataList.push(
          {
            station_name: (prev) ? prev.next_station_name : null,
            station_code: (prev) ? prev.next_station_code : null,
            station_id: (prev) ? prev.next_station_id : null
          },
          {
            station_name: this.itemData.current_station_name,
            station_code: this.itemData.current_station_code,
            station_id: null
          },
          {
            station_name: (next) ? next.next_station_name : null,
            station_code: (next) ? next.next_station_code : null,
            station_id: (next) ? next.next_station_id : null
          }
        )
        break;
      }
      case 'branch': {
        this.branchStationDataList.push(
          {
            station_name: (prev) ? prev.next_station_name : null,
            station_code: (prev) ? prev.next_station_code : null,
            station_id: (prev) ? prev.next_station_id : null
          },
          {
            station_name: null,
            station_code: null,
            station_id: null
          },
          {
            station_name: (next) ? next.next_station_name : null,
            station_code: (next) ? next.next_station_code : null,
            station_id: (next) ? next.next_station_id : null,
          }
        )
        break;
      }
    }
  }

  getTerminus(position: string) {
    switch(position) {
      case 'prev':
        return this.lowerTerminusName;
      case 'next':
        return this.upperTerminusName;
      case 'branch':
        return this.branchTerminusName;
    }
    return;
  }

  getColor() {
    return 'var(--' + this.lineColor + ')';
  }

  getColorHex() {
    switch(this.lineColor) {
      case 'cyan': 
        return '#01ACBD';
      case 'grey': 
        return '#718573';
      default:
        return;
    }
  }
}
