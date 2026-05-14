import { Component, Input } from '@angular/core';
import { BadgeComponent } from "../../badge/badge.component";
import { AtomicComponent } from "../../atomic/atomic.component";
import { SubjectService } from '../../../service/shared/subject.service';

@Component({
  selector: 'component-list-item',
  standalone: true,
  imports: [BadgeComponent, AtomicComponent],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {
  @Input() kind!: 'routeGroup' | 'station';
  @Input() status!: 'active' | 'inactive' | 'loading';
  @Input() type: 'standard' | 'single' | 'leading' | 'middle' | 'trailing' | any;
  @Input() color: string | any;
  @Input() itemListData: any;
  @Input() isSearch: boolean = false;
  badgeData: any = [];

  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    if(this.isSearch) {
      this.setBadgeData();
    }
  }

  getRouteName() {
    let routeName = "";
    if(this.itemListData.via) {
      routeName = this.itemListData.terminus[0];
    } else {
      this.itemListData.terminus.forEach((terminus: string, index: number) => {
      if(index === 0) {
        routeName = terminus;
      } else {
        routeName = routeName + ' - ' + terminus;
      }
    })
    }
    return routeName;
  }

  getViaName() {
    let viaName = "";
    if(this.itemListData.via) {
      viaName = `via ${this.itemListData.via[0]} and ${this.itemListData.via[1]}`;
    }
    return viaName
  }

  setBadgeData() {
    this.badgeData = [];
    this.itemListData.interchange.forEach((station: any) => {
      this.badgeData.push({
        'status': (station.isActive) ? 'active' : 'inactive',
        'color': station.color,
        'label': station.code
      });
    });
  }

  emitItem() {
    this.subjectService.sendData({
      'action': 'navigate',
      'to': this.kind,
      'data': this.itemListData.id
    });
  }
}
