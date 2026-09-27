/**
 * Semester canvas geometry (design §4.1). Only logical positions (term, row order) are stored;
 * the web app turns them into pixels with these constants, so they never reach the database.
 */
export const RoadmapCanvas = {
  /** Width of one semester column, the gap to the next column included */
  LANE_WIDTH: 230,
  /** Empty space between two column backgrounds, so neighbouring semesters read apart */
  LANE_GAP: 36,
  /** Width of a course node, centred in its column */
  NODE_WIDTH: 150,
  NODE_HEIGHT: 56,
  /** Vertical distance between two rows */
  ROW_HEIGHT: 76,
  /** Space for the column title "Semester n (x+y)" */
  HEADER_HEIGHT: 64,
  CANVAS_PADDING: 24,
  /** Horizontal hit zone between two columns that creates a new term when a node is dropped in it */
  GAP_HIT_WIDTH: 18,
  /** Rows always drawn below the last node so there is room to drop */
  EXTRA_ROWS: 2,
} as const;
