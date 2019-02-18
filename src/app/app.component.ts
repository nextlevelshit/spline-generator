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
      splines: 2,
      margin: {
        spline: 20,
        entry: 4
      },
      stroke: {
        width: 2,
        colors: ['#79B4A9', '#9CC69B'],
      },
      debug: true
    };
  }
}
