import { Component } from '@angular/core';
import { MainComponent } from "./stage/main/main.component";
import { SubjectService } from './service/shared/subject.service';
import { RouteComponent } from "./stage/route/route.component";
import { StationComponent } from './stage/station/station.component';
import { ButtonComponent } from './component/button/button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainComponent, RouteComponent, StationComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'routes-ui';
  currentStage: string = 'main';
  lineColor: string = '';
  routeStageData: any;
  stationStageData: any;

  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.subjectService.data$.subscribe(value => {
      if (value) {
        this.currentStage = value.nextStage;
        this.lineColor = value.lineColor;
        switch(value.nextStage) {
          case 'route':
            this.routeStageData = value.itemData;
            break;
          case 'station':
            this.stationStageData = value.itemData;
            break;
        }
      }
    });
  }

  handleBackNavigation() {
    switch(this.currentStage) {
      case 'station':
        this.currentStage = 'route';
        break;
      case 'route':
        this.currentStage = 'main';
        break;
    }
  }

  isOnMainStage() {
    return (this.currentStage === 'main')
  }
}
