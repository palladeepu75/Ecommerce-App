import { useCart } from "../../context/cart-context";
import { findProductInWishlist } from "../../utils/findProductInWishlist";
import { useNavigate } from "react-router-dom";

export const HorizontalProductCard = ({ product }) => {
  const { wishlist, cartDispatch } = useCart();
  const navigate=useNavigate()

  const onRemoveCartClick = (product) => {
    cartDispatch({
      type: "REMOVE_FROM_CART",
      payload: {product},
    });
  };

  const isProductInWishlist = findProductInWishlist(wishlist, product.id);


  const onWishlistClick = (product) => {
    !isProductInWishlist
      ? cartDispatch({ type: "ADD_TO_WISHLIST", payload: { product } })
      : navigate('/wishlist')
  };

  return (
    <>
      <div className="card-horizontal d-flex shadow">
        <div className="card-hori-image-container relative">
          <img className="card-image" src={product.images[0]} alt="shoes" />
          <small className="c-badge bg-primary absolute left-0">Trending</small>
        </div>
        <div className="card-details d-flex direction-column">
          <div className="card-title !text-sm">{product.title}</div>
          <div className="card-description">
            <p className="card-price">Rs. {product.price}</p>
          </div>
          <div className="quantity-container d-flex gap">
            <p className="q-title">Quantity: </p>
            <div className="count-container d-flex align-center gap">
              <button className="count">-</button>
              <span className="count-value">1</span>
              <button className="count">+</button>
            </div>
          </div>
          <div className="cta-btn d-flex gap-1">
            <div className="cta-btn">
              <button
                onClick={() => onRemoveCartClick(product)}
                className="button hori-btn btn-primary btn-icon d-flex align-center justify-center gap cursor btn-margin"
              >
                Remove From Cart
              </button>
            </div>
            <div onClick={() => onWishlistClick(product)} className="cta-btn">
              <button className="button hori-btn btn-outline-primary btn-icon d-flex align-center justify-center gap cursor btn-margin">
                {isProductInWishlist ? "Go to Wishlist" : "Move to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};




