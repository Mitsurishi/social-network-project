import { FC, useEffect, useState } from 'react';
import FileUpload from './FileUpload';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { selectAuth } from '../store/auth/authSlice';
import { useCreatePostMutation } from '../services/post/post.api';
import { toast } from 'react-toastify';
import { setPost } from '../store/post/postSlice';
import { MyModal } from './MyModal';

export const PostForm: FC = () => {

    const dispatch = useAppDispatch();
    const [content, setContent] = useState('');
    const [picture, setPicture] = useState<File | null>(null);
    const { id: userId } = useAppSelector(selectAuth);
    /*  Попробую доделать позже. Хочу, чтобы кнопка отправки формы и прикрепления изображения появлялась только при клике на соот-й div. Столкнулся с проблемой, что фокус с элемента исчезает, если нажимаешь на дочерний элемент. Буду думать как пофиксить.
        const [writePost, setWritePost] = useState(false);
        const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
            setWritePost(true);
        }
        const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
            setWritePost(false);
        }
    */
    const [showMyModal, setShowMyModal] = useState(false);
    const handleClose = () => setShowMyModal(false);

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
                <textarea className='outline-none py-2 px-2 mb-2 w-full text-white bg-gray-800 caret-white placeholder-gray-200 rounded h-auto overflow-y-hidden' placeholder="What's new?" value={content} onChange={handleChange} />
                <hr className='mb-2 border-gray-700' />
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex'>
                    <FileUpload setFile={setPicture} accept='image/*'>
                        <button className='flex mr-2 group'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 mr-1 text-gray-400 group-hover:text-gray-300'>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' />
                            </svg>
                            <p className='text-gray-400 group-hover:text-gray-300'>Image</p>
                        </button>
                    </FileUpload>
                    {
                        picture !== null &&
                        <div>
                            <div className='rounded overflow-hidden w-60 aspect-square relative'>
                                <img onClick={() => setShowMyModal(true)} className='w-full h-full object-cover cursor-pointer' src={URL.createObjectURL(picture)} alt='Thumb' />
                                <button className='absolute top-0 right-0 rounded-tr rounded-bl bg-black bg-opacity-30' onClick={() => setPicture(null)}>
                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2.5} stroke='currentColor' className='w-4 h-4 text-gray-500 hover:text-gray-300'>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                                    </svg>
                                </button>
                            </div>
                            <MyModal picturePath={URL.createObjectURL(picture)} onClose={handleClose} visible={showMyModal} />
                        </div>
                    }
                </div>
                <button onClick={() => handlePost()} className='bg-gray-600 text-white text-sm font-semibold hover:bg-gray-500 hover:text-white rounded-md py-1 px-8 transition-all'>Post</button>
            </div>
        </div >
    )
}
