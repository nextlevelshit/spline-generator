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
}
