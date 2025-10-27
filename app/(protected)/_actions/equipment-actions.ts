"use server";

import { createClient } from "@/lib/supabase/server";
import { EquipmentSchema } from "../_schema/equipment";
import { Equipment } from "@/types/project";

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

    return {
        equipment
    }
}