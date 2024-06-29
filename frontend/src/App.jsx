import React,{useEffect} from "react";
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
    <div className=" bg-black">
    <div className=" max-w-[1300px] mx-auto">
      <Header />
      <Outlet />
      <Footer/>
    </div>
    </div>
    </>
  );
}

export default App;
