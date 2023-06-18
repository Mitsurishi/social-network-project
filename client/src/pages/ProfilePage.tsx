import { useParams } from "react-router-dom"
import { Navbar } from "../components/Navbar";
import { selectAuth } from "../store/auth/authSlice";
import { useAppSelector } from "../hooks/redux";
import { LeftSideBar } from "../components/LeftSideBar";


export const ProfilePage = () => {

    const { id } = useParams();
    const { id: userId, email, firstName, lastName, token } = useAppSelector(selectAuth);

    return (
        <>
            <Navbar />
            <div className='bg-gray-900'>
                <div className='container flex pt-4 mx-auto h-screen w-screen text-white'>
                    <LeftSideBar />
                    <div>
                    </div>
                </div>
            </div>
        </>
    )
}
