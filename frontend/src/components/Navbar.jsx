import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ login }) {
  const navigate = useNavigate();
  const { setModalOpen } = useContext(LoginContext);

  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return (
        <>
          <Link to="/profile">
            <li className="flex py-4  hover:text-blue-500">Profile</li>
          </Link>
          <Link to="/createPost">
            <li className="hover:text-blue-500 py-4 flex">Create Post</li>
          </Link>

          <Link to="">
            <button
              className="bg-blue-500 text-white py-1 px-3 my-3 rounded flex hover:bg-blue-700"
              onClick={() => setModalOpen(true)}
            >
              Log Out
            </button>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/signin">
            <li className="hover:text-blue-500 flex py-4">SignIn</li>
          </Link>
          <Link to="/signup">
            <li className="hover:text-blue-500 flex py-4">SignUp</li>
          </Link>
        </>
      );
    }
  };

  const loginStatusMobile = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return (
        <>
         
          <Link to="/profile">
            <li>
              <span className="material-symbols-outlined hover:text-blue-500">
                account_circle
              </span>
            </li>
          </Link>
          <Link to="/createPost">
            <li>
              <span className="material-symbols-outlined hover:text-blue-500">
                add_box
              </span>
            </li>
          </Link>
         
          <Link to="">
            <li onClick={() => setModalOpen(true)}>
              <span className="material-symbols-outlined hover:text-blue-500">
                logout
              </span>
            </li>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/signup">
            <li className="hover:text-blue-500">SignUp</li>
          </Link>
          <Link to="/signin">
            <li className="hover:text-blue-500">SignIn</li>
          </Link>
        </>
      );
    }
  };

  return (
    <div className="flex justify-between items-center px-4 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm  ">
      <span
        id="insta-logo"
        className="cursor-pointer font-bold text-xl"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </span>
      <ul className="hidden md:flex space-x-4">{loginStatus()}</ul>
      <ul className="flex md:hidden space-x-4">{loginStatusMobile()}</ul>
    </div>
  );
}
