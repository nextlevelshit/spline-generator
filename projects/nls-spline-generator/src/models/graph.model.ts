import { Curve } from './curve.model';

export interface Graph {
  points: Curve;
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
