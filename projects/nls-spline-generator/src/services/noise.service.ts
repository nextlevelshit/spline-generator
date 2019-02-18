import { MathService } from './math.service';
import { MatrixService } from './matrix.service';
import { Point } from './../models/point.model';
import { Config } from './../models/config.model';
import { Injectable, ɵSWITCH_COMPILE_DIRECTIVE__POST_R3__ } from '@angular/core';
import { ConfigService } from './config.service';
import tooloud from 'tooloud';
import * as d3 from 'd3';
import { domRendererFactory3 } from '@angular/core/src/render3/interfaces/renderer';
import { Curve } from '../models/curve.model';

export const { Simplex } = tooloud;

@Injectable({
  providedIn: 'root'
})
export class NoiseService {

  constructor(
    private config: ConfigService,
    private matrix: MatrixService,
    private math: MathService
  ) {

  }

  private get scaledUnit(): number {
    const amplitude = this.config.animation.amplitude;
    const randomScale = this.distort(amplitude);
    return this.matrix.unit * randomScale;
  }

  private distort(num: number, leverage: number = 0.1): number {
    return num + num * d3.randomNormal(0, leverage)();
  }

  public init(): any {
    return d3.range(this.config.points).map(() => {
      return Simplex.create(Math.floor(Math.random() * 10000));
    });
  }

  /**
   * Generating lists of samples for the animation trail. The
   * animation trail is a circular path, but distored through
   * simplex noise adaption.
   *
   * @param noise
   * @param points
   */
  public samples(noise: any, points: Point[]): Point[][] {
    return noise.map((simplex, i) => {
      const start = points[i];
      const scale = this.scaledUnit;
      const amplitude = this.config.animation.amplitude;
      const frequency = this.distort(this.config.animation.frequency);

      return d3.range(frequency).map((sample, j) => {
        const radians = j / frequency * this.math.τ;
        const x = start.x + Math.sin(radians) * scale;
        const y = start.y + Math.cos(radians) * scale;
        const noisedScale = scale + simplex.noise(x, y, 0) * amplitude * scale;

        return {
          x: Math.sin(radians) * noisedScale + start.x,
          y: Math.cos(radians) * noisedScale + start.y
        };
      });
    });
  }

  /**
   * Generate pseudo-paths out of each sample to calculate later
   * the animation steps each tick.
   *
   * @param samples
   */
  public paths(samples: Point[][]) {
    // Create shadow group for appending
    // animation trail paths
    const group = d3.select(this.matrix.svg)
      .append('g')
      .attr('fill', 'none')
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .attr('stroke-width', 1)
      .attr('stroke', '#000');

    const paths = samples.map(sample => {
      const path = group
        .append('path')
        .attr('d', d3.line()
        .x(p => p.x)
        .y(p => p.y)
        .curve(d3.curveBasisClosed)(sample)
      );

      /**
       * Alternatively SVG could be omitted
       */
      // const path = d3.line()
      //   .x(p => p.x)
      //   .y(p => p.y)
      //   .curve(d3.curveBasisClosed)(sample);

      return path;
    });
    // Delete shadow group after it
    // is not needed anymore
    group.remove();

    return paths;
  }
}
