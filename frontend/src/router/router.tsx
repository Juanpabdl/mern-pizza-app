import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/pages/Layout";
import HomePage from "@/pages/HomePage";
import Auth0ProviderWithNavigate from "@/auth/Auth0ProviderWithNavigate";

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <div>Error, try again</div>,
        element: (
            <Auth0ProviderWithNavigate>
                <Layout/>
            </Auth0ProviderWithNavigate>
        ),
        children: [
            {index: true, element: <HomePage/>},
            {path: '/menu', element: <div>Menu Page</div>},
            {path: '/my-cart', element: <div>My Cart Page</div>},
        ]
    },
    {
        path: '/login',
        element: <div>Login Page</div>
    }
]);

const MyRoutes = () => <RouterProvider router={router} />;

export default MyRoutes;