import React from "react";
import { Link } from "react-router-dom";
import {useAuth} from '../store/Auth'

function About() {
  const {userDatas} =useAuth()
  return (
    <>
      <div className=" bg-[rgb(243,244,246)] px-3 py-5 text-black">
        <div>
          <div>
            <p className="font-semibold text-xl">Welcome {userDatas?userDatas.username:""}</p>
            <hr className="border-2 border-blue-800 rounded w-[250px] font-bold" />
          </div>
          <div>
            <p className="text-5xl font-bold">Why choose us</p>
          </div>
        </div>
        <div className="flex items-center flex-col md:flex-row">
          <div className="w-full md:w-[50%] md:mt-[0px]">
            <div className="mt-1 font-semibold pr-0 md:pr-5">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                vel officia aspernatur dolorum, nam doloremque facere ipsa nemo
                deleniti doloribus repellat fugiat magnam minima provident sunt
                consequuntur repellendus accusantium quam. Lorem ipsum, dolor
                sit amet consectetur adipisicing elit. Magni, laboriosam!
                Assumenda aperiam est earum. Ratione sequi reiciendis, earum
                animi repellat autem omnis accusamus veniam vel perspiciatis
                odit itaque est accusantium? Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Repudiandae qui molestias
                distinctio! Quasi vel cupiditate eius eveniet sint. Sed mollitia
                beatae pariatur voluptatibus sit ipsum rerum ducimus, at dolore
                iste. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quae dolores quibusdam rerum iure! Aut beatae quia a consequatur
                esse quas quis, eum rerum, voluptates, excepturi ducimus aperiam
                ut totam tempora?
              </p>
            </div>
            <button className="mt-3 bg-white text-blue-800 font-bold text-lg border-2 border-blue-800 px-2 rounded-lg py-1 hover:bg-blue-800 hover:text-white tran">
              <Link to="/contact">Contact now</Link>
            </button>
          </div>
          <div className="w-full md:w-[50%] mt-3 md:mt-0">
            <div>
              <img
                src="photo-1499951360447-b19be8fe80f5.avif"
                className="w-full md:h-[450px] lg:h-[350px]"
                alt="about us img"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
