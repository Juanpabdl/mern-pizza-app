import { useGetMyMenu } from "@/api/myMenuAPI";
//import type { MenuItem } from "@/types";
//import ClientMenuSection from "./ClientMenuSection";

type Props = {
    category: string,
}

const ClientMenuDisplay = ({category}:Props) => {
    const {menuItems, isPending} = useGetMyMenu();
    //const filteredList = category=='All' ? menuItems : (menuItems?.filter((item:MenuItem)=> item.category.includes(category)))
    

    if(isPending){
        return <div>Loading...</div>
    }

    return (
        <div>
            These are the menu items. {category}
            {/* Menu Sections */}
            
        </div>
    )
}

export default ClientMenuDisplay;