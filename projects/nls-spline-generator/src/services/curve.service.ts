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
    this.curves = d3.range(this.config.splines).map(() => {
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

      curves[i] = {
        points: generators.map(generator => {
          return generator.next().value;
        }),
        generators
      };
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

  public get all(): Curve[] {
    return this.curves;
  }
}
