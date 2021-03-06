import { MatrixService } from './matrix.service';
import { MathService } from './math.service';
import { Point } from './../models/point.model';
import { NoiseService } from './noise.service';
import { PointService } from './point.service';
import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { Curve } from '../models/curve.model';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class CurveService {

  private curves: Curve[];

  constructor(
    private config: ConfigService,
    private points: PointService,
    private noise: NoiseService,
    private math: MathService,
    private matrix: MatrixService
  ) { }

  public distributePoints(): void {
    this.curves = d3.range(this.config.graphs).map(() => {
      return {
        points: this.points.distribute()
      };
    });
  }

  public appendRadians(): void {
    this.curves.forEach((curve, i, curves) => {
      curves[i] = {
        ...curve,
        points: this.points.appendRadians(curve.points)
      };
    });
  }

  public prepareAnimationPaths(): void {
    const { center } = this.matrix;
    const { animation } = this.config;
    const { ticks } = animation;

    this.curves.forEach((curve: Curve, i, curves: Curve[]) => {
      const { points } = curve;

      const simplexNoise = this.noise.init(points.length);
      const samples = this.noise.samples(simplexNoise, points);
      const paths = this.noise.paths(samples);
      const generators = this.noise.generators(paths)
        .sort((a: Iterator<Point>, b: Iterator<Point>) => {
          const deltaAtoCenter = this.math.Δ(a.next().value, center);
          const deltaBtoCenter = this.math.Δ(b.next().value, center);

          return a.next().value.distanceToCenter - b.next().value.distanceToCenter;
        }).reduceRight((acc, val, j) => {
          return j % 2 === 0 ? [...acc, val] : [val, ...acc];
        }, []);

      const precompiledPoints = generators.map(generator => {
        return d3.range(ticks).map(() => {
          return generator.next().value;
        });
      });

      // const points =  generators.map(generator => {
      //   const point = generator.next().value;
      //   return {
      //     x: point.x,
      //     y: point.y,
      //     generator,
      //     precompiled,
      //     tick
      //   };
      // });

      const newPoints = precompiledPoints.map(precompiled => {
        const tick = Math.floor(d3.randomUniform(0, ticks)());
        const point = precompiled[tick];

        return {
          x: point.x,
          y: point.y,
          precompiled,
          tick
        };
      });

      curves[i] = { points: newPoints };
    });
  }

  public setEntryPoints(): void {
    this.curves.forEach((curve, i, curves) => {
      const entryIn = this.points.entryPointIn;
      const entryOut = this.points.entryPointOut;

      curves[i].points.unshift(this.points.vectorPointIn(entryIn));
      curves[i].points.push(this.points.vectorPointOut(entryOut));

      curves[i].points.unshift(entryIn);
      curves[i].points.push(entryOut);
    });
  }

  public splines(curve: Point[]): Point[][] {
    const median = Math.floor(curve.length / 2);
    const siblings = (curve.length > 9)
      ? [median - 1, median, median + 1]
      : [median];
    // Prepare spread generators for median siblings
    const spreads = siblings.map(i => {
      return this.points.spreadOrthogonal(curve[i]);
    });
    // Spread medians
    return d3.range(this.config.splines).map(() => {
      // Reduce payload of point's parameters
      const points = curve.slice().map(point => {
        return {
          x: point.x,
          y: point.y
        };
      });

      spreads.forEach((spread, i) => {
        points.splice(siblings[i], 1, spread.next().value);
      });

      return points;
    });
  }

  public get all(): Curve[] {
    return this.curves;
  }
}
