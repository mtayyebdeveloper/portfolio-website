import React from "react";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";

function Blog(props) {
  const navigate = useNavigate();
  const { allClientsPosts } = useAuth();

  const getPostLink = (id) => {
    navigate(`/post/full-post/${id}`);
    props.functions;
  };
  return (
    <>
      <div className=" bg-gray-100 w-full">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col w-[100vw] md:w-[80%]">
            <div className="flex flex-col w-full">
              <div className="posts w-full flex items-center flex-wrap justify-center mt-3">
                {Array.isArray(allClientsPosts) ? (
                  allClientsPosts.reverse().map((data, index) => {
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
                        />
                      </div>
                    );
                  })
                ) : (
                  <div>Posts is not found........</div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-white w-[100vw] md:w-[22%]">
            <div className="flex flex-col items-center justify-start py-2 px-2">
              <div className="latestPosts">
                <h1 className="text-2xl font-bold">Latest Posts</h1>
                <hr className="w-20 border-2 border-blue-800 rounded-t" />
                {Array.isArray(allClientsPosts)
                  ? allClientsPosts
                      .reverse()
                      .slice(0, 10)
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
        </div>
      </div>
    </>
  );
}

export default Blog;
