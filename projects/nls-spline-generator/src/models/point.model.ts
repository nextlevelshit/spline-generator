export interface Point {
  /**
   * X Coordinate starting at left canvas boundaries
   */
  x: number;
  /**
   * Y Coordinate starting at top canvas boundaries
   */
  y: number;
  /**
   * Gradient of point depending on siblings
   */
  radians?: number;
  /**
   * Flags for point status
   */
  flag?: {
    entry?: boolean;
    vector?: boolean;
  };
  /**
   * Set of functions to generate next points on
   * animation trail
   */
  generator?: Iterator<Point>;
  /**
   * Set of points precompiled for animation trail
   */
  precompiled?: Point[];
  /**
   * Current position inside precompiled points
   */
  tick?: number;
  /**
   * Distance between point and center of matrix
   */
  distanceToCenter?: number;
}
