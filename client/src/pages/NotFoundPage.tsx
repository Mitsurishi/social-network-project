import { Link } from "react-router-dom"

export const NotFoundPage = () => {

    return (

        <div className='bg-gray-900 w-full min-h-screen flex flex-col justify-center items-center h-full'>
            <div className='flex justify-center items-center h-full mb-2'>
                <div className='text-white font-bold text-3xl mr-1'>
                    Page not found
                </div>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-10 h-10 text-white'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z' />
                </svg>
            </div>
            <Link className='text-white text-xl font-semibold hover:text-gray-400' to='/feed' >Go to the Homepage</Link>
        </div>

    )
}
