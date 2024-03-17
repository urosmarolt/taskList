import { z } from "zod";

export const statusSchema = z.object({
  status: z.enum(["OPEN", "CLOSED"]),
});

export const taskSchema = z.object({
  task: z.string().min(3),
});
