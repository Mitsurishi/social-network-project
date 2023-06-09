import { FC } from "react";

interface MyModalProps {

    visible: boolean;

    onClose: Function;

    picturePath?: string;

}

export const MyModal: FC<MyModalProps> = ({ visible, onClose, picturePath }) => {

    const API_URL = 'http://localhost:8000';
    const isBlob = picturePath?.includes('blob:');

    if (!visible) return null;

    const handleCLick = (e: React.BaseSyntheticEvent) => {
        if (e.target.id === 'modal') {
            onClose();
        }
    }
    const handleEscapeClick = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }


    return (
        <div id='modal' ref={(node) => node && node.focus()} onClick={handleCLick} tabIndex={-1} onKeyDown={handleEscapeClick} className='z-10 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center hover:cursor-pointer group'>
            {!isBlob && < img className='bg-gray-800 rounded-xl hover:cursor-default max-w-4xl' src={`${API_URL}/${picturePath}`} alt="User's avatar" />}
            {isBlob && <img className='bg-gray-800 rounded-xl hover:cursor-default max-w-4xl' src={picturePath} alt="User's avatar" />}
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-10 h-10 absolute top-1.5 right-1.5 text-gray-400 group-hover:text-white'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
        </div>
    )
}
