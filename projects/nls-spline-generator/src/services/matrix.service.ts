import { Point } from './../models/point.model';
import { Matrix } from './../models/matrix.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {

  private defaults: Matrix;
  private canvasEl: Element;
  private matrix: Matrix;

  /**
   * Set defaults for matrix if any parameter
   * has been left empty.
   */
  constructor() {
    this.defaults = {
      width: null,
      height: null,
      overshoot: 1
    };
  }

  public get width(): number {
    return this.matrix.width;
  }

  public get height(): number {
    return this.matrix.height;
  }

  public get center(): Point {
    return {
      x: this.matrix.width / 2,
      y: this.matrix.height / 2
    };
  }

  public set overshoot(input: number) {
    this.matrix.overshoot = input;
  }

  public get overshoot(): number {
    return this.matrix.overshoot;
  }

  public reset(element: Element): void {
    this.matrix = {
      ...this.defaults,
      width: element.scrollWidth,
      height: element.scrollHeight
    };
  }
}
