import RestaurantMenuForm from "@/forms/manage-menu-form/RestaurantMenuForm"
import { useCreateMyMenu, useGetMyMenu } from "@/api/myMenuAPI";
import ManageMenuList from "@/components/ManageMenuList";

const ManageRestaurantPage = () => {
    const  {createMenu, isPending: isCreateLoading} = useCreateMyMenu();
    const {menuItems} = useGetMyMenu();

    if(!menuItems || menuItems.length === 0){
        return <div>No menu items found. Please add some dishes to your menu.</div>
    }
    
    return (
        <>
            <RestaurantMenuForm onSave={createMenu} isLoading={isCreateLoading} menuItem={menuItems[0]} />
            <ManageMenuList menuItems={menuItems} />
        </>
    
);
}

export default ManageRestaurantPage;