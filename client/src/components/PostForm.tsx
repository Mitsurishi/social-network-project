import { FC } from 'react';
import FileUpload from './FileUpload';

interface PostFormProps {

    content?: string,

    updateContent?: (e: React.ChangeEvent<HTMLInputElement>) => void,

    setPicture?: (file: File) => void,

    handleAction: () => Promise<void>,

}

export const PostForm: FC<PostFormProps> = ({ content, updateContent, setPicture, handleAction }) => {
    return (
        <div className='font-semibold rounded-2xl w-full relative border bg-gray-800 border-gray-700 py-6 px-4 mb-4'>
            <div>
                <input className='outline-none py-2 px-2 mb-2 w-full text-black break-words rounded' name='post body' placeholder="What's new?" value={content} onChange={updateContent} />
                <hr className='mb-2 border-gray-700' />
            </div>
            <div className='flex items-center justify-between'>
                <FileUpload setFile={setPicture} accept='image/*'>
                    <button>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 text-gray-500 hover:text-gray-400'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13' />
                        </svg>
                    </button>
                </FileUpload>
                <button onClick={() => handleAction()} className='bg-gray-600 text-white text-sm font-semibold hover:bg-gray-500 hover:text-white rounded-md py-1 px-8 transition-all'>Post</button>
            </div>
        </div >
    )
}
