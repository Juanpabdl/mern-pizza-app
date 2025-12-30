import { useNavigate } from "react-router-dom";
import { Auth0Provider, type User, type AppState } from "@auth0/auth0-react";

type Props = {
    children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
    const navigate = useNavigate();
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectURI = import.meta.env.VITE_AUTH0_CALLBACK_URI;

    const onRedirectCallback = (appState?: AppState, user?: User) => {
        navigate('/auth-callback');
    }

    if(!domain || !clientId || !redirectURI) {
        throw new Error("Unable to initialize Auth");
    }

    return (
        <Auth0Provider domain={domain} 
        clientId={clientId} 
        authorizationParams={{redirect_uri: redirectURI}}
        onRedirectCallback={onRedirectCallback}>
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithNavigate;