"use server"

import { LoginSchema } from "./schema"
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type LoginActionResponse = {
    errors?: string;
}

export async function LoginAction(data:LoginSchema):Promise<LoginActionResponse>{

    const supabase = await createClient();
    const {error} = await supabase.auth.signInWithPassword({
        ...data
    });

    if(error){
        return {
            errors:"Email ou mot de passe invalide"
        }
    }

    redirect("/");
}