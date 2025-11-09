import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../context/login-context";
import { useCart } from "../../context/cart-context";
//local storage has used to store data for the wishlist, cart, acccountDetails(token)
export const Navbar = () => {
  const navigate = useNavigate();
  const [isAccountDropDownOpen, setIsAccountDropDownOpen] = useState(false);
  const { token, loginDispatch } = useLogin();
  const { cart,wishlist } = useCart();
  // console.log(token);

  const onLoginClick = () => {
    if (token?.access_token) {
      navigate("/auth/login");
    } else {
      loginDispatch({
        type: "LOGOUT",
      });
      navigate("/auth/login");
    }
  };

  return (
    <header className=" fixed top-0 left-0 right-0 z-50 flex bg-zinc-800 text-slate-50 !py-6 px-5 flex align-center">
      <div>
        <h1
          onClick={() => navigate("/")}
          className="text-5xl hover:cursor-pointer"
        >
          Shop It
        </h1>
      </div>

      <nav className="flex !ml-auto gap-6">
        <div className="relative">
          <span
            onClick={() => navigate("/wishlist")}
            className="material-symbols-outlined text-3xl cursor-pointer"
          >
            favorite
          </span>

          {wishlist.length > 0 && (
            <div className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {wishlist.length}
            </div>
          )}
        </div>

        <div className="relative">
          <span
            onClick={() => navigate("/cart")}
            className="material-symbols-outlined text-3xl cursor-pointer"
          >
            shopping_cart
          </span>
          {cart.length > 0 && (
            <div className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cart.length}
            </div>
          )}
        </div>

        <div className="relative">
          <span
            onClick={() => setIsAccountDropDownOpen(!isAccountDropDownOpen)}
            className="material-symbols-outlined text-3xl cursor-pointer !mr-4"
          >
            account_circle
          </span>
          {isAccountDropDownOpen && (
            <div className="absolute right-0 top-full mt-1 btn-primary rounded-md">
              <button onClick={onLoginClick} className="px-3 py-1 text-sm">
                {token?.access_token ? "Logout" : "Login"}
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
