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
      splines: 13,
      overshoot: 0.6,
      margin: {
        spline: 30,
        entry: 4,
        canvas: {
          x: 20,
          y: 20
        }
      },
      vector: {
        in: {
          tension: 0.3,
        },
        out: {
          tension: 0.3
        }
      },
      stroke: {
        width: 1.2,
        colors: ['#79B4A9', '#9CC69B'],
      },
      animation: {
        enabled: false,
        amplitude: 30,
        frequency: 18,
        fps: 30
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
