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

  /**
   * Set defaults for graphs if any parameter
   * has been left empty.
   */
  constructor(
    private curves: CurveService,
    private config: ConfigService
  ) {
    this.defaults = {
      points: [],
      stroke: {
        color: d3.interpolateSpectral(Math.random()),
        width: 1,
      }
    };
  }

  /**
   * Iterate through all existing curves and upgrade
   * each graph's information with missing data.
   */
  public reset(): void {
    this.graphs = {
      ...this.curves.all.map((curve: Curve): Graph => {
        return {
          ...this.defaults,
          ...this.config.graph,
          points: curve.points
        };
      })
    };
  }

  public get all(): Graph[] {
    return this.graphs;
  }
}
