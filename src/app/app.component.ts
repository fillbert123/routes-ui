import { Component } from '@angular/core';
import { SubjectService } from './service/shared/subject.service';
import { SidePanelComponent } from "./component/side-panel/side-panel.component";
import { isMobile } from './util/display.util';
import { ɵEmptyOutletComponent } from "@angular/router";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidePanelComponent, ɵEmptyOutletComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'routes-ui';

  isMobile = isMobile;

  constructor(private subjectService: SubjectService) {}
}
