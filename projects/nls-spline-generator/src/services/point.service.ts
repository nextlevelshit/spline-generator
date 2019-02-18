import { Point } from './../models/point.model';
import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  constructor(
    private config: ConfigService
  ) { }

  public distribute(): Point[] {
    return [];
  }
}
