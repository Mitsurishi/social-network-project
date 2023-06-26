import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IPost } from '../../models/models';

export interface PostState {

    posts: IPost[];

}

interface ActionData {

    id: number;

    userId: number;

    firstName: string;

    lastName: string;

    userPicturePath: string;

    content?: string;

    postPicturePath?: string;

    likes: number[];

}

const initialState: PostState = {

    posts: [],

}

export const postSlice = createSlice({

    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<PostState>) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action: PayloadAction<ActionData>) => {
            state.posts.push(action.payload);
        },
        likeUnlikePost: (state, action: PayloadAction<ActionData>) => {
            const updatedPosts = state.posts.map((post) => {
                if (post.id === action.payload.id) {
                    return action.payload;
                }
                return post;
            });
            state.posts = updatedPosts;
        },
        removePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload);
        },
    }

})

export const selectPosts = (state: RootState) => state.posts;
export const { setPosts, setPost, likeUnlikePost, removePost } = postSlice.actions;
export default postSlice.reducer;