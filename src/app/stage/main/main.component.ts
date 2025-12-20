import { Component, OnInit } from '@angular/core';
import { StackComponent } from "../../component/stack/stack.component";
import { RouteService } from '../../service/api/route.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [StackComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{
  isLoading: boolean = false;
  mainData: any;

  constructor(private routeService: RouteService) { };

  ngOnInit(): void {
    this.fetchAllRoutesByLine();
  }

  fetchAllRoutesByLine() {
    this.isLoading = true;

    this.routeService.getAllRoutesByLine().subscribe({
      next: (res) => {
        this.mainData = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log('error', err);
        this.isLoading = false;
      }
    })
  }
}
