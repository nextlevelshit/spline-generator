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
  private previouseEntryPointIn: Point;
  private previouseEntryPointOut: Point;

  constructor(
    private config: ConfigService,
    private matrix: MatrixService,
    private math: MathService,
    private points: PointService
  ) {
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

  private prepareEntryPoints(): void {
    this.entryShiftIn = this.shiftEntryPoint(
      this.matrix.entries.in,
      this.config.vector.in.direction
    );
    this.entryShiftOut = this.shiftEntryPoint(
      this.matrix.entries.out,
      this.config.vector.out.direction
    );
  }

  private *shiftEntryPoint(
    point: Point,
    vector: number,
    startPositive: boolean = true
  ) {
    const genShiftX = this.math.shiftNumber(this.config.margin.entry, vector, startPositive);
    const genShiftY = this.math.shiftNumber(this.config.margin.entry, vector, startPositive);

    while (true) {
      yield {
        x:
          Math.cos(vector * this.math.τ)
          * genShiftX.next().value
          + point.x,
        y:
          Math.sin(vector * this.math.τ)
          * genShiftY.next().value
          + point.y,
        flag: {
          entry: true
        }
      };
    }
  }

  public distribute(): Point[] {
    this.prepareEntryPoints();

    return d3.range(this.config.points).map(() => {
      const point = {
        x: this.randomX,
        y: this.randomY
      };

      return {
        ...point,
        distanceToCenter: this.math.Δ(point, this.matrix.center)
      };
    });
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

  public *spreadOrthogonal(
    start: Point,
    radians?: number
  ) {
    const sign = this.math.flipSign();
    let i = 0;
    // First check if point has its own radians,
    // otherwise take from arguments or random
    radians = (radians || radians === 0)
      ? radians
      : (start.radians)
        ? start.radians
        : d3.randomUniform(0, 2)();

    while (true) {
      const spacing = this.config.margin.spline;
      const nextSpacing = sign.next().value * spacing * i++;
      yield start = this.shiftPoint(start, nextSpacing, radians);
    }
  }

  public get entryPointIn(): Point {
    return this.entryShiftIn.next().value;
  }

  public get entryPointOut(): Point {
    return this.entryShiftOut.next().value;
  }

  public vectorPointIn(entryPoint: Point): Point {
    return this.vectorPoint(entryPoint, this.config.vector.in);
  }

  public vectorPointOut(entryPoint: Point): Point {
    return this.vectorPoint(entryPoint, this.config.vector.out);
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
