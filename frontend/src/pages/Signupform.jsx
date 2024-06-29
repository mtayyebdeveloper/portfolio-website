import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/Auth";

function Signupform() {
  const [imges, setimg] = useState(null);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [passShow, setpassShow] = useState(false);
  const { API } = useAuth();

  const navigate = useNavigate();
  const registerbtn = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("username", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("phoneNumber", phone.toString());
    formdata.append("file", imges);

    try {
      const response = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        body: formdata,
      });

      if (response.ok) {
        toast.success("User created successfully...");
        navigate("/login");
      } else {
        response.json().then((error) => {
          if (error.massage) {
            toast.error(error.massage);
          // } else if (error.massage.issues) {
          //   toast.error(error.massage.issues[0].message);
          // } else if (error.massage.errors.userImage) {
          //   toast.error(error.massage.errors.userImage.message);
          // } else if (error.massage.keyValue.username) {
          //   toast.error(`Wrong username: ${error.massage.keyValue.username}`);
          // } else if (error.massage.keyValue.phoneNumber) {
          //   toast.error(
          //     `Wrong phone number: ${error.massage.keyValue.phoneNumber}`
          //   );
          }
          console.log(error);
        });
      }
    } catch (error) {
      console.log("Data posting error:", error);
    }
  };

  return (
    <>
      <div className={`md:flex`}>
        <div class="relative overflow-hidden w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden md:flex md:ps-2">
          <div>
            <h1 class="text-white font-bold text-3xl font-sans">
              Welcome to
              <br />M Tayyeb Developer
            </h1>
            <p class="text-white mt-1">The most popular Web Developer</p>
            <button
              type="submit"
              class="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
            >
              <Link to={"/about"}>About us</Link>
            </button>
          </div>
          <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>
        <div className="w-[100vw] md:w-[50%] bg-white p-5">
          <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
          <form className="px-8 pt-6 mb-2 bg-white rounded" onSubmit={registerbtn} encType="multipart/form-data">
            <div className="mb-4">
              <label className="" htmlFor="image">
                {imges ? (
                  <div className="mb-4">
                    <img
                      src={URL.createObjectURL(imges)}
                      className="w-[150px] rounded-full h-[150px]"
                      alt="user image"
                    />
                  </div>
                ) : (
                  "hh"
                )}
              </label>
              <input
                className="hidden"
                id="image"
                accept="image/*"
                onChange={(e) => setimg(e.target.files[0])}
                type="file"
                name="image"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="username"
              >
                Enter your username
              </label>
              <input
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                name="username"
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="username"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Enter your email
              </label>
              <input
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Your Email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="number"
              >
                Enter your mobileNo
              </label>
              <input
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="number"
                type="number"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                name="phoneNumber"
                placeholder="Your phone number"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Enter new password
              </label>
              <div className="flex items-center">
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="password"
                  type={passShow ? "text" : "password"}
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  name="password"
                  placeholder="****************"
                  required
                />
                <div
                  onClick={() => setpassShow(!passShow)}
                  className="relative ms-[-30px] mt-[-10px]  hover:text-green-600 cursor-pointer"
                >
                  {passShow ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </div>
              </div>
            </div>

            <div className=" text-center">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register Account
              </button>
            </div>
          </form>
          <div>
            <a
              className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <div className="text-center">
            <Link className="inline-block align-baseline" to="/login">
              <p className="hover:text-blue-800 text-blue-500 text-sm hover:underline">
                Already have an account ?
              </p>
              <button className="bg-blue-700 hover:bg-blue-800 px-4 mt-2 py-1 rounded-md text-white font-semibold text-lg">
                Login!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signupform;
