const API_BASE_URL = import.meta.env.VITE_SERVER_URL;
import type { MenuItem } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateMyMenu = () => {
    const {getAccessTokenSilently} = useAuth0();

    const createMyMenuRequest = async (menuFormData: FormData): Promise<MenuItem> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/menu`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: menuFormData,
        });

        if (!response.ok) {
            throw new Error("Failed to create menu item");
        }

        return response.json();
    };

    const {
        mutateAsync: createMenu, 
        isPending,
        error, 
        isSuccess
    } = useMutation({
        mutationFn: createMyMenuRequest,
    });

    if(isSuccess){
        toast.success("Menu item created successfully!");
    }

    if(error){
        toast.error("Failed to create menu item. Please try again.");
    }

    return {
        createMenu,  
        isSuccess,
        isPending,
        error
    };
};