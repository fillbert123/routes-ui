import { Component, ElementRef, ViewChild, afterNextRender } from '@angular/core';
import { SubjectService } from './service/shared/subject.service';
import { SidePanelComponent } from "./component/side-panel/side-panel.component";
import { ZoomControlComponent } from './component/zoom-control/zoom-control.component';
import { isMobile } from './util/display.util';
import { ɵEmptyOutletComponent } from "@angular/router";
import { SystemMapComponent } from "./component/system-map/system-map.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidePanelComponent, ɵEmptyOutletComponent, SystemMapComponent, ZoomControlComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'routes-ui';

  isMobile = isMobile;
  scrollTo: any = [1820, 1320];
  zoomLevel!: number;

  @ViewChild('mapScroll')
  mapScroll!: ElementRef<HTMLDivElement>

  constructor(private subjectService: SubjectService) {
    afterNextRender(() => {
      this.mapScroll.nativeElement.scrollLeft = this.scrollTo[0];
      this.mapScroll.nativeElement.scrollTop = this.scrollTo[1];
    });
  }

  handleZoomUpdate(zoomLevel: any) {
    this.zoomLevel = zoomLevel;
  }
}
