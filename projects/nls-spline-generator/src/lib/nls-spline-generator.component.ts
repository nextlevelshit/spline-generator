import { GraphService } from './../services/graph.service';
import { CurveService } from './../services/curve.service';
import { PointService } from './../services/point.service';
import { Curve } from './../models/curve.model';
import { MatrixService } from './../services/matrix.service';
import { Config } from './../models/config.model';
import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ConfigService } from '../services/config.service';
import * as d3 from 'd3';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nls-spline-generator',
  template: `<canvas #matrix width="100%" height="100%" style="width: 100%; height: 100%; display: block"></canvas>`
})
export class NlsSplineGeneratorComponent implements OnInit, OnChanges {

  // private curves: Curve[];

  @Input() configInput: Config;
  @ViewChild('matrix') matrixEl;

  constructor(
    private matrix: MatrixService,
    private config: ConfigService,
    private points: PointService,
    private curves: CurveService,
    private graphs: GraphService
  ) {
  }

  ngOnInit() {
    // console.log(this.matrix.width);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.resetConfig();
    this.resetMatrix();
    // this.setOvershoot();
    this.resetCurves();
    this.resetGraphs();
    // this.drawGraphs();

    console.log(this.graphs.all);
  }

  private resetConfig(): void {
    this.config.reset(this.configInput);
  }

  private resetMatrix(): void {
    this.matrix.reset(this.matrixEl.nativeElement);
  }

  private resetCurves(): void {
    this.curves.distributePoints();
    this.curves.setVectorPoints();
    this.curves.setEntryPoints();
  }
  private resetGraphs(): void {
    this.graphs.reset();
  }
}
