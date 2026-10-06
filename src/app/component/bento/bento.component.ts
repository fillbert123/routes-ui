import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'component-bento',
  standalone: true,
  imports: [NgStyle, IconComponent],
  templateUrl: './bento.component.html',
  styleUrl: './bento.component.scss'
})
export class BentoComponent {
  @Input() info: any;
  @Input() directionData: any;
  @Input() resultData: any;

  getValue(name: string) {
    switch(name) {
      case 'origin':
        return this.directionData.origin.name;
      case 'destination':
        return this.directionData.destination.name;
      case 'totalDuration':
        return `${this.resultData[name]} min`;
      case 'totalTransfer':
        return (this.resultData[name] === 0) ? 'Direct' : `${this.resultData[name]}×`;
      case 'totalStation':
        return `${this.resultData[name]} station`;
      default:
        return null;
    }
  }

  getRowPadding(isFirst: boolean, isLast: boolean) {
    if(isFirst) {
      return '0 0 12px 0';
    }
    if(isLast) {
      return '12px 0 0 0';
    }
    return '12px 0';
  }

  getColumnPadding(isFirst: boolean, isLast: boolean) {
    if(isFirst) {
      return '0 12px 0 0';
    }
    if(isLast) {
      return '0 0 0 12px';
    }
    return '0 12px';
  }

  getWidth(proportion: number, noItemInRow: number) {
    return `calc((100% - ${(noItemInRow - 1) * 24}px) * ${proportion} / 100)`;
  }

  getBorder(isFirst: boolean, isLast: boolean) {
    if(isFirst && isLast) {
      return null;
    }
    if(!isLast) {
      return `1px solid var(--transparent)`;
    }
    return null;
  }
}
