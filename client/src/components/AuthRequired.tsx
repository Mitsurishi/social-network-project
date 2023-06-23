import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { FC } from "react";

interface AuthRequiredProps {

    children: any;

    token: string;

}

export const AuthRequired: FC<AuthRequiredProps> = (props) => {

    if (!props.token) {
        toast.error('You must be authorized');
        return <Navigate to='/auth' />;
    } else {
        return props.children;
    }

}