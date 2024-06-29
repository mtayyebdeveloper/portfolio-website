import React, { useState, useEffect } from "react";
import { useAuth } from "../store/Auth";
import PortfolioCard from "../components/PortfolioCard";

function Portfolio() {
  const [allPortfolioData, setallPortfolioData] = useState([]);
  const [istrue, settrue] = useState(true);
  const { API } = useAuth();

  const getallPortfolioData = async (alldata) => {
    try {
      const response = await fetch(`${API}/api/user/portfolio`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = response.json().then((data) => {
          if (Array.isArray(allPortfolioData)) {
            if(istrue){
              setallPortfolioData(data);
              settrue(false)
            }
            else if (alldata=="all"){
              setallPortfolioData(data);
              // settrue(true)
            }
            else{
              const updatedArry = data.filter((item) => {
                return item.type == alldata;
              });
              setallPortfolioData(updatedArry);
            }
          }
        });
      } else {
        console.log("data not found...");
      }
    } catch (error) {
      console.log("portfolio data error: ", error);
    }
  };

  useEffect(() => {
    getallPortfolioData();
  }, []);

  const FilterWithProjects = (data) => {
    getallPortfolioData(data);
  };
  // const getAllProjects =()=>{
  //   settrue(true)
  //   getallPortfolioData();

  // }
  return (
    <>
      <div className="w-[100vw] bg-stone-100 flex justify-center">
        <div className="w-[100vw] ">
          <div className="flex flex-col">
            <div className="flex items-center justify-center w-full bg-image">
              <h1 className="text-3xl font-bold text-blue-900 border-b-4 border-dashed border-black">
                My Portfolio
              </h1>
            </div>
            <div className="flex flex-row items-center justify-around py-2 mt-5 md:w-[90vw]">
              <button onClick={()=>FilterWithProjects("all")} className="py-1 px-3 bg-blue-600 text-white border-2 border-blue-700 hover:bg-blue-700 text-lg font-semibold rounded-xl" >
                All
              </button>
              <button
                className="py-1 px-3 bg-blue-600 text-white border-2 border-blue-700 hover:bg-blue-700 text-lg font-semibold rounded-xl"
                onClick={() => FilterWithProjects("blogging")}
              >
                Blogging
              </button>
              <button
                className="py-1 px-3 bg-blue-600 text-white border-2 border-blue-700 hover:bg-blue-700 text-lg font-semibold rounded-xl"
                onClick={() => FilterWithProjects("portfolio")}
              >
                Portfolio
              </button>
              <button
                className="py-1 px-3 bg-blue-600 text-white border-2 border-blue-700 hover:bg-blue-700 text-lg font-semibold rounded-xl"
                onClick={() => FilterWithProjects("e-commerce")}
              >
                E Commerace
              </button>
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center mt-4">
                {allPortfolioData.map((data, index) => {
                  return (
                    <div key={index}>
                      <PortfolioCard
                        name={data.name}
                        description={data.description}
                        image={data.image}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Portfolio;
