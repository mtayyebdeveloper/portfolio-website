import React, { useState } from "react";
import { useAuth } from "../store/Auth";
import {toast} from 'react-toastify'

function Contact() {
  const [isUser, setisUser] = useState(true)
  const [user, setuser] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    gender: "",
    country: "",
    massage: "",
  });
  const { userDatas,API } = useAuth()
  if(userDatas && isUser){
    setuser({
      username: userDatas.username,
      email: userDatas.email,
      phoneNumber: userDatas.phoneNumber
    })
    setisUser(false)
  }
  const userHandel = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setuser({
      ...user,
      [name]: value,
    });
  };
  const submitDataBtn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/form/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        toast.success("Massage send successfully..")
      } else {
        response.json().then((error)=>{
          if(error.massage.issues){
            toast.error(error.massage.issues[0].message)
          }
        })
      }
    } catch (error) {
      console.log("Data posting error:", error);
    }
  };
  return (
    <>
      <div className="bg-slate-100 rounded shadow-lg p-4 px-4 md:p-8">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="flex flex-col my-2 p-2 items-center justify-center text-center bg-white shadow-lg rounded-md w-full">
              <i
                className="fa-solid fa-phone p-3 text-3xl rounded-full px-4 bg-blue-500 shadow-lg m-2"
                title="Phone No"
              ></i>
              <p className="text-lg font-semibold">+92 3368212215</p>
              <p>Contact us anytime without any issue</p>
            </div>
            <div className="flex flex-col my-2 p-2 items-center justify-center text-center bg-white shadow-lg rounded-md w-full">
              <i
                className="fa-solid fa-home p-3 text-3xl rounded-full px-4 bg-blue-500 shadow-lg m-2"
                title="Phone No"
              ></i>
              <p className="text-lg font-semibold">State: Pakistan</p>
              <p>I am from pakistan, KPK, Swabi, Kalu khan</p>
            </div>
            <div className="flex flex-col my-2 p-2 items-center justify-center text-center bg-white shadow-lg rounded-md w-full">
              <i
                className="fa-solid fa-envelope p-3 text-3xl rounded-full px-4 bg-blue-500 shadow-lg m-2"
                title="Phone No"
              ></i>
              <p className="text-lg font-semibold">tayyabkhank1234@gmail.com</p>
              <p>Email me anytime</p>
            </div>
          </div>
          <form className="lg:col-span-2" onSubmit={submitDataBtn}>
            <div className="text-center py-1 text-2xl font-bold ">Welcome! <span className="text-blue-600">{userDatas?userDatas.username:""}</span></div>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-5">
                <label htmlFor="full_name">Enter your full name</label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={userHandel}
                  id="full_name"
                  placeholder="Your name"
                  className="h-10 border mt-1 rounded px-4 w-full bg-white"
                  required
                />
              </div>

              <div className="md:col-span-5">
                <label htmlFor="email">Enter your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={user.email}
                  onChange={userHandel}
                  className="h-10 border mt-1 rounded px-4 w-full bg-white"
                  required
                  placeholder="email@domain.com"
                />
              </div>

              <div className="md:col-span-3">
                <label htmlFor="number">Enter your Mobile No</label>
                <input
                  type="number"
                  name="phoneNumber"
                  value={user.phoneNumber}
                  onChange={userHandel}
                  id="number"
                  placeholder="########"
                  className="h-10 border mt-1 rounded px-4 w-full bg-white"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="gender">Select your Gender</label>
                <div className="flex flex-row items-center bg-white py-2 h-10 border rounded-md mt-1">
                  <label htmlFor="gender" className="ms-3">
                    Male
                  </label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={userHandel}
                    id="gender"
                    className="mx-2"
                    required
                  />
                  <label htmlFor="gender" className="ms-7">
                    Female
                  </label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={userHandel}
                    id="gender"
                    className="mx-2"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-5">
                <label htmlFor="country">Enter your country name</label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <select
                    name="country"
                    id="country"
                    value={user.country}
                    onChange={userHandel}
                    className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                    required
                  >
                    <option>Pakistan</option>
                    <option>India</option>
                    <option>China</option>
                    <option>United State</option>
                    <option>Afganestan</option>
                    <option>Turky</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-5">
                <label htmlFor="massage">Enter your Massage</label>
                <textarea
                  type="text"
                  name="massage"
                  value={user.massage}
                  onChange={userHandel}
                  id="massage"
                  className=" h-28 border py-2 mt-1 rounded px-2 w-full bg-white"
                  placeholder="your massage..."
                  required
                />
              </div>
              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
