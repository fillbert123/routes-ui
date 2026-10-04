import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FigureItemComponent } from "../figure-item/figure-item.component";
import { Status } from '../../../util/type.util';

@Component({
  selector: 'component-figure-route',
  standalone: true,
  imports: [NgStyle, FigureItemComponent],
  templateUrl: './figure-route.component.html',
  styleUrl: './figure-route.component.scss'
})
export class FigureRouteComponent {
  @Input() status!: Status;
  @Input() color: string | any;
  @Input() isBranching: boolean | any;
  @Input() currentStationData: any;
  @Input() previousStationData: any;
  @Input() nextStationData: any;
  
  arrangedFigureRouteLine() {
    let arrangedLine: any = [];
    if(!this.isBranching) {
      if(!this.previousStationData) {
        arrangedLine = this.addTwoElementToArray(arrangedLine, 'empty', 'empty');
      } else if(this.previousStationData.terminus.id.includes(this.previousStationData.id)) {
        arrangedLine = this.addTwoElementToArray(arrangedLine, 'empty', 'solid');
      } else {
        arrangedLine = this.addTwoElementToArray(arrangedLine, 'leading', 'solid');
      }
      if(!this.previousStationData) {
        arrangedLine = this.addTwoElementToArray(arrangedLine, 'empty', 'solid');
      } else if(!this.nextStationData) {
        arrangedLine = this.addTwoElementToArray(arrangedLine, 'solid', 'empty');
      } else {
        arrangedLine = this.addTwoElementToArray(arrangedLine, 'solid', 'solid');
      }
      if(!this.nextStationData) {
        arrangedLine = this.addTwoElementToArray(arrangedLine, 'empty', 'empty');
      } else if(this.nextStationData.terminus.id.includes(this.nextStationData.id)) {
        arrangedLine = this.addTwoElementToArray(arrangedLine, 'solid', 'empty');
      } else {
        arrangedLine = this.addTwoElementToArray(arrangedLine, 'solid', 'trailing');
      }
    } else if(this.isBranching) {
      arrangedLine = this.addTwoElementToArray(arrangedLine, 'branch', 'trailing');
    }
    return arrangedLine;
  }

  addTwoElementToArray(array: any, firstItem: string, secondItem: string): any {
    array.push(firstItem);
    array.push(secondItem);
    return array;
  }

  getColor() {
    return(`var(--${this.color})`);
  }

  getColorHex() {
    switch(this.color) {
      case 'cyan': 
        return '#01ACBD';
      case 'grey': 
        return '#718573';
      default:
        return;
    }
  }
}
