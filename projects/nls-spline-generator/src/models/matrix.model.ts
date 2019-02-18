export interface Matrix {
  width: number;
  height: number;
  /**
   * How far should the generated directional points leave
   * the center of the matrix. `1` equals to 100% inside
   * the matrix and `0` would force most points to be
   * in the middle of the matrix.
   */
  overshoot?: number;
}
