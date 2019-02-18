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

      console.log(paths);
    });
    // const shadowGroup = this.createShadowGroup();
    // const noisePathList = this.adjustNoisePathList(samplesList, shadowGroup);
    // const nodesGeneratorList = this.adjustNodesGeneratorList(noisePathList)
    //   .sort((a: Iterator<Point>, b: Iterator<Point>) => {
    //     const deltaAtoCenter = this.math.Δ(a.next().value, this.matrix.center);
    //     const deltaBtoCenter = this.math.Δ(b.next().value, this.matrix.center);

    //     return a.next().value.distanceToCenter - b.next().value.distanceToCenter;
    //   }).reduceRight((acc, val, i) => {
    //     return i % 2 === 0 ? [...acc, val] : [val, ...acc];
    //   }, []);

    // shadowGroup.remove();

    //   nodes: nodesGeneratorList.map((generator: Iterator<Point>) => {
    //     return generator.next().value;
    //   })

    // return this.appendNodesRadians(graph);
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
