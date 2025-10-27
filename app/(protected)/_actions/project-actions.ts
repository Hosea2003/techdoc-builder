"use server"

import { createClient } from "@/lib/supabase/server";
import { ProjectSchema } from "../_schema/project";
import { Project } from "@/types/project";

export type SaveProjectActionResponse = {
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


export async function fetchProjects():Promise<Project[]>{
    const supabase = await createClient();

    const {data:projects, error} = await supabase
        .from("projects")
        .select();

    if(error){
        return []
    }

    return projects;
}

export async function updateProjectAction(projectId:number, data:ProjectSchema):Promise<SaveProjectActionResponse>{
    const supabase = await createClient();

    const {data: project, error} = await supabase
        .from("projects")
        .update(data)
        .eq("id", projectId)
        .select()
        .single<Project>();

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