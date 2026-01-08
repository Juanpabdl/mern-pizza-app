import { useMutation } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

//Create User
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

//Update User
type UpdateUserRequest = {
  username?: string;
  city?: string;
  country?: string;
  addressLine?: string;
};

export const useUpdateMyUser = () => {
  const {getAccessTokenSilently} = useAuth0();

  const updateMyUserRequest = async (formData: UpdateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  };

  const {mutateAsync: updateMyUser, 
    isPending,
    isSuccess,
    error,
    reset} = useMutation({
    mutationFn: updateMyUserRequest,
  });

  if (isSuccess) {
    toast.success("User profile updated successfully!");
  }
  if (error) {
    toast.error(`Error: ${(error as Error).message}`);
    reset();
  }

  return {
    updateMyUser,
    isSuccess,
    isPending,
    error,
    reset
  };
};