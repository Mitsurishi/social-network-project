import { FC, useEffect, useState } from "react";
import { useCreatePostMutation, useGetUsersPostsQuery } from "../services/post/post.api"
import { PostItem } from "./PostItem";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { PostForm } from "./PostForm";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { selectPosts, setPost, setPosts } from "../store/post/postSlice";


export const PostContainer: FC = () => {

    const { id } = useParams();
    const parsedId = Number(id);
    const { posts } = useAppSelector(selectPosts)

    const {
        data: userPosts,
        isLoading: isPostsLoading,
        isSuccess: isPostsSuccess,
        isError: isPostsError,
        error: postsError
    } = useGetUsersPostsQuery(parsedId);

    const dispatch = useAppDispatch();
    const [content, setContent] = useState('');
    const [picture, setPicture] = useState<File | null>(null);

    const [createPost,
        {
            data: postData,
            isSuccess: isPostSuccess,
            isError: isPostError,
            error: postError
        }
    ] = useCreatePostMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }

    const handlePost = async () => {

        if (content.length !== 0 && !picture && id) {
            const formData = new FormData();
            formData.append('userId', id);
            formData.append('content', content);
            await createPost(formData);
        }
        if (content.length === 0 && picture && id) {
            const formData = new FormData();
            formData.append('userId', id);
            formData.append('file', picture);
            await createPost(formData);
        }
        if (content.length !== 0 && picture && id) {
            const formData = new FormData();
            formData.append('userId', id);
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

    }, [isPostSuccess, postData, dispatch])

    useEffect(() => {

        if (isPostsSuccess && userPosts) {
            dispatch(setPosts({ posts: userPosts }));
        }

    }, [isPostsSuccess, userPosts, dispatch])

    useEffect(() => {

        if (isPostsError) {
            toast.error((postsError as any).data.message);
        }

    }, [isPostsError, postsError])

    useEffect(() => {

        if (isPostError) {
            toast.error((postError as any).data.message);
        }

    }, [isPostError, postError])

    if (!posts || posts.length === 0) {
        return <div className='mt-4'>
            <PostForm content={content} setPicture={setPicture} updateContent={handleChange} handleAction={handlePost} />
            <div className='text-center font-semibold text-white'>No posts at the moment.</div>
        </div>
    }

    return (
        <>
            <div className='mt-4'>
                <PostForm content={content} setPicture={setPicture} updateContent={handleChange} handleAction={handlePost} />
                {isPostsLoading && <div
                    className='mx-auto inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                    role='status'>
                </div>
                }
                {posts && posts.map(post => <PostItem
                    key={post.id}
                    postId={post.id}
                    userId={post.userId}
                    firstName={post.firstName}
                    lastName={post.lastName}
                    content={post.content}
                    postPicturePath={post.postPicturePath}
                    userPicturePath={post.userPicturePath}
                    likes={post.likes}
                />)}
            </div>
        </>
    )
}
