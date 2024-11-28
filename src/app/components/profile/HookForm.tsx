import React from 'react'
import {FC} from 'react'
import {useForm} from 'react-hook-form'
import {s} from './HookForm.module.css'
import { measureMemory } from 'vm'

export interface IForm {
    email: string
    message: string
}

export const HookForm: FC = () =>{
    const {register,handleSubmit,formState} = useForm<IForm>({
    defaultValues:{
        email:'',
        message:'',
        },
        mode: 'onChange',        
    })

    const emailError = formState.errors.email
    const messageError = formState.errors.message

    const onSubmit = (data : IForm) =>{
        console.log(data)

    
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder='Email' {...register
            ('email',{
                required: true,
                pattern: {
                    value: /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/i,
                    message: 'Invalid email adress',
                }
            })
        }/>
        {emailError&& <p style={{ color: 'red'}}>{emailError.message}</p>}
        <textarea placeholder='message' {...register('message',{
            required : 'Message is required',
            maxLength:15})}></textarea>
            {messageError&& <p style={{ color: 'red'}}>{messageError.message}</p>}
        <button type='submit'>Send</button>
        </form>
}
export default HookForm;