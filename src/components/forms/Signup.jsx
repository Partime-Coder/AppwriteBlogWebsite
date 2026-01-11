import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin, login } from '../../features/authSlice'
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { Input, Button, Logo } from '../index'
import { useForm } from 'react-hook-form'

function Signup() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("")

  const signup = async (data) => {
    setError("")

    try {
      const userData = await authService.createAccount(data);

      if (userData) {
        const userData = await authService.getCurrentUser()

        if (userData) dispatch(login(userData));
        navigate("/");

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
          <h2 className='text-2xl text-purple-600 font-semibold '>Sign up to create Account</h2>
          <p>
            Already have any Account? &nbsp;
            <Link to='/login'
              className=''
            >
              Sign up
            </Link>
          </p>
        </div>
        {error && <p className='text-red-600'>{error}</p>}

        <form onSubmit={handleSubmit(signup)}>
          <div className='flex flex-col gap-5 '>
            <Input
              label="Full Name: "
              type="text"
              placeholder="Enter your name"
              {...register("name", {
                required: true
              })}
            />
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
            >Sign Up</Button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Signup
