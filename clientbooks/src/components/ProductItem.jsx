import React, { useContext } from "react";
import { itemContext } from "../context/ItemContext";

const ProductItem = ({ product }) => {
    const { addToCart, removeFromCart } = useContext(itemContext);

    if (!product) {
        return <div>Loading...</div>; // Handle missing product
    }

    const handleAddToCart = () => {
        console.log("Product added to cart:", product);
        addToCart(product);
    };

    const handleRemoveFromCart = () => {
        console.log("Product removed from cart:", product);
        removeFromCart(product);
    };

    return (
        <div className="product-card">
            <img
                className="product-image"
                src={product.image || "default-image-url"}
                alt={product.name || "Product Image"}
            />

            <div className="product-details">
                <h3 style={{ fontWeight: "700" }}>{product.name || "Unnamed Product"}</h3>
                <p style={{ fontWeight: "300" }}>{product.description || "No description available"}</p>
                <p style={{ fontWeight: "500" }}>Price: {product.price || 0} Rs</p>
                <p>{product.genre || "Unknown Genre"}</p>
                <p style={{ fontWeight: "700", color: "brown" }}>
                    {product.author || "Unknown Author"}
                </p>

                <button onClick={handleAddToCart}>Add to Cart</button>
                <button onClick={handleRemoveFromCart}>-</button>
            </div>
        </div>
    );
};

export default ProductItem;
