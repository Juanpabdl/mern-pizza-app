import UserProfileForm from "@/forms/user-profile-forms/UserProfileForm"
import { useGetMyUser, useUpdateMyUser } from "@/api/myUserAPI"

const UserProfilePage = () => {
    const {currentUser, isPending: isGetPending} = useGetMyUser();
    const {updateMyUser,  isPending: isUpdatePending} = useUpdateMyUser();
    
    if(isGetPending){
        return <span>Loading...</span>
    }

    if(!currentUser){
        return <span>Unable to load user profile.</span>
    }
    
    return(
        <UserProfileForm 
        onSubmit={updateMyUser} 
        isLoading={isUpdatePending} 
        currentUser={currentUser}/>
    )
}

export default UserProfilePage;