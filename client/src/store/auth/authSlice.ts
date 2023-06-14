import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const USER_KEY = 'user'

export interface AuthState {

    id: number | null;

    email: string | null;

    firstName: string | null;

    lastName: string | null;

    token: string | null;

}

const initialState: AuthState = {

    id: null,

    email: null,

    firstName: null,

    lastName: null,

    token: null,

}

export const authSlice = createSlice({

    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ id: number, email: string, firstName: string, lastName: string, token: string }>) => {
            localStorage.setItem(USER_KEY, JSON.stringify({
                id: action.payload.id,
                email: action.payload.email,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                token: action.payload.token,
            }));
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.token = action.payload.token;
        }
    }

})

export const selectAuth = (state: RootState) => state.auth;

export const { setUser } = authSlice.actions;

export default authSlice.reducer;