"use server";

import { createClient } from "@/lib/supabase/server";
import { EquipmentSchema } from "../_schema/equipment";
import { Equipment, POINTS_RULES } from "@/types/project";

export type AddNewEquipmentResponse = {
    error?:string;
    equipment:Equipment|null;
}

export async function addNewEquipment(data:EquipmentSchema, projectId:number):Promise<AddNewEquipmentResponse>{
    const supabase = await createClient();

    const {data:equipment, error} = await supabase
        .from("equipments")
        .insert({
            ...data,
            project_id:projectId
        })
        .select()
        .single<Equipment>();

    if(error){
        return {
            error:error.message,
            equipment:null
        }
    }

    await insertPoints(equipment);

    return {
        equipment
    }
}

export async function insertPoints(equipment:Equipment){
    const supabase = await createClient();
    const { data: existingPoints, error } = await supabase
        .from("equipment_points")
        .select("name")
        .eq("equipment_id", equipment.id);

    if(error){
        return null;
    }

    const rulePoints = POINTS_RULES[equipment.type];
    const newPoints = rulePoints
        .filter((p) => !existingPoints?.some((ep) => ep.name === p))
        .map((name) => ({
            equipment_id: equipment.id,
            name,
    }));

    if (newPoints.length > 0) {
        await supabase.from("equipment_points").insert(newPoints);
    }
}