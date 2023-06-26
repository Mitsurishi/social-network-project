import { FC, useEffect, useState } from 'react';
import FileUpload from './FileUpload';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { selectAuth } from '../store/auth/authSlice';
import { useCreatePostMutation } from '../services/post/post.api';
import { toast } from 'react-toastify';
import { setPost } from '../store/post/postSlice';

export const PostForm: FC = () => {

    const dispatch = useAppDispatch();
    const [content, setContent] = useState('');
    const [picture, setPicture] = useState<File | null>(null);
    const { id: userId } = useAppSelector(selectAuth);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    const [createPost,
        {
            data: postData,
            isSuccess: isPostSuccess,
            isError: isPostError,
            error: postError
        }
    ] = useCreatePostMutation();

    const handlePost = async () => {

        if (content.length !== 0 && !picture && userId) {
            const formData = new FormData();
            formData.append('userId', userId.toString());
            formData.append('content', content);
            await createPost(formData);
        }
        if (content.length === 0 && picture && userId) {
            const formData = new FormData();
            formData.append('userId', userId.toString());
            formData.append('file', picture);
            await createPost(formData);
        }
        if (content.length !== 0 && picture && userId) {
            const formData = new FormData();
            formData.append('userId', userId.toString());
            formData.append('content', content);
            formData.append('file', picture);
            await createPost(formData);
        }
        if (content.length === 0 && !picture) {
            toast.error("Post can't be empty");
        }

    }

    useEffect(() => {

        if (isPostSuccess && postData) {
            dispatch(setPost(postData));
        }
        setPicture(null);
        setContent('');

    }, [isPostSuccess, postData, dispatch])

    useEffect(() => {

        if (isPostError) {
            toast.error((postError as any).data.message);
        }

    }, [isPostError, postError])

    return (
        <div className='font-semibold rounded-2xl w-full relative border bg-gray-800 border-gray-700 py-6 px-4 mb-4'>
            <div>
                <textarea className='outline-none py-2 px-2 mb-2 w-full text-white bg-gray-800 caret-white rounded h-auto overflow-y-hidden' placeholder="What's new?" value={content} onChange={handleChange} />
                <hr className='mb-2 border-gray-700' />
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex'>
                    <FileUpload setFile={setPicture} accept='image/*'>
                        <button className='flex mr-2'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 mr-1 text-gray-500 hover:text-gray-400'>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13' />
                            </svg>
                        </button>
                    </FileUpload>
                    {
                        picture !== null &&
                        <div className='flex items-center'>
                            <p className='mr-1 text-s text-gray-500'>1</p>
                            <button onClick={() => setPicture(null)}>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2.5} stroke='currentColor' className='w-4 h-4'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                                </svg>
                            </button>
                        </div>
                    }
                </div>
                <button onClick={() => handlePost()} className='bg-gray-600 text-white text-sm font-semibold hover:bg-gray-500 hover:text-white rounded-md py-1 px-8 transition-all'>Post</button>
            </div>
        </div >
    )
}
