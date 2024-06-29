import React from "react";
import { useAuth } from "../../store/Auth";
import { toast } from "react-toastify";
import {Link} from 'react-router-dom'

function AdminAllPosts() {
  const { allPostsData, getAllPostsDataForAdmin, token,API } = useAuth();
  const deletePost = async (id) => {
    try {
      const response = await fetch(
        `${API}/api/admin/delete/posts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      if (response.ok) {
        getAllPostsDataForAdmin();
        toast.success("Post Deleted Successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className=" text-black bg-white py-2 px-3 w-full">
        <div className="text-2xl font-bold ps-4">
          <h1>Admin Posts</h1>
        </div>
        <div className="mt-3">
          <div className="flex flex-col w-full font-bold py-2">
            <div className="py-1 grid gridcols">
              <div className="username hover:text-blue-600 mx-1 px-2">
                Title
              </div>
              <div className="email hover:text-blue-600 mx-1 px-2">Auther</div>
              <div className="edit">Update</div>
              <div className="delete">Delete</div>
            </div>
          </div>
          <hr className="border-black border" />

          {Array.isArray(allPostsData) ? (
            allPostsData.map((data, index) => {
              return (
                <div
                  className="flex flex-col w-full hover:bg-slate-200 text-gray-600 py-1"
                  key={index}
                >
                  <div className="py-1 grid gridcols">
                    <div className="username hover:text-blue-600 mx-1 px-2">
                      {data.title}
                    </div>
                    <div className="email hover:text-blue-600 mx-1 px-2">
                      {data.auther.username}
                    </div>
                    <div className="edit">
                      <button className=" bg-blue-800 px-3 rounded-lg text-white hover:bg-blue-600 py-1">
                        <Link to={`/web-admin/update-posts/${data._id}`}>
                          Edit
                        </Link>
                      </button>
                    </div>
                    <div className="delete">
                      <button
                        className=" bg-blue-800 px-3 rounded-lg text-white hover:bg-blue-600 py-1"
                        onClick={() => deletePost(data._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>Users data getting error</div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminAllPosts;
