import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";
import LoadingButton from "./LoadingButton";

const CheckoutButton = () => {
    const {
        isAuthenticated, 
        isLoading: isAuthLoading, 
        loginWithRedirect
    } = useAuth0()

    const { pathname } = useLocation()

    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname
            }
        })
    }

    if(!isAuthenticated){
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
        <Button className="w-full bg-orange-500 text-white hover:bg-orange-600 rounded-full">
            Go to Checkout
        </Button>
    )
}

export default CheckoutButton;