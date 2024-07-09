import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllNotification } from "../../../../Api/ApiCall";
import { loadSpinner } from "../../../../Redux/Features/NavbarSlice";
import { useDispatch } from "react-redux";

function PushNotification() {
  const navigate = useNavigate();
  const [notidata, setNotidata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const [totalpages, setTotalPage] = useState(0);
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
  console.log(page);
  useEffect(() => {
    allNotification();
  }, [page]);
  const allNotification = () => {
    dispatch(loadSpinner());
    getAllNotification(page)
      .then((data) => {
        console.log(data?.data?.notificationDatas);
        setNotidata((prev) => [...prev, ...data?.data?.notificationDatas]);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(loadSpinner());
      });
  };
  return (
    <div className="bg-containerWhite p-4 rounded-md shadow-md">
      <div className="flex justify-between flex-col md:flex-row">
        <label className="text-lg font-semibold" htmlFor="">
          Recent Notification
        </label>
        <button
          className="px-2 py-2 rounded-sm flex gap-4 justify-center items-center shadow-md"
          style={{ backgroundColor: "#F4F5FA" }}
          onClick={() => navigate("/admin/sentpage")}
        >
          Send New
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0C3.58185 0 0 3.58185 0 8C0 12.4182 3.58185 16 8 16C12.4182 16 16 12.4182 16 8C16 3.58185 12.4182 0 8 0ZM8 15.3846C3.92154 15.3846 0.615385 12.0785 0.615385 8C0.615385 3.92154 3.92154 0.615385 8 0.615385C12.0785 0.615385 15.3846 3.92154 15.3846 8C15.3846 12.0785 12.0785 15.3846 8 15.3846Z"
              fill="black"
            />
            <path
              d="M13.0811 7.69261H8.3119V2.92338C8.3119 2.83845 8.24298 2.76953 8.15805 2.76953H7.85036C7.76544 2.76953 7.69652 2.83845 7.69652 2.92338V7.69261H2.92728C2.84236 7.69261 2.77344 7.76153 2.77344 7.84646V8.15415C2.77344 8.23907 2.84236 8.30799 2.92728 8.30799H7.69652V13.0772C7.69652 13.1618 7.76544 13.2311 7.85036 13.2311H8.15805C8.24298 13.2311 8.3119 13.1618 8.3119 13.0772V8.30799H13.0811C13.1657 8.30799 13.235 8.23907 13.235 8.15415V7.84646C13.235 7.76153 13.1657 7.69261 13.0811 7.69261Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
      {/* table */}
      <div
        className="overflow-y-auto w-full"
        style={{ scrollbarWidth: "none" }}
      >
        <table className="mt-10 text-center w-full">
          <thead>
            <tr style={{ backgroundColor: "#F2F2F2", height: "40px" }}>
              <th style={{ minWidth: "15vh", maxWidth: "20vh" }}>Title</th>
              <th style={{ minWidth: "15vh", maxWidth: "20vh" }}>
                Description
              </th>
              <th style={{ minWidth: "15vh", maxWidth: "20vh" }}>Image</th>
              {/* <th style={{ minWidth: "15vh", maxWidth: "20vh" }}>Link</th> */}
              <th style={{ minWidth: "15vh", maxWidth: "20vh" }}>Country</th>
              <th style={{ minWidth: "15vh", maxWidth: "20vh" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {notidata.length > 0 ?
              notidata.map((data) => {
                return (
                  <tr className="text-sm">
                    <td>{data?.title ? data?.title : "N/A"}</td>
                    <td style={{ maxWidth: "20vh" }}>{data?.message}</td>
                    <td style={{ minWidth: "15vh" }}>
                      <div className="flex justify-center mt-2">
                        {data?.imageUrl ? (
                          <img src={data?.imageUrl} className="h-10" alt="" />
                        ) : (
                          "N/A"
                        )}
                      </div>
                    </td>
                    {/* <td>Menfashion category</td> */}
                    <td>
                      {data?.stateAndcountry ? data?.stateAndcountry : "N/A"}
                    </td>
                    <td className="text-green-800">
                      {data?.status
                        ? parseFloat(data?.status).toFixed() === 100
                          ? "Completed"
                          : parseFloat(data?.status).toFixed() + "%"
                        : "N/A"}
                    </td>
                  </tr>
                );
              }):(
                <tr>
                  <td colSpan="5" className="text-center text-red-700 font-medium py-3">No Data Found</td>
                </tr>
              
              )}
          </tbody>
        </table>
      </div>
      <div className="h-10" ref={loader}></div>
    </div>
  );
}

export default PushNotification;
