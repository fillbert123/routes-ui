import { Component, Input } from '@angular/core';
import { RouteService } from '../../service/api/route.service';
import { DirectionBarComponent } from "../../component/direction-bar/direction-bar.component";
import { ListComponent } from "../../component/list/list.component";
import { ButtonComponent } from '../../component/button/button.component';
import { StateComponent } from '../../component/state/state.component';

@Component({
  selector: 'stage-direction',
  standalone: true,
  imports: [DirectionBarComponent, ListComponent, ButtonComponent, StateComponent],
  templateUrl: './direction.component.html',
  styleUrl: './direction.component.scss'
})
export class DirectionComponent {
  @Input() destinationData: any;
  fetchStationListStatus: 'active' | 'loading' = 'loading';
  findDirectionStatus: 'active' | 'loading' | 'error' = 'active';
  currentActive: 'origin' | 'destination' | null = null;
  searchResultData: any = null;
  directionData: any = {
    origin: null,
    destination: null
  }
  isDirectable: boolean = false;
  directionResultData: any;

  constructor(private routeService: RouteService) { };

  ngOnChanges() {
    if (this.currentActive === 'origin') {
      this.directionData = {
        ...this.directionData,
        origin: this.destinationData
      };
    } else {
      this.directionData = {
        ...this.directionData,
        destination: this.destinationData
      };
    }
    this.searchResultData = null;
    if(this.directionData.origin && this.directionData.destination) {
      this.isDirectable = true;
    }
  }

  handleSearchQueryUpdate(event: string) {
    this.fetchSearchResult(event);
  }

  fetchSearchResult(query: string) {
    this.fetchStationListStatus = 'loading';
    this.searchResultData = null;
    this.routeService.getSearchResult(query).subscribe({
      next: (res) => {
        this.searchResultData = res;
        this.fetchStationListStatus = 'active';
      },
      error: (err) => {
        console.log('error', err);
      }
    })
  }
  
  setActiveField(event: 'origin' | 'destination' | null) {
    this.currentActive = event;
  }

  findDirection() {
    this.findDirectionStatus = 'loading';
    this.routeService.getDirectionResult(this.directionData.origin.id, this.directionData.destination.id).subscribe({
      next: (res) => {
        this.directionResultData = res;
        this.findDirectionStatus = 'active';
      },
      error: (err) => {
        this.findDirectionStatus = 'error'
        console.log('error', err);
      }
    })
  }

  getHeaderName() {
    return `${this.directionResultData.path[0].name} to ${this.directionResultData.path[this.directionResultData.path.length - 1].name} (${this.directionResultData.duration} min)`;
  }

  reverseDirection() {
    let newDirectionData: any = {
      origin: this.directionData.destination,
      destination: this.directionData.origin
    }
    this.directionData = newDirectionData;
  }
}
