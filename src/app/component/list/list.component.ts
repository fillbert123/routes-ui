import { Component, Input } from '@angular/core';
import { ListItemComponent } from "./list-item/list-item.component";
import { BadgeComponent } from "../badge/badge.component";
import { NgStyle } from '@angular/common';
import { FigureComponent } from "../figure/figure.component";

@Component({
  selector: 'component-list',
  standalone: true,
  imports: [ListItemComponent, BadgeComponent, NgStyle, FigureComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input() kind!: 'routeGroup' | 'station' | 'figure' | 'search' | 'directionStation' | 'directionResult';
  @Input() status!: 'active' | 'loading';
  @Input() listHeader!: boolean;
  @Input() headerCode: string | any;
  @Input() headerName: string | any;
  @Input() color: string | any;
  @Input() listData: any;
  @Input() isSearch: boolean = false;
  
  getColor() {
    if(this.status === 'loading') {
      return('var(--semiwhite)');
    }
    if(!this.color) {
      return('var(--primary)');
    }
    return(`var(--${this.color})`);
  }

  getType(isFirst: boolean, isLast: boolean) {
    if(isFirst) {
      return 'leading';
    }
    if(isLast) {
      return 'trailing';
    }
    return 'standard';
  }
}
