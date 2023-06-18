import { toast } from "react-toastify";
import { redirect } from "react-router-dom";


export const AuthRequired = ({ children, token }: { children: any, token: string }) => {

    if (!token) {
        toast.error('You must be authorized');
        redirect('/auth');
        return <></>;
    } else {
        return children;
    }

}
