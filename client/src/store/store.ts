import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { githubApi } from "./github/github.api";
import { authApi } from "./auth/auth.api";
import authReducer from './auth/authSlice'

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [githubApi.reducerPath]: githubApi.reducer,
    auth: authReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware, githubApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'] 