import { describe, expect, it } from "vitest";
import { visibleNavigation } from "./nav";

describe("permission-based navigation", () => {
  it("shows only what a moderator may use", () => {
    const perms = new Set(["report.moderate", "comment.moderate"]);
    const nav = visibleNavigation((codes) => codes.length === 0 || codes.some((c) => perms.has(c)));
    const items = nav.flatMap((g) => g.items.map((i) => i.to));
    expect(items).toEqual(["/tags", "/reports", "/comments", "/sessions"]);
    expect(nav.map((g) => g.label)).toEqual(["nav.content", "nav.moderation", "nav.access"]);
  });
  it("super admin sees all", () => {
    expect(visibleNavigation(() => true).flatMap((g) => g.items)).toHaveLength(14);
  });
});
