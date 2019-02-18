/**
 * The Configuration stands for incoming parameters from outside
 * to adjust the outcoming graphs.
 */

export interface Config {
  /**
   * Amount of orientation points, excl. entry and vector points
   */
  points?: number;
  /**
   * Points distributation factor depending on canvas size
   */
  overshoot?: number;
  /**
   * Amount of splines
   */
  splines?: number;
  /**
   * Directional vectors coming next after entry points.
   * Starting as well ending points of graph drawn on canvs.
   * Enters the canvas (in)
   * Leaves the canvas (off)
   */
  vector?: {
    in: {
      /**
       * Vector direction set by part of tau. Examples:
       * 0 up, 0.25 right, 0.5 bottom, 0.75 left
       */
      direction: number;
      /**
       * Percentage of canvas height or width
       */
      tension: number;
    },
    out: {
      /**
       * Vector direction set by part of tau. Examples:
       * 0 up, 0.25 right, 0.5 bottom, 0.75 left
       */
      direction: number;
      /**
       * Percentage of canvas height or width
       */
      tension: number;
    }
  };
  /**
   * Configuration for Margins for Entrie Points, Splines and the Canvas at all.
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
       * Horizontal margin between entry points and canvas boundries
       */
      x?: number;
      /**
       * Vertical margin between entry points and canvas boundries
       */
      y?: number;
    }
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
    frequency: number;
    /**
     * Radius of noise generated node pathes
     */
    amplitude: number;
  };
}

