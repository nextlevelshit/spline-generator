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
}
