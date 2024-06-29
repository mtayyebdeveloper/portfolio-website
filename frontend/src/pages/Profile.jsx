import React, { useState, useEffect } from "react";
import { useAuth } from "../store/Auth.jsx";
import { toast } from "react-toastify";

function Profile() {
  const { userDatas, token,API,userImage } = useAuth();
  const [name, setname] = useState(userDatas.username);
  const [email, setemail] = useState(userDatas.email);
  const [number, setnumber] = useState(userDatas.phoneNumber);
  const [oldPassword, setoldPassword] = useState("");
  const [password, setpassword] = useState("");
  const [imageuser, setimageuser] = useState(null)
  const [oldPassShow, setoldPassShow] = useState(false);
  const [newPassShow, setnewPassShow] = useState(false);
  const [updatePassPopup, setupdatePassPopup] = useState("hidden");

  const UpdateUserData = async () => {
    const formdata = new FormData();
    formdata.append("username", name);
    formdata.append("email", email);
    formdata.append("phoneNumber", number);
    formdata.append("file", imageuser);

    if (updatePassPopup == "flex") {
      toast.error("you cannot update the profile..");
    } else {
      try {
        const response = await fetch(
          `${API}/api/auth/update`,
          {
            method: "PATCH",
            headers: {
              Authorization: `token ${token}`,
            },
            body: formdata,
          }
        );
        if (response.ok) {
          toast.success("Profile Updated Successfully..");
          console.log(response);
        } else {
          const errors =await response.json().then((err) => {
            console.log("update error",err);
            // toast.error(err.massage);
          });
        }
      } catch (error) {
        console.log("profile update error: ", error);
      }
    }
  };

  const UpdateUserPassword = async () => {
    try {
      if (password.length >= 8) {
        const response = await fetch(
          `${API}/api/auth/updatepassword`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `token ${token}`,
            },
            body: JSON.stringify({
              oldPassword: oldPassword,
              password: password,
            }),
          }
        );
        if (response.ok) {
          toast.success("Password Updated Successfully..");
        } else {
          toast.error("Old Password is wrong..");
        }
      } else {
        toast.error("Password must be at least 8 characters..");
      }
    } catch (error) {
      console.log("password update error: ", error);
    }
  };


  const passwordUpdateBtn = () => {
    if (updatePassPopup == "hidden") {
      setupdatePassPopup("flex");
    } else {
      setupdatePassPopup("hidden");
    }
  };

  const oldPassShowBtn = () => {
    setoldPassShow(!oldPassShow);
  };

  const NewPassShowBtn = () => {
    setnewPassShow(!newPassShow);
  };

  return (
    <>
      <div
        className={`${
          updatePassPopup == "flex" ? "bg-gray-500" : "bg-[rgb(243,244,246)]"
        } text-black h-[80vh] w-full py-2`}
      >
        <h1 className="text-3xl ps-3 font-bold">Profile</h1>
        <div className={`flex flex-col items-center justify-center mt-3 `}>
          <div
            className={`${
              updatePassPopup == "flex" ? "hidden" : "block"
            } text-center`}
          >
            {userDatas.userImage ? (
              <label htmlFor="image" className="hover:text-red-600">
                <img
                  className="w-[150px] h-[150px] rounded-full object-fill border-2 border-red-700"
                  src={imageuser ? URL.createObjectURL(imageuser):userImage}
                  alt="User profile image"
                />
                <i className="fa-solid fa-edit relative left-[48px] top-[-18px] "></i>
              </label>
            ) : (
              "User Image Loding......."
            )}
            <div className="mt-2 font-bold text-xl">{userDatas.username}</div>
            <input
              type="file"
              name="userimage"
              id="image"
              className="hidden"
              onChange={(e) => setimageuser(e.target.files[0])}
            />
          </div>
          <div className="flex flex-col ">
            <div
              className={`${
                updatePassPopup == "flex" ? "hidden" : "flex"
              } flex items-center flex-row text-lg font-bold mt-2`}
            >
              <label htmlFor="username">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className=" outline-none rounded border-2 border-gray-600 px-1 font-semibold ms-[40px] w-[30vw]"
                id="username"
              />
            </div>
            <div
              className={`${
                updatePassPopup == "flex" ? "hidden" : "flex"
              } flex items-center flex-row text-lg font-bold mt-2`}
            >
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className=" outline-none rounded border-2 border-gray-600 px-1 font-semibold ms-[44px] w-[30vw]"
                id="email"
              />
            </div>
            <div
              className={`${
                updatePassPopup == "flex" ? "hidden" : "flex"
              } flex items-center flex-row text-lg font-bold mt-2`}
            >
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                value={number}
                name="phone"
                onChange={(e) => setnumber(e.target.value)}
                className=" outline-none rounded border-2 border-gray-600 px-1 font-semibold ms-[35px] w-[30vw]"
                id="phone"
              />
            </div>

            <div
              className={`${updatePassPopup} flex-col absolute px-5 py-5 bg-white`}
            >
              <div className="flex items-center flex-row text-lg font-bold mt-2">
                <label htmlFor="oldpassword">Old Password</label>
                <input
                  type={oldPassShow ? "text" : "password"}
                  value={oldPassword}
                  name="oldPassword"
                  onChange={(e) => setoldPassword(e.target.value)}
                  className=" outline-none rounded border-2 border-gray-600 px-1 font-semibold ms-[10px] w-[27.2vw]"
                  id="oldpassword"
                />
                <div
                  className=" relative left-[-30px] hover:text-green-600 cursor-pointer"
                  onClick={oldPassShowBtn}
                >
                  {oldPassShow ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </div>
              </div>

              <div className="flex items-center flex-row text-lg font-bold mt-2">
                <label htmlFor="newpassword">New Password</label>
                <input
                  type={newPassShow ? "text" : "password"}
                  value={password}
                  name="newPassword"
                  onChange={(e) => setpassword(e.target.value)}
                  className=" outline-none rounded border-2 border-gray-600 px-1 font-semibold ms-[10px] w-[26.8vw]"
                  id="newpassword"
                />
                <div
                  className=" relative left-[-30px] hover:text-green-600 cursor-pointer"
                  onClick={NewPassShowBtn}
                >
                  {newPassShow ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </div>
              </div>

              <div className="flex my-2 justify-end me-5">
                <button
                  onClick={UpdateUserPassword}
                  className=" border-2 border-blue-800 rounded-full py-1 px-4 mt-2  tran font-semibold  bg-white hover:text-white hover:bg-blue-800 text-blue-800"
                >
                  Update Password
                </button>
              </div>

              <div className="flex justify-center my-2">
                <button
                  onClick={passwordUpdateBtn}
                  className="bg-green-400 py-1 border-2 tran w-[30vw] border-green-700 rounded-full text-black font-semibold hover:bg-green-500 hover:text-white"
                >
                  <i className="fa-solid fa-edit"></i>&nbsp;
                  {updatePassPopup == "flex" ? "Cancel" : "Edit Password"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end my-2 ">
              <button
                onClick={passwordUpdateBtn}
                className="bg-green-400 py-1 border-2 tran w-[30vw] border-green-700 rounded-full text-black font-semibold hover:bg-green-500 hover:text-white"
              >
                <i className="fa-solid fa-edit"></i>&nbsp;Edit Password
              </button>
            </div>

            <div
              className={`${
                updatePassPopup == "flex" ? "hidden" : "flex"
              } flex items-end justify-end my-2`}
            >
              <button
                onClick={UpdateUserData}
                className=" border-2 border-blue-800 rounded-full py-1 px-4 mt-2 tran font-semibold  bg-white hover:text-white hover:bg-blue-800 text-blue-800"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
