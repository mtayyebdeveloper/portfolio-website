import React, { useState } from "react";
import { useAuth } from "../../store/Auth";
import { toast } from "react-toastify";

function AdminPosts() {
  const { token, API } = useAuth();
  const [title, settitle] = useState("");
  const [desctiption, setdesctiption] = useState("");
  const [image, setimage] = useState(null);
  const [catagore, setcatagore] = useState("");

  const postSubmitBtn = async (e) => {
    try {
      e.preventDefault();
      const formdata =new FormData();
      formdata.append("title",title);
      formdata.append("description",desctiption);
      formdata.append("file",image);
      formdata.append("catagore",catagore);
  
      const response = await fetch(`${API}/api/admin/post`, {
        method: "POST",
        headers: {
          Authorization: `token ${token}`,
        },
        body:formdata
      });
  
      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.massage);
      } else {
        toast.error("Post not sent....");
        console.log(response);
      }
    } catch (error) {
      console.log("Posting error:", error);
    }
  };
  

  const clearBtn = () => {
    settitle("");
    setdesctiption("");
    setimage("");
    setcatagore("");
  };

  return (
    <>
      {/* <!-- component --> */}
      <div className="flex justify-between flex-row h-[100vh]">
        <div className="w-[75%]">
          <div class="heading font-bold text-2xl py-3 ps-4 text-gray-800">
            Create New Post
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
              type="submit"
              onClick={postSubmitBtn}
            >
              Post
            </button>
          </div>
          <div className="px-2 py-3">
            <label htmlFor="img">
              <img
                src={image ? URL.createObjectURL(image) : ""}
                alt="Upload image"
                class="w-full h-64 object-cover rounded"
              />
            </label>
          </div>
          <div>
            <input
              type="file"
              name="file"
              id="img"
              className="hidden"
              accept=".jpg, .png, .avif"
              onChange={(e) => setimage(e.target.files[0])}
            />
          </div>
          <div className="flex flex-col px-2 py-2">
            <select
              name="post catagore"
              onChange={(e) => setcatagore(e.target.value)}
            >
              <option value="uncatagorized">UnCatagorized</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="javascript">JavaScript</option>
              <option value="networking">NetWorking</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPosts;
