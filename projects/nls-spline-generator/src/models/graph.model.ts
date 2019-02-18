import { Point } from './point.model';

export interface Graph {
  points: Point[];
  /**
   * Stroke parameters of each spline
   */
  stroke?: {
    /**
     * Stroke width in pixel
     */
    width?: number;
    /**
     * Stroke color in hexadecimal
     */
    color?: string;
  };
}
