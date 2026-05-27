import CategorySelector from "@/components/CategorySelector";
import ClientMenuDisplay from "@/components/ClientMenuDisplay";
import OrderSummary from "@/components/OrderSummary";
import { Card, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCallback, useState } from "react";
import { useCart } from "@/utils/CartContext/CartContextProvider";
import CheckoutButton from "@/components/CheckoutButton";
import type { UserFormData } from "@/forms/user-profile-forms/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/orderAPI";

const ClientMenuPage = () => {
    const { cartItems } = useCart();
    const [selectedCategory, setSelectedCategory] = useState<string>("Pizza");
    const {createCheckoutSession, isPending: isCheckoutPending} = useCreateCheckoutSession();

    const handleSelect = useCallback((category:string) => {
        setSelectedCategory(category)
    },[selectedCategory])

    const onCheckout = async (userFormData:UserFormData) => {
        const checkoutData = {
            cartItems: cartItems.map(item => ({
                menuItemId: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity.toString() // Convert quantity to string if needed by the backend
            })),    
            deliveryDetails: {
                email: userFormData?.email || "",
                username: userFormData.username,
                addressLine: userFormData.addressLine,
                city: userFormData.city,
                country: userFormData.country
            }
        }

        const data = await createCheckoutSession(checkoutData)
        
        if (data) {
            window.location.href = data.url; // Redirect to the checkout session URL
        }

    }

    return (
        <div className="flex flex-col justify-center mx-auto">
            <div className="bg-white rounded-lg shadow-md py-3 px-6 flex flex-col text-center gap-5">
                <h1 className="text-3xl font-bold tracking-tight text-orange-600">
                    Mozzirella's Menu
                </h1>
                <span className="text-xl">Check our dishes and combos</span>
            </div>
            <Separator/>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-1.5 my-3">
                <div className="flex flex-col items-center space-y-5 sm:col-span-2 md:col-span-3 px-2 py-3">
                    {/*Menu category selector*/}
                    <CategorySelector 
                    selectedCategory={selectedCategory} 
                    handleSelect={handleSelect}/>
                    <Separator/>
                    {/* Display menu items here */}
                    <ClientMenuDisplay category={selectedCategory}/>
                    <Separator/>
                </div>
                <div className="space-y-2">
                    {/* Display items added into the cart */}
                    <Card>
                        <OrderSummary cartItems={cartItems}/>
                        <CardFooter>
                            <CheckoutButton
                            disabled={cartItems.length === 0}
                            onCheckout={onCheckout}
                            isLoading={isCheckoutPending} />
                        </CardFooter>
                    </Card>
                </div>
            </div>          
        </div>
    )
}

export default ClientMenuPage;