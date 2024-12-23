import * as React from 'react'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Styles from './register.module.css'
import {serverApi, useRegisterUserMutation} from "../../features/api/ServerApi"
import { SignUpBody } from 'src/app/types/RegisterTypes'
import {v4 as uuidv4} from 'uuid';
import {ErrorData,ErrorItem,Errors} from "../../types/ResponseErrors"
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from 'src/app/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRegisterThunk, registerThunkSelectors } from "../../store/registerThunk"

export interface IRegisterData {
    firstName: string
    lastName: string
    password: string
    repeatPassword: string
    email: string
    phoneNumber: string
    birthDate: Date
    gender: GenderEnum
}
export enum GenderEnum {
    female = 'female',
    male = 'male',
    notDefined = 'not defined',
}

export const RegisterThunkForm: FC = () => {
    const { register, handleSubmit, formState, watch } = useForm<IRegisterData>(
        {
            defaultValues: {
                firstName: '',
                lastName: '',
                password: '',
                email: '',
                phoneNumber: '',
                birthDate: null,
                gender: GenderEnum.notDefined,
            },
            mode: 'onChange',
        }
    )
    const [registerUser, { data,isLoading, error, isError,isSuccess }] = useRegisterUserMutation();
    const [ errorMessage, setErrorMessage ] = useState<string>(null)
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const registerResp = useSelector(registerThunkSelectors.get)

    const onSubmit = (data: IRegisterData) => {
        console.log(data)
        let body:SignUpBody  = { email: data.email, password: data.password,  commandId : uuidv4()}
       // registerUser(body);
      dispatch(fetchRegisterThunk(body));
        
    }
    const [passwordsNotMatchMessage, setPasswordsNotMatchMessage] =
        useState<string>(null)
    const watchPasswordsMatch = watch(['password', 'repeatPassword'])

    useEffect(() => {
        if (watchPasswordsMatch[0] != watchPasswordsMatch[1]) {
            setPasswordsNotMatchMessage('Passwords are not match!')
        } else setPasswordsNotMatchMessage(null)
    }, watchPasswordsMatch)

    useEffect(() => {
        debugger;
       console.log(error);
       if (error) {
        if ('status' in error) {
          const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
          setErrorMessage(errMsg);
        }        
      }
      else if(data) {
        setErrorMessage(null)
        navigate("/login")
    }
    }, [isLoading, error,isError,isSuccess,data])

    useEffect(() => {
        debugger;
       console.log(registerResp);
       if (registerResp.resp)
       {
         let r: ErrorItem[] = registerResp.resp
         let e =  r.reduce((s,b)=> (s + "," + b.message),"") 
         setErrorMessage(e)
       }
       else if (registerResp.data)
       {
        navigate("/login")
       }
    }, [registerResp])


    return (
        <section className={Styles.container}>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className={Styles.input_box}>
                    <label>First Name</label>
                    <input
                        type="text"
                        placeholder="Firstname"
                        {...register('firstName', {
                            required: 'Firstname is required',
                            maxLength: 55,
                        })}
                    ></input>
                </div>
                <div className={Styles.input_box}>
                    <label>Last Name</label>
                    <input
                        type="text"
                        placeholder="Lastname"
                        {...register('lastName', {
                            required: 'Lastname is required',
                            maxLength: 55,
                        })}
                    ></input>
                </div>
                <div className={Styles.input_box}>
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="Email"
                        {...register('email', {
                            required: true,
                            // pattern: {
                            //     //eslint-disable-next-line
                            // value: /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/i,
                            //     message: 'Invalid email adress',
                            // },
                        })}
                    />
                </div>
                <div className={Styles.column}>
                    <div className={Styles.input_box}>
                        <input
                            type="text"
                            placeholder="Phone number"
                            {...register('phoneNumber', {
                                required: true,
                                pattern: {
                                    //eslint-disable-next-line
                        value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i,
                                    message: 'Invalid phone number',
                                },
                            })}
                        />
                    </div>
                    <div className={Styles.input_box}>
                        <label>Birth Date</label>
                        <input
                            type="date"
                            placeholder="Enter birth date"
                            {...register('birthDate', {
                                required: 'Birth date is required',
                            })}
                        />
                    </div>
                </div>
                <div className={Styles.gender_box}>
                    <label>Gender Selection</label>
                    <select {...register('gender')}>
                        <option value="female">female</option>
                        <option value="male">male</option>
                        <option value="not defined">other</option>
                    </select>
                </div>
                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    {...register('password', {
                        required: 'You must specify a password',
            //             pattern: {
            //                 //eslint-disable-next-line
            // value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i,
            //                 message:
            //                     'Password must contain at least one upper case,at least one lower case english letter,at least one digit and minimum eight in length!',
            //             },
                    })}
                />
                {formState.errors.password && (
                    <p>{formState.errors.password.message}</p>
                )}

                <label>Repeat password</label>
                <input
                    name="repeatPassword"
                    type="password"
                    {...register('repeatPassword', {
                        required: 'You must specify a password',
            //             pattern: {
            //                 //eslint-disable-next-line
            // value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i,
            //                 message:
            //                     'Password must contain at least one upper case,at least one lower case english letter,at least one digit and minimum eight in length!',
            //             },
                    })}
                />
                {isError && (
                    <p>{errorMessage}</p>
                )} 
                 {errorMessage && (
                    <p>{errorMessage}</p>
                )} 
                {formState.errors.repeatPassword && (
                    <p>{formState.errors.repeatPassword.message}</p>
                )}
                {passwordsNotMatchMessage && <p>{passwordsNotMatchMessage}</p>}
                <button type="submit" onClick={handleSubmit(onSubmit)}>
                    Send
                </button>
                
            </form>
        </section>
    )
}

