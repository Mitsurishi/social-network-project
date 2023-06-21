import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";


export const AuthRequired = ({ children, token }: { children: any, token: string }) => {

    if (!token) {
        toast.error('You must be authorized');
        return <Navigate to='/auth' />;
    } else {
        return children;
    }

}