import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";

function Loginform() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { storeTokentoLS,userAuthentication,API} = useAuth();
  const [passShow, setpassShow] = useState(false);

  const signupbtn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.ok) {
        const userToken = response.json();
        userToken.then((promis) => {
          storeTokentoLS(promis.jsonWebToken);
          toast.success(promis.massage);
          navigate("/");
          userAuthentication()
        });
      } else {
        const errors = response.json().then((err) => {
          if (err.massage.issues) {
            toast.error(err.massage.issues[0].message);
          } else if (err.massage) {
            toast.error(err.massage);
          }
        });
      }
    } catch (error) {
      console.log("Data posting error:", error);
    }
  };

  const showPasswordBtn = () => {
    setpassShow(!passShow);
  };

  return (
    <>
      <div className=" md:flex">
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden md:ps-2">
          <div>
            <h1 className="text-white font-bold text-3xl font-sans">
              Welcome back to
              <br />M Tayyeb Developer
            </h1>
            <p className="text-white mt-1">The most popular Web Developer</p>
            <button
              type="submit"
              className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
            >
              <Link to={"/about"}>About us</Link>
            </button>
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>
        <div className="flex md:w-1/2 w-[100vw] justify-center py-10 items-center bg-white">
          <form className="bg-white">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Hello Again!
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Welcome Back
            </p>
            <label htmlFor="email">Enter your email</label>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <input
                className="pl-2 outline-none border-none w-[80vw] md:w-[40vw]"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Your Email"
              />
            </div>
            <label htmlFor="password">Enter your password</label>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <input
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                type={passShow ? "text" : "password"}
                id="password"
                className="peer w-full text-gray-900 focus:outline-none focus:borer-rose-600"
                placeholder="Your Password"
              />
              <div onClick={showPasswordBtn} className=" hover:text-green-600 cursor-pointer">
                {passShow ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </div>
            </div>
            <button
              type="submit"
              onClick={signupbtn}
              className="block w-full hover:bg-blue-800 bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Login
            </button>
            <span className="text-sm ml-2 underline hover:text-blue-500 cursor-pointer">
              Forgot Password ?
            </span>
            <div className=" mt-4 text-sm ml-2 underline text-blue-800 text-center">
              <Link to="/signup">
                <p className=" hover:text-blue-600">I don't have account</p>
                <button className="bg-blue-800 hover:bg-blue-700 mt-2 text-white px-3 py-1 text-lg font-semibold rounded-md">
                  Sign up
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Loginform;
