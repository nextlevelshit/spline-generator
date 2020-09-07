import { Config } from './../../projects/nls-spline-generator/src/models/config.model';
import { Component, ViewChild } from '@angular/core';
import { NlsSplineGeneratorComponent } from 'projects/nls-spline-generator/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('canvas') canvas: NlsSplineGeneratorComponent;
  public points: number[] = [];
  public config: Config;

  constructor() {
    // tslint:disable-next-line: max-line-length
    const p = [0.9584372402327515, 0.642314990512334, 0.8819617622610141, 0.7352941176470589, 0.7905236907730673, 0.6859582542694497, 0.7281795511221946, 0.5863377609108159, 0.7348295926849543, 0.4838709677419355, 0.7755610972568578, 0.36148007590132825, 0.6500415627597672, 0.18026565464895636, 0.1936824605153782, 0.222011385199241, 0.3341645885286783, 0.6129032258064516];

    this.config = {
      // pointsCount: 8,
      // startingPoints: [.1, .8, .3, .2, .2, .3, .4, .23, .5, .5, .6, .2, .3, .73, .9, .73],
      pointsCount: p.length * .5,
      startingPoints: p,
      // startingPoints: [.5, .5],
      graphs: 2,
      splines: 8,
      overshoot: .3,
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
          direction: .25,
          margin: 100,
          tension: .2
        },
        out: {
          direction: 1,
          margin: 100,
          tension: .2
        }
      },
      stroke: {
        width: 1.1,
        colors: ['#F8485E', '#5CC0C7'],
      },
      background: '#fff',
      animation: {
        enabled: true,
        amplitude: .9,
        radius: 20,
        frequency: 29,
        ticks: 900
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

  public clickedCanvas(event: MouseEvent): void {
    // x: number, y: number
    const { offsetWidth, offsetHeight } = (this.canvas.el.nativeElement as HTMLElement);
    const x = event.x / offsetWidth;
    const y = event.y / offsetHeight;

    this.points = [...this.points, x, y];

    // this.toggleAnimation(event);
    // console.log(offsetWidth, offsetHeight, x, y);
    this.canvas.resetConfig({
      ...this.config,
      pointsCount: this.points.length * .5,
      startingPoints: this.points,
    });
    console.log(this.points);
  }
}
