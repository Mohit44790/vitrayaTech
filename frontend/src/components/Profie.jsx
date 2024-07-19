import React, { useEffect, useState } from "react";
import ProfilePic from "./ProfilePic";

export default function Profile() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [changePic, setChangePic] = useState(false);

  const toggleDetails = (posts) => {
    setShow(!show);
    setPosts(posts);
  };

  const changeprofile = () => {
    setChangePic(!changePic);
  };

  useEffect(() => {
    fetch(
      `http://localhost:5000/user/${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setPic(result.post);
        setUser(result.user);
      });
  }, [pic]);

  return (
    <>
      <div className="profile flex flex-col items-center">
        {/* Profile frame */}
        <div className="profile-frame flex items-center w-full max-w-4xl p-4">
          {/* profile-pic */}
          <div className="profile-pic flex-shrink-0">
            <img
              onClick={changeprofile}
              src={user.Photo ? user.Photo : picLink}
              alt=""
              className="w-32 h-32 rounded-full cursor-pointer"
            />
          </div>
          {/* profile-data */}
          <div className="profile-data ml-8">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">
                {JSON.parse(localStorage.getItem("user")).name}
              </h1>
              <p className="verify text-blue-500">
                <span className="material-symbols-outlined">new_releases</span>
              </p>
            </div>
            <p className="">{pic ? pic.length : "0"} posts</p>
          </div>
        </div>

        <div className="postTags w-full">
          <hr className="w-full opacity-80 my-2" />
        </div>

        {/* Gallery */}
        <div className="gallery grid grid-cols-3 gap-4 w-full max-w-4xl">
          {pic.map((pics) => {
            return (
              <img
                key={pics._id}
                src={pics.photo}
                alt=""
                onClick={() => {
                  toggleDetails(pics);
                }}
                className="item w-full h-48 object-cover cursor-pointer"
              ></img>
            );
          })}
        </div>

        {changePic && <ProfilePic changeprofile={changeprofile} />}
      </div>
    </>
  );
}
