import { GraphService } from './../services/graph.service';
import { CurveService } from './../services/curve.service';
import { PointService } from './../services/point.service';
import { Curve } from './../models/curve.model';
import { MatrixService } from './../services/matrix.service';
import { Config } from './../models/config.model';
import { Component, Input, ViewChild, OnChanges, SimpleChanges, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ConfigService } from '../services/config.service';
import * as d3 from 'd3';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nls-spline-generator',
  // tslint:disable-next-line:max-line-length
  templateUrl: './nls-spline-generator.component.html',
  styleUrls: ['./nls-spline-generator.component.scss']
})
export class NlsSplineGeneratorComponent implements OnChanges {

  private resizeTimeout: any;

  @Input() configInput: Config;
  @ViewChild('matrix') matrixEl;
  @ViewChild('svg') svgEl;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.startResizeTimeout();
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private matrix: MatrixService,
    private config: ConfigService,
    private curves: CurveService,
    private graphs: GraphService,
    private points: PointService
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (!this.curves.all && !this.graphs.all) {
      this.init();
    }

    this.toggleAnimation();
  }

  private init(): void {
    this.resetConfig();
    this.resetMatrix();
    this.resetCurves();
    this.resetGraphs();
    this.drawGraphs();
    this.fadeIn();
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
    this.curves.setEntryPoints();
    this.curves.appendRadians();
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

  private startResizeTimeout(): void {
    this.fadeOut();
    if (this.resizeTimeout) {
      this.resizeTimeout.stop();
    }
    this.resizeTimeout = d3.timeout(() => {
      this.init();
    }, 360);
  }

  public fadeIn(): void {
    this.renderer.addClass(this.matrixEl.nativeElement, 'visible');
  }

  public fadeOut(): void {
    this.renderer.removeClass(this.matrixEl.nativeElement, 'visible');
  }
}
