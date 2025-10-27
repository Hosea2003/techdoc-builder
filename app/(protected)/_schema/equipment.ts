import { equipmentTypes } from "@/types/project";
import z from "zod";

export const equipmentSchema = z.object({
    type:z.enum(equipmentTypes),
    room:z.string(),
    model:z.string(),
    quantity:z.int()
});

export type EquipmentSchema = z.infer<typeof equipmentSchema>;