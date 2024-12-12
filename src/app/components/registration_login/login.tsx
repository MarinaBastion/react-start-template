import * as React from 'react'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Styles from './register.module.css'

export interface ILoginData {
    password: string
    email: string
}

export const RegisterForm: FC = () => {
    const { register, handleSubmit, formState, watch } = useForm<ILoginData>({
        defaultValues: {
            password: '',
            email: '',
        },
        mode: 'onChange',
    })
    const onSubmit = (data: ILoginData) => {
        console.log(data)
    }

    return (
        <section className={Styles.container}>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className={Styles.input_box}>
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="Email"
                        {...register('email', {
                            required: 'You must specify an email',
                            pattern: {
                                value: /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/i,
                                message: 'Invalid email adress',
                            },
                        })}
                    />
                </div>
                <div className={Styles.input_box}>
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        {...register('password', {
                            required: 'You must specify a password',
                            pattern: {
                                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i,
                                message:
                                    'Password must contain at least one upper case,at least one lower case english letter,at least one digit and minimum eight in length!',
                            },
                        })}
                    />
                </div>
                {formState.errors.password && (
                    <p>{formState.errors.password.message}</p>
                )}
                <button type="submit" onClick={handleSubmit(onSubmit)}>
                    Login
                </button>
            </form>
        </section>
    )
}
