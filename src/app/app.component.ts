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
      points: 6,
      graphs: 2,
      splines: 10,
      overshoot: 0.7,
      margin: {
        spline: 50,
        entry: 5,
        canvas: {
          x: 20,
          y: 20
        }
      },
      vector: {
        in: {
          tension: 0.3,
          direction: 0.25
        },
        out: {
          tension: 0.3,
          direction: 1
        }
      },
      stroke: {
        width: 1.2,
        colors: ['#F8485E', '#5CC0C7'],
      },
      animation: {
        enabled: false,
        amplitude: 20,
        frequency: 10,
        fps: 30,
        ticks: 4000
      },
      debug: false
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
