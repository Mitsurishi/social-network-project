import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { ILogin, ServerResponce } from '../../models/models'
import { RootState } from '../store'
import { logout, setUser } from './authSlice'


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers;
    },
    credentials: 'include'
})
const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
        if (refreshResult) {
            console.log(refreshResult);
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
        }
    }
    return result
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: build => ({
        registration: build.mutation({
            query: (body: FormData) => {
                return {
                    url: '/auth/registration',
                    method: 'post',
                    body,
                }
            },
            transformResponse: (response: ServerResponce) => {
                return response
            },
        }),
        login: build.mutation({
            query: (body: ILogin) => {
                return {
                    url: '/auth/login',
                    method: 'post',
                    body,
                }
            },
            transformResponse: (response: ServerResponce) => {
                return response
            },
        }),
        logout: build.query({
            query: () => {
                return {
                    url: '/auth/logout',
                    method: 'get',
                    credentials: 'include',
                }
            },
        }),
        refresh: build.query({
            query: () => {
                return {
                    url: '/auth/refresh',
                    method: 'get',
                    credentials: 'include',
                }
            },
        }),
    }),
})

export const { useRegistrationMutation, useLoginMutation } = authApi