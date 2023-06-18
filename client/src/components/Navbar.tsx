import { Link, useNavigate } from 'react-router-dom';
import { useLazyLogoutQuery } from '../services/auth/auth.api';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { clearUser, selectAuth } from '../store/auth/authSlice';
import { useEffect } from 'react';

export const Navbar = () => {

    const [logout, { isSuccess: isLogoutSuccess, isError: isLogoutError, error: logoutError }] = useLazyLogoutQuery();
    const { id: userId, email, firstName, lastName, token } = useAppSelector(selectAuth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const logoutHandler = async () => {

        await logout();

    };
    useEffect(() => {

        if (isLogoutSuccess) {
            toast.success('Logged out successfully', {});
            dispatch(clearUser());
            navigate('/auth');
        }

    });
    useEffect(() => {

        if (isLogoutError) {
            toast.error((logoutError as any).data.message)
        }

    }, [isLogoutError])

    return (
        <nav className='px-5 shadow-md bg-gray-800 text-white border-b-1 border-gray-300'>
            <div className='container mx-auto m-w- flex justify-between items-center h-[60px]'>
                <Link className='flex items-center font-bold text-lg h-full' to='/feed'>My social network</Link>
                <div className='flex items-center w-[210px] h-full'>
                    <Link className='flex px-2.5 h-full hover:shadow-md hover:bg-gray-500 transition-all' to=''>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-10'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' />
                        </svg>
                    </Link>
                    <Link className='flex justify-center px-2.5 h-full hover:shadow-md hover:bg-gray-500 transition-all' to='/feed'>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-10'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z' />
                        </svg>
                    </Link>
                    <div className='flex justify-center items-center pl-2.5 pr-5 h-full cursor-pointer hover:shadow-md hover:bg-gray-500 transition-all' onClick={() => logoutHandler()}>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-10 mr-1'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9' />
                        </svg>
                        <span className='font-semibold'>Logout</span>
                    </div>
                </div>
            </div>
        </nav>
    )
}
