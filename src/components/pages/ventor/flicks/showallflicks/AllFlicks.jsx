import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteFlick, getFlicks } from "../../../../../Api/ApiCall";
import { useDispatch } from "react-redux";
import {
  flickId,
  loadSpinner,
} from "../../../../../Redux/Features/NavbarSlice";
import { NodataSvg } from "../../../../../../public/Assets/assets";
function AllFlicks() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [sideBar, setSidebar] = useState(false);
  const [Index, setIndex] = useState();
  const [latestFlicks, setLatestFlicks] = useState([]);

  const [totalpages, setTotalPage] = useState(0);
  useEffect(() => {
    // if (totalpages < 12) {
    //   return;
    // }
    // Function to check if the document height is greater than the viewport height
    const isScrollRequired = () => {
      return document.documentElement.scrollHeight > window.innerHeight;
    };

    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };

    const observerCallback = (entities) => {
      const target = entities[0];
      if (target.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    };

    const observer = new IntersectionObserver(observerCallback, options);

    // Setup observer if scrolling is required
    const setupObserver = () => {
      if (loader.current && isScrollRequired()) {
        observer.observe(loader.current);
      } else {
        // Use a timeout to retry after some time, in case content or images are still loading
        setTimeout(setupObserver, 500);
      }
    };

    setupObserver();

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);
  console.log("page", page);
  useEffect(() => {
    getAllFlicks(page);
  }, [page]);
  const handleMouseEnter = (index) => {
    console.log(index);
    const video = document.getElementById(`video${index}`);
    const imgid = document.getElementById(`img${index}`);
    if (video) {
      imgid.style.display = "none";
      video.style.display = "block";
      // Make the video visible
      video.play(); // Start playing the video
    }
  };

  const handleMouseLeave = (index) => {
    const video = document.getElementById(`video${index}`);
    const imgid = document.getElementById(`img${index}`);
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.style.display = "none";
      imgid.style.display = "block";
    }
  };
  useEffect(() => {
    let sideBarid = document.getElementById(`sidebar1${Index}`);

    if (sideBarid) {
      sideBarid.style.transition = "height 0.5s ease-in-out";
      sideBarid.style.overflow = "hidden";

      const maxHeight = sideBar ? "100px" : "0px";
      sideBarid.style.bottom = sideBar ? "8%" : "0px";
      sideBarid.style.height = maxHeight;
    }
  }, [sideBar]);
  const SideBaropen = (index) => {
    setSidebar(!sideBar);
    setIndex(index);
  };

  const getAllFlicks = (page) => {
    dispatch(loadSpinner());
    getFlicks(page)
      .then((data) => {
        console.log("data", data?.data);
        setLatestFlicks((prev) => [...prev, ...data?.data?.flicks]);
        setTotalPage(data?.data?.totalCount);
      })
      .catch((errr) => {
        console.log(errr);
      })
      .finally(() => {
        dispatch(loadSpinner());
      });
  };

  const handleOpenOverview = (flicksId) => {
    dispatch(flickId(flicksId));
    navigate("/flicksoverview");
  };
  const loader = useRef(null);
  return (
    <div className="bg-containerWhite p-4 rounded-xl shadow-sm">
      <h1 className="text-center font-semibold text-3xl">Added Videos</h1>
      {
        latestFlicks.length > 0 ? (
          <div className="mt-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {latestFlicks.length > 0
          && latestFlicks.map((data, index) => (
              <div
                key={index}
                className="card rounded-lg bg-slate-500 h-[350px] overflow-hidden relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <img
                  id={`img${index}`}
                  src={data?.banner}
                  className="w-full h-[360px] object-cover"
                  alt=""
                />
                <video
                  id={`video${index}`}
                  autoPlay={false}
                  loop
                  muted
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                  src={data?.video}
                  className=""
                ></video>
                <div
                  id={`sidebar1${index}`}
                  className="absolute right-3 overflow-hidden  gap-4 w-7"
                >
                  <button
                    className="w-full flex justify-center mb-4"
                    onClick={() => {
                      handleOpenOverview(data?._id);
                    }}
                  >
                    <img src="/owerView.png" alt="" />
                  </button>
                  {/* <button
                    onClick={() => navigate("/editFlicks")}
                    className="w-full flex justify-center mb-4"
                  >
                    <img src="/edit.png" alt="" />
                  </button> */}
                  <button className="w-full flex justify-center mb-4">
                    <img
                      src="/delete.png"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent click from bubbling to the card div
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You want delete this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            const toDelete = {
                              flicks: data?._id,
                            };
                            deleteFlick(data?._id)
                              .then((data) => {
                                console.log("success", data?.data);
                                if (result.isConfirmed) {
                                }
                                getAllFlicks(page);
                                Swal.fire(
                                  "Deleted!",
                                  "Your file has been deleted.",
                                  "success"
                                );
                              })
                              .catch((err) => {
                                console.log(err);
                                Swal.fire(
                                  "Failed!",
                                  "Your file not deleted.",
                                  "error"
                                );
                              });

                            // For demonstration purposes, let's just log the deletion
                            console.log("Item deleted");
                          }
                        });
                      }}
                      alt=""
                    />
                  </button>
                </div>
                <div
                  className="absolute bottom-2 w-[90%] left-3 rounded-xl flex justify-end h-10"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                >
                  <div className="text-start w-[90%] h-10 text-xs p-1 pl-2 overflow-hidden ">
                    <p>{data?.name}</p>
                    <p>{data?.releasedYear}</p>
                  </div>
                  <button
                    onClick={() => SideBaropen(index)}
                    className="bg-navblue w-10 rounded-lg h-full text-white"
                  >
                    {">"}
                  </button>
                </div>
              </div>
            ))
          }
      </div>
        )
      : (
        <div className="flex justify-center items-center h-96">
          <img src={NodataSvg} alt="No data" className="w-48" />
        </div>
      )
      }
      
      <div ref={loader} className="h-10" />
    </div>
  );
}

export default AllFlicks;
