import { FC, useEffect, useState } from 'react';
import { useDeletePostMutation } from '../services/post/post.api';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { selectAuth } from '../store/auth/authSlice';
import { removePost } from '../store/post/postSlice';
import { MyModal } from './MyModal';


interface PostItemProps {

    postId: number;

    userId: number;

    firstName?: string;

    lastName?: string;

    userPicturePath?: string;

    content?: string;

    postPicturePath?: string;

    likes?: number[];

}

export const PostItem: FC<PostItemProps> = (props) => {

    const API_URL = process.env.REACT_APP_API_URL;
    const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;


    const [showMyModal, setShowMyModal] = useState(false);
    const { id } = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    const handleClose = () => setShowMyModal(false);

    const [deletePost, { isSuccess: isDeleteSuccess }
    ] = useDeletePostMutation();

    const handleDelete = async () => {
        await deletePost(props.postId);
    }

    useEffect(() => {

        if (isDeleteSuccess && id !== null) {
            dispatch(removePost(props.postId));
        }

    }, [isDeleteSuccess, id, dispatch, props.postId])

    return (
        <div className='bg-gray-800 py-4 px-4 w-full rounded-2xl mb-4 border border-gray-700'>
            <div className='flex flex-col'>
                <div className='flex justify-between items-center'>
                    <div className='flex w-full mb-2'>
                        <div className='rounded-full overflow-hidden w-12 mr-4 aspect-square'>
                            <a href={`${CLIENT_URL}/user/${props.userId}`}>
                                <img src={`${API_URL}/${props.userPicturePath}`} alt="User's avatar" className='w-full h-full object-cover' />
                            </a>
                        </div>
                        <a className='h-fit' href={`${CLIENT_URL}/user/${props.userId}`}>
                            <div className='flex justify-between items-center font-semibold'>
                                <p className='mr-1'>{props.firstName}</p>
                                <p>{props.lastName}</p>
                            </div>
                        </a>
                    </div>
                    {id !== null && props.userId === id && <button onClick={() => handleDelete()} className='h-full mb-6'>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2.5} stroke='currentColor' className='w-7 h-7 text-gray-500 hover:text-gray-400'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                        </svg>
                    </button>}
                </div>
                {props.content && <div className='mb-2'>
                    {props.content}
                </div>}
                {props.postPicturePath &&
                    <div className='rounded-xl overflow-hidden mb-2'>
                        <img className='hover:cursor-pointer' src={`${API_URL}/${props.postPicturePath}`} alt='Post' />
                        <MyModal onClose={handleClose} visible={showMyModal} picturePath={props.postPicturePath} />
                    </div>}
                <div>
                    <button>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' />
                        </svg>
                        {props.likes && (props.likes.length !== 0) && <p>{props.likes.length}</p>}
                    </button>
                </div>
            </div >
        </div >
    )
}