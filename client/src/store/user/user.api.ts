import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { logout, setUser } from '../auth/authSlice'
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

const baseQuery = retry(fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers;
    },
    credentials: 'include',
}), { maxRetries: 0 });
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions)
    if (result.error && (result.error.status === 401)) {
        const refreshResult = await baseQuery({
            url: '/auth/refresh',
            method: 'get',
        }, api, extraOptions) as QueryReturnValue<any, unknown, unknown>
        if (refreshResult.data) {
            const data = refreshResult.data
            console.log(data)
            api.dispatch(setUser({
                ...data.payload, token: data.tokens.access_token
            }))

            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
        }
    }
    return result

}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithReauth,
    endpoints: build => ({
        getAllUsers: build.query<any[], void>({
            query: () => {
                return {
                    url: '/user/users',
                    method: 'get',
                }
            }
        })
    }),
})

export const { useGetAllUsersQuery } = userApi;