import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/pages/Layout";

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <div>Error, try again</div>,
        element: <Layout/>,
        children: [
            {index: true, element: <div>Home</div>},
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