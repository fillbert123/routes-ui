import { Component, Input } from '@angular/core';
import { BadgeComponent } from "../../badge/badge.component";
import { AtomicComponent } from "../../atomic/atomic.component";
import { SubjectService } from '../../../service/shared/subject.service';
import { ButtonComponent } from '../../button/button.component';
import { subjectEmitData } from '../../../util/interface.util';
import { ActionService } from '../../../service/shared/action.service';

@Component({
  selector: 'component-list-item',
  standalone: true,
  imports: [BadgeComponent, AtomicComponent, ButtonComponent],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {
  @Input() kind!: 'routeGroup' | 'station' | 'directionStation' | 'transfer';
  @Input() status!: 'active' | 'inactive' | 'loading';
  @Input() type: 'standard' | 'single' | 'leading' | 'middle' | 'trailing' | any;
  @Input() color: string | any;
  @Input() itemListData: any;
  @Input() isSearch: boolean = false;
  @Input() isClickable: boolean = true;
  badgeData: any = [];

  constructor(private subjectService: SubjectService, private actionService: ActionService) { }

  ngOnInit() {
    if(this.isSearch) {
      this.setBadgeData();
    }
  }

  getRouteName() {
    let routeName = "";
    if(this.itemListData.via) {
      routeName = this.itemListData.terminus[0];
    } else if(this.itemListData.id === 6) {
      routeName = 'Clockwise or Anticlockwise service'
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

  getColor() {
    if(this.color) {
      return this.color;
    } else {
      if(!this.itemListData.prevLineColor || this.itemListData.prevLineColor === 'white') {
        return this.itemListData.nextLineColor;
      }
      return this.itemListData.prevLineColor;
    }
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

  emitItem(nextTo: string) {
    const actionTo: string = (nextTo === 'routeGroup') ? this.kind : nextTo;
    const actionData: any = (nextTo === 'routeGroup' || nextTo === 'direction') ? this.itemListData.id : this.itemListData;
    if(this.isClickable) {
      this.actionService.navigate(actionTo, actionData);
    }
  }
}
