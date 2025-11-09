import { Navbar } from "../../components/Navbar";
import { ProductCard } from "../../components/ProductCard";
import { useCart } from "../../context/cart-context";

export const Wishlist = () => {
  const { wishlist } = useCart();
  return (
    <>
      <Navbar />
      <main className="flex flex-wrap gap-8 justify-center !pt-30">
        {wishlist?.length > 0 ? (
          wishlist.map((product) => (
            <ProductCard key={product.id} product={product} fromWishlist/>
          ))
        ) : (
          <p>Wishlist is empty, add products</p>
        )}
      </main>
    </>
  );
};
