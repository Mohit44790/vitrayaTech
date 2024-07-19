import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Createpost() {
  const [body, setBody] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    if (url) {
      fetch("http://localhost:5000/createPost", {
        method: "post",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body,
          photo: url,
          mediaType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notifyA(data.error);
          } else {
            notifyB("Successfully Posted");
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", media);
    data.append("upload_preset", "insta-cloneMK");

    const cloudinaryURL =
      mediaType === "image"
        ? "https://api.cloudinary.com/v1_1/codermk1/image/upload"
        : "https://api.cloudinary.com/v1_1/codermk1/video/upload";

    fetch(cloudinaryURL, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.secure_url);
      })
      .catch((err) => console.log(err));
  };

  const handleMediaChange = (event) => {
    const file = event.target.files[0];
    setMedia(file);
    if (file) {
      if (file.type.startsWith("image")) {
        setMediaType("image");
      } else if (file.type.startsWith("video")) {
        setMediaType("video");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="createPost w-80 my-4 bg-white shadow-md rounded-lg p-4">
        <h4 className="text-lg font-semibold mb-4"> Upload New Image</h4>
        
        <div className="mb-4">
          {mediaType === "image" ? (
            <img
              id="output"
              src={media ? URL.createObjectURL(media) : ""}
              alt="img"
              className="w-full max-h-64 object-cover mb-2"
            />
          ) : mediaType === "video" ? (
            <video id="output" controls className="w-full max-h-64 mb-2">
              <source src={media ? URL.createObjectURL(media) : ""} />
            </video>
          ) : null}
          <input
            type="file"
            accept="image/*, video/*"
            onChange={handleMediaChange}
            className="w-full mb-4"
          />
        </div>
        <div className="details mb-4">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            type="text"
            placeholder="Write a caption...."
            className="w-full p-2 border border-gray-300 rounded mb-2"
          ></textarea>
          <button
            id="post-btn"
            onClick={postDetails}
            className="bg-blue-500 text-white w-full py-2 rounded"
          >
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
}
