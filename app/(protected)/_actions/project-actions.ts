"use server"

import { createClient } from "@/lib/supabase/server";
import { ProjectSchema } from "../_schema/project";
import { Project } from "@/types/project";

type SaveProjectActionResponse = {
    error?:string;
    project:Project|null
}

export async function saveProjectAction(data:ProjectSchema):Promise<SaveProjectActionResponse>{
    const supabase = await createClient();

    const {data:project, error} = await supabase
        .from("projects")
        .insert({
            ...data
        })
        .select()
        .single<Project>()

    if(error){
        console.log(error)
        return {
            error:error.message,
            project:null
        }
    }

    return {
        project
    }
}