import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../store/Auth";
import { toast } from "react-toastify";

function AdminUpdateUsers() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [imges, setimg] = useState("");
  const [password, setpassword] = useState("");
  const [passShow, setpassShow] = useState(false);
  const { token,API } = useAuth();
  const { id } = useParams();

  const userUpdateBtn = async () => {
    try {
      const response = await fetch(
        `${API}/api/admin/update/users/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
          body: JSON.stringify({
            username: name,
            email: email,
            phoneNumber: phone,
            userImage: imges,
            password: password,
          }),
        }
      );
      if (response.ok) {
        toast.success("User Updated Successfully..");
      } else {
        const errors = response.json().then((err) => {
          toast.error(err.massage.issues[0].message);
        });
      }
    } catch (error) {
      console.log("user updating error:", error);
    }
  };

  const compressAndEncodeImage = async (file) => {
    const maxWidth = 800; // Maximum width for the resized image
    const maxHeight = 600; // Maximum height for the resized image
    const quality = 0.8; // Image compression quality

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const scaleFactor = calculateScaleFactor(
            img.width,
            img.height,
            maxWidth,
            maxHeight
          );
          const width = img.width * scaleFactor;
          const height = img.height * scaleFactor;

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Get compressed image data
          canvas.toBlob(
            (blob) => {
              const reader = new FileReader();
              reader.onload = () => {
                resolve(reader.result);
              };
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            },
            "image/jpeg",
            quality
          );
        };
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const calculateScaleFactor = (
    imageWidth,
    imageHeight,
    maxWidth,
    maxHeight
  ) => {
    const widthRatio = maxWidth / imageWidth;
    const heightRatio = maxHeight / imageHeight;
    return Math.min(widthRatio, heightRatio);
  };

  const imageHandel = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    try {
      const imageDataUrl = await compressAndEncodeImage(file);
      setimg(imageDataUrl);
    } catch (error) {
      console.error("Error compressing or encoding image:", error);
    }
  };

  const showPasswordBtn = () => {
    setpassShow(!passShow);
  };
  return (
    <>
      <div className="py-2 px-2 bg-slate-100">
        <h1 className="text-start my-2 text-2xl font-bold ms-1">Update User</h1>
        <div className="flex flex-col items-center justify-center ">
          <div className="w-[50vw] bg-white py-4 px-4 border-2 border-gray-300 rounded-lg">
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold rounded-lg bg-blue-500 py-1 px-1 text-white"
                htmlFor="image"
              >
                <i className="fa-solid fa-image"></i> &nbsp; Select Image
              </label>
              <input
                className="hidden"
                id="image"
                accept="image/*"
                onChange={imageHandel}
                type="file"
                name="image"
                required
              />
            </div>
            {imges ? (
              <div className="mb-4">
                <img
                  src={imges}
                  className="w-[150px] h-[150px]"
                  alt="user image"
                />
              </div>
            ) : (
              ""
            )}
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
                  onClick={showPasswordBtn}
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
            <div className="mb-6 text-center">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={userUpdateBtn}
              >
                Update User
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminUpdateUsers;
