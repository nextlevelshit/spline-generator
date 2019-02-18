import { Point } from './point.model';

export interface Curve {
  points: Point[];
  generators?: Iterable<Point[]>;
}
