import RestaurantMenuForm from "@/forms/manage-menu-form/RestaurantMenuForm"
import { useCreateMyMenu } from "@/api/myMenuAPI";

const ManageRestaurantPage = () => {
    const  {createMenu, isPending} = useCreateMyMenu();
    
    return <RestaurantMenuForm onSave={createMenu} isLoading={isPending} />
}

export default ManageRestaurantPage;