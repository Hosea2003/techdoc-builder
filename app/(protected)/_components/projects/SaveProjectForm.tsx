"use client";

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { projectSchema, ProjectSchema } from '../../_schema/project';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { saveProjectAction } from '../../_actions/project-actions';
import {ClipLoader} from "react-spinners"

function SaveProjectForm() {

    const [open, setOpen] = useState(false);
    const form = useForm<ProjectSchema>({
        resolver:zodResolver(projectSchema),
        defaultValues:{
            name:"",
            client:"",
            date:new Date()
        }
    });

    const isSubmitting = form.formState.isSubmitting;

    const handleSaveProject = async (data:ProjectSchema)=>{
        const response = await saveProjectAction(data);
        if(response.error){
            form.setError("root", {message:response.error})
            return;
        }
        form.reset({
            name:"",
            client:"",
            date:new Date()
        })
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button>
                Ajouter un projet
            </Button>
        </DialogTrigger>
        <DialogContent>
            <Form {...form}>
                <form className='flex flex-col gap-4'
                    onSubmit={form.handleSubmit(handleSaveProject)}
                >
                    <p className="text-xl">Add project</p>
                    <FormField
                        name='name'
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Nom</FormLabel>
                                <Input {...field}/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name='client'
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Client</FormLabel>
                                <Input {...field}/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name='date'
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Date</FormLabel>
                                <Input 
                                    {...field} 
                                    type='date'
                                    value={field.value ? field.value.toISOString().split("T")[0] : ""}
                                    onChange={(e) => field.onChange(new Date(e.target.value))}
                                />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-2 justify-end">
                        <Button variant={"secondary"} type='button'
                            onClick={()=>setOpen(false)}
                        >
                            Annuler
                        </Button>
                        <Button
                            disabled={isSubmitting}
                        >
                            {isSubmitting?(
                                <>
                                    <ClipLoader color='white' size={20}/>
                                    En ajout
                                </>
                            ):"Ajouter"}
                            Ajouter
                        </Button>
                    </div>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}

export default SaveProjectForm