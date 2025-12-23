import {useMutation} from '@tanstack/react-query';
const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

type CreateUserRequest = {
    auth0Id: string;
    email: string;
};

export const useCreateUser = () => {
    const createMyUserRequest = async (data: CreateUserRequest) => {
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if(!response.ok) {
            throw new Error('Failed to create user');
        }
    }

    const {
        mutateAsync: createUser, 
        isPending, 
        isError, 
        isSuccess
    } = useMutation<void, Error, CreateUserRequest>({
        mutationFn: createMyUserRequest,
    });

    return {createUser, isPending, isError, isSuccess};
}