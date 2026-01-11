import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../../features/authSlice'
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { Input, Button, Logo } from '../index'
import { useForm } from 'react-hook-form'


function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data);

            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/")
                };
            };
        } catch (error) {
            setError(error.message)
        };
    };


    return (
        <div className='w-full flex justify-center'>
            <div className=' w-full lg:w-1/2 bg-white rounded-2xl p-5 flex flex-col gap-5'>
                <div className='flex justify-center'>
                    <span>
                        <Logo width="100px" />
                    </span>
                </div>
                <div className='flex flex-col items-center gap-2.5'> 
                    <h2 className='text-2xl text-purple-600 font-semibold '>Sign in to your Account</h2>
                    <p>
                        Don&apos;t have any Account? &nbsp;
                        <Link to='/signup'
                            className=''
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
                {error && <p className='text-red-600'>{error}</p>}

                <form onSubmit={handleSubmit(login)}>
                    <div className='flex flex-col gap-5 '>
                        <Input
                            label='Email: '
                            placeholder="Enter your email"
                            type="email"
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) || "Invalid email format"


                                }
                            })}
                        />
                        <Input
                            label='Password: '
                            placeholder="Enter your password"
                            type="password"
                            {...register('password', {
                                required: true,
                            })}
                        />
                        <Button
                            type='submit'
                            className='w-full hover:bg-purple-500 cursor-pointer transition duration-200'
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login

