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
      points: 5,
      graphs: 2,
      splines: 17,
      overshoot: 0.5,
      margin: {
        spline: 30,
        entry: 5,
        canvas: {
          x: 20,
          y: 20
        }
      },
      vector: {
        in: {
          direction: 0.25,
          margin: 100,
          tension: 0.1
        },
        out: {
          direction: 1,
          margin: 100,
          tension: 0.1
        }
      },
      stroke: {
        width: 1,
        colors: ['#F8485E', '#5CC0C7'],
      },
      animation: {
        enabled: true,
        amplitude: 0.5,
        radius: 300,
        frequency: 12,
        fps: 50,
        ticks: 1300
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
