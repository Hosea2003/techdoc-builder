"use client";

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { deleteProjectAction } from '../../_actions/project-actions';
import { useProjectStore } from '@/store/projectStore';
import { useRouter } from 'nextjs-toploader/app';
import { ClipLoader } from 'react-spinners';
import { Trash } from 'lucide-react';

function RemoveProject({projectId}:{projectId:number}) {

    const [open, setOpen] = useState(false);
    const {removeProject} = useProjectStore();
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    async function onRemoveProject(){
        setLoading(true)
        const response = await deleteProjectAction(projectId);
        if(!response.error){
            removeProject(projectId);
        }
        router.push("/projects");
        setLoading(false)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"destructive"}>
                    <Trash/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <p className='text-lg'>Voulez vous supprimer ce projet</p>
                <div className="flex gap-4 justify-end">
                    <Button variant={"destructive"} type='button'
                        onClick={()=>onRemoveProject()}
                        disabled={loading}
                    >
                        {loading && (
                            <ClipLoader size={20} color='white'/>
                        )}
                        Oui
                    </Button>
                    <Button type='button' variant={"secondary"}
                        onClick={()=>setOpen(false)}
                    >
                        Non
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RemoveProject