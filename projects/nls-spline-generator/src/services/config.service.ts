import { Config } from './../models/config.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private defaults: Config;
  private config: Config;

  /**
   * Set defaults for config if any parameter
   * has been left empty.
   */
  constructor() {
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
        color: '#000000'
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
    return this.config.stroke.color;
  }

  public get debugging(): boolean {
    return this.config.debug;
  }

  public get graph(): any {
    return {
      stroke: this.config.stroke
    };
  }

  public get all(): Config {
    return this.config;
  }
}
