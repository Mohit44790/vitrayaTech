import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Home() {
  const picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signup");
    }

    fetch("http://localhost:5000/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  return (
    <div className="p-8  bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((post, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Card Header */}
            <div className="flex items-center p-1 border-b border-gray-300">
              <img
                src={post.postedBy.Photo ? post.postedBy.Photo : picLink}
                // alt={post.postedBy.name}
                className="w-8 h-8 rounded-full object-cover mr-4"
              />
              <h5 className="text-pretty font-semibold">
              
                  {post.postedBy.name}
                
              </h5>
            </div>

            {/* Card Image */}
            <div className="relative h-96">
              <img src={post.photo} alt="" className="w-full h-full " />
            </div>

            {/* Card Content */}
            <div className="p-5">
              <p className="text-gray-800">
                <span className="font-semibold"></span> {post.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
