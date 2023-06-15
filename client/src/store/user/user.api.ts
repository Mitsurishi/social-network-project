import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ServerResponce } from '../../models/models'
import { RootState } from '../store'
import { logout } from '../auth/authSlice'


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers;
    },
    credentials: 'include',
})
const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && (result.error.status === 401 || 500)) {
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