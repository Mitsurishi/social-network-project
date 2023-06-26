import { useParams } from "react-router-dom"
import { Navbar } from "../components/Navbar";
import { LeftSideBar } from "../components/LeftSideBar";
import { ProfileHeader } from "../components/ProfileHeader";
import { useGetUserQuery } from "../services/user/user.api";
import { PostContainer } from "../components/PostContainer";


export const ProfilePage = () => {

    const { id } = useParams<{ id?: string }>();
    const parsedId = Number(id);
    const { data } = useGetUserQuery(parsedId);

    return (
        <>
            <Navbar />
            <div className='bg-gray-900 pt-[60px] min-h-screen'>
                <div className='py-4'>
                    <div className='container mx-auto'>
                        <LeftSideBar />
                    </div>
                    <div className='container flex pl-[164px] mx-auto text-white'>
                        <div className='w-full'>
                            <ProfileHeader
                                userId={data?.id}
                                email={data?.email}
                                firstName={data?.firstName}
                                lastName={data?.lastName}
                                age={data?.age}
                                occupation={data?.occupation}
                                profilePicturePath={data?.profilePicturePath}
                            />
                            <div className='max-w-[600px]'>
                                <PostContainer />
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
