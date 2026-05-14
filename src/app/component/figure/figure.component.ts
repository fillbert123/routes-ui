import { Component, Input } from '@angular/core';
import { FigureHeaderComponent } from "./figure-header/figure-header.component";
import { FigureRouteComponent } from "./figure-route/figure-route.component";

@Component({
  selector: 'component-figure',
  standalone: true,
  imports: [FigureHeaderComponent, FigureRouteComponent],
  templateUrl: './figure.component.html',
  styleUrl: './figure.component.scss'
})
export class FigureComponent {
  @Input() color: string | any;
  @Input() status!: 'active' | 'loading';
  @Input() routeGroupData!: any;

  isBranching() {
    return (this.routeGroupData?.branchStation);
  }
}
