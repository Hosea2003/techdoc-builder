"use client"

import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import { useForm } from 'react-hook-form'
import { loginSchema, LoginSchema } from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input, PasswordInput } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoginAction } from '../action'

function LoginForm() {
  
  const form = useForm<LoginSchema>({
    resolver:zodResolver(loginSchema),
    defaultValues:{
      email:"",
      password:""
    }
  });

  const isSubmitting = form.formState.isSubmitting;

  const handleLogin = async (data:LoginSchema)=>{
    const response = await LoginAction(data);

    if(response.errors){
      form.setError("email", {
        message:"Email incorrect"
      });
      form.setError("password",{
        message:"Mot de passe incorrect"
      });
    }
  }

  return (
    <Card className='min-w-lg'>
      <CardContent>
        <Form {...form}>
          <form className='flex flex-col gap-8 mt-10' onSubmit={form.handleSubmit(handleLogin)}>
            <div className="m-auto">
              <p className='text-2xl font-bold'>TechDoc Builder</p>
            </div>
            <FormField
              name='email'
              control={form.control}
              render={({field})=>(
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} inputMode='email'/>
                </FormItem>
              )}/>
            <FormField
              name='password'
              control={form.control}
              render={({field})=>(
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <PasswordInput {...field}/>
              </FormItem>
            )}/>
            <Button
              disabled={isSubmitting}
            >
              {isSubmitting ?(
                <>
                  Connexion
                </>
              ):(
                "Se connecter"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default LoginForm