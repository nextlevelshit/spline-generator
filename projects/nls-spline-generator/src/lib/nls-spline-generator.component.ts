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
  template: `<canvas #matrix width="100%" height="100%"></canvas>`,
  styleUrls: ['nls-spline-generator.component.scss']
})
export class NlsSplineGeneratorComponent implements OnInit, OnChanges {

  private curves: Curve[];

  @Input() configInput: Config;
  @ViewChild('matrix') matrixEl;

  constructor(
    private matrix: MatrixService,
    private config: ConfigService,
    private points: PointService
  ) {
  }

  ngOnInit() {
    // console.log(this.matrix.width);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.resetConfig();
    this.resetMatrix();
    this.setOvershoot();
    this.distributePoints();
    this.setEntryPoints();
    this.setVectorPoints();

    console.log(this.curves);
  }

  private resetConfig(): void {
    this.config.reset(this.configInput);
  }

  private resetMatrix(): void {
    this.matrix.reset(this.matrixEl.nativeElement);
  }

  private setOvershoot(): void {
    this.matrix.overshoot = this.config.overshoot;
  }

  private distributePoints(): void {
    this.curves = d3.range(this.config.splines).map(() => {
      return this.points.distribute();
    });
  }

  private setEntryPoints(): void {

  }

  private setVectorPoints(): void {

  }

}
