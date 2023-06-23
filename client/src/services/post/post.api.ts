import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../store/store'
import { clearUser, setUser } from '../../store/auth/authSlice'
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { IPost } from '../../models/models';

const baseQuery = retry(fetchBaseQuery({

    baseUrl: 'http://localhost:8000',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers;
    },
    credentials: 'include',

}), { maxRetries: 1 });

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions)
    if (result.error && (result.error.status === 401)) {
        const refreshResult = await baseQuery({
            url: '/auth/refresh',
            method: 'get',
        }, api, extraOptions) as QueryReturnValue<any, unknown, unknown>
        if (refreshResult.data) {
            const data = refreshResult.data;
            api.dispatch(setUser({
                ...data.payload, token: data.tokens.access_token
            }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(clearUser());
        }
    }
    return result

}

export const postApi = createApi({

    reducerPath: 'postApi',
    baseQuery: baseQueryWithReauth,
    endpoints: build => ({
        createPost: build.mutation<IPost, FormData>({
            query: (body) => {
                return {
                    url: '/post/create',
                    method: 'post',
                    body,
                }
            }
        }),
        getAllPosts: build.query<IPost[], void>({
            query: () => {
                return {
                    url: '/post/posts',
                    method: 'get',
                }
            }
        }),
        getUsersPosts: build.query<IPost[], number>({
            query: (userId) => {
                return {
                    url: `/post/${userId}/posts`,
                    method: 'get'
                }
            }
        })
    }),

})

export const { useGetAllPostsQuery, useGetUsersPostsQuery, useCreatePostMutation } = postApi;