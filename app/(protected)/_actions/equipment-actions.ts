"use server";

import { createClient } from "@/lib/supabase/server";
import { EquipmentSchema } from "../_schema/equipment";
import { Equipment, POINTS_RULES } from "@/types/project";
import { PDFDocument, StandardFonts } from "pdf-lib";
import Papa from "papaparse";

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

export async function generateProjectPDF(projectId: number) {
    const supabase = await createClient();

    const { data: project } = await supabase
        .from('projects')
        .select('id, name, client, created_at')
        .eq('id', projectId)
        .single();

    const { data: points } = await supabase
        .from('equipment_points')
        .select(`
            equipment_id,
            name,
            equipments!inner(
                id,
                type,
                project_id
            )
        `)
        .eq('equipments.project_id', projectId);

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    if(!project){
        return
    }

    let y = 750;
    page.drawText(`Fiche Projet`, { x: 50, y, size: 24, font });
    y -= 40;
    page.drawText(`Titre: ${project.name}`, { x: 50, y, size: 14, font });
    y -= 20;
    page.drawText(`Client: ${project.client}`, { x: 50, y, size: 14, font });
    y -= 20;
    page.drawText(`Date: ${new Date(project.created_at).toLocaleDateString()}`, { x: 50, y, size: 14, font });
    y -= 40;

    page.drawText(`Équipement | Points`, { x: 50, y, size: 14, font });
    y -= 20;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    points?.forEach((p: any) => {
        page.drawText(`${p.equipments.type} | ${p.name}`, { x: 50, y, size: 12, font });
        y -= 15;
    });

    return Buffer.from(await pdfDoc.save());
}

export async function exportProjectPointsCSV(projectId: number): Promise<string | null> {
    const supabase = await createClient();

    const { data: points, error } = await supabase
        .from("equipment_points")
        .select(`
            equipment_id,
            name,
            equipments!inner(
                id,
                type,
                project_id
            )
        `)
        .eq("equipments.project_id", projectId);

    if (error) {
        console.error("Supabase error:", error);
        return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const csvData = points?.map((p: any) => ({
        equipment_id: p.equipment_id,
        equipment_type: p.equipments.type,
        point_name: p.name,
    })) || [];

    const csvString = Papa.unparse(csvData, {
        delimiter: ",",
        header: true,
    });

    return csvString;
}