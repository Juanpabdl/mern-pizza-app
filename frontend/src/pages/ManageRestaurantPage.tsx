import RestaurantMenuForm from "@/forms/manage-menu-form/RestaurantMenuForm"
import ManageMenuList from "@/components/ManageMenuList";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCreateMyMenu, useGetMyMenu } from "@/api/myMenuAPI";
import { useGetMyOrders } from "@/api/orderAPI";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-orange-500 text-white mx-4 my-2 px-4 py-2 rounded-lg hover:bg-orange-600">
                            Add New Menu Item
                        </Button>
                    </DialogTrigger>
                    <DialogContent className=" max-h-[90dvh] max-w-[425px] md:min-w-[700px] bg-gray-50 overflow-y-scroll [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-400 [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-transparent">
                        <DialogHeader>
                            <DialogTitle>Add New Menu Item</DialogTitle>
                        </DialogHeader>
                        <RestaurantMenuForm onSave={createMenu} 
                        isLoading={isCreateLoading} 
                        menuItem={menuItems[0]} />
                    </DialogContent>
                </Dialog>
                <ManageMenuList menuItems={menuItems} />
            </TabsContent>
        </Tabs>
    );
}

export default ManageRestaurantPage;