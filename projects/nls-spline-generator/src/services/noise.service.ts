import { MathService } from './math.service';
import { MatrixService } from './matrix.service';
import { Point } from './../models/point.model';
import { Config } from './../models/config.model';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import tooloud from 'tooloud';
import * as d3 from 'd3';
import { Curve } from '../models/curve.model';
import { PointService } from './point.service';

export const { Simplex } = tooloud;

@Injectable({
  providedIn: 'root'
})
export class NoiseService {

  constructor(
    private config: ConfigService,
    private matrix: MatrixService,
    private math: MathService,
    private points: PointService
  ) {
  }

  private distort(num: number, leverage: number = 0.1): number {
    return num + num * d3.randomNormal(0, leverage)();
  }

  public init(amountOfPoints: number): any {
    return d3.range(amountOfPoints).map(() => {
      return Simplex.create(Math.floor(Math.random() * 100));
    });
  }

  /**
   * Generating lists of samples for the animation trail. The
   * animation trail is a circular path, but distorted through
   * simplex noise adaption.
   */
  public samples(noise: any, points: Point[]): Point[][] {
    return noise.map((simplex, i) => {
      const start = points[i];
      // const amplitude = this.config.animation.amplitude;
      // const frequency = this.distort(this.config.animation.frequency, 0.5);
      const { frequency, amplitude, radius } = this.config.animation;
      const scaledRadius = radius * this.gaussianBell(i, noise.length);

      return d3.range(frequency).map((sample, j) => {
        // const scale = this.distort(this.config.animation.radius, 0.4);
        // const radius =
        const radians = j / frequency * this.math.τ;
        const x = start.x + Math.sin(radians) * scaledRadius;
        const y = start.y + Math.cos(radians) * scaledRadius;
        const noisedScale = scaledRadius + simplex.noise(x, y, 0) * amplitude * scaledRadius;

        return {
          x: Math.sin(radians) * noisedScale + start.x,
          y: Math.cos(radians) * noisedScale + start.y
        };
      });
    });
  }

  public gaussianBell(n: number, total: number): number {
    return d3.randomNormal(n % total / 2, total / 10)();
  }

  /**
   * Generate pseudo-paths out of each sample to calculate later
   * the animation steps each tick.
   */
  public paths(samples: Point[][]): Point[][] {
    const { debugging } = this.config;
    // Create shadow group for appending
    // animation trail paths
    const group = d3.select(this.matrix.svg)
      .append('g')
      .attr('fill', 'none')
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 1)
      .attr('stroke-width', 1)
      .attr('stroke', '#000');

    const paths = samples.map(sample => {
      const path = group
        .append('path')
        .attr('d', d3.line()
        .x((p: Point) => p.x)
        .y((p: Point) => p.y)
        .curve(d3.curveBasisClosed)(sample)
      );
      return path;
    });
    // Delete shadow group after it
    // is not needed anymore
    if (!debugging) {
      group.remove();
    }

    return paths;
  }

  public generators(paths: any): any {
    return paths.map(noisePath => {
      return this.points.pointsOnPath(
        noisePath.node(),
        this.config.animation.ticks
      );
    });
  }
}
