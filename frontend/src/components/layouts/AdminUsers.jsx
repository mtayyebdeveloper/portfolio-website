import React from "react";
import { useAuth } from "../../store/Auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
function AdminUsers() {
  const { allUsersData, getAllUsersData, token,API } = useAuth();
  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `${API}/api/admin/delete/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      if (response.ok) {
        getAllUsersData();
        toast.success("User deleted successfully.");
      } else {
        toast.error("User not deleting.");
      }
    } catch (error) {
      console.log("user deleting error:", error);
    }
  };
  return (
    <>
      <div className=" text-black bg-white py-2 px-3 w-full">
        <div className="text-2xl font-bold ps-4">
          <h1>Admin Users</h1>
        </div>
        <div className="mt-3">
          <div className="flex flex-col w-full font-bold py-2">
            <div className="py-1 grid gridcols-user">
              <div className="username hover:text-blue-600 mx-1 px-2">Name</div>
              <div className="email hover:text-blue-600 mx-1 px-2">Email</div>
              <div className="phoneNumber hover:text-blue-600 mx-1 px-2">
                Phone
              </div>
              <div className="admin">Admin</div>
              <div className="edit">Update</div>
              <div className="delete">Delete</div>
            </div>
          </div>
          <hr className="border-black border" />

          {Array.isArray(allUsersData) ? (
            allUsersData.map((data, index) => {
              return (
                <div
                  className="flex flex-col w-full hover:bg-slate-200 text-gray-600 py-1"
                  key={index}
                >
                  <div className="py-1 grid gridcols-user">
                    <div className="username hover:text-blue-600 mx-1 px-2">
                      {data.username}
                    </div>
                    <div className="email hover:text-blue-600 mx-1 px-2">
                      {data.email}
                    </div>
                    <div className="phoneNumber hover:text-blue-600 mx-1 px-2">
                      {data.phoneNumber}
                    </div>
                    <div className="Admin hover:text-blue-600 mx-1 px-2">
                      {data.isAdmin?"True":"False"}
                    </div>
                    <div className="edit">
                      <button className=" bg-blue-800 px-3 rounded-lg text-white hover:bg-blue-600 py-1">
                        <Link to={`/web-admin/update-users/${data._id}`}>
                          Edit
                        </Link>
                      </button>
                    </div>
                    <div className="delete">
                      <button
                        className=" bg-blue-800 px-3 rounded-lg text-white hover:bg-blue-600 py-1"
                        onClick={() => deleteUser(data._id)}
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

export default AdminUsers;
