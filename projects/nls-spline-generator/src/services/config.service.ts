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
      splines: 1,
      overshoot: 0.4,
      vector: {
        in: {
          direction: 0,
          tension: 0
        },
        out: {
          direction: 0,
          tension: 0
        }
      },
      margin: {
        spline: 2,
        entry: 2,
        canvas: {
          x: 10,
          y: 10
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
        amplitude: 40
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
