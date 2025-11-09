import { Navbar } from "../../components/Navbar";
import { useCart } from "../../context/cart-context";
import { HorizontalProductCard } from "../../components/HorizontalProductCard";
import { PriceDetails } from "../../components/PriceDetails";

export const Cart = () => {
  const { cart } = useCart();
  return (
    <>
      <Navbar />
      <main className="!pt-30 flex flex-col flex-wrap align-center">
        <h2 className="!text-3xl !pb-6">Your Cart</h2>
        {cart?.length > 0 ? (
          <div className="flex gap-10">
            <div className="flex flex-col gap-6">
              {cart?.length > 0 &&
                cart.map((product) => (
                  <HorizontalProductCard key={product.id} product={product} />
                ))}
            </div>
            <div>
              <PriceDetails />
            </div>
          </div>
        ) : (
          <p>Cart is empty, add products</p>
        )}
      </main>
    </>
  );
};
