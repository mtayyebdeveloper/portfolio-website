import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const isLoggedin = !!token;
  const [userDatas, setUserDatas] = useState("");
  const [serviceData, setserviceData] = useState("");
  const [allUsersData, setallUsersData] = useState("");
  const [userImage, setuserImage] = useState("");
  const [allContactsData, setallContactsData] = useState("");
  const [allPostsData, setallPostsData] = useState("");
  const [allClientsPosts, setallClientsPosts] = useState("");
  const API = import.meta.env.VITE_BACKEND_SITE_NAME;
  const [isAdmin, setisAdmin] = useState();

  // storing token to localstorage..................
  const storeTokentoLS = (userToken) => {
    const storage = localStorage.setItem("token", userToken);
    setToken(localStorage.getItem("token"));
    return storage;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(localStorage.getItem("token"));
  };

  // user data getting from backend using token........
  const userAuthentication = async () => {
    try {
      const response = await fetch(`${API}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      });
      if (response.ok) {
        response.json().then((value) => {
          setUserDatas(value.allUserData);
          setuserImage(value.allUserData.userImage.url);
        });
      } else {
        console.log("Error......U.Auth");
      }
    } catch (error) {
      console.log("Data fetching error: ", error);
    }
  };

  // all services data getting from backend........
  const GetServicesData = async () => {
    try {
      const response = await fetch(`${API}/api/user/services`, {
        method: "GET",
      });
      if (response.ok) {
        response.json().then((data) => {
          setserviceData(data);
        });
      } else {
        console.log("Error.....Services");
      }
    } catch (error) {
      console.log("services data fetching error:", error);
    }
  };

  // all users data getting from backend using token........
  const getAllUsersData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      });
      if (response.ok) {
        response.json().then((data) => {
          setallUsersData(data);
        });
      } else {
        console.log("Error......Us");
      }
    } catch (error) {
      console.log("all users data fetching error:", error);
    }
  };

  // all contacts data getting from backend using token........
  const getAllContactsData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      });
      if (response.ok) {
        response.json().then((data) => {
          setallContactsData(data);
        });
      } else {
        console.log("Error.....Co");
      }
    } catch (error) {
      console.log("all users data fetching error:", error);
    }
  };

  // We check that the current user is admin or not using token........
  const getAdminData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/isadmin`, {
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      });
      if (response.ok) {
        response.json().then((data) => {
          setisAdmin(data);
        });
      } else {
        console.log("Error.....Ad");
      }
    } catch (error) {
      console.log("admin data fetching error:", error);
    }
  };

  // all posts data getting from backend using token for admin........
  const getAllPostsDataForAdmin = async () => {
    try {
      const response = await fetch(`${API}/api/admin/posts`, {
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      });
      if (response.ok) {
        response.json().then((data) => {
          setallPostsData(data);
        });
      } else {
        console.log("Error......Po");
      }
    } catch (error) {
      console.log("all posts data fetching error:", error);
    }
  };

  // all posts data getting from backend for clients blog page........
  const getAllPostsDataForClients = async () => {
    try {
      const response = await fetch(`${API}/api/user/posts`, {
        method: "GET",
      });
      if (response.ok) {
        response.json().then((data) => {
          setallClientsPosts(data);
        });
      } else {
        console.log("Error......Po");
      }
    } catch (error) {
      console.log("all posts data fetching error:", error);
    }
  };

  useEffect(() => {
    getAllPostsDataForClients();
    getAllPostsDataForAdmin();
    getAdminData();
    getAllContactsData();
    getAllUsersData();
    GetServicesData();
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        storeTokentoLS,
        isLoggedin,
        logout,
        userDatas,
        serviceData,
        allUsersData,
        allContactsData,
        isAdmin,
        token,
        userImage,
        allPostsData,
        allClientsPosts,
        getAllPostsDataForAdmin,
        getAllContactsData,
        getAllUsersData,
        userAuthentication,
        API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
