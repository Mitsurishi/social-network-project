import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className=' px-5 shadow-md bg-[#c1121f] text-white'>
            <div className='container mx-auto flex justify-between items-center h-[80px]'>
                <Link className='font-bold text-lg' to=''>Приложение-Шляпа</Link>
                <div className='flex justify-between w-[150px]'>
                    <Link to=''><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-10 h-10 hover:shadow-md hover:bg-red-500 hover:rounded-md transition-all'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' />
                    </svg>
                    </Link>
                    <Link to='/posts'><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-10 h-10 hover:shadow-md hover:bg-red-500 hover:rounded-md transition-all'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z' />
                    </svg>
                    </Link>
                    <Link to='/users'><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-10 h-10 hover:shadow-md hover:bg-red-500 hover:rounded-md transition-all'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' />
                    </svg>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
