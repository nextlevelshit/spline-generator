import { Config } from './../../projects/nls-spline-generator/src/models/config.model';
import { Component } from '@angular/core';

@Component({
  selector: 'nls-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public config: Config;

  constructor() {
    this.config = {
      points: 2,
      graphs: 2,
      splines: 1,
      overshoot: 0.1,
      margin: {
        spline: 50,
        entry: 4,
        canvas: {
          x: 20,
          y: 20
        }
      },
      vector: {
        in: {
          tension: 0.3,
          direction: 1
        },
        out: {
          tension: 0.3,
          direction: 0
        }
      },
      stroke: {
        width: 1.2,
        colors: ['#F8485E', '#5CC0C7'],
      },
      animation: {
        enabled: false,
        amplitude: 20,
        frequency: 8,
        fps: 30,
        ticks: 5000
      },
      debug: true
    };
  }

  public toggleAnimation(): void {
    this.config = {
      ...this.config,
      animation: {
        enabled: !this.config.animation.enabled
      }
    };
  }
}
