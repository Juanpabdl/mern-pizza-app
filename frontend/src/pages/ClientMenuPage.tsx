import CategorySelector from "@/components/CategorySelector";
import ClientMenuDisplay from "@/components/ClientMenuDisplay";
import { Separator } from "@/components/ui/separator";
import { useCallback, useState } from "react";

const ClientMenuPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("Pizza");

    const handleSelect = useCallback((category:string) => {
        setSelectedCategory(category)
    },[selectedCategory])

    return (
        <div className="flex justify-center mx-auto">
            <div className="flex flex-col items-center space-y-5 w-full md:w-3/4 mx-0">
                <div className="bg-white rounded-lg shadow-md py-3 px-6 flex flex-col text-center gap-5">
                    <h1 className="text-3xl font-bold tracking-tight text-orange-600">
                        Mozzirella's Menu
                    </h1>
                    <span className="text-xl">Check our dishes and combos</span>
                </div>
                <Separator/>
                {/*Menu category selector*/}
                <CategorySelector 
                selectedCategory={selectedCategory} 
                handleSelect={handleSelect}/>
                <Separator/>
                {/* You can display the menu items here using the `menuItems` variable */}
                {/* Display menu items here */}
                <ClientMenuDisplay category={selectedCategory}/>
                <Separator/>
            </div>
        </div>
    )
}

export default ClientMenuPage;