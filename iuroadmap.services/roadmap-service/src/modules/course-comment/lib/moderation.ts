export type CommentStatus = 'VISIBLE' | 'FLAGGED' | 'HIDDEN' | 'DELETED';

/**
 * Status after a new report (FR-LRN.10.8, BR-LRN-17): a VISIBLE comment is FLAGGED (temporarily
 * hidden from others) once its pending reports reach the threshold shared with FL-LR.
 */
export function statusAfterReport(status: CommentStatus, pendingReports: number, threshold: number): CommentStatus {
  if (status === 'VISIBLE' && pendingReports >= threshold) return 'FLAGGED';
  return status;
}

/** Whether a reader may see a comment: everyone sees VISIBLE, the author also sees their own. */
export function canSee(status: CommentStatus, isAuthor: boolean): boolean {
  if (status === 'VISIBLE') return true;
  if (status === 'DELETED') return false;
  return isAuthor;
}

/** Only VISIBLE comments can be edited by their author (FR-LRN.10.5). */
export function canEdit(status: CommentStatus): boolean {
  return status === 'VISIBLE';
}

/** Comments can be reported while they are shown (VISIBLE) or already queued (FLAGGED). */
export function canReport(status: CommentStatus): boolean {
  return status === 'VISIBLE' || status === 'FLAGGED';
}

/** Seconds until the rate-limit window frees one slot, or 0 when the user may post. */
export function rateLimitWait(recent: ReadonlyArray<Date>, now: Date, maxPerWindow: number, windowMinutes: number): number {
  const windowMs = windowMinutes * 60_000;
  const inWindow = recent.filter((d) => now.getTime() - d.getTime() < windowMs).sort((a, b) => a.getTime() - b.getTime());
  if (inWindow.length < maxPerWindow) return 0;
  const oldest = inWindow[inWindow.length - maxPerWindow];
  return Math.max(1, Math.ceil((oldest.getTime() + windowMs - now.getTime()) / 1000));
}
