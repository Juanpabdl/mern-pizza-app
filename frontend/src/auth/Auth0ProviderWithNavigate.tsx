import { useCreateUser } from "@/api/myUserAPI";
import { Auth0Provider, type User, type AppState } from "@auth0/auth0-react";

type Props = {
    children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
    const {createUser} = useCreateUser();

    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectURI = import.meta.env.VITE_AUTH0_CALLBACK_URI;

    const onRedirectCallback = (appState?: AppState, user?: User) => {
        //console.log("USER:", user);
        if(user?.sub && user?.email) {
            createUser({auth0Id: user.sub, email: user.email});
        }
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