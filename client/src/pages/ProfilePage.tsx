import { ProfileHeader } from "../components/ProfileHeader";
import { PostContainer } from "../components/PostContainer";
import { PageWrapper } from "../components/PageWrapper";


export const ProfilePage = () => {

    return (
        <PageWrapper>
            <ProfileHeader />
            <PostContainer />
        </PageWrapper>
    )

}
