import { FC, useState } from 'react';
import { MyModal } from './MyModal';
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '../services/user/user.api';

export const ProfileHeader: FC = () => {

    const { id } = useParams<{ id?: string }>();
    const parsedId = Number(id);
    const { data } = useGetUserQuery(parsedId);
    const API_URL = process.env.REACT_APP_API_URL;
    const [showMyModal, setShowMyModal] = useState(false);
    const handleClose = () => setShowMyModal(false);

    if (!data) return <div className='text-center font-semibold text-white'>Profile not found.</div>

    return (
        <div className='py-6 px-6 bg-gray-800 border border-gray-700 rounded-xl w-full'>
            <div className='flex items-center h-full'>
                <div className='rounded-full overflow-hidden w-40 border-2 border-cyan-400 mr-4 aspect-square'>
                    <img onClick={() => setShowMyModal(true)} className='hover:cursor-pointer w-full h-full object-cover' src={`${API_URL}/${data?.profilePicturePath}`} alt="User's avatar" />
                    <MyModal picturePath={data.profilePicturePath} onClose={handleClose} visible={showMyModal} />
                </div>
                <div className='flex justify-between h-full w-full'>
                    <div className='flex flex-col justify-evenly items-center h-full'>
                        <div className='ml-2.5 flex text-xl w-full font-semibold'>
                            <p className='mr-1'>
                                {data.firstName}
                            </p>
                            <p>
                                {data.lastName}
                            </p>
                        </div>
                        <div className='flex items-center text-gray-300'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 mr-1'>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
                                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' />
                            </svg>
                            <p>Country: {data.occupation}</p>
                        </div>
                        <div className='ml-2.5 flex w-full text-gray-300'>
                            <p>Age: {data.age}</p>
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
