import { useAppSelector } from '../hooks/redux';
import { selectAuth } from '../store/auth/authSlice';
import { useGetAllUsersQuery } from '../store/user/user.api';

export const HomePage = () => {

    const { firstName } = useAppSelector(selectAuth);
    const { data: users = [], isLoading } = useGetAllUsersQuery();
    const getAllUsersQuery = useGetAllUsersQuery();
    const handleClick = async () => {
        await getAllUsersQuery.refetch();
    }

    return (
        <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
            <div>{firstName}</div>
            <button onClick={() => handleClick()}>Жми сука</button>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            )}
        </div>
    )

}
