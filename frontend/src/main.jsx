import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  Contact,
  Loginform,
  Signupform,
  Blog,
  ErrorPage,
  Portfolio,
  About,
  Services,
  Adminpenal,
  Logout,
  Profile,
  FullPosts
} from "./pages/index.js";
import AdminUsers from "./components/layouts/AdminUsers.jsx";
import AdminContacts from "./components/layouts/AdminContacts.jsx";
import AdminPosts from './components/layouts/AdminPosts.jsx'
import AdminWelcomPage from "./components/layouts/AdminWelcomPage.jsx";
import AdminAllPosts from './components/layouts/AdminAllPosts.jsx'
import AdminUpdateUsers from './components/layouts/AdminUpdateUsers.jsx'
import AdminUpdatePosts from './components/layouts/AdminUpdatePosts.jsx'
import { AuthProvider } from "./store/Auth.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const router = createBrowserRouter(
  // first way.......................................
  // <BrowserRouter>
  // <Header/>
  // <Routes>
  //   <Route path='/' element={<App/>}>
  //     <Route path='' element={<Contact/>} />
  //   </Route>
  // </Routes>
  // <Footer/>
  // </BrowserRouter>

  // seacond way...............................
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/blog",
          element: <Blog />,
        },
        {
          path: "/portfolio",
          element: <Portfolio />,
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "*",
          element: <ErrorPage />,
        },
        {
          path: "/login",
          element: <Loginform />,
        },
        {
          path: "/signup",
          element: <Signupform />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
        {
          path:"/profile",
          element:<Profile/>
        },
        {
          path:"/post/full-post/:id",
          element:<FullPosts/>
        },
        {
          path: "/web-admin",
          element: <Adminpenal />,
          children:[
            {
              path:"",
              element:<AdminWelcomPage/>
            },
            {
              path:"users",
              element:<AdminUsers/>
            },
            {
              path:"contacts",
              element:<AdminContacts/>
            },
            {
              path:"posts",
              element:<AdminPosts/>
            },
            {
              path:"all-posts",
              element:<AdminAllPosts/>
            },
            {
              path:"update-users/:id",
              element:<AdminUpdateUsers/>
            },
            {
              path:"update-posts/:id",
              element:<AdminUpdatePosts/>
            }
          ]
        },
      ],
    },
  ]
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition:Bounce
    />
    <RouterProvider router={router} />
  </AuthProvider>
);
