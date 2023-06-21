import { useState } from "react";
import { MyModal } from "./MyModal";


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

    const API_URL = 'http://localhost:8000'
    const [showMyModal, setShowMyModal] = useState(false);
    const handleClose = () => setShowMyModal(false)

    return (
        <div className='py-6 px-6 bg-gray-800 border border-gray-700 rounded-xl'>
            <div className='flex items-center'>
                <div className='rounded-full overflow-hidden w-40 border-2 border-cyan-400 mr-4'>
                    <img onClick={() => setShowMyModal(true)} className='hover:cursor-pointer' src={`${API_URL}/${props.profilePicturePath}`} alt="User's avatar" />
                    <MyModal profilePicturePath={props.profilePicturePath} onClose={handleClose} visible={showMyModal} />
                </div>
                <div>
                    <div className='flex font-semibold text-xl'>
                        <div className='mr-1'>
                            {props.firstName}
                        </div>
                        <div>
                            {props.lastName}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
