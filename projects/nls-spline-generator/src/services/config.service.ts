import { Config } from './../models/config.model';
import { Injectable } from '@angular/core';
import { Point } from '../models/point.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private defaults: Config;
  private config: Config;
  private colors: Iterator<string>;

  /**
   * Set defaults for config if any parameter
   * has been left empty.
   */
  constructor() {
    this.colors = this.colorIterator();

    this.defaults = {
      pointsCount: 3,
      graphs: 1,
      splines: 1,
      overshoot: 0.4,
      vector: {
        in: {
          direction: 0,
          margin: 0,
          tension: 0.1
        },
        out: {
          direction: 1,
          margin: 0,
          tension: 0.1
        }
      },
      margin: {
        spline: 2,
        entry: 2,
        canvas: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      stroke: {
        width: 1,
        colors: ['#000000']
      },
      background: 'transparent',
      animation: {
        enabled: false,
        frequency: 16,
        amplitude: 4,
        radius: 30,
        ticks: 2500
      },
      debug: false
    };
  }

  private *colorIterator(): Iterator<string> {
    let i = 0;
    const total = this.config.stroke.colors.length;

    while (true) {
      yield this.config.stroke.colors[i++ % total];
    }
  }

  private splitIntoChunksOf(chunkSize: number, list: any[], tail: any[] = []): any[] {
    return (list.length === 0)
      ? tail
      : this.splitIntoChunksOf(chunkSize, list.slice(chunkSize), tail.concat([list.slice(0, chunkSize)]));
  }

  public reset(input: Config): void {
    this.config = {
      ...this.defaults,
      ...input
    };
  }

  public get pointsCount(): number {
    return this.config.pointsCount;
  }

  public get startingPoints(): Point[] {
    const { startingPoints, pointsCount } = this.config;

    return startingPoints && pointsCount === startingPoints.length / 2
      ? this.splitIntoChunksOf(2, startingPoints)
        .map(p => ({ x: p[0], y: p[1]}))
      : [];
  }

  public get overshoot(): number {
    return this.config.overshoot;
  }

  public get graphs(): number {
    return this.config.graphs;
  }

  public get splines(): number {
    return this.config.splines;
  }

  public get stroke(): { width: number, colors: string[] } {
    return this.config.stroke;
  }

  public get color(): string {
    return this.config.stroke.colors[0];
  }

  public get debugging(): boolean {
    return this.config.debug;
  }

  public get vector(): any {
    return this.config.vector;
  }

  public get margin(): any {
    return this.config.margin;
  }

  public get animation(): any {
    return this.config.animation;
  }

  public get graph(): any {
    return {
      stroke: {
        width: this.config.stroke.width,
        color: this.colors.next().value
      }
    };
  }

  public get background(): string {
    return this.config.background;
  }

  public get all(): Config {
    return this.config;
  }
}
