import { useMutation } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";

const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

type CreateUserRequest = {
  email: string;
  auth0Id: string;
};

export const useGetMyUser = () => {
  const {getAccessTokenSilently} = useAuth0();

  const getMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return response.json();
  };

  const {mutateAsync: createUser, 
    isPending,
    isError, 
    isSuccess} = useMutation({
    mutationFn: getMyUserRequest,
  });

  return {
    createUser,  
    isError, 
    isSuccess,
    isPending};
};

