import React from "react";
import {useNavigate} from 'react-router-dom'

function Post(props) {
  const navigate = useNavigate();
  const sendPostData=()=>{
    navigate(`/post/full-post/${props.postId}`)
    props.functions
  }
  return (
    <>
      <div className="single-post w-[300px] my-2 mx-2 bg-white shadow-lg py-2 px-2 rounded-lg cursor-pointer" onClick={sendPostData}>
        <div>
          <img
            src={props.postimg}
            className={`single-post-img rounded-md h-[200px] w-[300px]`}
            alt="post image"
          />
        </div>
        <div className="post-content pt-1">
          <div className="post-title">
            <h1 className="text-2xl font-bold">{props.posttitle}</h1>
          </div>
          <div className="post-text mt-1">
            <p className="text-gray-600">{props.posttext.slice(0,100)}</p>
          </div>
          <div className="post-date mt-1 flex flex-row items-center justify-between">
            <span className="text-blue-700">
              <i className="fa-solid fa-calendar-day me-1"></i>
              {props.postdate}
            </span>
            <span className="text-blue-700">
              <i className="fa-solid fa-user me-1"></i>
              {props.auther}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
