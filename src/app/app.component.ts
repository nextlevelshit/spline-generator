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
      points: 1,
      splines: 10,
      margin: {
        spline: 20,
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
        width: 2,
        colors: ['#79B4A9', '#9CC69B'],
      },
      animation: {
        enabled: false,
        amplitude: 10,
        frequency: 14,
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
