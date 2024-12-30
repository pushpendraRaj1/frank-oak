import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import 'react-toastify/dist/ReactToastify.min.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const nav = useNavigate();
  const [User, setUser] = useState({});
  
  useEffect(() => {
    let admin = Cookies.get('admin')
    if (admin) nav('/dashboard');
  }, [])

  const handleLogin = () => {

    var inTenSeconds = new Date(new Date().getTime() + 100 * 60 * 1000);

    axios.post(`${process.env.REACT_APP_API_URL}/api/admin-panel/admin/login`, User)
      .then((response) => {
        console.log(response.data);
        Cookies.set("admin", JSON.stringify(response.data.data), { expires: inTenSeconds }); // User will only be loggedIn until the cookie is available (in this case, only Ten seconds)
        nav('/dashboard');
      })
      .catch((error) => {
        let showErr = "error";
        if (error.message) showErr = error.message;
        if (error.response) showErr = error.response.data.message;

        toast.error(showErr, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

      })
  }

  return (

    <div className="mx-auto my-[100px] bg-white rounded-[10px] w-[40%] h-[400px] p-[20px] border">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <h1 className="text-[#303640] font-semibold text-[40px] mt-[30px] p-[0_10px]">
        Login
      </h1>
      <h3 className="text-[#303640c2] text-[14px] p-[0_10px] mb-[30px]">
        Sign-in to your account
      </h3>
      <form>
        <div className="w-full grid grid-cols-[20%_auto] my-[10px]">
          <label htmlFor="name" className="py-[8px] px-[10px] text-[#303640]">
            User Name
          </label>
          <input onChange={(e) => setUser({ ...User, email: e.target.value })}
            name="email"
            id="name"
            type="text"
            placeholder="Enter your email"
            className="p-[10px] rounded-[5px] border input"
          />
        </div>
        <div className="w-full grid grid-cols-[20%_auto] my-[10px]">
          <label
            htmlFor="password"
            className="py-[8px] px-[10px] text-[#303640]"
          >
            Password
          </label>
          <input onChange={(e) => setUser({ ...User, password: e.target.value })}
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="p-[10px] input border rounded-[5px]"
          />
        </div>
        <div className="w-full my-[50px] flex justify-between items-center">

          <button onClick={handleLogin} type="button" className="w-[130px] bg-purple-600 text-white h-[40px] rounded-[5px] text-[18px] font-[400]">
            Login
          </button>
          <Link to="/reset-password">
            <span className="text-[#5351c9] mr-[50px]">Forgot password?</span>
          </Link>
        </div>
      </form>

    </div>
  );
}

export default App;
