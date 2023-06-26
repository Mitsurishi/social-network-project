import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError, retry } from '@reduxjs/toolkit/query/react'
import { ILogin, ServerResponce } from '../../models/models'
import { RootState } from '../../store/store'
import { clearUser, setUser } from '../../store/auth/authSlice'
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

const baseQuery = retry(fetchBaseQuery({

    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers;
    },
    credentials: 'include'

}), { maxRetries: 0 });

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

export const authApi = createApi({

    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: build => ({
        registration: build.mutation<ServerResponce, FormData>({
            query: (body) => {
                return {
                    url: '/auth/registration',
                    method: 'post',
                    body,
                }
            }
        }),
        login: build.mutation<ServerResponce, ILogin>({
            query: (body) => {
                return {
                    url: '/auth/login',
                    method: 'post',
                    body,
                }
            },
        }),
        logout: build.query<number, void>({
            query: () => {
                return {
                    url: '/auth/logout',
                    method: 'get',
                    credentials: 'include',
                }
            },
        }),
        refresh: build.query<void, ServerResponce>({
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

export const { useRegistrationMutation, useLoginMutation, useLazyLogoutQuery } = authApi