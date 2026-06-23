import RestaurantMenuForm from "@/forms/manage-menu-form/RestaurantMenuForm"
import ManageMenuList from "@/components/ManageMenuList";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCreateMyMenu, useGetMyMenu } from "@/api/myMenuAPI";
import { useGetMyOrders } from "@/api/orderAPI";

const ManageRestaurantPage = () => {
    const  {createMenu, isPending: isCreateLoading} = useCreateMyMenu();
    const {menuItems} = useGetMyMenu();
    const {orders} = useGetMyOrders();

    if(!menuItems || menuItems.length === 0){
        return <div>No menu items found. Please add some dishes to your menu.</div>
    }
    
    return (
        <Tabs defaultValue="orders" className="w-full p-5">
            <TabsList>
                <TabsTrigger value="orders"> Orders </TabsTrigger>
                <TabsTrigger value="manage-menu"> Manage Menu </TabsTrigger>
            </TabsList>
            <TabsContent 
            value="orders" 
            className="space-y-5 bg-gray-50 pg-10 rounded-lg">
                <h2 className="text-2xl font-bold">{orders?.length} active orders.</h2>
                {orders?.map((order) => (
                    <div key={order._id} className="space-y-10 bg-gray-50 p-10 rounded-lg">
                        <OrderItemCard order={order} />
                    </div>
                ))}
            </TabsContent>
            <TabsContent 
            value="manage-menu"
            className="space-y-5 bg-gray-50 pg-10 rounded-lg">
                <RestaurantMenuForm onSave={createMenu} isLoading={isCreateLoading} menuItem={menuItems[0]} />
                <ManageMenuList menuItems={menuItems} />
            </TabsContent>
        </Tabs>
    );
}

export default ManageRestaurantPage;