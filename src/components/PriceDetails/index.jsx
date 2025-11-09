import { useCart } from "../../context/cart-context";
import { getTotalCArtAmount } from "../../utils/getTotalCartAmount";
import { useNavigate } from "react-router-dom";

export const PriceDetails = () => {
  const { cart } = useCart();
  const totalCartAmount = getTotalCArtAmount(cart);
  const deliveryCharge = cart?.length > 0 ? 40 : 0;
  const navigate=useNavigate();
  const loadScript=(src)=>{
    return new Promise(resolve=>{
      const script =document.createElement("script")
      script.src=src;
      script.onload=()=>resolve(true);
      script.onerror=()=>resolve(false);
      document.body.appendChild(script);
    })  
  }
  const displayRazorpay = async () => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Razorpay SDK failed to load. Check your internet connection.");
    return;
  }

  const options = {
    key: "rzp_test_VSdp7X3K39GwBK",
    amount: (totalCartAmount + deliveryCharge) * 100,
    currency: "INR",
    name: "Shop It",
    description: "Thank you for Shopping with us.",
    image: "https://therightfit.netlify.app/assets/The%20Right%20Fit-logos.jpeg",
    handler: ({ payment_id }) => {
      navigate("/");
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

  return (
    <div className="w-[400px] bg-[#fafafa] !p-4 shadow">
      <p className="text-2xl border-b">Price Details</p>
      <div className="flex flex-col gap-5">
        <div className="flex">
          <p>Price ({cart.length}) items</p>
          <p className="!ml-auto">Rs. {totalCartAmount}</p>
        </div>
        <div className="flex border-b">
          <p>Delivery Charge</p>
          <p className="!ml-auto">Rs. {deliveryCharge}</p>
        </div>
      </div>
      <div className="flex border-b">
        <p>Total Amount</p>
        <p className="!ml-auto">{totalCartAmount + deliveryCharge}</p>
      </div>
      <div>
        <button onClick={displayRazorpay} className="button hori-btn btn-primary btn-icon d-flex align-center justify-center gap cursor btn-margin w-full">
          Place Order
        </button>
      </div>
    </div>
  );
};
