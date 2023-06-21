import { useParams } from "react-router-dom"
import { Navbar } from "../components/Navbar";
import { LeftSideBar } from "../components/LeftSideBar";
import { ProfileHeader } from "../components/ProfileHeader";
import { useGetUserQuery } from "../services/user/user.api";


export const ProfilePage = () => {

    const { id } = useParams();
    const parsedId = Number(id);
    const { data } = useGetUserQuery(parsedId);

    return (
        <>
            <Navbar />
            <div className='bg-gray-900 h-screen'>
                <div className='container flex pt-4 mx-auto text-white'>
                    <LeftSideBar />
                    <ProfileHeader
                        userId={data?.id}
                        email={data?.email}
                        firstName={data?.firstName}
                        lastName={data?.lastName}
                        age={data?.age}
                        occupation={data?.occupation}
                        profilePicturePath={data?.profilePicturePath}
                    />
                    <div>
                    </div>
                </div>
            </div>
        </>
    )
}
