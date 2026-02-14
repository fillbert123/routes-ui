import { Component } from '@angular/core';
import { MainComponent } from "./stage/main/main.component";
import { SubjectService } from './service/shared/subject.service';
import { RouteComponent } from "./stage/route/route.component";
import { StationComponent } from './stage/station/station.component';
import { ButtonComponent } from './component/button/button.component';
import { SearchComponent } from './component/search/search.component';
import { SearchStage } from './stage/search/search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainComponent, RouteComponent, StationComponent, ButtonComponent, SearchComponent, SearchStage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'routes-ui';
  currentStage: string = 'main';
  lineColor: string = '';
  routeStageData: any;
  stationStageData: any;
  searchStageData: any;
  isNavigatedFromSearch: boolean = false;
  beforeSearchStage: string = '';

  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.subjectService.data$.subscribe(value => {
      if (value) {
        if(this.currentStage !== value.nextStage) {
          this.lineColor = value.lineColor;
        }
        this.currentStage = value.nextStage;
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
    if(this.isNavigatedFromSearch) {
      this.currentStage = this.beforeSearchStage;
      this.isNavigatedFromSearch = false;
    } else {
      switch(this.currentStage) {
        case 'station':
          this.currentStage = 'route';
          break;
        case 'route':
          this.currentStage = 'main';
          break;
        case 'search':
          this.currentStage = 'main';
          break;
      }
    }
  }

  isOnMainStage() {
    return (this.currentStage === 'main')
  }

  handleSearchStation(result: any) {
    this.isNavigatedFromSearch = true;
    this.searchStageData = result;
    if(this.currentStage !== 'search') {
      this.beforeSearchStage = this.currentStage;
    }
    this.currentStage = 'search';
  }

  handleClearSearch() {
    this.isNavigatedFromSearch = false;
    this.currentStage = this.beforeSearchStage;
  }
}
