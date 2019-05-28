import { MathService } from './math.service';
import { Point } from './../models/point.model';
import { Matrix } from './../models/matrix.model';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

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
  constructor(
    private config: ConfigService,
    private math: MathService
  ) {
    this.matrix = {
      width: null,
      height: null,
      in: null,
      out: null
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

    this.resize(parent);
  }

  public resize(parent: Element): void {
    const { clientWidth, clientHeight } = parent;

    this.matrix.width = this.canvasEl.width = clientWidth;
    this.matrix.height = this.canvasEl.height = clientHeight;
  }
  /**
   * Calculate center of matrix area.
   */
  public get center(): Point {
    const { width, height } = this.matrix;
    const { top, right, bottom, left } = this.config.margin.canvas;

    return {
      x: (width + left - right) / 2,
      y: (height + top - bottom) / 2
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

  public get entries(): any {
    const { height, width } = this.matrix;
    const { graphs, margin } = this.config;
    const { entry, canvas } = margin;
    const { top, right, bottom, left } = canvas;
    const entryShift = Math.floor(graphs / 2);
    const entryWidth = entry * entryShift;
    // const radiansIn = this.config.vector.in.direction * this.math.τ;
    // const radiansOut = this.config.vector.out.direction * this.math.τ;

    const entries = {
      in: {
        x: left + entryWidth,
        // x: marginX * Math.abs(Math.cos(radiansIn)) + this.config.vector.in.margin,
        y: height - bottom - entryWidth
        // y: this.matrix.height - marginY * Math.abs(Math.sin(radiansIn))
      },
      out: {
        x: width - right - entryWidth,
        // x: this.matrix.width - marginX * Math.abs(Math.cos(radiansOut)),
        y: top + entryWidth
        // y: marginY * Math.abs(Math.sin(radiansOut))
      }
    };

    return entries;
  }
}
