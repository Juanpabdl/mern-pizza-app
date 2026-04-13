import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, { type UserFormData } from "@/forms/user-profile-forms/UserProfileForm";
import { useGetMyUser } from "@/api/myUserAPI";

type Props = {
    onCheckout: (userFormData: UserFormData) => void;
    disabled: boolean;
}

const CheckoutButton = ({onCheckout, disabled}:Props) => {
    const {
        isAuthenticated, 
        isLoading: isAuthLoading, 
        loginWithRedirect
    } = useAuth0()

    const { pathname } = useLocation()
    const {currentUser, isPending: IsUserPending} = useGetMyUser()
    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname
            }
        })
    }

    if(!isAuthenticated || !currentUser){
        return (
            <Button onClick={onLogin}
            className="w-full bg-orange-500 text-white hover:bg-orange-600 rounded-full">
                Log In to Checkout
            </Button>
        )
    }

    if(isAuthLoading){
        return (<LoadingButton />)
    }

    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={disabled} className="w-full bg-orange-500 text-white hover:bg-orange-600 rounded-full">
                    Go to Checkout
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
                <UserProfileForm 
                title="Confirm Delivery Details"
                buttonText="Continue to payment"
                currentUser={currentUser} 
                onSubmit={onCheckout} 
                isLoading={IsUserPending}/>
            </DialogContent>
        </Dialog>
        
    )
}

export default CheckoutButton;