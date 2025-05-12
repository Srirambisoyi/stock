import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

function Signin() {
  const [userdata, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";

  const authLocal = useAuth();

  const signin = async (e) => {
    // e.preventDefault();
    // console.log(userdata);
    try {
      const res = await axios.post("http://localhost:4000/signin", userdata);
      // console.log(res);
      setUserData({ email: "", password: "" });
      const user = res.data;
      console.log(user);
      authLocal.login(user);

      localStorage.setItem("user", JSON.stringify(user));
      navigate(redirectPath, { replace: true });
      alert("successful Signin");
    } catch (error) {
      alert(error.response.data.error);

      console.log(error);
    }
  };

  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userdata, [name]: value });
  };

  return (
    <main className="w-full flex">
      <div className="relative flex-1 hidden items-center justify-center h-screen bg-blue-900 lg:flex">
        <div className="relative z-10 w-full max-w-md">
          <img
            src={require("../assets/img/logo-dark.png")}
            width={90}
            alt="logo"
          />
          <div className=" mt-10 space-y-3">
            <h3 className="text-white text-3xl font-bold">
              Start growing your business quickly
            </h3>
            <p className="text-gray-300">
              Create an account and get access to all features for 30-days, No
              credit card required.
            </p>
            <div className="flex items-center -space-x-2 overflow-hidden">
              <img
                src="https://randomuser.me/api/portraits/women/79.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
                alt="demo"
              />
              <img
                src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
                alt="demo"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f"
                className="w-10 h-10 rounded-full border-2 border-white"
                alt="demo"
              />
              <img
                src="https://randomuser.me/api/portraits/men/86.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
                alt="demo"
              />
              <img
                src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
                className="w-10 h-10 rounded-full border-2 border-white"
                alt="demo"
              />
              <p className="text-sm text-gray-400 font-medium translate-x-5">
                Join 5.000+ users
              </p>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 my-auto h-[500px]"
          style={{
            background:
              "linear-gradient(152.92deg, rgba(103, 147, 252, 0.2) 4.54%, rgba(121, 185, 249, 0.26) 34.2%, rgba(103, 147, 252, 0.1) 77.55%)",
            filter: "blur(118px)",
          }}
        ></div>
      </div>

      <div className="flex-1 flex items-center justify-center h-screen">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
          <div className="">
            <img
              src={require("../assets/img/logo.png")}
              width={80}
              className="lg:hidden mx-auto"
              alt="logo"
            />
            <div className="mt-5 space-y-2 text-center">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Sign in
              </h3>
              <p className="">
                Don't have an account?{" "}
                <Link
                  to={"/signup"}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Signup
                </Link>
              </p>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg"
                onChange={handleInputs}
                value={userdata.email}
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg"
                onChange={handleInputs}
                value={userdata.password}
              />
            </div>
            <button
              onClick={signin}
              className="w-full px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Signin;
