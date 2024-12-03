import { createContext, useEffect, useState } from "react";

const itemContext = createContext();

function CustomItemContext({ children }) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [itemsInCart, setItemsInCart] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/books");
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const products = await response.json();
                console.log(products);
                setProducts(products);
            } catch (error) {
                console.error("Error fetching products:", error.message);
            }
        };

        fetchData();
    }, []);

    const addToCart = (product) => {
        if (!product || !product.price) {
            console.error("Invalid product:", product);
            return;
        }
        setTotalPrice((prevTotal) => prevTotal + product.price);
        setCart((prevCart) => [...prevCart, product]);
        setItemsInCart((prevCount) => prevCount + 1);
    };

    const removeFromCart = (product) => {
        if (!product || !product._id) {
            console.error("Invalid product:", product);
            return;
        }
        setCart((prevCart) => {
            const index = prevCart.findIndex((prdt) => prdt._id === product._id);
            if (index !== -1) {
                const updatedCart = [...prevCart];
                updatedCart.splice(index, 1);
                setTotalPrice((prevTotal) => prevTotal - prevCart[index].price);
                setItemsInCart((prevCount) => prevCount - 1);
                return updatedCart;
            }
            return prevCart;
        });
    };

    return (
        <itemContext.Provider
            value={{
                products,
                addToCart,
                removeFromCart,
                itemsInCart,
                totalPrice,
            }}
        >
            {children}
        </itemContext.Provider>
    );
}

export { itemContext };
export default CustomItemContext;
