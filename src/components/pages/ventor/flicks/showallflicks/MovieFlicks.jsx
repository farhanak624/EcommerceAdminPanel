import React, { useRef, useState } from "react";

const MovieFlicks = ({ formData, setFormData, category }) => {
  const videoRef = useRef(null);
  const [videoFile, setVideoFile] = useState(null);
  const [images, setImages] = useState(null);
  const [imageName, setImageName] = useState("");
  const handleVideoFileChange = (e, index) => {
    const file = e.target.files[0];
    setVideoFile(file);
    setFormData({
      ...formData,
      video: file,
    }); // Clear the form data
  };
  const handleImageFileChange = (e, index) => {
    const file = e.target.files[0];
    setImageName(file.name);
    const url = URL.createObjectURL(file);
    setImages(url);
    setFormData({
      ...formData,
      banner: file,
    }); // Clear the form data
  };
  return (
    <>
      <div
        className={`grid grid-cols-1 gap-6 ${
          category === "Movies" && category ==="Documentry" ? "lg:grid-cols-2" : ""
        } mt-4`}
      >
        {category === "Movies" || category ==="Documentry" ? (
          <div>
            <p className="text-xl font-bold">Upload Your Videos</p>
            <div
              className="mt-4 rounded-xl p-4 border-2 border-black flex justify-center  border-dashed"
              // onDragOver={handleDragOver}
              // onDrop={handleDrop}
            >
              <div>
                <span className="flex justify-center">
                  {videoFile ? (
                    <video
                      src={URL.createObjectURL(videoFile)}
                      className="w-10"
                    />
                  ) : (
                    <img src="/videopng.png" className="w-10" alt="" />
                  )}
                </span>
                <p className="font-bold mt-3 text-center">
                  {videoFile ? videoFile.name : "Drop video file"}
                </p>
                <span className="flex justify-center">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      handleVideoFileChange(e);
                    }}
                    style={{ display: "none" }}
                    id="fileInput"
                  />
                  <button
                    type="button"
                    className="mt-3 bg-navblue p-3 rounded-xl text-containerWhite"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    Browse
                  </button>
                </span>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {/* image */}
        <div>
          <p className="text-xl font-bold">Upload Flicks Banner</p>
          <div
            className="mt-4 rounded-xl p-4 border-2 border-black flex justify-center  border-dashed"
            // onDragOver={handleDragOver}
            // onDrop={handleImageleDrop}
          >
            <div>
              <span className="flex justify-center">
                <img
                  src={images ? images : "/addimg.png"}
                  className="w-20 h-12"
                  alt=""
                />
              </span>
              <p className="font-bold mt-3 text-center">
                {imageName ? imageName : "Drop image file"}
              </p>
              <span className="flex justify-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleImageFileChange(e);
                  }}
                  style={{ display: "none" }}
                  id="fileInput1"
                />
                <button
                  className="mt-3 bg-navblue p-3 rounded-xl text-containerWhite"
                  onClick={() => document.getElementById("fileInput1").click()}
                >
                  Browse
                </button>
              </span>
            </div>
          </div>
        </div>
        {/* image */}
      </div>
    </>
  );
};

export default MovieFlicks;
