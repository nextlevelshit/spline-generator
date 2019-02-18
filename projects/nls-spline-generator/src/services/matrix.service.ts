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
    private config: ConfigService
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

  public get entries(): any {
    const marginX = this.config.margin.canvas.x + this.config.margin.entry;
    const marginY = this.config.margin.canvas.y + this.config.margin.entry;

    const entries = {
      in: {
        x: marginX * Math.abs(Math.cos(this.config.vector.in.direction * Math.PI)),
        y: this.matrix.height - marginY * Math.abs(Math.sin(this.config.vector.in.direction * Math.PI))
      },
      out: {
        x: this.matrix.width - marginX * Math.abs(Math.cos(this.config.vector.out.direction * Math.PI)),
        y: marginY * Math.abs(Math.sin(this.config.vector.out.direction * Math.PI))
      }
    };

    return entries;
  }
}
