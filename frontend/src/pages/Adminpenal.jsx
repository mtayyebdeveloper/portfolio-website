import React from "react";
import { Outlet, NavLink, Link,useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";
import ErrorPage from "./ErrorPage";

function Adminpenal() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      {isAdmin ? (
        <>
          <div className="text-black bg-white h-[100vh]">
            <div className="flex flex-row">
              <aside>
                <div className="admin-routes flex flex-col w-[200px] border-black border-r-2 h-[100vh]">
                  <div className="text-xl text-center font-bold px-2 py-2">
                    <Link to="/web-admin">
                      <p>Admin Penal</p>
                    </Link>
                  </div>
                  <hr className="border border-black" />
                  <NavLink to="/web-admin/users">
                    <div className="text-lg font-bold px-2 py-2 hover:bg-[#383838]  hover:text-white cursor-pointer">
                      <p>All Users</p>
                    </div>
                  </NavLink>
                  <NavLink to="/web-admin/contacts">
                    <div className="text-lg font-bold px-2 py-2 hover:bg-[#383838] hover:text-white cursor-pointer">
                      <p>All Contacts</p>
                    </div>
                  </NavLink>
                  <NavLink to="/web-admin/posts">
                  <div className="postspage text-lg font-bold px-2 py-2 hover:bg-[#383838] hover:text-white cursor-pointer">
                    <div className="flex flex-row items-center justify-between">
                    <p>Post</p>
                    <i className="fa-solid fa-caret-right"></i>
                    </div>
                    <ul className="postscontainer absolute bg-slate-100 text-black flex flex-col w-[200px] left-[197px] mt-[-35px] py-2 px-2 shadow-lg">
                      <NavLink to="/web-admin/posts">
                        <li className="hover:bg-[#383838] hover:text-white cursor-pointer py-1 px-1">
                          Create Post
                        </li>
                      </NavLink>
                      <NavLink to="/web-admin/all-posts">
                        <li className="hover:bg-[#383838] hover:text-white cursor-pointer py-1 px-1">
                          All Posts
                        </li>
                      </NavLink>
                    </ul>
                  </div>
                  </NavLink>
                </div>
              </aside>
              <div className="w-full">
                <div className="flex flex-col">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
        {/* <ErrorPage /> */}
        {navigate("/")}
        </>
      )}
    </>
  );
}

export default Adminpenal;
