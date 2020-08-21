import { MathService } from './math.service';
import { MatrixService } from './matrix.service';
import { Curve } from './../models/curve.model';
import { Graph } from './../models/graph.model';
import { Point } from './../models/point.model';
import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { CurveService } from './curve.service';
import { ConfigService } from './config.service';
import { PointService } from './point.service';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private timer: any;
  private graphs: Graph[];
  private defaults: Graph;
  private spline = d3.line()
    .x((p: Point) => p.x)
    .y((p: Point) => p.y)
    .curve(d3.curveBundle.beta(1));
  /**
   * Set defaults for graphs if any parameter
   * has been left empty.
   */
  constructor(
    private config: ConfigService,
    private curves: CurveService,
    private matrix: MatrixService,
    private math: MathService,
    private points: PointService
  ) {
    this.timer = undefined;
    this.defaults = {
      points: [],
      stroke: {
        color: d3.interpolateSpectral(Math.random()),
        width: 1,
      }
    };
  }

  private drawAllSplines(): void {
    const { debugging } = this.config;
    const { context } = this.matrix;

    this.graphs.forEach(
      ({ points, stroke }) => {

        context.lineWidth = stroke.width;
        context.strokeStyle = stroke.color;
        // context.globalCompositeOperation = 'source-over';

        this.drawMarginLine(points);
        this.curves.splines(points).forEach(
          spline => {
            this.drawSpline(spline, stroke);

            if (debugging) {
              this.drawPointsOfSpline(spline);
            }
          }
        );
      }
    );
  }

  private drawLine(p1: Point, p2: Point): void {
    const { context } = this.matrix;

    context.beginPath();
    // context.lineWidth = stroke.width;
    // context.strokeStyle = stroke.color;
    // context.globalCompositeOperation = 'source-over';
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();
    context.closePath();
  }

  private drawSpline(points: Point[], stroke: any): void {
    const { context } = this.matrix;

    context.beginPath();
    this.spline(points);
    context.stroke();
    context.closePath();
  }

  private drawMarginLine(points: Point[]): void {
    const s1 = points.slice(0)[0];
    const s2 = points.slice(1)[0];
    const sR = this.math.radians(s1, s2);
    const e1 = points.slice(-1)[0];
    const e2 = points.slice(-2)[0];
    const eR = this.math.radians(e1, e2);

    this.drawLine(s1, { x: 0, y: s1.y});
    this.drawLine(s1, { x: 0, y: s1.y});
    this.drawLine(e1, { x: e1.x, y: 0});
    this.drawLine(e1, { x: e1.x, y: 0});
  }

  private drawPointsOfSpline(points: Point[]): void {
    points.forEach(
      point => this.drawPoint(point)
    );
  }

  private drawPoint(point: Point, color: string = 'rgba(0,0,0,0.1)'): void {
    const { context } = this.matrix;

    context.fillStyle = color;
    context.beginPath();
    context.arc(point.x, point.y, 4, 0, this.math.τ, true);
    context.fill();
    context.closePath();
  }

  private updateGraphs(): void {
    this.graphs.forEach((graph, i, graphs) => {
      graphs[i] = {
        ...graph,
        points: this.points.appendRadians(
          graph.points.map((point) => {
            if (point.flag) {
              return point;
            } else {
              const tick = point.tick++ % point.precompiled.length;
              const next = point.precompiled[tick];
              // const next = point.generator.next().value;
              return {
                ...point,
                x: next.x,
                y: next.y
              };
            }
          })
        )
      };
    });
  }

  private loopAnimation(): void {
    this.timer = undefined;
    this.updateGraphs();
    this.draw();
    this.startAnimation();
  }

  public draw(): void {
    this.matrix.clear();
    this.spline.context(this.matrix.context);
    this.curves.appendRadians();
    this.drawAllSplines();
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

  public startAnimation(): void {
    if (!this.timer) {
      this.timer = requestAnimationFrame(() => this.loopAnimation());
    }
  }

  public stopAnimation(): void {
    if (this.timer) {
      cancelAnimationFrame(this.timer);
      this.timer = undefined;
    }
  }

  public get all(): Graph[] {
    return this.graphs;
  }
}
