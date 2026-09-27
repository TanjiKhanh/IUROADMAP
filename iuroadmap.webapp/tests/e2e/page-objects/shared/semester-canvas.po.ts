import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

/**
 * Semester canvas (React Flow) shared by the curriculum editor and My Roadmap.
 * Maps to: src/components/semester-canvas/SemesterCanvas.tsx
 *
 * Drop points are read from the DOM (the canvas is zoomed), never computed from constants.
 */
export class SemesterCanvasComponent {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get root(): Locator {
    return this.page.getByTestId('semester-canvas');
  }

  async waitForLoad() {
    await expect(this.root.locator('.react-flow__node-lane').first()).toBeVisible({ timeout: 20_000 });
  }

  laneHeader(termKey: string): Locator {
    return this.page.getByTestId(`lane-header-${termKey}`);
  }

  /** Column background node that contains the header of `termKey` */
  lane(termKey: string): Locator {
    return this.root.locator('.react-flow__node-lane', { has: this.laneHeader(termKey) });
  }

  laneMenu(termKey: string): Locator {
    return this.page.getByTestId(`lane-menu-${termKey}`);
  }

  /** Course node by the course code it shows */
  node(code: string): Locator {
    return this.root.locator('.react-flow__node-course', { hasText: code });
  }

  private async center(locator: Locator) {
    const box = await locator.boundingBox();
    if (!box) throw new Error('Element is not visible');
    return { x: box.x + box.width / 2, y: box.y + box.height / 2, box };
  }

  /** Mouse drag in small steps so React Flow (d3-drag) sees a real drag. */
  private async dragMouse(from: { x: number; y: number }, to: { x: number; y: number }) {
    await this.page.mouse.move(from.x, from.y);
    await this.page.mouse.down();
    await this.page.mouse.move(from.x + 5, from.y + 5, { steps: 3 });
    await this.page.mouse.move(to.x, to.y, { steps: 15 });
    await this.page.mouse.up();
  }

  /** Drop a course node onto another course: it is inserted before that course (design §4.2). */
  async dragNodeOnto(code: string, targetCode: string) {
    const from = await this.center(this.node(code));
    const to = await this.center(this.node(targetCode));
    await this.dragMouse(from, to);
  }

  /** Drop a course node in the empty bottom part of a column. */
  async dragNodeToLane(code: string, termKey: string) {
    const from = await this.center(this.node(code));
    const { box } = await this.center(this.lane(termKey));
    await this.dragMouse(from, { x: box.x + box.width / 2, y: box.y + box.height * 0.85 });
  }

  /** Drop a course node on the border before a column: a new term is created (learner). */
  async dragNodeToGapBefore(code: string, termKey: string) {
    const from = await this.center(this.node(code));
    // the lane node's box starts exactly on the border (its background is inset by half of LANE_GAP)
    const { box } = await this.center(this.lane(termKey));
    await this.dragMouse(from, { x: box.x, y: box.y + box.height / 2 });
  }

  /** Drag the right handle of A to the left handle of B. */
  async connect(sourceCode: string, targetCode: string) {
    const source = await this.center(this.node(sourceCode).locator('.react-flow__handle-right'));
    const target = await this.center(this.node(targetCode).locator('.react-flow__handle-left'));
    await this.dragMouse(source, target);
  }

  /** Catalog course card; the sidebar lists one page only, so search it by code first. */
  async findInCatalog(code: string): Promise<Locator> {
    const search = this.page.getByTestId('catalog-sidebar').getByRole('textbox');
    await search.fill(code);
    await search.press('Enter');
    const card = this.page.getByTestId(`catalog-course-${code}`);
    await expect(card).toBeVisible({ timeout: 15_000 });
    return card;
  }

  /** HTML5 drag of a catalog course onto a course of the canvas: inserted before it. */
  async dragCatalogCourseOnto(code: string, targetCode: string) {
    await (await this.findInCatalog(code)).dragTo(this.node(targetCode));
  }

  /**
   * Click the empty bottom of a column: clears the selection (shows the issues / hints panel).
   * The column can be taller than the pane or the window, so click its lowest visible point.
   */
  async clearSelection(termKey: string) {
    await this.root.scrollIntoViewIfNeeded();
    const box = await this.lane(termKey).boundingBox();
    const pane = await this.root.boundingBox();
    const viewport = this.page.viewportSize();
    if (!box || !pane || !viewport) throw new Error('Lane is not visible');
    const bottom = Math.min(box.y + box.height, pane.y + pane.height, viewport.height) - 12;
    await this.page.mouse.click(box.x + box.width / 2, bottom);
  }

  /** HTML5 drag of a catalog course onto a column (catalog sidebar). */
  async dragCatalogCourseToLane(code: string, termKey: string) {
    const lane = this.lane(termKey);
    const box = await lane.boundingBox();
    if (!box) throw new Error('Lane is not visible');
    await (await this.findInCatalog(code)).dragTo(lane, { targetPosition: { x: box.width / 2, y: box.height * 0.85 } });
  }
}
