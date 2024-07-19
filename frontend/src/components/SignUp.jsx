import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const postData = () => {
    if (!emailRegex.test(email)) {
      notifyA("Invalid email");
      return;
    } else if (!passRegex.test(password)) {
      notifyA(
        "Password must contain at least 8 characters, including at least 1 number and 1 uppercase letter, 1 lowercase letter, and 1 special character (e.g., #, ?, !)."
      );
      return;
    }

    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        userName: userName,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message);
          navigate("/signin");
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-center text-gray-600 mb-6">
          Sign up to see photos and videos <br /> from your friends
        </p>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="username"
          id="username"
          value={userName}
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />
        <p className="text-xs text-gray-600 mb-4 text-center">
          By signing up, you agree to our Terms, <br /> privacy policy, and
          cookies policy.
        </p>
        <button
          type="button"
          onClick={postData}
          className="w-full bg-blue-500 text-white py-2 rounded mb-4"
        >
          Sign Up
        </button>
        <div className="text-center">
          Already have an account?{" "}
          <Link to="/signin">
            <span className="text-blue-500 cursor-pointer">Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
