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

  private entryShiftIn: Iterator<Point>;
  private entryShiftOut: Iterator<Point>;

  constructor(
    private config: ConfigService,
    private matrix: MatrixService,
    private math: MathService,
    private points: PointService
  ) {
    // this.entryShiftIn = this.points.shiftPoint(
    //   this.matrix.entries.in,
    //   this.config.margin.entry,
    //   1
    // );
    // this.entryShiftOut = this.points.shiftPoint(
    //   this.matrix.entries.out,
    //   this.config.margin.entry,
    //   1
    // );
  }

  private vectorPoint(
    point: Point,
    vector: any
  ): Point {
    const magnitudeX = this.matrix.width * vector.tension;
    const magnitudeY = this.matrix.height * vector.tension;

    return {
      x: point.x + magnitudeX * Math.sin(this.math.τ * vector.direction),
      y: point.y + magnitudeY * Math.cos(this.math.τ * vector.direction),
      flag: {
        vector: true
      }
    };
  }

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
    ticksAverage: number = 500,
    clockwise: boolean = Math.random() >= 0.5,
    start: number = Math.random()
  ) {
    const totalLength = path.getTotalLength();
    const direction = (clockwise) ? totalLength : 0;
    const ticks = Math.floor(
      ticksAverage + ticksAverage * d3.randomNormal(0, 0.2)()
    );
    const pointsList = d3.range(ticks).map((n) => {
      const step = n * totalLength / ticks;
      return path.getPointAtLength(Math.abs(direction - step));
    });

    let i = Math.floor(start * totalLength);

    while (true) {
      yield pointsList[i++ % ticks];
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

  public *spreadOrthogonal(
    start: Point,
    radians?: number
  ) {
    const sign = this.math.flipSign();
    let spacing = this.config.margin.spline;
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
      // spacing *= 0.95;
      spacing *= 1.01;
    }
  }

  public get entryPointIn(): Point {
    return {
      ...this.matrix.entries.in,
      flag: {
        entry: true
      }
    };
  }

  public get entryPointOut(): Point {
    return {
      ...this.matrix.entries.out,
      flag: {
        entry: true
      }
    };
  }

  public get vectorPointIn(): Point {
    return this.vectorPoint(this.entryPointIn, this.config.vector.in);
  }

  public get vectorPointOut(): Point {
    return this.vectorPoint(this.entryPointOut, this.config.vector.out);
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
