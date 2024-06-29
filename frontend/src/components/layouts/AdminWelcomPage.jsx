import React, { useState } from "react";
import { useAuth } from "../../store/Auth";

function AdminWelcomPage() {
  const [siteData, setsiteData] = useState(true);
  const [news, setnews] = useState(true);
  const {allUsersData,allContactsData,allPostsData} =useAuth()

  const siteDataBtn = () => {
    setsiteData(!siteData);
  };
  const newsBtn = () => {
    setnews(!news);
  };
  return (
    <>
      <div className="flex flex-col bg-white">
        <div className="bg-slate-700 text-white flex flex-row items-center justify-between py-1 px-2">
          <div className="flex flex-row items-center">
            <div className="bg-white text-black px-2 py-1 rounded-lg mx-3">
              <input
                type="checkbox"
                checked={siteData}
                name="posts"
                onChange={siteDataBtn}
                id="posts"
              />
              <label htmlFor="posts" className="ps-1 font-semibold">
                Site Data
              </label>
            </div>
            <div className="bg-white text-black px-2 py-1 rounded-lg mx-3">
              <input
                type="checkbox"
                checked={news}
                onChange={newsBtn}
                name="news"
                id="news"
              />
              <label htmlFor="news" className="ps-1 font-semibold">
                News
              </label>
            </div>
          </div>
          <div>
            <div className="profileImg hover:bg-slate-600 px-2">
              <div className="flex flex-row items-center cursor-pointer ">
                <div className="me-2 hover:text-blue-500">
                  <p>Username</p>
                </div>
                <img
                  src="../public/WhatsApp_Image_2024-02-25_at_20.38.39_3568334e-removebg-preview.png"
                  className="w-[38px] h-[38px] rounded-full bg-white border-2 border-blue-700"
                  alt="user image"
                />
              </div>
              <div className="profile flex w-[200px] flex-row py-2 px-2 bg-slate-700 absolute right-0">
                <img
                  src="../public/WhatsApp_Image_2024-02-25_at_20.38.39_3568334e-removebg-preview.png"
                  className="w-[50px] h-[50px]"
                  alt="user image"
                />
                <div className="flex flex-col ms-2">
                  <span className="hover:text-blue-500 cursor-pointer">
                    UserName
                  </span>
                  <span className="hover:text-blue-500 cursor-pointer mt-1">
                    Edit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-600 text-white w-full py-2 px-2 flex flex-col items-center justify-center h-[160px] md:h-[200px] lg:h-[250px]">
          <h1 className="text-2xl font-bold text-center">
            Welcome to Admin Panel
          </h1>
        </div>
        <div className="flex flex-row justify-between px-5 pt-3">
          <div className="w-[50%]">
            <div
              className={` border-2 border-slate-600 rounded py-1 px-1 mx-2 my-2 ${
                siteData ? "flex" : "hidden"
              } flex-col`}
            >
              <div className="bg-blue-600">
                <h1 className="text-xl py-1 text-white font-bold text-center">
                  Site Data
                </h1>
              </div>
              <div className="flex flex-row flex-wrap items-center font-semibold">
                <div className="mx-3 my-3">Total Posts: {allPostsData.length}</div>
                <div className="mx-3 my-3">Total Users: {allUsersData.length}</div>
                <div className="mx-3 my-3">Total Contacts: {allContactsData.length}</div>
              </div>
            </div>
          </div>
          <div className="w-[50%]">
            <div
              className={` border-2 border-slate-600 rounded py-1 px-1 mx-2 my-2 ${
                news ? "flex" : "hidden"
              } flex-col`}
            >
              <div className="bg-blue-600">
                <h1 className="text-xl py-1 text-white font-bold text-center">
                  News
                </h1>
              </div>
              <div className="font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia molestiae, delectus optio at hic eligendi illo possimus
                ut modi sunt, cupiditate deserunt eum repellat, molestias iste
                sequi vel consequatur eius.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminWelcomPage;
