import { Component } from '@angular/core';
import { SubjectService } from '../../service/shared/subject.service';
import { LineComponent } from "../../stage/line/line.component";
import { RouteComponent } from "../../stage/route/route.component";
import { StationComponent } from "../../stage/station/station.component";
import { SearchComponent } from "../../stage/search/search.component";
import { SearchBarComponent } from "../../component/search-bar/search-bar.component";
import { isMobile } from '../../util/display.util';

@Component({
  selector: 'component-side-panel',
  standalone: true,
  imports: [
    LineComponent, RouteComponent, StationComponent, SearchComponent, SearchBarComponent,
  ],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent {
  currentStage: 'line' | 'routeGroup' | 'station' | 'documentation' | 'search' = 'line';
  currentId: any = '';
  breadcrumbs: any = [];

  isMobile = isMobile;
  
  constructor(private subjectService: SubjectService) {}

  ngOnInit() {
    this.subjectService.data$.subscribe(value => {
      if(value) {
        if(value.action === 'back') {
          this.breadcrumbs.pop();
          if(this.breadcrumbs.length === 0) {
            this.currentId = '';
            this.currentStage = 'line';
          } else {
            this.currentId = this.breadcrumbs[this.breadcrumbs.length - 1].id;
            this.currentStage = this.breadcrumbs[this.breadcrumbs.length - 1].stage;
          }
        } else if(value.action === 'search') {
          this.currentId = value.data;
          this.currentStage = 'search';
          this.breadcrumbs.push({
            'stage': 'search',
            'id': this.currentId
          })
        } else {
          if(value.to) {
            if(value.to === 'line') {
              this.currentId = '';
              this.currentStage = value.to;
              this.breadcrumbs = [];
            } else {
              this.currentId = value.data;
              this.currentStage = value.to;
              this.breadcrumbs.push({
                'stage': this.currentStage,
                'id': this.currentId
              })
            }
          } else {
            switch(this.currentStage) {
              case 'line':
                this.currentId = value.data;
                this.currentStage = 'routeGroup';
                this.breadcrumbs.push({
                  'stage': 'route',
                  'id': this.currentId
                });
                break;
              case 'routeGroup':
                this.currentId = value.data;
                this.currentStage = 'station';
                this.breadcrumbs.push({
                  'stage': 'station',
                  'id': this.currentId
                });
                break;
              case 'station':
                this.currentId = value.data;
                this.currentStage = 'station';
                this.breadcrumbs.push({
                  'stage': 'station',
                  'id': this.currentId
                })
                break;
            }
          }
        }
      }
    });
  }
}
