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

  public set overshoot(input: number) {
    this.matrix.overshoot = input;
  }

  public reset(element: Element): void {
    this.matrix = {
      ...this.defaults,
      width: element.scrollWidth,
      height: element.scrollHeight
    };
  }
}
