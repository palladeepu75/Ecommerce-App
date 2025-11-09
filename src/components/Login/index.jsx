import { useLogin } from "../../context/login-context";
import { userLogin } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { loginDispatch, email, password } = useLogin();
  const navigate = useNavigate();
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const data = await userLogin(email, password);
    //  console.log({data});
    if(Object.keys(data)?.length>0){
      localStorage.setItem('token',data.access_token)
    }

    loginDispatch({
      type: "TOKEN",
      payload: {
        token: data,
      },
    });
    if (data.access_token) {
      navigate("/");
    }
  };

  const onEmailChange = (e) => {
    loginDispatch({
      type: "EMAIL",
      payload: {
        value: e.target.value,
      },
    });
  };

  const onPasswordChange = (e) => {
    loginDispatch({
      type: "PASSWORD",
      payload: {
        value: e.target.value,
      },
    });
  };

  return (
    <form onSubmit={onFormSubmit} autoComplete="off" className="bg-white shadow-md w-[400px] !p-10">
  <h2 className="flex justify-center text-3xl">Login</h2>

  <div className="flex flex-col gap-2">
    <span>Email *</span>
    <input
      name="email"
      autoComplete="email"
      className="border-b-2"
      onChange={onEmailChange}
      type="email"
      required
      placeholder="john@mail.com"
    />
  </div>

  <div className="flex flex-col gap-2">
    <span>Password *</span>
    <input
      name="password"
      autoComplete="current-password"
      className="border-b-2"
      onChange={onPasswordChange}
      type="password"
      required
      placeholder="changeme"
    />
  </div>

  <div className="mx-4"> 
    <button type="submit" className="button btn-primary btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin">
      Login
    </button>
  </div>
</form>

  );
};
