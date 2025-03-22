import { z } from "zod";

export const subjectSchema = z.object({
  name: z.string().min(3, { message: "Subject Name is required" }),
});

export type SubjectInput = z.infer<typeof subjectSchema>;
