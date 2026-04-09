import CategorySelector from "@/components/CategorySelector";
import ClientMenuDisplay from "@/components/ClientMenuDisplay";
import OrderSummary from "@/components/OrderSummary";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCallback, useState } from "react";
import { useCart } from "@/utils/CartContext/CartContextProvider";

const ClientMenuPage = () => {
    const { cartItems } = useCart();
    const [selectedCategory, setSelectedCategory] = useState<string>("Pizza");

    const handleSelect = useCallback((category:string) => {
        setSelectedCategory(category)
    },[selectedCategory])

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
                    </Card>
                </div>
            </div>          
        </div>
    )
}

export default ClientMenuPage;