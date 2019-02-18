import { Point } from './../models/point.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  public τ: number;

  constructor() {
    this.τ = Math.PI * 2;
  }

  /**
   * Calculate distance between two points
   *
   * @param a Point
   * @param b Point
   */
  public Δ(a: Point, b: Point): number {
    return Math.sqrt(
      Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)
    );
  }

  /**
   * Flip sign each iteration
   *
   * @param startPositive boolean
   */
  public *flipSign(startPositive: boolean = true) {
    let sign = startPositive ? 1 : -1;

    while (true) {
      yield sign = sign * (-1);
    }
  }

  /**
   * Calculate radians of line between two points
   *
   * @param a Point
   * @param b Point
   */
  public radians(a: Point, b: Point) {
    return Math.atan2(b.y - a.y, b.x - a.x);
  }
}
