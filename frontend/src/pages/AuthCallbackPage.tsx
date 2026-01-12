import { useAuth0 } from "@auth0/auth0-react";
import { useCreateMyUser } from "@/api/myUserAPI";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallBackPage = () => {
    const navigate = useNavigate();
    const {user} = useAuth0();
    const {createUser} = useCreateMyUser();
    const hasCreatedUser = useRef(false);

    useEffect (() => {
        if(user?.sub && user?.email && !hasCreatedUser.current) {
            createUser({email: user.email, auth0Id: user.sub});
            hasCreatedUser.current = true;
        }
        navigate("/");
    }, [user, navigate, createUser]);

    return (
        <>
            Loading...
        </>
    );
}
export default AuthCallBackPage;