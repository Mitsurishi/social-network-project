import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/auth/auth.api";
import authReducer from './auth/authSlice'
import { userApi } from "../services/user/user.api";

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware, userApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'] 