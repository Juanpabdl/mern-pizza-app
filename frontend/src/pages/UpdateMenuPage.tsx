import RestaurantMenuForm from "@/forms/manage-menu-form/RestaurantMenuForm";
import { useUpdateMyMenu } from "@/api/myMenuAPI";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const UpdateMenuPage = () => {
    const  {updateMenu, isPending: isUpdateLoading} = useUpdateMyMenu();
    const location = useLocation();
    const menuItem = location.state?.menuItem;

    useEffect(() => {
        console.log("Received menu item in UpdateMenuPage:", menuItem);
    }, [menuItem]);

    if(!menuItem){
        return <div>Menu item not found.</div>
    }

    return (
        <>
            <div className="mx-auto text-center">
                <h1 className="text-2xl font-bold mb-4">Update Form</h1>
                <p className="text-lg mb-4">Update your menu item details below.</p>
            </div>
            <RestaurantMenuForm onSave={updateMenu} isLoading={isUpdateLoading} menuItem={menuItem}/>
        </>
    )
}

export default UpdateMenuPage;