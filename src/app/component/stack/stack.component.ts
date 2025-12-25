import { Component, Input } from '@angular/core';
import { ContainerComponent } from "../container/container.component";

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [ContainerComponent],
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.scss'
})
export class StackComponent {
  @Input() stackType!: string;
  @Input() stackData: any = [];
}
