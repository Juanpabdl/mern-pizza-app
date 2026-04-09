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
    addToCart: (newItem: MenuItem) => void,
    removeFromCart: (cartItem: CartItem) => void,
}

const CartContext = createContext<CartContextType|null>(null)

export const CartProvider = ({children}:React.PropsWithChildren) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCartItems = sessionStorage.getItem('cartItems');
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

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
                
                sessionStorage.setItem(
                    `cartItems`,
                    JSON.stringify(updatedCartItems)
                );

                return updatedCartItems;
            })
        },[cartItems]);

    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter(
                (item)=> item._id !== cartItem._id
            );

            sessionStorage.setItem(
                `cartItems`,
                JSON.stringify(updatedCartItems)
            );

            return updatedCartItems;
        })
    }

    return (<CartContext.Provider value={{cartItems,addToCart,removeFromCart}}>
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