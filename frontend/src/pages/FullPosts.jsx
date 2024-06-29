import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";
import Post from "../components/Post";
import Blog from "./Blog";

function FullPosts() {
  const { id } = useParams();
  const { allClientsPosts, API } = useAuth();
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState("");
  const [catagore, setcatagore] = useState("");
  const navigate = useNavigate();
  const getPostData = async () => {
    const response = await fetch(`${API}/api/user/posts/full-posts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = response.json().then((data) => {
        settitle(data.title);
        setdescription(data.description);
        setimage(data.image);
        setcatagore(data.catagore);
      });
    } else {
      console.log(response.json());
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  const getPostLink = (id) => {
    navigate(`/post/full-post/${id}`);
    getPostData();
  };
  return (
    <>
      <div className="bg-gray-100 text-black flex flex-row w-full">
        <div className="flex flex-col w-[100vw] py-2 px-2 md:w-[80%]">
          <div className="flex flex-col  w-full">
            <div>
              <img src={image} className="w-full" alt={title} />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{title}</h1>
            </div>
            <div>
              <p>{description}</p>
            </div>
          </div>
          <div className="mt-4">
            <h1 className="text-2xl font-bold">Related Post</h1>
            <div className="flex flex-row items-center">
              {Array.isArray(allClientsPosts)
                ? allClientsPosts
                    .filter((e) => {
                      return e.catagore == catagore;
                    })
                    .map((data, index) => {
                      return (
                        <div key={index}>
                          <Post
                            postimg={data.image}
                            imgclass="w-[100vw] md:w-[67vw] md:h-[30vw]"
                            posttitle={data.title}
                            postdate={data.auther.createDate}
                            posttext={data.description}
                            auther={data.auther.username}
                            postId={data._id}
                            functions={getPostData()}
                          />
                        </div>
                      );
                    })
                : ""}
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white w-[100vw] md:w-[22%]">
          <div className="flex flex-col items-center justify-start py-2 px-2">
            <div className="latestPosts">
              <h1 className="text-2xl font-bold">All Posts</h1>
              <hr className="w-20 border-2 border-blue-800 rounded-t" />
              {Array.isArray(allClientsPosts)
                ? allClientsPosts
                    // .reverse()
                    .map((data, index) => {
                      return (
                        <div key={index}>
                          <div
                            className="text-xl my-2 font-bold hover:text-blue-600 cursor-pointer"
                            onClick={() => getPostLink(data._id)}
                          >
                            {data.title}
                          </div>
                        </div>
                      );
                    })
                : ""}
            </div>
          </div>
        </div>
        <div className="hidden">
          <Blog functions={getPostData()} />
        </div>
      </div>
    </>
  );
}

export default FullPosts;
