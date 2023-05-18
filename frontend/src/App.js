// import './App.css';
// import LoginPage from './login';
// function App() {
//   return (
//     <div className="App">
//       <LoginPage/>
//     </div>
//   );
// }

// export default App;

import React from "react";

import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Navbar from "./layout";
import Home from "./home";
import Login from "./login";
import Signup from "./signup";
import FileUploadForm from "./uploadFileForm";
import ImageGallery from "./imageGallery";
import SearchImage from "./searchImage";

const route = createBrowserRouter([
  {
    path:"/",
    element:<Navbar/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:"/signup",
        element:<Signup/>
      },
      {
        path:'/uploadform',
        element:<FileUploadForm/>
      },
      {
        path:'/imageGallery',
        element:<ImageGallery/>
      },
      {
        path:'/searchImage',
        element:<SearchImage/>
      }
    ]
  }
])

const App = () => {
  

  return (

      <RouterProvider router={route}></RouterProvider>
  );
};

export default App;
