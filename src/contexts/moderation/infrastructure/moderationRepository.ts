import { http } from "@/shared/api";
import { dataEnvelope, type Page, type PageRequest, pageEnvelope } from "@/shared/http";
import { type Comment, commentSchema } from "../domain/comment";
import { type Decision, type Report, type ReportsSearch, reportSchema } from "../domain/report";

export const reportRepository = {
  list: (s: ReportsSearch, p: PageRequest, signal?: AbortSignal): Promise<Page<Report>> =>
    http("/admin/reports", {
      query: { status: s.status === "all" ? undefined : s.status, page: p.page, limit: p.limit, cursor: p.cursor },
      schema: pageEnvelope(reportSchema),
      signal,
    }),
  decide: async (id: number, body: { status: Decision; remove_content: boolean }): Promise<Report> =>
    (await http(`/admin/reports/${id}`, { method: "PUT", body, schema: dataEnvelope(reportSchema) })).data,
};

export const commentRepository = {
  list: (p: PageRequest, signal?: AbortSignal): Promise<Page<Comment>> =>
    http("/admin/comments", {
      query: { page: p.page, limit: p.limit, cursor: p.cursor },
      schema: pageEnvelope(commentSchema),
      signal,
    }),
  remove: async (id: number): Promise<void> => void (await http(`/comments/${id}`, { method: "DELETE" })),
};
