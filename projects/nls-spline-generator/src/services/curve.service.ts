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
    private noise: NoiseService
  ) { }

  public distributePoints(): void {
    this.curves = d3.range(this.config.graphs).map(() => {
      return {
        points: this.points.distribute()
      };
    });
  }

  public prepareAnimationPaths(): void {
    this.curves.forEach((curve: Curve, i, curves: Curve[]) => {
      const simplexNoise = this.noise.init();
      const samples = this.noise.samples(simplexNoise, curve.points);
      const paths = this.noise.paths(samples);
      const generators = this.noise.generators(paths);

      const points =  generators.map(generator => {
        const point = generator.next().value;
        return {
          x: point.x,
          y: point.y,
          generator
        };
      });

      curves[i] = { points };
    });
  }

  public setEntryPoints(): void {
    this.curves.forEach((curve, i, curves) => {
      curves[i].points.unshift(this.points.entryPointIn);
      curves[i].points.push(this.points.entryPointOut);
    });
  }

  public setVectorPoints(): void {
    this.curves.forEach((curve, i, curves) => {
      curves[i].points.unshift(this.points.vectorPointIn);
      curves[i].points.push(this.points.vectorPointOut);
    });
  }

  public splines(curve: Point[]): Point[][] {
    const median = Math.floor(curve.length / 2);
    const siblings = (this.config.points > 5)
      ? [median - 1, median, median + 1]
      : [median];
    // Prepare spread generators for median siblings
    const spreads = siblings.map(i => {
      return this.points.spreadOrthogonal(curve[i], 0);
    });
    // spread medians
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
