import React from 'react'
import {Logo,InputBtn,Button} from './index'
import { service } from '../appWrite/auth'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Login as authLogin } from '../store/authSlice';
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = React.useState(null);
    const handleLogin = async (data) => {
        console.log(data)
        setError('');
        try {
            const response = await service.LoginUser({...data});
            if(response){
                const user = await service.CurrentUser();
                if (user) dispatch(authLogin(user));
                navigate('/');
            }
        } catch (error) {
            setError("Login failed. Please try again.", error.message);
            throw error;
        }
    }
        return (
            <div
            className='h-screen flex items-center justify-center ' 
            >
                <div  className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                     <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-25">
                            <Logo width="100%" />
                        </span>
                    </div>
                </div>
                <h1>Sign in And Create New account</h1>
                <p>
                    dont have an account? 
                    <span className='font-medium text-primary transition-all duration-200 hover:underline' onClick={()=>navigate('/signup')}>
                        Sign up
                    </span>
                </p>
                {error && <p className='text-red-500'>{error}</p>}
                <form onSubmit={handleSubmit(handleLogin)}>
                    <InputBtn
                        label="Email: "
                        type="email"
                        placeholder='Enter your email'
                        className='mb-4'
                        name='email'
                        {...register('email',{ 
                            required: true,
                           matchPatern: (value) => /^\w+([-] \w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/
                                                    .test(value) || "Email address must be a valid address"

                         })}  
                    />
                    <InputBtn
                       label="Password: "
                        type="password"
                        placeholder='Enter your password'
                        className='mb-4'
                        name='password'
                        {...register('password')}
                        
                    />
                    <Button
                        type='submit'
                        classname='w-full'
                    >
                        Sign in
                    </Button>
                </form>
            </div>
        )
     }

export default Login