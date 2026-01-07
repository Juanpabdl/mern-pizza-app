import UserProfileForm from "@/forms/user-profile-forms/UserProfileForm"
import { useUpdateMyUser } from "@/api/myUserAPI"

const UserProfilePage = () => {
    const {updateMyUser,  isPending} = useUpdateMyUser();

    return(<UserProfileForm onSubmit={updateMyUser} isLoading={isPending}/>)
}

export default UserProfilePage;