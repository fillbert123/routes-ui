import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FigureItemComponent } from "../figure-item/figure-item.component";

@Component({
  selector: 'component-figure-route',
  standalone: true,
  imports: [NgStyle, FigureItemComponent],
  templateUrl: './figure-route.component.html',
  styleUrl: './figure-route.component.scss'
})
export class FigureRouteComponent {
  @Input() status!: 'active' | 'loading';
  @Input() color: string | any;
  @Input() isBranching: boolean | any;
  @Input() currentStationData: any;
  @Input() previousStationData: any;
  @Input() nextStationData: any;
  
  arrangedFigureRouteLine() {
    let arrangedLine = [];
    if(!this.isBranching) {
      if(!this.previousStationData) {
        arrangedLine.push('empty');
        arrangedLine.push('empty')
      } else if(this.previousStationData.terminus.id.includes(this.previousStationData.id)) {
        arrangedLine.push('empty');
        arrangedLine.push('solid');
      } else {
        arrangedLine.push('leading');
        arrangedLine.push('solid');
      }
      if(!this.previousStationData) {
        arrangedLine.push('empty');
        arrangedLine.push('solid');
      } else if(!this.nextStationData) {
        arrangedLine.push('solid');
        arrangedLine.push('empty');
      } else {
        arrangedLine.push('solid');
        arrangedLine.push('solid');
      }
      if(!this.nextStationData) {
        arrangedLine.push('empty');
        arrangedLine.push('empty')
      } else if(this.nextStationData.terminus.id.includes(this.nextStationData.id)) {
        arrangedLine.push('solid');
        arrangedLine.push('empty');
      } else {
        arrangedLine.push('solid');
        arrangedLine.push('trailing');
      }
    } else if(this.isBranching) {
      arrangedLine.push('branch');
      arrangedLine.push('trailing');
    }
    
    return arrangedLine;
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
