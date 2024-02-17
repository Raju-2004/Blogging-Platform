import './App.css';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import { lookInSession } from './common/session';
import { createContext, useEffect, useState } from 'react';
import Editor from './pages/Editor.page';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const UserContext = createContext({});

function App() {
  // const [userAuth, setUserAuth] = useState({});

  // useEffect(() => {
  //   let userInSession = lookInSession("user");

  //   userInSession
  //     ? setUserAuth(JSON.parse(userInSession))
  //     : setUserAuth({ access_token: null });
  // }, []);

  return (
    // <UserContext.Provider value={{ userAuth, setUserAuth }}>
    <>
    <Navbar />
    <Outlet/>
    <ToastContainer/>
    </>
      
  );
}

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path:'/Editor',
        element:<Editor/>
      }
    ]
  },
]);

export default App;
