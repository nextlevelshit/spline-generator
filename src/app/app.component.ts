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
      points: 7,
      graphs: 2,
      splines: 8,
      overshoot: 0.3,
      margin: {
        spline: 20,
        entry: 5,
        canvas: {
          top: 10,
          right: 10,
          bottom: 200,
          left: 400
        }
      },
      vector: {
        in: {
          direction: 0.25,
          margin: 100,
          tension: 0.2
        },
        out: {
          direction: 1,
          margin: 100,
          tension: 0.2
        }
      },
      stroke: {
        width: 1.2,
        colors: ['#F8485E', '#5CC0C7'],
      },
      animation: {
        enabled: true,
        amplitude: 0.4,
        radius: 30,
        frequency: 7,
        fps: 50,
        ticks: 2000
      },
      debug: false
    };
  }

  public toggleAnimation(event): void {
    this.config = {
      ...this.config,
      animation: {
        enabled: !this.config.animation.enabled
      }
    };
  }
}
