import React from "react";
import { useAuth } from "../../store/Auth";
import {toast} from 'react-toastify'

function AdminContacts() {
  const { allContactsData,getAllContactsData,token,API} = useAuth();
  const deleteContact=async(id)=>{
    try {
      const response = await fetch(`${API}/api/admin/delete/contacts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `token ${token}`,
        },
      });
      if (response.ok) {
        getAllContactsData()
       toast.success("Contact deleted successfully.")
      } else {
        toast.error("Contact not deleting.")
      }
    } catch (error) {
      console.log("Contact deleting error:", error);
    }
  }
  return (
    <>
      <div className=" text-black bg-white py-2 px-3 w-full">
        <div className="text-2xl font-bold ps-4">
          <h1>Admin Contacts</h1>
        </div>
        <div className="mt-3">
          <div className="flex flex-col w-ful  py-2 font-bold rounded-xl" >
            <div className="py-1 grid gridcols">
              <div className="username hover:text-blue-600 mx-1 px-2">
                Name
              </div>
              <div className="email hover:text-blue-600 mx-1 px-2">
                Email
              </div>
              <div className="phoneNumber hover:text-blue-600 mx-1 px-2">
                Phone
              </div>
              <div className="delete" >
               Delete
              </div>
            </div>
          </div>
            <hr className="border-black border" />
          {Array.isArray(allContactsData) ? (
            allContactsData.map((data, index) => {
              return (
                <div
                  className="flex flex-col w-full hover:bg-slate-200 py-1 text-gray-600"
                  key={index}
                >
                  <div className="py-1 grid gridcols">
                    <div className="username hover:text-blue-600 mx-1 px-2">
                      {data.username}
                    </div>
                    <div className="email hover:text-blue-600 mx-1 px-2">
                      {data.email}
                    </div>
                    <div className="phoneNumber hover:text-blue-600 mx-1 px-2">
                      {data.phoneNumber}
                    </div>
                    <div className="delete">
                      <button className=" bg-blue-800 px-3 rounded-lg text-white hover:bg-blue-600 py-1" onClick={()=>deleteContact(data._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>Contacts data getting error</div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminContacts;
