import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../store/Auth";

function Header(props) {
  const [navbar, setnavbar] = useState("hidden");
  const navbaropenbtn = () => {
    if (navbar === "hidden") {
      setnavbar("block");
    } else {
      alert("sorry! navbar has already in open mood.");
    }
  };
  const navbarclosebtn = () => {
    if (navbar === "block") {
      setnavbar("hidden");
    } else {
      alert("sorry! navbar has already in close mood.");
    }
  };
  const { isLoggedin, isAdmin,userDatas,userImage } = useAuth();
  return (
    <>
      <div
        className={`header sticky z-50 top-0 bg-white shadow-lg dark:w-[20px] flex flex-col pt-3 px-3`}
      >
        <div className="top-section flex justify-between items-center flex-row">
          <div className="text-blue-800 logo text-xl lg:text-2xl">
            <b>
              M T <span className=" text-lg lg:text-xl">Developer</span>
            </b>
          </div>
          <div className="menus order-2 md:order-1">
            <i
              className="fa-solid fa-bars text-2xl hover:text-blue-600 cursor-pointer md:hidden float-right"
              onClick={navbaropenbtn}
            ></i>
            <nav
              className={`${navbar} py-3 px-2 md:py-0 md:px-0 bg-white absolute md:flex w-[100vw] md:static top-0 left-0 md:w-auto`}
            >
              <i
                className="fa-solid fa-close float-right text-2xl me-4 mt-2 md:hidden hover:text-blue-600"
                onClick={navbarclosebtn}
              ></i>
              <ul className="md:flex-row flex  flex-col items-start md:items-center font-semibold lg:text-lg text-[16px]">
                <NavLink to="/">
                  <li
                    className={`cursor-pointer
                        hover:h-textshadow hover:-translate-y-1 hover:opacity-20 mx-1 px-1 lg:mx-2 lg:px-2 py-1 w-[30vw] md:w-auto `}
                  >
                    Home
                  </li>
                </NavLink>
                <NavLink to="/blog">
                  <li
                    className={`cursor-pointer hover:-translate-y-1 hover:opacity-20 mx-1 px-1 lg:mx-2 lg:px-2 py-1 hover:h-textshadow w-[30vw] md:w-auto `}
                  >
                    Blog
                  </li>
                </NavLink>
                <NavLink to="/portfolio">
                  <li
                    className={`cursor-pointer hover:-translate-y-1 hover:opacity-20 mx-1 px-1 lg:mx-2 lg:px-2 py-1 h-textshadow w-[30vw] md:w-auto`}
                  >
                    Portfolio
                  </li>
                </NavLink>
                <NavLink to="/services">
                  <li
                    className={`cursor-pointer hover:-translate-y-1 hover:opacity-20 mx-1 px-1 lg:mx-2 lg:px-2 py-1 h-textshadow w-[30vw] md:w-auto `}
                  >
                    Services
                  </li>
                </NavLink>
                <NavLink to="/about">
                  <li
                    className={`cursor-pointer hover:-translate-y-1 hover:opacity-20 mx-1 px-1 lg:mx-2 lg:px-2 py-1 h-textshadow w-[30vw] md:w-auto`}
                  >
                    About Us
                  </li>
                </NavLink>
                <NavLink to="/contact">
                  <li
                    className={`cursor-pointer hover:-translate-y-1 hover:opacity-20 mx-1 px-1 lg:mx-2 lg:px-2 py-1 h-textshadow w-[30vw] md:w-auto`}
                  >
                    Contact Us
                  </li>
                </NavLink>
              </ul>
            </nav>
          </div>
          <div className="btns flex items-center order-1 md:order-2 absolute right-11 md:static">
            <button className="mx-2 py-1 rounded-md font-semibold">
              <img src="darkmood.svg" alt="" className="w-[20px] lg:w-[25px]" />
            </button>
            
            <div>
              {isLoggedin ? (
                <div>
                  <div className="user-profile-image w-full">
                    <img
                      src={userImage}
                      className=" rounded-full border-2 w-[40px] h-[40px] overflow-hidden border-blue-600"
                      alt="User Profile Image"
                    />
                    <div className="user-profile-list rounded-md shadow-lg bg-gray-300 text-black py-2 px-1 absolute w-[180px] right-0 font-semibold">
                      <ul className="flex flex-col w-full">
                        <li className="cursor-pointer px-1 hover:bg-blue-800 hover:text-white">
                          <Link to="/profile">
                            <i className="fa-solid fa-user"></i> &nbsp; Profile
                          </Link>
                        </li>
                        {isAdmin ? (
                          <>
                            <li className="cursor-pointer px-1 hover:bg-blue-800 hover:text-white">
                              <Link to="/web-admin">
                                <i class="fa-solid fa-chart-line"></i> &nbsp;
                                Dashboard
                              </Link>
                            </li>
                          </>
                        ) : (
                          ""
                        )}
                        {/* <hr className="border border-black"/> */}
                        <li className="cursor-pointer px-1 hover:bg-blue-800 hover:text-white">
                          <Link to="/logout">
                            <i class="fa-solid fa-right-from-bracket"></i>{" "}
                            &nbsp; Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/signup">
                  Sign Up &nbsp; <i className="fa-solid fa-user"></i>
                </Link>
              )}
            </div>
            {/* <button className=" mx-1 lg:mx-2 lg:px-2 hover:bg-blue-800 hover:text-white tran text-blue-800 border-2 border-blue-800 px-1 py-1 rounded-md font-semibold">
              {isLoggedin ? (
                <Link to="/logout">
                  Logout &nbsp; <i className="fa-solid fa-user"></i>
                </Link>
              ) : (
                <Link to="/signup">
                  Sign Up &nbsp; <i className="fa-solid fa-user"></i>
                </Link>
              )}
            </button> */}
          </div>
        </div>
        <div className="bottom-section md:flex-row flex-col flex justify-evenly w-full items-center mt-3 py-3">
          <div className="contact-icons my-2 md:my-0">
            <ul className="flex items-center text-2xl">
              <li className="mx-3 md:mx-2">
                <a href="https://www.facebook.com" target="_blank">
                  <i className="fa-brands fa-facebook text-blue-700 hover:-translate-y-1 hover:transition-all bg-white p-1 rounded-full shadow-lg"></i>
                </a>
              </li>
              <li className="mx-3 md:mx-2">
                <a href="https://www.facebook.com" target="_blank">
                  <i className="fa-brands fa-youtube text-red-700 hover:-translate-y-1 hover:transition-all bg-white p-1 rounded-full shadow-lg"></i>
                </a>
              </li>
              <li className="mx-3 md:mx-2">
                <a href="https://www.facebook.com" target="_blank">
                  <i className="fa-brands fa-tiktok text-black hover:-translate-y-1 hover:transition-all bg-white py-1 px-[6px] rounded-full shadow-lg"></i>
                </a>
              </li>
              <li className="mx-3 md:mx-2">
                <a href="https://www.facebook.com" target="_blank">
                  <i className="fa-brands fa-twitter text-blue-700 hover:-translate-y-1 hover:transition-all bg-white p-1 rounded-full shadow-lg"></i>
                </a>
              </li>
              <li className="mx-3 md:mx-2">
                <a href="https://www.facebook.com" target="_blank">
                  <i className="fa-brands fa-github text-black hover:-translate-y-1 hover:transition-all bg-white p-1 rounded-full shadow-lg"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="search-box my-2 md:my-0 ">
            <div className="text-lg px-2 flex flex-row items-center justify-center font-semibold border-2 border-gray-300 rounded-full bg-white">
              <input
                type="text"
                className=" outline-none rounded-full bg-none ps-2 py-1 text-black w-[70vw] md:w-[40vw] lg:w-[500px]"
                placeholder="Search Here..."
              />
              <button className=" cursor-pointer px-2 text-black hover:text-blue-700">
                <i className="fa-solid fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
