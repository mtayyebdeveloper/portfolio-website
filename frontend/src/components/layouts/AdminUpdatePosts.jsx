import React, { useState,useEffect } from "react";
import { useAuth } from "../../store/Auth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function AdminPosts() {
  const { token,API} = useAuth();
  const { id } = useParams();
  const [title, settitle] = useState("");
  const [desctiption, setdesctiption] = useState("");
  const [image, setimage] = useState("");

  const getPostsData = () => {
    try {
      fetch(`${API}/api/admin/send/posts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        settitle(data.title)
        setdesctiption(data.description)
        setimage(data.image)
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("posts data getting error :", error);
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);

  const postSubmitBtn = async () => {
    try {
      const response = await fetch(`${API}/api/admin/update/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${token}`,
        },
        body: JSON.stringify({
          title: title,
          description: desctiption,
          image: image,
        }),
      });
      if (response.ok) {
        toast.success("Post updated successfully");
      } else {
        toast.error("post not updated....");
      }
    } catch (error) {
      console.log("posting error:", error);
    }
  };

  const clearBtn = () => {
    settitle("");
    setdesctiption("");
    setimage("");
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

  const imgUrl = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    try {
      const imageDataUrl = await compressAndEncodeImage(file);
      setimage(imageDataUrl);
    } catch (error) {
      console.error("Error compressing or encoding image:", error);
    }
  };

  return (
    <>
      {/* <!-- component --> */}
      <div className="flex justify-between flex-row h-[100vh]">
        <div className="w-[75%]">
          <div class="heading font-bold text-2xl py-3 ps-4 text-gray-800">
            Update Posts
          </div>
          <hr className="border border-black" />
          <div class="editor mx-auto w-full flex flex-col text-gray-800 p-4">
            <input
              class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
              spellcheck="false"
              placeholder="Title"
              type="text"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
            <textarea
              class="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
              spellcheck="false"
              placeholder="Describe everything about this post here"
              value={desctiption}
              onChange={(e) => setdesctiption(e.target.value)}
            ></textarea>

            {/* <!-- icons --> */}
            <div class="icons flex text-gray-500 m-2">
              <div>
                <i className="fa-solid fa-location-dot mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"></i>
              </div>
              <div>
                <i className="fa-solid fa-face-smile mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"></i>
              </div>
              <div>
                <label htmlFor="img">
                  {" "}
                  <i className="fa-solid fa-paperclip mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"></i>
                </label>
              </div>
              <div class="count ml-auto text-gray-400 text-xs font-semibold">
                0/300
              </div>
            </div>
          </div>
        </div>
        <div className="w-[25%] border-l-2 border-black py-2">
          <div className="py-2">
            <h2 className="text-center text-lg font-semibold">Publish post</h2>
            <hr className="border border-gray-900" />
          </div>
          <div class="buttons flex flex-row items-center justify-end me-2">
            <button
              class="btn border mx-2 rounded hover:text-white hover:bg-red-400 border-gray-300 p-1 px-4 font-semibold text-gray-500"
              onClick={clearBtn}
            >
              Clear
            </button>
            <button
              class="btn border mx-2 rounded hover:bg-indigo-600 border-indigo-500 p-1 px-4 font-semibold text-gray-200 bg-indigo-500"
              onClick={postSubmitBtn}
            >
              Post
            </button>
          </div>
          <div className="px-2 py-3">
            <label htmlFor="img">
              <img
                src={image}
                alt="Upload image"
                class="w-full h-64 object-cover rounded"
              />
            </label>
          </div>
          <div>
            <input
              type="file"
              name="img"
              id="img"
              className="hidden"
              accept=".jpg, .png, .avif"
              onChange={imgUrl}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPosts;
