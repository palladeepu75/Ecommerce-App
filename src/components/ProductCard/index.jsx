import { useCart } from "../../context/cart-context";
import { findProductInCart } from "../../utils/findProductInCart";
import { useNavigate } from "react-router-dom";
import { findProductInWishlist } from "../../utils/findProductInWishlist";

export const ProductCard = ({ product, fromWishlist }) => {
  const { cart, wishlist, cartDispatch } = useCart();
  
  //its util function
  const isProductInCart = findProductInCart(cart, product.id);
  const isProductInWishlist = findProductInWishlist(wishlist, product.id);

  const navigate = useNavigate();
  const onCartClick = (product) => {
    if (!isProductInCart) {
       localStorage.setItem('cart',JSON.stringify([...cart,product]))
      cartDispatch({
        type: "ADD_TO_CART",
        payload: { product },
      });
      // If card is rendered from wishlist → navigate immediately
      if (fromWishlist) {
        navigate("/cart");
      }
    } else {
      navigate("/cart");
    }
  };

  const onFaviouriteClick = (product) => {
    !isProductInWishlist
      ? cartDispatch({
          type: "ADD_TO_WISHLIST",
          payload: { product },
        })
      : cartDispatch({
          type: "REMOVE_FROM_WISHLIST",
          payload: { product },
        });
  };

  return (
    <div className="card card-vertical d-flex direction-column relative shadow">
      <div className="card-image-container">
        <img className="card-image" src={product.images[0]} alt={product.title}  />
      </div>
      <div className="card-details">
        <div className="flex card-title !text-sm">
          {product.title}
          <div className="flex !ml-auto">
            <span
              onClick={() => onFaviouriteClick(product)}
              className={
                isProductInWishlist
                  ? "material-symbols-outlined !text-3xl hover:cursor-pointer icon-fill"
                  : "material-symbols-outlined !text-3xl hover:cursor-pointer"
              }
            >
              favorite
            </span>
          </div>
        </div>
        <div className="card-description">
          <p className="card-price">Rs. {product.price}</p>
        </div>
        <div className="cta-btn">
          <button
            onClick={() => onCartClick(product)}
            className="button btn-primary btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin"
          >
            <span className="material-symbols-outlined !text-3xl">
              {isProductInCart || fromWishlist
                ? "shopping_cart_checkout"
                : "shopping_cart"}
            </span>
            {isProductInCart || fromWishlist ? "Go To Cart" : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

