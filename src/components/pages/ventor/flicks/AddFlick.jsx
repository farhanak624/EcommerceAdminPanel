import React, { useEffect, useRef, useState } from "react";
import { movieGenre } from "./moviegenreLis";
import {
  addFlick,
  getFlicks,
  getFlicksCategory,
  getFlicksConnects,
} from "../../../../Api/ApiCall";
import ConnectBox from "./showallflicks/ConnectBox";
import { formatDuration, uploadImageV2 } from "../../../imageUpload";
import MovieFlicks from "./showallflicks/MovieFlicks";
import AddMultiSelectGenre from "../../../customDropdown/AddMultiSelectGenre";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../../../Redux/Features/NavbarSlice";

function AddFlick() {
  const dispatch = useDispatch();
  const [isModalopen, setisModalopen] = useState(false);
  const [FlicksCategories, setFlicksCategories] = useState([]);
  const [categoryToConnect, setCategoryToConnect] = useState("");
  const [SearchBoxFlickList, setSearchBoxFlickList] = useState([]);
  const [seasonName, setSeasonName] = useState("");
  const navigation = useNavigate();
  const videoRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    ageCategory: "",
    genres: [],
    releasedYear: "",
    description: "",
    connect: "",
    seasons: [],
    details: [],
    video: null,
    banner: null,
  });
  const [specification, setSpecification] = useState([
    {
      key: "",
      value: "",
    },
  ]);
  const [videoFile, setVideoFile] = useState(null);
  const [image, setImage] = useState("");
  const [images, setImages] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [fileSize, setFileSize] = useState("");
  useEffect(() => {
    getAllFlicks();
    getFlicksConnectMedia(categoryToConnect);
  }, [categoryToConnect]);
  const getFlicksConnectMedia = (categoryToConnect) => {
    getFlicksConnects(categoryToConnect).then((data) => {
      console.log("asdad", data?.data.flicks);
      setSearchBoxFlickList(data?.data.flicks);
    });
  };
  useEffect(() => {
    setCategoryToConnect("");
  }, []);
  useEffect(() => {
    formData.details = specification;
  }, [specification]);
  const getAllFlicks = () => {
    getFlicks().then((data) => {
      console.log("data", data?.data);
    });
    getFlicksCategory().then((data) => {
      console.log("data", data?.data);
      setFlicksCategories(data?.data.categories);
    });
  };
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default behavior (Prevent file from being opened)
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files, "files");
    if (files && files[0]) {
      setVideoFile(files[0]);
      processVideoFile(files);
    }
  };

  const processVideoFile = (file) => {
    const url = URL.createObjectURL(file);
    videoRef.current.src = url;
    videoRef.current.load();
  };

  const handleImageleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setImage(files[0]);
    }
    if (files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setImages(url);
    }
  };

  // console.log(images);
  const addEpisode = () => {
    setEpisodes([
      ...episodes,
      {
        name: "",
        episodeCount: "",
        description: "",
        videoFile: null,
        thumbNail: null,
        fileSize: null,
        duration: null,
      },
    ]);
  };

  const removeEpisode = (index) => {
    const updatedEpisodes = [...episodes];
    updatedEpisodes.splice(index, 1);
    setEpisodes(updatedEpisodes);
  };
  const handleVideoFileChange = (e, index) => {
    const file = e.target.files[0];

    const updatedEpisodes = [...episodes];
    updatedEpisodes[index] = {
      ...updatedEpisodes[index],
      videoFile: file,
    };

    setEpisodes(updatedEpisodes);
  };

  const handleThumbnailFileChange = (e, index) => {
    const file = e.target.files[0];
    const updatedEpisodes = [...episodes];
    updatedEpisodes[index] = {
      ...updatedEpisodes[index],
      thumbNail: file,
    };
    setEpisodes(updatedEpisodes);
  };

  const getVideoDuration = (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const duration = video.duration;
        resolve(duration);
      };
      video.onerror = reject;
      video.src = URL.createObjectURL(file);
    });
  };

  const handleKeySpecification = (e, index) => {
    const { value } = e.target;
    setSpecification((prevSpecification) => {
      const updatedSpecification = [...prevSpecification];
      updatedSpecification[index].key = value;
      return updatedSpecification;
    });
  };

  const handleValueSpecification = (e, index) => {
    const { value } = e.target;
    setSpecification((prevSpecification) => {
      const updatedSpecification = [...prevSpecification];
      updatedSpecification[index].value = value;
      return updatedSpecification;
    });
  };

  const handilonClick = () => {
    setSpecification([...specification, { key: "", value: "" }]);
  };
  const removeOne = (indexToRemove) => {
    setSpecification(
      specification.filter((_, index) => index !== indexToRemove)
    );
    console.log(specification.length, "+++++++++++++++++++++++");
  };

  const handleSave = async (e) => {
    
    e.preventDefault();
    setFormData({
      ...formData,
      details: specification,
    });
    console.log(specification, "specification");
    const wholeData = {
      ...formData,
    };
    if (
      wholeData.name === "" ||
      wholeData.category === "" ||
      wholeData.ageCategory === "" ||
      wholeData.genres.length === 0 ||
      wholeData.releasedYear === "" ||
      wholeData.description === ""
    ) {
      toast.error(
        "Make sure name, Category, AgeCategory, Genres, Released Year, Description are filled"
      );
      return false;
    }
    specification.map((data) => {
      if (data.key === "" || data.value === "") {
        toast.error("Please Fill All The Details fields");
        return false;
      }
    });
    console.log(wholeData, "wheleData");
    console.log(formData, "formData.video");
    if (categoryToConnect === "Movies" || categoryToConnect === "Documentry") {
      if (formData.video === null || formData.banner === null) {
        toast.error("Please upload video and banner");
        return;
      }
      const videoUrl = await uploadImageV2(formData.video);
      const bannerUrl = await uploadImageV2(formData.banner);
      const fileSize = formData.video.size / (1024 * 1024);
      const duration = await getVideoDuration(formData.video);
      const convertedDuration = await formatDuration(duration);
      const wholeData = {
        ...formData,
        genres: formData.genres.map((genre) => genre._id),
        video: videoUrl.images[0].imageUrl,
        banner: bannerUrl.images[0].imageUrl,
        fileSize: parseInt(fileSize.toFixed(2)),
        duration: convertedDuration,
      };

      console.log({ wholeData });
      // if (!validation(wholeData)) {
      //   console.log("Please fill all the fields");
      //   return;
      // }
      addFlick(wholeData)
        .then((data) => {
          console.log("Successfully Added Movie", data);
          toast.success("Successfully Added Movie");
          navigation("/allflicks");
        })
        .catch((error) => {
          console.log("Error in adding Flick", error);
        });
    } else {
      if(seasonName === "") {
        toast.error("Please Add Season Name");
        return;
      }
      if (formData.banner === null) {
        toast.error("Please Select Banner Image for Series");
        return;
      }
      if (episodes.length === 0) {
        toast.error("Please Add Episodes");
        return;
      } 
      episodes.map((episode) => {
        dispatch(loadSpinner());
        if (
          episode.name === "" ||
          episode.episodeCount === "" ||
          episode.description === "" ||
          episode.videoFile === null ||
          episode.thumbNail === null
        ) {
          dispatch(loadSpinner());
          toast.error("Please fill all the episodes fields");
          return false;
        }
      });
      const bannerUrl = await uploadImageV2(formData.banner);
      const updatedEpisodes = await Promise.all(
        episodes.map(async (episode) => {
          const thumbNail = await uploadImageV2(episode.thumbNail);
          const video = await uploadImageV2(episode.videoFile);
          const duration = await getVideoDuration(episode.videoFile);
          const fileSize = episode.videoFile.size / (1024 * 1024);
          const convertedDuration = await formatDuration(duration);
          console.log(thumbNail, video, "thumbNail, video");
          return {
            ...episode,
            videoFile: video.images[0].imageUrl,
            thumbNail: thumbNail.images[0].imageUrl,
            fileSize: fileSize.toFixed(2),
            duration: convertedDuration,
          };
        })
      );
      const season = {
        name: seasonName,
        episodes: [...updatedEpisodes],
      };
      console.log(season, "season");
      formData.seasons.push(season);
      // console.log(updatedSeason, "updatedSeason");
      const wholeData = {
        ...formData,
        details: [...specification],
        genres: formData.genres.map((genre) => genre._id),
        banner: bannerUrl.images[0].imageUrl,
        seasons: formData.seasons,
      };

      console.log({ wholeData });
      addFlick(wholeData)
        .then((data) => {
          console.log("Successfully Added Series", data);
          toast.success("Successfully Added Series");
          navigation("/allflicks");
        })
        .catch((error) => {
          console.log("Error in adding Flick", error);
        }).finally(() => {
          dispatch(loadSpinner());
        });
    }
  };

  return (
    <div className="bg-containerWhite rounded-xl w-full flex justify-center  p-5">
      <div className="max-w-[100%] lg:max-w-[60%]">
        <h1 className="text-center font-semibold text-4xl mt-2">
          Add New Video
        </h1>
        <p className="text-center text-xs text-primary-200 mt-2"></p>
        <section className="1">
          <div className="grid gap-6 mt-7 grid-cols-1 sm:grid-cols-2 w-full items-center">
            <select
              name=""
              className={`p-2 h-full ${
                formData.category ? "text-black" : "text-slate-400"
              }  bg-bodycolur  w-full outline-none border-none`}
              id=""
              onChange={(e) => {
                setCategoryToConnect(e.target.value);
                setFormData({ ...formData, category: e.target.value });
              }}
            >
              <option className="text-slate-400" selected disabled>
                Flicks Category
              </option>
              {FlicksCategories.length > 0 &&
                FlicksCategories.map((data) => {
                  return (
                    <option className="text-black" value={data}>
                      {data}
                    </option>
                  );
                })}
            </select>

            <input
              type="text"
              placeholder="Name"
              className="w-full bg-bodycolur  outline-none border-none p-3 pl-3 rounded-xl"
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
              name=""
              id=""
            />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row mt-3 items-center justify-center">
            <div className="flex h-12 bg-bodycolur  rounded-xl w-full">
              <select
                name=""
                className={`p-2 h-full ${
                  formData.ageCategory ? "text-black" : "text-slate-400"
                }  bg-bodycolur  w-full outline-none border-none`}
                id=""
                onChange={(e) => {
                  setFormData({ ...formData, ageCategory: e.target.value });
                }}
              >
                <option selected disabled>
                  Select Age Category
                </option>
                <option className="text-black" value="18+">
                  18+
                </option>
                <option className="text-black" value="genaral">
                  General
                </option>
                <option className="text-black" value="kids">
                  Kids
                </option>
              </select>
            </div>

            <div className="flex h-12 bg-bodycolur  rounded-xl w-full">
              <input
                type="text"
                className="p-2 h-full bg-transparent w-full outline-none border-none"
                placeholder="Year"
                onChange={(e) => {
                  setFormData({ ...formData, releasedYear: e.target.value });
                }}
              />
            </div>
          </div>
          <div>
            <AddMultiSelectGenre
              formData={formData}
              setformData={setFormData}
            />
          </div>
          <textarea
            name=""
            className="bg-bodycolur rounded-xl w-full mt-4 pl-3 "
            id=""
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}
            placeholder="Description..."
            cols="30"
            rows="4"
          ></textarea>
          <div
            className={`grid gap-6 mt-7 grid-cols-1 ${
              categoryToConnect === "Series" ? "sm:grid-cols-2" : ""
            }   w-full items-center`}
          >
            <ConnectBox
              flicksLists={SearchBoxFlickList}
              formData={formData}
              setFormData={setFormData}
            />
            {categoryToConnect === "Series" ? (
              <input
                className="p-2 h-full bg-slate-100 rounded-lg w-full outline-none border-none"
                type="text"
                onChange={(e) => {
                  setSeasonName(e.target.value);
                }}
                placeholder="Seasons"
              />
            ) : (
              ""
            )}
          </div>
        </section>
        <MovieFlicks
          setFormData={setFormData}
          formData={formData}
          category={categoryToConnect}
        />
        {categoryToConnect === "Series" ? (
          <div className="mt-4 flex justify-between items-center">
            <button onClick={addEpisode} className="text-md font-bold">
              Add Episode
            </button>
            <button onClick={removeEpisode} className="text-md font-bold">
              Remove Episode
            </button>
          </div>
        ) : (
          ""
        )}
        {categoryToConnect === "Series"
          ? episodes.map((data, index) => (
              <section className="2 mt-5" key={index}>
                <div className="grid gap-6 mt-7 grid-cols-1 sm:grid-cols-2 w-full items-center">
                  <input
                    className="p-2 h-full bg-slate-100 rounded-lg w-full outline-none border-none"
                    type="text"
                    placeholder="Name"
                    onChange={(e) => {
                      console.log(e.target.value);
                      console.log("index", index);
                      const updatedEpisodes = [...episodes];
                      updatedEpisodes[index].name = e.target.value;
                      setEpisodes(updatedEpisodes);
                    }}
                  />
                  <input
                    className="p-2 h-full bg-slate-100 rounded-lg w-full outline-none border-none"
                    type="number"
                    onKeyDown={(e) =>
                      ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                    }
                    onChange={(e) => {
                      console.log("index", index);
                      const updatedEpisodes = [...episodes];
                      updatedEpisodes[index].episodeCount = e.target.value;
                      setEpisodes(updatedEpisodes);
                    }}
                    placeholder="Episode Count"
                  />
                </div>
                <textarea
                  name=""
                  className="bg-bodycolur rounded-xl w-full mt-4 p-2"
                  id=""
                  placeholder="Description"
                  cols="30"
                  onChange={(e) => {
                    console.log("index", index);
                    const updatedEpisodes = [...episodes];
                    updatedEpisodes[index].description = e.target.value;
                    setEpisodes(updatedEpisodes);
                  }}
                  rows="2"
                ></textarea>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div>
                    <p className="text-xl font-bold">Upload Your New Videos</p>
                    <div
                      className="mt-4 rounded-xl p-4 border-2 border-black flex justify-center  border-dashed"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <div>
                        <span className="flex justify-center">
                          {data.videoFile ? (
                            <video
                              src={URL.createObjectURL(data.videoFile)}
                              className="w-10"
                            />
                          ) : (
                            <img src="/videopng.png" className="w-10" alt="" />
                          )}
                        </span>
                        <p className="font-bold mt-3 text-wrap text-center">
                          {data.videoFile
                            ? data.videoFile.name
                            : "Drop video file"}
                        </p>
                        <span className="flex justify-center">
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => {
                              handleVideoFileChange(e, index);
                            }}
                            style={{ display: "none" }}
                            id={`fileInput-${index}`}
                          />
                          <button
                            type="button"
                            className="mt-3 bg-navblue p-3 rounded-xl text-containerWhite"
                            onClick={() =>
                              document
                                .getElementById(`fileInput-${index}`)
                                .click()
                            }
                          >
                            Browse
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* image */}
                  <div>
                    <p className="text-xl font-bold">Upload Your Thumbnail</p>
                    <div
                      className="mt-4 rounded-xl p-4 border-2 border-black flex justify-center  border-dashed"
                      onDragOver={handleDragOver}
                      onDrop={handleImageleDrop}
                    >
                      <div>
                        <span className="flex justify-center">
                          <img
                            src={
                              data.thumbNail
                                ? URL.createObjectURL(data.thumbNail)
                                : "/addimg.png"
                            }
                            className="w-10 h-12"
                            alt=""
                          />
                        </span>
                        <p className="font-bold mt-3 text-wrap text-center">
                          {data.thumbNail
                            ? data.thumbNail.name
                            : "Drop image file"}
                        </p>
                        <span className="flex justify-center">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              handleThumbnailFileChange(e, index);
                            }}
                            style={{ display: "none" }}
                            id={`fileInput1-${index}`}
                          />
                          <button
                            className="mt-3 bg-navblue p-3 rounded-xl text-containerWhite"
                            onClick={() =>
                              document
                                .getElementById(`fileInput1-${index}`)
                                .click()
                            }
                          >
                            Browse
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* image */}
                </div>
              </section>
            ))
          : ""}

        <section className="3 mt-8">
          <div className="flex justify-between items-center">
            <h1 className="font-bold">Details</h1>
            <button
              onClick={handilonClick}
              className="bg-bodycolur p-2 flex justify-center font-semibold items-center gap-2 rounded-md"
            >
              Add
              <div className="border rounded-full h-4 w-4 flex justify-center items-center border-black">
                +
              </div>
            </button>
          </div>
          {specification[0] &&
            specification.map((data, index) => {
              return (
                <div className="mt-5">
                  {index > 0 && (
                    <button
                      className="p-1 bg-red-600 rounded-lg text-white"
                      onClick={() => removeOne(index)}
                    >
                      Remove this
                    </button>
                  )}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mt-3">
                    <input
                      type="text"
                      placeholder="Details"
                      className="w-full bg-bodycolur outline-none border-none p-3 pl-3 rounded-xl"
                      name=""
                      onChange={(e) => {
                        handleKeySpecification(e, index);
                      }}
                      id=""
                    />
                    <input
                      type="text"
                      placeholder="name"
                      className="w-full bg-bodycolur outline-none border-none p-3 pl-3 rounded-xl"
                      name=""
                      onChange={(e) => {
                        handleValueSpecification(e, index);
                      }}
                      id=""
                    />
                  </div>
                </div>
              );
            })}
        </section>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-bodycolur p-2 rounded-lg border shadow"
          >
            Save Video
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddFlick;
