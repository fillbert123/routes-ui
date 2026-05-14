import { Component } from '@angular/core';
import { RouteService } from '../../service/api/route.service';
import { ListComponent } from "../../component/list/list.component";

@Component({
  selector: 'stage-line',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss'
})
export class LineComponent {
  status: 'active' | 'loading' = 'loading'; 
  lineData: any;

  constructor(private routeService: RouteService) { };

  ngOnInit() {
    this.fetchAllLine();
  }

  fetchAllLine() {
    this.status = 'loading';
    this.routeService.getAllLine().subscribe({
      next: (res) => {
        this.lineData = res;
        this.status = 'active';
      },
      error: (err) => {
        console.log('error', err);
      }
    })
  }
}
