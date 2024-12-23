import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { s } from './HookForm.module.css'
import { measureMemory } from 'vm'
import { useSelector } from 'react-redux';
import { authSelectors } from '../../store/auth';

export interface IForm {
    email?: string
    lastName?: string
    firstName?: string

}

export const HookForm: FC = () => {
    const auth = useSelector(authSelectors.get);
    const user =  auth.user;
    const { register, handleSubmit, formState } = useForm<IForm>({
        defaultValues: {
            email: user?.email ?? '',
            lastName:  user?.lastName ?? '',
            firstName:  user?.firstName ?? ''
        },
        mode: 'onChange',
    })

    const emailError = formState.errors.email
    const lastNameError = formState.errors.lastName
    const firstNameError = formState.errors.firstName

    const onSubmit = (data: IForm) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                placeholder="Email"
                {...register('email', {
                    required: true,
                    pattern: {
                        value: /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/i,
                        message: 'Invalid email adress',
                    },
                })}
            />
            {emailError && <p style={{ color: 'red' }}>{emailError.message}</p>}
            <textarea
                placeholder="lastName"
                {...register('lastName', {
                    required: 'Lastname is required',
                    maxLength: 15,
                })}
            ></textarea>
            {lastNameError && (
                <p style={{ color: 'red' }}>{lastNameError.message}</p>
            )}
            <textarea
                placeholder="firstName"
                {...register('firstName', {
                    required: 'Firstname is required',
                    maxLength: 15,
                })}
            ></textarea>
            {firstNameError && (
                <p style={{ color: 'red' }}>{firstNameError.message}</p>
            )}
            
            <button type="submit">Edit</button>
        </form>
    )
}
export default HookForm
