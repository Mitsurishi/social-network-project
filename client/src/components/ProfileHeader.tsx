import { useState } from 'react';
import { MyModal } from './MyModal';


interface ProfileHeaderProps {

    userId: number | undefined;

    email: string | undefined;

    firstName: string | undefined;

    lastName: string | undefined;

    age: string | undefined;

    occupation: string | undefined;

    profilePicturePath: string | undefined;

}

export const ProfileHeader = (props: ProfileHeaderProps) => {

    const API_URL = 'http://localhost:8000';
    const [showMyModal, setShowMyModal] = useState(false);
    const handleClose = () => setShowMyModal(false);

    return (
        <div className='py-6 px-6 bg-gray-800 border border-gray-700 rounded-xl w-full'>
            <div className='flex items-center h-full'>
                <div className='rounded-full overflow-hidden w-40 border-2 border-cyan-400 mr-4'>
                    <img onClick={() => setShowMyModal(true)} className='hover:cursor-pointer' src={`${API_URL}/${props.profilePicturePath}`} alt="User's avatar" />
                    <MyModal profilePicturePath={props.profilePicturePath} onClose={handleClose} visible={showMyModal} />
                </div>
                <div className='flex justify-between h-full w-full'>
                    <div className='flex flex-col justify-evenly items-center h-full'>
                        <div className='flex text-xl font-semibold'>
                            <p className='mr-1'>
                                {props.firstName}
                            </p>
                            <p>
                                {props.lastName}
                            </p>
                        </div>
                        <div className='flex items-center text-gray-300'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 mr-1'>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
                                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' />
                            </svg>
                            <p>Country: {props.occupation}</p>
                        </div>
                        <div className='ml-2.5 flex w-full text-gray-300'>
                            <p>Age: {props.age}</p>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <button className='px-4 py-2 rounded-xl bg-gray-600 font-semibold hover:bg-gray-500 transition-all'>Edit profile</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
