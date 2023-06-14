import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IRegistration } from '../../models/models'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
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
    })
})

export const { useRegistrationMutation } = authApi