import { createContext, 
    useState, 
    useCallback, 
    useContext} from "react";
import type { MenuItem } from "@/types";

export type CartItem = {
    _id: string,
    name: string,
    price: number,
    quantity: number,
}

interface CartContextType{
    cartItems: CartItem[],
    //setCartItems: Dispatch<SetStateAction<CartItem[]>>,
    addToCart: (newItem: MenuItem) => void,
}

const CartContext = createContext<CartContextType|null>(null)

export const CartProvider = ({children}:React.PropsWithChildren) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = useCallback((menuItem:MenuItem) => {
            setCartItems((prevCartItems) => {
                const existingItem = prevCartItems.find((item)=> item._id == menuItem._id)
                
                let updatedCartItems;
    
                if(existingItem){
                    updatedCartItems = prevCartItems.map((item) => 
                        item._id===menuItem._id ? 
                        {...item, quantity: item.quantity + 1} 
                        : 
                        item
                    );
                } else {
                    updatedCartItems = [
                        ...prevCartItems, {
                            _id: menuItem._id,
                            name: menuItem.name,
                            price: menuItem.price,
                            quantity: 1
                        }
                    ];
                }
                return updatedCartItems;
            })
        },[cartItems]);

    return (<CartContext.Provider value={{cartItems,addToCart}}>
        {children}
    </CartContext.Provider>)
};

export const useCart = () => {
    const context = useContext(CartContext);

    if(context===null){
        throw new Error("useCart must be used within a CartProvider")
    }

    return context;
};