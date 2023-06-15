import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ILogin, IRegistration } from '../../models/models'
import { RootState } from '../store'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: build => ({
        registration: build.mutation({
            query: (body: IRegistration) => {
                const formData = new FormData();
                formData.append('email', body.email);
                formData.append('password', body.password);
                formData.append('firstName', body.firstName);
                formData.append('lastName', body.lastName);
                formData.append('age', body.age);
                formData.append('occupation', body.occupation);
                formData.append('file', body.file);
                return {
                    url: '/auth/registration',
                    method: 'post',
                    body: formData,
                    credentials: 'include',
                }
            }
        }),
        login: build.mutation({
            query: (body: ILogin) => {
                return {
                    url: '/auth/login',
                    method: 'post',
                    body,
                    credentials: 'include',
                }
            }
        })
    })
})

export const { useRegistrationMutation, useLoginMutation } = authApi