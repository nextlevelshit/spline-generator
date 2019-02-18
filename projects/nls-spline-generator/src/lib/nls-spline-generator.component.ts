import { GraphService } from './../services/graph.service';
import { CurveService } from './../services/curve.service';
import { PointService } from './../services/point.service';
import { Curve } from './../models/curve.model';
import { MatrixService } from './../services/matrix.service';
import { Config } from './../models/config.model';
import { Component, Input, ViewChild, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { ConfigService } from '../services/config.service';
import * as d3 from 'd3';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nls-spline-generator',
  template: `<canvas #matrix width="100%" height="100%"></canvas>`
})
export class NlsSplineGeneratorComponent implements OnChanges {

  // private curves: Curve[];

  @Input() configInput: Config;
  @ViewChild('matrix') matrixEl;

  constructor(
    private el: ElementRef,
    private matrix: MatrixService,
    private config: ConfigService,
    private points: PointService,
    private curves: CurveService,
    private graphs: GraphService
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.resetConfig();
    this.init();
  }

  private init(): void {
    this.resetMatrix();
    // this.setOvershoot();
    this.resetCurves();
    this.resetGraphs();
    this.drawGraphs();
  }
  /**
   * Draw graphs onto canvas element.
   */
  private drawGraphs(): void {
    this.graphs.draw();
  }
  /**
   * Reset graphs after curves parameters has
   * been set. The generated points are neeeded
   * for correct graph setup.
   */
  private resetGraphs(): void {
    this.graphs.reset();
  }
  /**
   * Reset curves, distribute random points on
   * canvas, generate vector points and append
   * starting and ending entry points of graph
   */
  private resetCurves(): void {
    this.curves.distributePoints();
    this.curves.setVectorPoints();
    this.curves.setEntryPoints();
  }
  /**
   * Reset matrix and save canvas HTML element
   * into service.
   */
  private resetMatrix(): void {
    const canvasEl = this.matrixEl.nativeElement;
    const parentEl = this.el.nativeElement;
    this.matrix.reset(canvasEl, parentEl);
  }
  /**
   * Reset configuration and merge with incoming
   * config parameters from components input.
   */
  private resetConfig(): void {
    this.config.reset(this.configInput);
  }
}
