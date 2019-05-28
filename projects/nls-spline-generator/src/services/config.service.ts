import { Config } from './../models/config.model';
import { Injectable } from '@angular/core';

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
      points: 3,
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
      animation: {
        enabled: false,
        fps: 60,
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

  public reset(input: Config) {
    this.config = {
      ...this.defaults,
      ...input
    };
  }

  public get points(): number {
    return this.config.points;
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

  public get all(): Config {
    return this.config;
  }
}
