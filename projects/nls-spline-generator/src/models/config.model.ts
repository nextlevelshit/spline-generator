/**
 * The main Configuration of graphs, vectors and canvas.
 */
export interface Config {
  /**
   * Amount of orientation points, excl. entry and vector points
   */
  points?: number;
  /**
   * Points distribution factor depending on canvas size
   */
  overshoot?: number;
  /**
   * Amount of graphs
   */
  graphs?: number;
  /**
   * Amount of splines each graph
   */
  splines?: number;
  /**
   * Directional vectors coming next after entry points.
   * Starting as well ending points of graph drawn on canvas.
   * Enters the canvas (in)
   * Leaves the canvas (off)
   */
  vector?: {
    in?: {
      /**
       * Vector direction set by part of tau. Examples:
       * 0 up, 0.25 right, 0.5 bottom, 0.75 left
       */
      direction: number;
      /**
       * Margin between canvas border and first graph curve (px)
       */
      margin: number;
      /**
       * Percentage of canvas height or width
       */
      tension: number;
    },
    out?: {
      /**
       * Vector direction set by part of tau. Examples:
       * 0 up, 0.25 right, 0.5 bottom, 0.75 left
       */
      direction: number;
      /**
       * Margin between canvas border and first graph curve (px)
       */
      margin: number;
      /**
       * Percentage of canvas height or width
       */
      tension: number;
    }
  };
  /**
   * Configuration for Margins for Entry Points, Splines and the Canvas at all.
   */
  margin?: {
    /**
     *  Margin between entry points of graphs
     */
    entry?: number;
    /**
     * Margin between splines of graphs
     */
    spline?: number;
    canvas?: {
      /**
       * Margin between entry points and canvas boundaries
       */
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    }
  };
   /**
    * Configuration of spline strokes
    */
  stroke?: {
    /**
     * Spline stroke width in pixel
     */
    width: number;
    /**
     * Spline stroke color in hexadecimal, rgb, etc.
     */
    colors: string[];
  };
  /**
   * Configuration for Animation
   */
  animation?: {
    enabled?: boolean;
    /**
     * Animation frames per second, default 60
     */
    fps?: number;
    frequency?: number;
    /**
     * Amplitude of noise generated animation paths
     */
    amplitude?: number;
    /**
     * Radius of circular noise generated paths
     */
   radius?: number;
    /**
     * Ticks per one animation cycle
     */
    ticks?: number;
  };
  /**
   * Enable debug mode to draw all helpers like
   * points etc.
   */
  debug?: boolean;
}

