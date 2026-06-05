// now will create acount for user to sign up and then will create a login page for user to login and then will create a dashboard for user to see their profile and then will create a logout button for user to logout
import React, { useState } from 'react'
import {Button, InputBtn,Logo} from './index'
import { useNavigate } from 'react-router-dom'
import {Login as storeLogin} from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { service } from '../appWrite/auth'

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const {register, handleSubmit} = useForm();

const handleSignUp = async (userdata) => {
  console.log(userdata);
  setError('');
  
  try {
    // 1. Create the account (Ensure your service passes ID.unique() as the first argument)
    const user = await service.createAcount(userdata); 
    
    if (user) {
      // 2. Log the user in immediately to establish a session
      await service.LoginUser({ email: userdata.email, password: userdata.password });
      
      // 3. Now you can safely fetch the active session/user data
      const session = await service.CurrentUser(); 
      
      if (session) {
        dispatch(storeLogin(session));
      }
      
      // 4. Redirect the user to the dashboard or home (instead of back to login)
      navigate('/dashboard'); 
    }
  } catch (error) {
    // Note: console.log error to debug, setError takes strings for UI rendering
    console.error(error);
    setError(error.message || 'Sign up failed. Please try again.'); 
  }
}
    return (
            <div
            className='flex items-center justify-center ' 
            >
                <div  className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                     <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-25">
                            <Logo width="100%" />
                        </span>
                    </div>
                </div>
                <h1>Sing in to your acount</h1>
                <p>
                    if you have already an account? 
                        <span className='font-medium text-primary transition-all duration-200 hover:underline' onClick={()=>navigate('/login')}>
                            Sign in
                        </span>
                    </p>
                    {error && <p className='text-red-500'>{error}</p>}
                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <InputBtn
                        label="Name: "
                        type="text"
                        placeholder='Enter your name'
                        { ...register( 'name', {required: true,} ) }
                            />
                    <InputBtn
                        label="Email: "
                        type="email"
                        placeholder='Enter your email'
                        {...register('email', { 
                            required: true,
                            matchPatern: (value) => /^\w+([-] \w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/
                                .test(value) || "Email address must be a valid address"
                            
                        })}
                    />
                    <InputBtn
                        label="Password: "
                        type="password"
                        placeholder='Enter your password'
                        {...register('password', { required: true })}
                    />
                    <Button
                        type='submit'
                        classname='w-full'
                    >
                        Create Account
                    </Button>
                </form>
            </div>
        )
     }
export default SignUp;