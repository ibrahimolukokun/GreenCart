import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

    const currency = import.meta.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([])


    const [cartItems, setCartItems] = useState({})
    const [seacrhQuery, setSeacrhQuery] = useState({})

    // Fetch All Products
    const fetchProducts= async() => {
        setProducts(dummyProducts)
    }

    //Add Product to cart
    const addToCart = (itemId)=>{
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]){
            cartData[itemId] += 1 ;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart")
    }

    //Update Cart Item Quantity
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData)
        toast.success("Cart Updated")
    }

    //Remove Product to cart
    const removeFromCart = (itemId)=>{
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]){
            cartData[itemId] -= 1 ;
        } else {
            cartData[itemId] = 0;
        }
        setCartItems(cartData);
        toast.success("Removed from Cart")
    }

    useEffect(()=>{
        fetchProducts()
    }, [])

    const value ={navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, setProducts, currency, addToCart, updateCartItem, removeFromCart, cartItems, seacrhQuery, setSeacrhQuery}

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>

}

export const useAppContext = () => {
    return useContext(AppContext)
}