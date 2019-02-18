import { MathService } from './math.service';
import { Point } from './../models/point.model';
import { MatrixService } from './matrix.service';
import { Curve } from './../models/curve.model';
import { Graph } from './../models/graph.model';
import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { CurveService } from './curve.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private graphs: Graph[];
  private defaults: Graph;
  private spline = d3.line()
    .x(p => p.x)
    .y(p => p.y)
    .curve(d3.curveBasis);

  /**
   * Set defaults for graphs if any parameter
   * has been left empty.
   */
  constructor(
    private curves: CurveService,
    private config: ConfigService,
    private matrix: MatrixService,
    private math: MathService
  ) {
    this.defaults = {
      points: [],
      stroke: {
        color: d3.interpolateSpectral(Math.random()),
        width: 1,
      }
    };
  }

  private drawAllSplines(): void {
    this.graphs.forEach(
      graph => {
        this.drawSpline(graph.points, graph.stroke);
      }
    );
  }

  private drawSpline(points: Point[], stroke: any): void {
    this.matrix.context.beginPath();
    this.matrix.context.lineWidth = stroke.width;
    this.matrix.context.strokeStyle = stroke.color;
    this.spline(points);
    this.matrix.context.stroke();
    this.matrix.context.closePath();
  }

  private drawAllPoints(): void {
    this.graphs.forEach(
      graph => {
        graph.points.forEach(
          point => this.drawPoint(point)
        );
      }
    );
  }

  private drawPoint(point: Point): void {
    this.matrix.context.fillStyle = this.config.color;
    this.matrix.context.beginPath();
    this.matrix.context.arc(point.x, point.y, 4, 0, this.math.τ, true);
    this.matrix.context.fill();
    this.matrix.context.closePath();
  }

  public draw(): void {
    this.matrix.clear();
    this.spline.context(this.matrix.context);
    this.drawAllSplines();

    if (this.config.debugging) {
      this.drawAllPoints();
    }
  }
  /**
   * Iterate through all existing curves and upgrade
   * each graph's information with missing data.
   */
  public reset(): void {
    this.graphs = [
      ...this.curves.all.map((curve: Curve): Graph => {
        return {
          ...this.defaults,
          ...this.config.graph,
          points: curve.points
        };
      })
    ];
  }

  public get all(): Graph[] {
    return this.graphs;
  }
}
