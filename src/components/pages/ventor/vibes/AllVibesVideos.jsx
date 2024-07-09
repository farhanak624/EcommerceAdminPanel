import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { deleteVibe, getAllVibes } from "../../../../Api/ApiCall";
import EditVibes from "../../../Modals/Vibes/EditVibes";
import { NodataSvg } from "../../../../../public/Assets/assets";
import { loadSpinner } from "../../../../Redux/Features/NavbarSlice";
import { useDispatch } from "react-redux";
function AllVibesVides() {
  const dispatch = useDispatch();
  const [Shadowdiv, setShadow] = useState(false);
  const [totalpages, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [VibesList, setVibesList] = useState([]);
  const [EditVibeModal, setEditVibeModal] = useState(false);
  const loader = useRef(null);
  const [storeProductData, setstoreProductData] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [selectedVibe, setSelectedVibe] = useState(null); // Step 1
  // scrollpaging efect
  useEffect(() => {
    if (totalpages < 12) {
      return;
    }
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
  const handleEditVibe = (vibe) => {
    // Step 2
    setSelectedVibe(vibe);
  };
  useEffect(() => {
    console.log(page);
    getVides();
  }, [searchKey, page]);
  const getVides = () => {
    dispatch(loadSpinner());
    getAllVibes(searchKey, page)
      .then((data) => {
        console.log("success", data?.data);
        setVibesList([]);
        if (totalpages > 12) {
          setVibesList((prevVibesList) => [
            ...prevVibesList,
            ...data?.data?.vibesData,
          ]);
          if (VibesList.length === 0) setPage(1);
        } else {
          setVibesList(data?.data?.vibesData);
        }
        setTotalPage(data?.data?.totalVibesData);
      })
      .catch((err) => {
        console.log(err?.response?.data);
      })
      .finally(() => {
        dispatch(loadSpinner());
      });
  };
  // scrollpaging efect ending

  console.log(page);
  return (
    <div className="bg-containerWhite rounded-xl w-full p-5">
      <h1 className="text-center font-semibold text-3xl mt-2">All Vibes</h1>
      <div className="flex items-center justify-center w-full mt-4">
        {/* <input
          type="text"
          className="w-full bg-bodycolur outline-none border-none p-3 pl-3 rounded-xl"
          placeholder="plan"
          name=""
          id=""
        /> */}
        <div className="flex max-w-[500px] items-center justify-center h-12   w-full bg-bodycolur outline-none border-none rounded-xl">
          <input
            type="text"
            className="w-full bg-bodycolur outline-none border-none pl-3"
            placeholder="Search Vibes by product"
            name=""
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            id=""
          />
          <div className="p-2 rounded-lg bg-navblue">
            <img src="/search.png" className="w-9" alt="" />
          </div>
        </div>
        {/* <div className="flex items-center justify-center h-12  w-full bg-bodycolur outline-none border-none  rounded-xl">
          <div className="p-2 rounded-xl">
            <img src="/search.png" className="w-10" alt="" />
          </div>
          <input
            type="text"
            className="w-full bg-bodycolur outline-none border-none pl-3"
            placeholder="plan"
            name=""
            id=""
          />
        </div> */}
      </div>
      {/* cardsStart */}
      {}
      {VibesList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 mt-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:4 gap-10">
          {VibesList.length > 0 ? (
            VibesList.map((cardData, index) => {
              return (
                <div
                  key={index}
                  className="card bg-slate-600 rounded-xl h-[370px] w-full  overflow-hidden hover:cursor-pointer relative"
                  onClick={() => {
                    setShadow(index + 1);
                  }}
                >
                  {Shadowdiv === index + 1 && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setShadow(false);
                      }}
                      className="w-full absolute flex items-center justify-center gap-5 z-50 h-full bg-slate-400"
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          handleEditVibe(cardData);
                          e.stopPropagation();
                          setEditVibeModal(true);
                          setShadow(false);
                          console.log(EditVibeModal);
                        }}
                      >
                        <img src="/editpng.png" className="w-10" alt="" />
                      </button>
                      <button
                        type="button"
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
                              deleteVibe(cardData?._id)
                                .then((data) => {
                                  console.log("success", data?.data);
                                  if (result.isConfirmed) {
                                  }
                                  getVides();
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
                      >
                        <img src="/deletepng.png" className="w-10" alt="" />
                      </button>
                    </div>
                  )}
                  <div
                    className="absolute bottom-10 max-w-[100%] z-10 flex items-center  pl-1 pr-2 gap-10 overflow-x-auto"
                    style={{ scrollbarWidth: "none" }}
                  >
                    {/* inner cards */}

                    {/* first */}
                    {cardData?.products.length > 0 &&
                      cardData?.products.map((productData, i) => {
                        return (
                          <div
                            key={i}
                            className=" xl:w-[260px] sm:w-[100%] md:w-[46px] flex items-center gap-3 rounded-lg p-2 flex-shrink-0 "
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.7)",
                            }}
                          >
                            <div
                              className="relative px-3 py-2 rounded-xl"
                              style={{
                                backgroundColor: "rgba(255, 255, 255, 1)",
                              }}
                            >
                              <div className="absolute bg-red-600 rounded-e-full text-white text-xs top-2 w-7 -left-2">
                                {productData?.offers}%
                              </div>
                              <img
                                src={productData?.images[0]}
                                className="w-14"
                                alt=""
                              />
                            </div>
                            <div className="w-full text-xs p-1 text-transform: capitalize">
                              <p>{productData?.productName}</p>
                              <p className="font-bold mt-1">
                                AED {productData?.price}
                              </p>
                              <p className="text-gray-600 mt-2 line-through">
                                AED {productData?.discountPrice}
                              </p>
                              <div className="w-full mt-2 flex gap-3">
                                <div className="flex gap-1 items-center">
                                  <img src="/star.png" alt="" />
                                  <p>4.2</p>
                                </div>
                                {/* <p>size: m</p> */}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    {/* first */}

                    {/* innerCards */}
                  </div>

                  <video
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    autoPlay
                    muted
                    loop
                    className="absolute"
                  >
                    <source
                      src={cardData?.videoUrl}
                      className=""
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center w-ful">
              <img src="/NodataSvg.svg" alt="Loading..." className="spinner" />
              <div>
                {" "}
                <h1> No Vibes Found</h1>
              </div>
            </div>
          )}
          {selectedVibe ? (
            <EditVibes
              alldata={getVides}
              cloasModal={setSelectedVibe}
              productData={selectedVibe.products}
              cardData={selectedVibe}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="flex justify-center w-ful">
          <div className="flex justify-center">{/* <p>OOps</p>  */}</div>
          <img src={NodataSvg} alt="Loading..." className="w-48" />
        </div>
      )}
      <div ref={loader} className="h-10" />
    </div>
  );
}

export default AllVibesVides;
