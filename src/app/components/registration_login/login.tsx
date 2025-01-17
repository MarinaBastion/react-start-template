import * as React from 'react'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Styles from './register.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, loginUser } from '../../store/auth';
import { useNavigate } from 'react-router-dom';

export interface ILoginData {
    password: string
    email: string
}

export const LoginForm: FC = () => {
    const { register, handleSubmit, formState, watch } = useForm<ILoginData>({
        defaultValues: {
            password: '',
            email: '',
        },
        mode: 'onChange',
    })
    const auth = useSelector(authSelectors.get);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = (data: ILoginData) => {
        var email = data.email;
        var password = data.password;
        dispatch(loginUser({email,password}));
    }
    const onRegister = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        navigate("/register")

    }
    const onRegisterThunk = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        navigate("/registerthunk")

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
                            // pattern: {
                            //     value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i,
                            //     message:
                            //         'Password must contain at least one upper case,at least one lower case english letter,at least one digit and minimum eight in length!',
                            // },
                        })}
                    />
                </div>
                {formState.errors.password && (
                    <p>{formState.errors.password.message}</p>
                )}
                {auth.error && (
                    <p>{auth.error}</p>
                )}
                <button type="submit" onClick={handleSubmit(onSubmit)}>
                    Login
                </button>
                <button onClick={(e) => onRegister(e)}>
                    Rgister
                </button>
                <button onClick={(e) => onRegisterThunk(e)}>
                    RgisterThunk
                </button>
            </form>
        </section>
    )
}
