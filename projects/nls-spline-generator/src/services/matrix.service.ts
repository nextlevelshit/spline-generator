import { Point } from './../models/point.model';
import { Matrix } from './../models/matrix.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {

  private defaults: Matrix;
  private canvasEl: HTMLCanvasElement;
  private matrix: Matrix;
  private svgEl: SVGElement;

  /**
   * Set defaults for matrix if any parameter
   * has been left empty.
   */
  constructor() {
    this.defaults = {
      width: null,
      height: null
    };
  }

  public clear(): void {
    this.context.clearRect(0, 0, this.matrix.width, this.matrix.height);
  }

  public reset(
    canvas: HTMLCanvasElement,
    parent: Element,
    svg: SVGElement
  ): void {
    this.canvasEl = canvas;
    this.svgEl = svg;

    this.matrix = {
      ...this.defaults
    };

    this.resize(parent);
  }

  public resize(parent: Element): void {
    this.matrix.width = this.canvasEl.width = parent.clientWidth;
    this.matrix.height = this.canvasEl.height = parent.clientHeight;
  }
  /**
   * Calculate center of matrix area.
   */
  public get center(): Point {
    return {
      x: this.matrix.width / 2,
      y: this.matrix.height / 2
    };
  }

  public get width(): number {
    return this.matrix.width;
  }

  public get height(): number {
    return this.matrix.height;
  }

  public get all(): Matrix {
    return this.matrix;
  }

  public get context(): CanvasRenderingContext2D {
    return this.canvasEl.getContext('2d');
  }

  public get unit(): number {
    return Math.min(this.matrix.width, this.matrix.height) / 100;
  }

  public get svg(): Element {
    return this.svgEl;
  }
}
