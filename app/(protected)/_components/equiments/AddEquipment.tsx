"use client";

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { equipmentSchema, EquipmentSchema } from '../../_schema/equipment';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { equipmentTypes } from '@/types/project';
import { Input } from '@/components/ui/input';
import { ClipLoader } from 'react-spinners';
import { addNewEquipment } from '../../_actions/equipment-actions';
import { Card, CardContent } from '@/components/ui/card';

function AddEquipment({projectId}:{projectId:number}) {

  const [open, setOpen] = useState(false);
  const form = useForm<EquipmentSchema>({
    resolver:zodResolver(equipmentSchema),
    defaultValues:{
      type:"HVAC",
      room:"",
      model:"",
      quantity:0
    }
  });

  const isSubmitting = form.formState.isSubmitting;

  const handleSaveEquipment = async (data:EquipmentSchema)=>{
    const response = await addNewEquipment(data, projectId);

    if(response.error){
      form.setError("root", {
        message:response.error
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant={"secondary"} className='w-fit'>
                Ajouter un equipement
            </Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form className='flex flex-col gap-4'
              onSubmit={form.handleSubmit(handleSaveEquipment)}
            >
              <p className='text-xl font-semibold'>Ajout d&apos;equipement</p>
              <div className="flex w-full gap-4">
                <FormField
                  name='type'
                  control={form.control}
                  render={({field:{value, onChange}})=>(
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        value={value}
                        onValueChange={(value)=>onChange(value)}
                      >
                        <SelectTrigger className='w-[180px]'>
                          <SelectValue placeholder="Type"/>
                        </SelectTrigger>
                        <SelectContent>
                          {equipmentTypes.map((e, index)=>(
                            <SelectItem value={e} key={index}>{e}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}/>
                  <FormField
                    name='room'
                    control={form.control}
                    render={({field})=>(
                      <FormItem className='flex-1'>
                        <FormLabel>Room</FormLabel>
                        <Input {...field}/>
                      </FormItem>
                    )}/>
              </div>
              <div className="flex gap-4 w-full">
                <FormField
                  name='model'
                  control={form.control}
                  render={({field})=>(
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <Input {...field}/>
                    </FormItem>
                  )}/>
                <FormField
                  name="quantity"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantité</FormLabel>
                      <Input
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? undefined : parseInt(value, 10));
                        }}
                      />
                    </FormItem>
                  )}
                />
              </div>
              {form.formState.errors.root && (
                <Card>
                  <CardContent>
                    <p className='text-sm text-destructive'>{form.formState.errors.root.message}</p>
                  </CardContent>
                </Card>
              )}
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
                              {/* {project?"Modification":"Ajout"} */}
                          </>
                      ):"Ajouter"}
                  </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
    </Dialog>
  )
}

export default AddEquipment