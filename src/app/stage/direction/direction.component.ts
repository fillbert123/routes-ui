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
  @Input() stationId: number = 0;
  destinationData: any;
  fetchStationDataStatus: 'active' | 'loading' = 'loading';
  fetchStationListStatus: 'active' | 'loading' = 'loading';
  findDirectionStatus: 'active' | 'loading' | 'error' | 'invalid' = 'active';
  currentActive: 'origin' | 'destination' | null = null;
  stationData: any = null;
  searchResultData: any = null;
  directionData: any = {
    origin: null,
    destination: null
  }
  directionResultData: any;

  constructor(private routeService: RouteService) { };

  ngOnChanges() {
    this.fetchStationData(this.stationId);
  }

  handleSearchQueryUpdate(event: string) {
    this.fetchSearchResult(event);
  }

  fetchStationData(stationId: number) {
    this.fetchStationDataStatus = 'loading';
    this.stationData = null;
    this.routeService.getStationById(stationId).subscribe({
      next: (res) => {
        this.stationData = res;
        this.setDirectionData();
      },
      error: (err) => {
        console.log('error', err);
      }
    })
  }

  setDirectionData() {
    if (this.currentActive === 'origin') {
      this.directionData = {
        ...this.directionData,
        origin: this.stationData
      };
    } else {
      this.directionData = {
        ...this.directionData,
        destination: this.stationData
      };
    }
    this.searchResultData = null;
    if(this.directionData.origin && this.directionData.destination) {
      this.findDirection();
    }
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
    if(this.directionData.origin.id === this.directionData.destination.id) {
      this.findDirectionStatus = 'invalid'
    } else {
      this.findDirectionStatus = 'loading';
      this.routeService.getDirectionResult(this.directionData.origin.id, this.directionData.destination.id).subscribe({
        next: (res) => {
          res.path = this.addTransferDetail(res.path);
          this.directionResultData = res;
          this.findDirectionStatus = 'active';
        },
        error: (err) => {
          this.findDirectionStatus = 'error'
          console.log('error', err);
        }
      })
    }
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
    this.findDirection();
  }

  addTransferDetail(path: any) {
    let tempData: { type: string; prevLineColor: string; nextLineColor: string; transferToColor: any; transferToName: any; transferToCode: any; transferFromColor: any; transferFromName: any; transferFromCode: any; }[] = [];
    path.forEach((data: any, index: number) => {
      tempData.push(data);
      if(path[index]?.nextLineColor === 'white' && path[index + 1]?.prevLineColor === 'white') {
        tempData.push({
          'type': 'transfer',
          'prevLineColor': 'white',
          'nextLineColor': 'white',
          'transferToColor': path[index + 1].nextLineColor,
          'transferToName': path[index + 1].routeGroupName,
          'transferToCode': path[index + 1].routeGroupCode,
          'transferFromColor': path[index].prevLineColor,
          'transferFromName': path[index].routeGroupName,
          'transferFromCode': path[index].routeGroupCode,
        })
      }
    })
    return tempData;
  }
}
