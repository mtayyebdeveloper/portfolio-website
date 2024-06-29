import React from "react";
import ServicesCard from "../components/ServicesCard";
import { useAuth } from "../store/Auth";

function Services() {
  const { serviceData } = useAuth();
  return (
    <>
      <div className="bg-[rgb(243,244,246)] text-black py-5 px-3">
        <div className="ps-4 py-3 text-3xl font-bold">All Services</div>
        <hr className="border-2 w-[120px] rounded mt-[-10px] ms-4 border-blue-800" />
        <div className="flex flex-wrap items-center justify-center mt-4">
          {Array.isArray(serviceData) ? (
            serviceData.map((data, index) => {
              return (
                <div key={index}>
                  <ServicesCard
                    title={data.title}
                    discription={data.description}
                  />
                </div>
              );
            })
          ) : (
            <>
              <div>Services data not fetched...</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Services;
