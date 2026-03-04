import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Layout from "@/pages/Layout";
import HomePage from "@/pages/HomePage";
import Auth0ProviderWithNavigate from "@/auth/Auth0ProviderWithNavigate";
import AuthCallBackPage from "@/pages/AuthCallbackPage";
import UserProfilePage from "@/pages/UserProfilePage";
import ProtectedRoute from "@/auth/ProtectedRoute";
import ManageRestaurantPage from "@/pages/ManageRestaurantPage";
import UpdateMenuPage from "@/pages/UpdateMenuPage";

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <div>Error, try again</div>,
        element: (
            <Auth0ProviderWithNavigate>
                <Layout/>
                <Toaster visibleToasts={1} position="top-right" richColors/>
            </Auth0ProviderWithNavigate>
        ),
        children: [
            {index: true, element: <HomePage/>},
            {path: '/auth-callback', element: <AuthCallBackPage/>},
            {element:<ProtectedRoute/>, 
                children: [
                    // Protected routes go here
                    {path: '/user-profile', element: <UserProfilePage/>},
                    {path: '/manage-restaurant', element: <ManageRestaurantPage/>},
                    {path:'/update-menu/:id', element: <UpdateMenuPage/>}
                ]
            },
            {path: '/menu', element: <div>Menu Page</div>},
            {path: '/my-cart', element: <div>My Cart Page</div>},
        ]
    },
]);

const MyRoutes = () => <RouterProvider router={router} />;

export default MyRoutes;