const API_BASE_URL = import.meta.env.VITE_SERVER_URL;
import type { MenuItem } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
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

export const useGetMyMenu = () => {
    const {getAccessTokenSilently} = useAuth0();

    const getMyMenuRequest = async (): Promise<MenuItem[]> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/menu`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        
        if (!response.ok) {
            throw new Error("Failed to get menu items");
        }

        return response.json();
    };

    const {
        data: menuItems,
        isPending,
    } = useQuery({
        queryKey: ["fetchMyMenu"],
        queryFn: getMyMenuRequest,
    });

    return { menuItems, isPending };
}

export const useUpdateMyMenu = () => {
    const {getAccessTokenSilently} = useAuth0();

    const updateMyMenuRequest = async (menuFormData: FormData): Promise<MenuItem> => {
        const accessToken = await getAccessTokenSilently();

        const id = menuFormData.get("id");
        
        if (!id) {
            throw new Error("Menu item ID is required for update");
        }
        
        const response = await fetch(`${API_BASE_URL}/api/my/menu`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: menuFormData,
        });

        if (!response.ok) {
            throw new Error("Failed to update menu item");
        }

        return response.json();
    };

    const {
        mutateAsync: updateMenu, 
        isPending,
        error, 
        isSuccess
    } = useMutation({
        mutationFn: updateMyMenuRequest,
    });

    if(isSuccess){
        toast.success("Menu item updated successfully!");
    }

    if(error){
        toast.error("Failed to update menu item. Please try again.");
    }

    return {
        updateMenu,  
        isSuccess,
        isPending,
        error
    };
};