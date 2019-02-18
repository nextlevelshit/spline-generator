import { MathService } from './math.service';
import { MatrixService } from './matrix.service';
import { Point } from './../models/point.model';
import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  constructor(
    private config: ConfigService,
    private matrix: MatrixService,
    private math: MathService
  ) { }

  public distribute(): Point[] {
    return d3.range(this.config.points).map(() => {
      return {
        x: this.randomX,
        y: this.randomY
      };
    });
  }

  public *pointsOnPath(
    path: any,
    ticksAverage: number = 1200,
    clockwise: boolean = Math.random() >= 0.5,
    start: number = Math.random()
  ) {
    const totalLength = path.getTotalLength();
    const ticks = Math.floor(ticksAverage + ticksAverage * d3.randomNormal(0, 0.2)());
    const direction = (clockwise) ? totalLength : 0;

    const pointsList = d3.range(ticks).map((n) => {
      const step = n * totalLength / ticks;
      return path.getPointAtLength(Math.abs(direction - step));
    });

    let i = Math.floor(start * totalLength);

    while (true) {
      yield pointsList[i++ % ticks];
    }
  }

  public *spreadOrthogonal(
    start: Point,
    radians?: number
  ) {
    const spacing = this.config.margin.spline;
    const sign = this.math.flipSign();
    let point = start;
    let i = 0;

    // First check if point has its own radians,
    // otherwise take from arguments or random
    radians = (radians || radians === 0)
      ? radians
      : (point.radians)
        ? point.radians
        : d3.randomUniform(0, 2)();

    while (true) {
      const nextSpacing = sign.next().value * spacing * i++;

      point = this.shiftPoint(point, nextSpacing, radians);

      yield point;
      // spacing *= 0.99;
      // spacing *= 1.01;
    }
  }

  public appendRadians(points: Point[]): Point[] {
    return points.map((point, i) => {
      if (point.flag) {
        return point;
      }

      const siblings = [i - 1, i + 1];

      return {
        ...point,
        radians: siblings.reduce((a, b) => {
          return this.math.radians(points[a], points[b]);
        })
      };
    });
      // return {
      //   ...graph,
      //   nodes: graph.nodes.map((point: Point, i, allNodes) => {
      //     let prev = allNodes[i - 1];
      //     let next = allNodes[i + 1];

      //     if (i === 0) {
      //       prev = graph.start.direction;
      //     }
      //     if (i === allNodes.length - 1) {
      //       next = graph.end.direction;
      //     }

      //     return {
      //       x: point.x,
      //       y: point.y,
      //       radians: this.math.angleRadians(prev, next)
      //     };
      //   })
      // };
  }

  public shiftPoint(
    point: Point,
    spacing: number,
    radians: number
  ): Point {
    return {
      x: Math.sin(radians * Math.PI) * spacing + point.x,
      y: Math.cos(radians * Math.PI) * spacing + point.y
    };
  }

  public get entryPointIn(): Point {
    return {
      x: this.config.margin.canvas.x,
      y: this.matrix.height,
      flag: {
        entry: true
      }
    };
  }

  public get entryPointOut(): Point {
    return {
      x: this.matrix.width - this.config.margin.canvas.x,
      y: 0,
      flag: {
        entry: true
      }
    };
  }

  public get vectorPointIn(): Point {
    const tension = (1 - this.config.vector.in.tension);
    return {
      x: this.entryPointIn.x,
      y: this.matrix.height * tension,
      flag: {
        vector: true
      }
    };
  }

  public get vectorPointOut(): Point {
    const tension = (1 - this.config.vector.in.tension);
    return {
      x: this.entryPointOut.x,
      y: this.matrix.height * this.config.vector.out.tension,
      flag: {
        vector: true
      }
    };
  }

  private get randomX(): number {
    const radius = this.matrix.width / 2 * this.config.overshoot;
    return this.matrix.center.x + d3.randomNormal()() * radius;
  }

  private get randomY(): number {
    const radius = this.matrix.height / 2 * this.config.overshoot;
    return this.matrix.center.y + d3.randomNormal()() * radius;
  }
}
