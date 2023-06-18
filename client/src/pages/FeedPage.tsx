import { LeftSideBar } from '../components/LeftSideBar';
import { Navbar } from '../components/Navbar';
import { useLazyGetAllUsersQuery } from '../services/user/user.api';

export const FeedPage = () => {

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