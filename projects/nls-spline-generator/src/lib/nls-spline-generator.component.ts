import { PointService } from './../services/point.service';
import { Curve } from './../models/curve.model';
import { MatrixService } from './../services/matrix.service';
import { Config } from './../models/config.model';
import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ConfigService } from '../services/config.service';

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
    this.config.reset(this.configInput);
    this.matrix.reset(this.matrixEl.nativeElement);

    this.matrix.overshoot = this.config.overshoot;

    this.points.distribute();
  }

}
