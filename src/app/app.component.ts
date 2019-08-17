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
      points: 4,
      graphs: 2,
      splines: 20,
      overshoot: 0.3,
      margin: {
        spline: 30,
        entry: 5,
        canvas: {
          top: 300,
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
        width: 1.1,
        colors: ['#F8485E', '#5CC0C7'],
      },
      background: '#fff',
      animation: {
        enabled: false,
        amplitude: 0.4,
        radius: 90,
        frequency: 7,
        ticks: 2000
      },
      debug: true
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
