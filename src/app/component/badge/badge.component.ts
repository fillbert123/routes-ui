import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class BadgeComponent {
  @Input() badgeType: string = "";
  @Input() badgeText: string = "";
  @Input() badgeIsActive: boolean = true;
  @Input() lineColor: string = "";
  @Input() stationData: any;
  formattedTrack: any = []

  ngOnChanges(changes: SimpleChanges) {
    if(this.badgeType === 'stations' && changes['stationData']) {
      this.setFormattedTrack();
    }
  }

  setFormattedTrack() {
    if(this.stationData) {
      this.stationData.forEach((line: any) => {
        let lineColor = line.line_color;
        line.track.forEach((track: any) => {
          track['line_color'] = lineColor;
          this.formattedTrack.push(track);
        })
      })
    }
  }

  getColor(color: string) {
    return 'var(--' + color + ')';
  }
}
