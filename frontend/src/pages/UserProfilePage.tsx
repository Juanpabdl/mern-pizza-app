import UserProfileForm from "@/forms/user-profile-forms/UserProfileForm"

const UserProfilePage = () => {
    const handleSubmit = () => { console.log("hola") }
    
    return(<UserProfileForm onSubmit={handleSubmit} isLoading={false}/>)
}

export default UserProfilePage;