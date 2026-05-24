import { Component, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'component-zoom-control',
  standalone: true,
  imports: [ButtonComponent, FormsModule],
  templateUrl: './zoom-control.component.html',
  styleUrl: './zoom-control.component.scss'
})
export class ZoomControlComponent {
  @Output() updateZoomLevel = new EventEmitter<any>;
  zoomLevel: number = 1;
  zoomIncrement: number = 0.1;
  maxZoom: number = 2;
  minZoom: number = 0.5;

  changeZoom(event: any) {
    this.updateZoomLevel.emit(event);
  }

  zoomIn() {
    if(this.zoomLevel <= this.maxZoom - this.zoomIncrement) {
      this.zoomLevel += this.zoomIncrement;
    } else if(this.zoomLevel < this.maxZoom && this.zoomLevel > this.maxZoom - this.zoomIncrement) {
      this.zoomLevel = this.maxZoom;
    }
    this.changeZoom(this.zoomLevel);
  }

  zoomOut() {
    if(this.zoomLevel >= this.minZoom + this.zoomIncrement) {
      this.zoomLevel -= this.zoomIncrement;
    } else if(this.zoomLevel > this.minZoom && this.zoomLevel < this.minZoom + this.zoomIncrement) {
      this.zoomLevel = this.minZoom;
    }
    this.changeZoom(this.zoomLevel);
  }
}
