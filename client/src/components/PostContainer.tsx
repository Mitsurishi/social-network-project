import { FC, useEffect } from "react";
import { useGetUsersPostsQuery } from "../services/post/post.api"
import { PostItem } from "./PostItem";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { PostForm } from "./PostForm";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { selectPosts, setPosts } from "../store/post/postSlice";
import { selectAuth } from "../store/auth/authSlice";

export const PostContainer: FC = () => {

    const { id } = useParams<{ id?: string }>();
    const parsedId = Number(id);
    const { posts } = useAppSelector(selectPosts);
    const { id: userId } = useAppSelector(selectAuth);

    const {
        data: userPosts,
        isLoading: isPostsLoading,
        isSuccess: isPostsSuccess,
        isError: isPostsError,
        error: postsError
    } = useGetUsersPostsQuery(parsedId);

    const dispatch = useAppDispatch();

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

    if (isPostsError || isPostsLoading) {
        return null;
    }

    if (!posts || posts.length === 0) {
        return <div className='mt-4 max-w-[600px]'>
            {id && userId !== null && parsedId === userId && <PostForm />}
            <div className='text-center font-semibold text-white'>No posts at the moment.</div>
        </div>
    }

    return (
        <>
            <div className='mt-4 max-w-[600px]'>
                {id && userId !== null && parsedId === userId && <PostForm />}
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
