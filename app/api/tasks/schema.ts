import { z } from "zod";

export const statusSchema = z.object({
  status: z.enum(["OPEN", "CLOSED"]),
  task: z.string().min(3),
});

export const taskSchema = z.object({
  task: z.string().min(3),
});
