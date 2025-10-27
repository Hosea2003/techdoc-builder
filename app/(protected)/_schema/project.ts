import z from "zod";

export const projectSchema = z.object({
    name:z.string(),
    client:z.string(),
    date:z.date()
});

export type ProjectSchema = z.infer<typeof projectSchema>;