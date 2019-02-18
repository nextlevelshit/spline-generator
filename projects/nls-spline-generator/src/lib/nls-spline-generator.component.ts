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
  // tslint:disable-next-line:max-line-length
  templateUrl: './nls-spline-generator.component.html'
})
export class NlsSplineGeneratorComponent implements OnChanges {

  @Input() configInput: Config;
  @ViewChild('matrix') matrixEl;
  @ViewChild('svg') svgEl;

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

    if (!this.curves.all && !this.graphs.all) {
      this.init();
    } else {
      this.toggleAnimation();
    }
  }

  private init(): void {
    this.resetMatrix();
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
    this.curves.prepareAnimationPaths();
    this.curves.setVectorPoints();
    this.curves.setEntryPoints();
    this.curves.appendRadians();

    console.log(this.curves.all);
  }
  /**
   * Reset matrix and save canvas HTML element
   * into service.
   */
  private resetMatrix(): void {
    const canvasEl = this.matrixEl.nativeElement;
    const parentEl = this.el.nativeElement;
    const svgEl = this.svgEl.nativeElement;
    this.matrix.reset(canvasEl, parentEl, svgEl);
  }
  /**
   * Reset configuration and merge with incoming
   * config parameters from components input.
   */
  private resetConfig(): void {
    this.config.reset(this.configInput);
  }

  private toggleAnimation(): void {
    const enabled = this.configInput.animation.enabled;

    if (enabled) {
      this.graphs.startAnimation();
    } else {
      this.graphs.stopAnimation();
    }
  }
}
