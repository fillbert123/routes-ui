import { Component, Input } from '@angular/core';
import { BadgeComponent } from "../badge/badge.component";
import { ListComponent } from "../list/list.component";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [BadgeComponent, ListComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {
  @Input() isLoading: boolean = true;
  @Input() containerHasTitle!: boolean;
  @Input() containerType!: string;
  @Input() containerData: any = {};

  getColor() {
    if(this.isLoading) {
      return 'var(--semiwhite)';
    }
    return 'var(--' + this.containerData.line_color + ')';
  }
}
