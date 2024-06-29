import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Btn from "../components/Btn";
import Post from "../components/Post";
import Typed from "typed.js";
import { useAuth } from "../store/Auth";

function Home(props) {
  const { allClientsPosts } = useAuth();
  const element = useRef(null);
  useEffect(() => {
    const typed = new Typed(element.current, {
      strings: [
        "Web Developer",
        "Web Designer",
        "Graphic Designer",
        "Freelancer.",
      ],
      typeSpeed: 90,
    });
    // return () => {
    //   // Destroy Typed instance during cleanup to stop animation
    //   typed.destroy();
    // };
  }, []);
  return (
    <>
      {/* header sec start */}
      <div className="bg-[rgb(243,244,246)] flex flex-col sm:flex-row items-center justify-between md:ps-3">
        <div className="flex flex-col justify-center ps-6 sm:ps-0 w-full sm:w-1/2">
          <div className="text-3xl font-bold">
            My name is<span className="text-blue-800"> Muhammad Tayyeb </span>
            <div className="text-2xl">
              & I am a <span className="text-blue-800" ref={element} />
            </div>
            <p className="text-lg font-semibold ">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
              modi tempora asperiores quidem, perferendis reiciendis hic itaque!
              Labore accusamus excepturi atque facere sapiente? Cupiditate
              distinctio iste accusamus at pariatur totam?
            </p>
          </div>
          <div className="mt-4">
            <button className="text-lg hover:bg-blue-800 border-2 hover:text-white border-blue-800 font-semibold  px-3 py-1 rounded-lg tran">
              <Link to="/contact">
                <i className="fa-solid fa-phone me-1"></i> Contact now{" "}
              </Link>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center w-full sm:w-1/2">
          <img
            src="photo-1499951360447-b19be8fe80f5.avif"
            className="h-[350px] md:w-[50vw]"
            alt="M Tayyeb image"
          />
        </div>
      </div>
      {/* header sec end */}

      {/* main sec start */}
      <div className="main-sec bg-[rgb(243,244,246)]">
        {/* latest post short sec start */}
        <div className="latest-post-sec w-full bg-[rgb(243,244,246)] pt-[50px]">
          <div className="latestPosts flex flex-col items-center justify-center">
            <h1 className="text-2xl text-center font-bold">Latest Posts</h1>
            <hr className="w-20 border-2 text-center border-blue-800 rounded-t" />
          </div>
          <div className="w-full flex flex-row flex-wrap items-start justify-center">
            {Array.isArray(allClientsPosts)
              ? allClientsPosts
                  .reverse()
                  .slice(0, 3)
                  .map((data, index) => {
                    return (
                      <div className="post1 w-[300px] mx-2 my-2 py-1 px-1"key={index}>
                        <Post
                          postimg={data.image}
                          posttitle={data.title}
                          postdate={data.auther.createDate}
                          posttext={data.description}
                          auther={data.auther.username}
                          postId={data._id}
                        />
                      </div>
                    );
                  })
              : ""}
          </div>
        </div>
        {/* about us short sec start */}
        <div className="about-sec w-full pt-[50px] px-3">
          <span className="text-center flex-col flex items-center justify-center py-1">
            <h1 className="text-2xl text-center font-bold">About me</h1>
            <hr className="w-20 border-2 border-blue-800 rounded-t" />
          </span>
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="left w-full sm:w-1/2 px-2">
              <p className="my-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci doloribus ipsam explicabo! Nobis eum ullam amet
                temporibus est quidem quam laboriosam. Ipsa non in
                exercitationem eos eius a, quasi facere!
              </p>
              <Link to="/about">
                <Btn bg="blue" color="white" value="Learn more" />
              </Link>
            </div>
            <div className="right w-full sm:w-1/2 px-2 mt-4 sm:mt-0">
              <img
                src="https://cdn.pixabay.com/photo/2017/07/31/11/31/laptop-2557468_1280.jpg"
                className="w-full sm:w-[300px] rounded-lg float-right sm:me-4"
                alt="Developer image"
              />
            </div>
          </div>
        </div>
        {/* about us short sec end */}
        {/* portfoio short sec start */}
        <div className="about-sec w-full pt-[70px] pb-[30px] px-3">
          <span className="text-center flex-col flex items-center justify-center py-1">
            <h1 className="text-2xl text-center font-bold">Portfolio</h1>
            <hr className="w-20 border-2 border-blue-800 rounded-t" />
          </span>
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="left w-full sm:w-1/2 px-2">
              <p className="my-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci doloribus ipsam explicabo! Nobis eum ullam amet
                temporibus est quidem quam laboriosam. Ipsa non in
                exercitationem eos eius a, quasi facere!
              </p>
              <Link to="/portfolio">
                <Btn bg="blue" color="white" value="Learn more" />
              </Link>
            </div>
            <div className="right w-full sm:w-1/2 px-2 mt-4 sm:mt-0">
              <img
                src="https://cdn.pixabay.com/photo/2017/07/31/11/31/laptop-2557468_1280.jpg"
                className="w-full sm:w-[300px] rounded-lg float-right sm:me-4"
                alt="Developer image"
              />
            </div>
          </div>
        </div>
        {/* portfoio short sec end */}
      </div>
      {/* main sec end */}
    </>
  );
}

export default Home;
