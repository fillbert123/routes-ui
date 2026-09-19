import { Component } from '@angular/core';
import { SubjectService } from '../../service/shared/subject.service';
import { LineComponent } from "../../stage/line/line.component";
import { RouteComponent } from "../../stage/route/route.component";
import { StationComponent } from "../../stage/station/station.component";
import { SearchComponent } from "../../stage/search/search.component";
import { SearchBarComponent } from "../../component/search-bar/search-bar.component";
import { DirectionComponent } from '../../stage/direction/direction.component';
import { isMobile } from '../../util/display.util';
import { DocumentationComponent } from "../../stage/documentation/documentation.component";
import { Stage } from '../../util/type.util';

@Component({
  selector: 'component-side-panel',
  standalone: true,
  imports: [
    LineComponent, RouteComponent, StationComponent, SearchComponent, SearchBarComponent, DirectionComponent,
    DocumentationComponent
],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent {
  currentStage: Stage = 'line';
  currentId: any = '';
  breadcrumbs: any = [];

  isMobile = isMobile;
  
  constructor(private subjectService: SubjectService) {}

  ngOnInit() {
    this.subjectService.data$.subscribe(value => {
      if(value) {
        switch(value.action) {
          case 'back':
            this.doBackAction();
            break;
          case 'search':
            this.doSearchAction(value);
            break;
          case 'navigate':
            this.doNavigateAction(value);
            break;
        }
      }
    });
  }

  doBackAction() {
    this.breadcrumbs.pop();
    if(this.breadcrumbs.length === 0) {
      this.setBackToLineStage();
    } else {
      this.setOneStepStageBack();
      if(this.currentStage === 'search') {
        this.doBackAction();
      }
    }
  }

  doSearchAction(value: any) {
    this.currentId = value.data;
    this.currentStage = 'search';
    this.breadcrumbs.push({
      'stage': 'search',
      'id': this.currentId
    })
  }

  doNavigateAction(value: any) {
    if(value.to === 'line') {
      this.setBackToLineStage();
    } else {
      this.setNavigateToStage(value.to, value.data);
    }
  }

  setNavigateToStage(to: Stage, data: any) {
    this.currentId = data;
    if(this.currentStage !== to) {
      this.currentStage = to;
      this.breadcrumbs.push({
        stage: this.currentStage,
        id: this.currentId
      })
    }
  }

  setBackToLineStage() {
    this.currentId = '';
    this.currentStage = 'line';
  }

  setOneStepStageBack() {
    this.currentId = this.breadcrumbs[this.breadcrumbs.length - 1].id;
    this.currentStage = this.breadcrumbs[this.breadcrumbs.length - 1].stage;
  }
}
