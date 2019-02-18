import { Point } from './point.model';

export interface Matrix {
  width: number;
  height: number;
  in: Point;
  out: Point;
}
