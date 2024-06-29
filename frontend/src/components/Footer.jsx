import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className={`relative z-50 bg-white shadows text-black py-3`}>
        <div className="w-full flex flex-col items-center justify-center my-1">
          <h4 className="text-lg font-semibold text-dark text-black mb-3">
            Follow Us On
          </h4>
          <div className="flex items-center mb-3">
            <a
              href="#"
              className="flex items-center justify-center w-8 h-8 mr-3 border rounded-full hover:opacity-25  border-stroke border-black text-black sm:mr-4 lg:mr-3 xl:mr-4"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a
              href="#"
              className="flex items-center hover:opacity-25 justify-center w-8 h-8 mr-3 border rounded-full border-stroke border-black text-black sm:mr-4 lg:mr-3 xl:mr-4"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-8 h-8 mr-3 border rounded-full hover:opacity-25  border-stroke border-black  text-black sm:mr-4 lg:mr-3 xl:mr-4"
            >
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-8 h-8 mr-3 border rounded-full hover:opacity-25 border-stroke border-black text-black sm:mr-4 lg:mr-3 xl:mr-4"
            >
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center my-2">
          <ul className="flex-row flex items-center flex-wrap justify-center font-semibold text-[16px]">
            <li className=" cursor-pointer mx-1 px-1 lg:mx-2 lg:px-2 py-1 h-textshadow hover:-translate-y-1 hover:opacity-20 w-[30vw] md:w-auto">
              <Link to="/">Home</Link>
            </li>
            |
            <li className=" cursor-pointer hover:-translate-y-1 hover:opacity-20 mx-1 px-1 lg:mx-2 lg:px-2 py-1 h-textshadow w-[30vw] md:w-auto">
              <Link to="/blog">Blog</Link>
            </li>
            |
            <li className=" cursor-pointer hover:-translate-y-1 hover:opacity-20 mx-1 px-1 lg:mx-2 lg:px-2 py-1 h-textshadow w-[30vw] md:w-auto">
              <Link to="/portfolio">Portfolio</Link>
            </li>
            |
            <li className=" cursor-pointer hover:-translate-y-1 hover:opacity-20 mx-1 px-1 lg:mx-2 lg:px-2 py-1 h-textshadow w-[30vw] md:w-auto">
              <Link to="/services">Services</Link>
            </li>
            |
            <li className=" cursor-pointer hover:-translate-y-1 hover:opacity-20 mx-1 px-1 lg:mx-2 lg:px-2 py-1 h-textshadow w-[30vw] md:w-auto">
              <Link to="/about">About Us</Link>
            </li>
            |
            <li className=" cursor-pointer hover:-translate-y-1 hover:opacity-20 mx-1 px-1 lg:mx-2 lg:px-2 py-1 h-textshadow w-[30vw] md:w-auto">
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="w-full flex items-center justify-center text-center mt-2 my-1">
          <p className="text-xl text-body-color text-black">
            &copy; 2023 mtayyebdeveloper.com
          </p>
        </div>
        <div className="h-[10rem]"></div>
      </footer>
      {/* <!-- ====== Footer Section End --> */}
    </>
  );
}

export default Footer;
