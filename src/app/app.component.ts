import { Component, ElementRef, ViewChild, afterNextRender } from '@angular/core';
import { SubjectService } from './service/shared/subject.service';
import { SidePanelComponent } from "./component/side-panel/side-panel.component";
import { isMobile } from './util/display.util';
import { ɵEmptyOutletComponent } from "@angular/router";
import { SystemMapComponent } from "./component/system-map/system-map.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidePanelComponent, ɵEmptyOutletComponent, SystemMapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'routes-ui';

  isMobile = isMobile;

  @ViewChild('mapScroll')
  mapScroll!: ElementRef<HTMLDivElement>

  constructor(private subjectService: SubjectService) {
    afterNextRender(() => {
      this.mapScroll.nativeElement.scrollTop = 1300;
      this.mapScroll.nativeElement.scrollLeft = 1200;
    });
  }
}
