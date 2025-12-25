import { Component } from '@angular/core';
import { MainComponent } from "./stage/main/main.component";
import { SubjectService } from './service/shared/subject.service';
import { RouteComponent } from "./stage/route/route.component";
import { StationComponent } from './stage/station/station.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainComponent, RouteComponent, StationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'routes-ui';
  currentStage: string = 'main';
  lineColor: string = '';
  itemData: any;

  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.subjectService.data$.subscribe(value => {
      if (value) {
        this.currentStage = value.nextStage;
        this.lineColor = value.lineColor;
        this.itemData = value.itemData;
      }
    });
  }
}
