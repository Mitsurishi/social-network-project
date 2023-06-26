import { toast } from "react-toastify";
import { Navigate, Outlet } from "react-router-dom";
import { FC } from "react";
import { useAppSelector } from "../hooks/redux";
import { selectAuth } from "../store/auth/authSlice";



export const AuthRequired: FC = () => {

    const { token } = useAppSelector(selectAuth);
    if (token === null) {
        return null;
    }
    if (!token) {
        toast.error('You must be authorized');
        return <Navigate to='/auth' />;
    } else {
        return <Outlet />;
    }

}