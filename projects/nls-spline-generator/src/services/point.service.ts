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

  public get entryPointIn(): Point {
    return {
      x: 0,
      y: this.matrix.height,
      flag: {
        entry: true
      }
    };
  }

  public get entryPointOut(): Point {
    return {
      x: this.matrix.width,
      y: 0,
      flag: {
        entry: true
      }
    };
  }

  public get vectorPointIn(): Point {
    return {
      x: 0,
      y: this.matrix.height / 2,
      flag: {
        vector: true
      }
    };
  }

  public get vectorPointOut(): Point {
    return {
      x: this.matrix.width,
      y: this.matrix.height / 2,
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
