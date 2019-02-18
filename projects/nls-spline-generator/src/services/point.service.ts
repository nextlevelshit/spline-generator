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
    private matrix: MatrixService
  ) { }

  public distribute(): Point[] {
    return d3.range(this.config.points).map(() => {
      return {
        x: this.randomX,
        y: this.randomY
      };
    });
  }

  public get randomX(): number {
    const radius = this.matrix.width / 2 * this.matrix.overshoot;
    return this.matrix.center.x + d3.randomNormal()() * radius;
  }

  public get randomY(): number {
    const radius = this.matrix.height / 2 * this.matrix.overshoot;
    return this.matrix.center.x + d3.randomNormal()() * radius;
  }
}
