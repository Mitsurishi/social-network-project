import { useEffect, useState } from 'react'
import { useLoginMutation } from '../store/auth/auth.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const initialState = {

    email: '',

    password: '',

    confirmPassword: '',

    firstName: '',

    lastName: '',

    age: '',

    occupation: '',

}

export const AuthPage = () => {

    const [formValue, setFormValue] = useState(initialState);
    const [showRegister, setShowRegister] = useState(false);
    const [file, setFile] = useState<File | undefined>();
    const navigate = useNavigate();
    const [login,
        {
            data: loginData,
            isSuccess: isLoginSuccess,
            isError: isLoginError,
            isLoading: isLoginLoading,
            error: loginError
        }
    ] = useLoginMutation()
    const { email, password, confirmPassword, firstName, lastName, age, occupation } = formValue;
    const handleChange = (e: any) => {

        setFormValue({ ...formValue, [e.target.name]: e.target.value });

    }
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.files) {
            setFile(e.target.files[0])
        }

    }
    const handleLogin = async () => {

        if (email && password) {
            await login({ email, password });
        } else {
            toast.error('Please fill all fields')
        }

    }
    useEffect(() => {
        if (isLoginSuccess) {
            toast.success('Logged successfully')
            navigate('/feed')
        }
    }, [isLoginSuccess])
    return (
        <section className='h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
            <div className='h-full flex justify-center items-center'>
                <div className='bg-gray-800 py-8 px-6 text-white border-gray-950 rounded-2xl text-center min-w-[380px]'>
                    <h2 className='font-bold mb-4 text-4xl'>
                        {!showRegister ? 'Login' : 'Register'}
                    </h2>
                    <p className='mb-4 font-semibold'>
                        {!showRegister ? 'Please enter your email & password' : 'Please enter your details'}
                    </p>
                    <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                        <div className='space-y-6'>
                            <div>
                                <div className='mt-2'>
                                    <input
                                        id='email'
                                        name='email'
                                        type='email'
                                        placeholder='Email'
                                        autoComplete='email'
                                        value={email}
                                        onChange={handleChange}
                                        required
                                        className='block w-full rounded-md border-0 px-1.5 py-1.5 -900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black'
                                    />
                                </div>
                            </div>
                            <div>
                                <div className='mt-2'>
                                    <input
                                        id='password'
                                        name='password'
                                        type='password'
                                        placeholder='Password'
                                        autoComplete='current-password'
                                        value={password}
                                        onChange={handleChange}
                                        required
                                        className='block w-full rounded-md border-0 px-1.5 py-1.5 -900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black'
                                    />
                                </div>
                            </div>
                            {showRegister && (
                                <>
                                    <div>
                                        <div className='mt-2'>
                                            <input
                                                name='confirmPassword'
                                                type='password'
                                                placeholder='Confirm password'
                                                value={confirmPassword}
                                                onChange={handleChange}
                                                required
                                                className='block w-full rounded-md border-0 px-1.5 py-1.5 -900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black'
                                            />
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div>
                                            <div className='mr-2.5'>
                                                <input
                                                    name='firstName'
                                                    type='text'
                                                    placeholder='First name'
                                                    value={firstName}
                                                    onChange={handleChange}
                                                    required
                                                    className='block w-full rounded-md border-0 px-1.5 py-1.5 -900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black'
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <input
                                                    name='lastName'
                                                    type='text'
                                                    placeholder='Last name'
                                                    value={lastName}
                                                    onChange={handleChange}
                                                    required
                                                    className='block w-full rounded-md border-0 px-1.5 py-1.5 -900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div>
                                            <div className='mr-2.5'>
                                                <input
                                                    name='Age'
                                                    type='text'
                                                    placeholder='Age'
                                                    value={age}
                                                    onChange={handleChange}
                                                    required
                                                    className='block w-full rounded-md border-0 px-1.5 py-1.5 -900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black'
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <input
                                                    name='occupation'
                                                    type='text'
                                                    placeholder='Occupation'
                                                    value={occupation}
                                                    onChange={handleChange}
                                                    required
                                                    className='block w-full rounded-md border-0 px-1.5 py-1.5 -900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <input
                                                name='file'
                                                type='file'
                                                onChange={handleFile}
                                                required
                                                className='block w-full rounded-md border-0 px-1.5 py-1.5 -900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black'
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            {!showRegister ? (<div>
                                <button
                                    onClick={() => handleLogin()}
                                    className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                >
                                    Sign in
                                </button>
                            </div>) : (<div>
                                <button
                                    className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                >
                                    Sign up
                                </button>
                            </div>)}
                            <div>
                                <h5>
                                    {!showRegister ? (
                                        <>
                                            Don't have an account?
                                            <p className='font-bold cursor-pointer' onClick={() => setShowRegister(true)}>Sign up</p>
                                        </>
                                    ) : (
                                        <>
                                            Already have an account?
                                            <p className='font-bold cursor-pointer' onClick={() => setShowRegister(false)}>Sign in</p>
                                        </>
                                    )}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
