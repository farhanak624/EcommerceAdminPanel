import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getFlickPlansAdmin, deleteFlickPlanAdmin } from '../../../../Api/ApiCall';
import Swal from "sweetalert2";
import { currencySymbolMap } from 'currency-symbol-map';
import { toast } from "react-toastify";
import { loadSpinner } from "../../../../Redux/Features/NavbarSlice";

const FlicksMain = () => {

  const [data, setData] = useState([])
  const navigate = useNavigate();
  const [showOtherSVGs, setShowOtherSVGs] = useState({});
  const [id, setId] = useState('')
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(loadSpinner());

    getFlickPlansAdmin().then((data) => {
      console.log("data in getFlickPlansAdmin", data.data)
      const memberships = data.data.memberships
      setData(memberships)
    }).catch((error) => {
      console.log("error in getFlicks", error)
    }).finally(() => {
      dispatch(loadSpinner());
    })
  }, [id])

  const toggleOtherSVGs = (itemId) => {
    setShowOtherSVGs((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleDelete = async (id) => {
    try {
      setId(id)
      const response = await deleteFlickPlanAdmin(id)
      if (response.data.success) {
        toast.success("Flick Plan Deleted Successfully");
      }
      console.log("response in deleteFlickPlanAdmin: ", response)
      setId('')
    } catch (error) {
      console.log("error in handleDelete", error)
      toast.error("Error in Deleting Flick Plan");
    }
  }

  const handleEdit = (data) => {
    navigate("/admin/addFlick", { state: { data } });
  }


  return (
    <div className="bg-containerWhite p-10 rounded-md shadow-md">
      <div className="flex justify-between flex-raw md:flex-row font-bold">
        Flicks
        <button
          className="px-3 py-3 flex gap-4 justify-center items-center shadow-md"
          style={{ backgroundColor: "#F4F5FA" }}
          onClick={() => navigate("/admin/addFlick")}
        >
          Add Plan
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {data.length === 0 ? (
          <p>No data found</p>
        ) : (
          data.map((item, index) => (
            <div key={index} className="text-white border border-gray-300 rounded-md shadow-sm p-4 bg-containerBlue">
              <div className="flex items-center justify-between">
                <div className="bg-blue-600 rounded-full w-12 h-8 flex items-center justify-center">
                  <span className="text-white">{item.offer}%</span>
                </div>
                <svg
                  className='cursor-pointer'
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => toggleOtherSVGs(item._id)}
                >
                  <rect width="30" height="30" rx="10" fill="white" />
                  <path
                    d="M15.1669 10.3338C15.8113 10.3338 16.3338 9.81133 16.3338 9.16688C16.3338 8.52243 15.8113 8 15.1669 8C14.5224 8 14 8.52243 14 9.16688C14 9.81133 14.5224 10.3338 15.1669 10.3338Z"
                    fill="black"
                  />
                  <path
                    d="M15.1669 16.1716C15.8113 16.1716 16.3338 15.6492 16.3338 15.0048C16.3338 14.3603 15.8113 13.8379 15.1669 13.8379C14.5224 13.8379 14 14.3603 14 15.0048C14 15.6492 14.5224 16.1716 15.1669 16.1716Z"
                    fill="black"
                  />
                  <path
                    d="M15.1669 21.9998C15.8113 21.9998 16.3338 21.4773 16.3338 20.8329C16.3338 20.1884 15.8113 19.666 15.1669 19.666C14.5224 19.666 14 20.1884 14 20.8329C14 21.4773 14.5224 21.9998 15.1669 21.9998Z"
                    fill="black"
                  />
                </svg>
              </div>
              {/* Container for the other two SVGs */}
              <div className="relative cursor-pointer">
                {showOtherSVGs[item._id] && (
                  <div className="absolute top-full right-0 z-10 ">
                    {/* Second SVG */}
                    <svg onClick={() => { handleEdit(item) }} className='mt-1 ' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="30" height="30" rx="10" fill="#DCE5F2" />
                      <path d="M10.4932 19.5124C10.4766 19.5122 10.4602 19.5086 10.445 19.5019C10.4298 19.4952 10.4161 19.4855 10.4047 19.4734C10.3933 19.4613 10.3845 19.447 10.3788 19.4314C10.373 19.4158 10.3704 19.3992 10.3712 19.3826L10.501 17.286C10.5021 17.2562 10.5147 17.2279 10.5361 17.207L17.54 10.2031C17.6704 10.073 17.8471 10 18.0313 10C18.2154 10 18.3921 10.073 18.5225 10.2031L19.6805 11.366C19.8104 11.4965 19.8832 11.6732 19.8832 11.8572C19.8832 12.0413 19.8104 12.2179 19.6805 12.3485L12.6766 19.3475C12.6557 19.3688 12.6274 19.3814 12.5976 19.3826L10.501 19.5124H10.4932ZM10.741 17.3465L10.6229 19.2597L12.5361 19.1426L19.5079 12.1709C19.5921 12.0861 19.6394 11.9714 19.6394 11.8519C19.6394 11.7323 19.5921 11.6177 19.5079 11.5329L18.3508 10.3758C18.266 10.2915 18.1513 10.2443 18.0318 10.2443C17.9122 10.2443 17.7975 10.2915 17.7127 10.3758L10.741 17.3465Z" fill="#000104" stroke="black" stroke-width="0.4" />
                      <path d="M11.6505 18.3481C11.6263 18.3483 11.6026 18.3413 11.5824 18.3281C11.5622 18.3148 11.5464 18.2958 11.537 18.2736C11.5276 18.2513 11.525 18.2267 11.5296 18.203C11.5341 18.1793 11.5457 18.1574 11.5627 18.1402L17.6027 12.1022C17.6141 12.0908 17.6275 12.0818 17.6423 12.0757C17.6571 12.0696 17.673 12.0664 17.6891 12.0664C17.7051 12.0664 17.721 12.0696 17.7358 12.0757C17.7506 12.0818 17.7641 12.0908 17.7754 12.1022C17.7867 12.1135 17.7957 12.127 17.8019 12.1418C17.808 12.1566 17.8112 12.1725 17.8112 12.1885C17.8112 12.2045 17.808 12.2204 17.8019 12.2352C17.7957 12.2501 17.7867 12.2635 17.7754 12.2749L11.7373 18.3129C11.714 18.3355 11.6829 18.3481 11.6505 18.3481Z" fill="#000104" stroke="black" stroke-width="0.4" />
                      <path d="M18.6675 13.2928C18.6351 13.2928 18.6039 13.2802 18.5807 13.2577L16.6128 11.2889C16.5921 11.2656 16.5811 11.2353 16.5821 11.2041C16.583 11.173 16.5959 11.1434 16.618 11.1214C16.6401 11.0994 16.6698 11.0868 16.7009 11.086C16.7321 11.0852 16.7623 11.0964 16.7855 11.1172L18.7533 13.085C18.7702 13.1021 18.7817 13.1237 18.7864 13.1473C18.791 13.1708 18.7886 13.1953 18.7794 13.2174C18.7703 13.2396 18.7548 13.2586 18.7348 13.272C18.7149 13.2854 18.6915 13.2927 18.6675 13.2928Z" fill="#000104" stroke="black" stroke-width="0.4" />
                      <path d="M12.6293 19.3362C12.6133 19.3363 12.5974 19.3332 12.5826 19.327C12.5679 19.3208 12.5545 19.3116 12.5434 19.3001L10.5746 17.3323C10.5633 17.321 10.5544 17.3076 10.5483 17.2929C10.5422 17.2781 10.5391 17.2624 10.5391 17.2464C10.5391 17.2305 10.5422 17.2147 10.5483 17.2C10.5544 17.1852 10.5633 17.1718 10.5746 17.1606C10.5859 17.1493 10.5993 17.1403 10.614 17.1342C10.6287 17.1281 10.6445 17.125 10.6605 17.125C10.6764 17.125 10.6922 17.1281 10.7069 17.1342C10.7217 17.1403 10.7351 17.1493 10.7463 17.1606L12.7141 19.1284C12.7255 19.1396 12.7345 19.153 12.7406 19.1677C12.7467 19.1825 12.7499 19.1983 12.7499 19.2142C12.7499 19.2302 12.7467 19.246 12.7406 19.2607C12.7345 19.2755 12.7255 19.2888 12.7141 19.3001C12.7031 19.3115 12.69 19.3206 12.6754 19.3268C12.6608 19.333 12.6451 19.3362 12.6293 19.3362Z" fill="#000104" stroke="black" stroke-width="0.4" />
                      <path d="M10.1216 19.879C10.1056 19.8791 10.0897 19.8759 10.075 19.8697C10.0602 19.8635 10.0469 19.8544 10.0357 19.8429C10.0244 19.8316 10.0154 19.8182 10.0093 19.8035C10.0032 19.7888 10 19.773 10 19.757C10 19.741 10.0032 19.7252 10.0093 19.7105C10.0154 19.6958 10.0244 19.6824 10.0357 19.6711L10.4026 19.3033C10.4139 19.292 10.4274 19.283 10.4422 19.2769C10.457 19.2707 10.4729 19.2676 10.4889 19.2676C10.505 19.2676 10.5208 19.2707 10.5356 19.2769C10.5505 19.283 10.5639 19.292 10.5753 19.3033C10.5866 19.3147 10.5956 19.3281 10.6017 19.343C10.6079 19.3578 10.611 19.3736 10.611 19.3897C10.611 19.4057 10.6079 19.4216 10.6017 19.4364C10.5956 19.4512 10.5866 19.4647 10.5753 19.476L10.2075 19.8429C10.1963 19.8544 10.183 19.8635 10.1682 19.8697C10.1535 19.8759 10.1376 19.8791 10.1216 19.879Z" fill="#000104" stroke="black" stroke-width="0.4" />
                      <path d="M16.8322 19.9998H13.1493C13.117 19.9998 13.0859 19.9869 13.0631 19.964C13.0402 19.9412 13.0273 19.9102 13.0273 19.8778C13.0273 19.8455 13.0402 19.8144 13.0631 19.7916C13.0859 19.7687 13.117 19.7559 13.1493 19.7559H16.8322C16.8646 19.7559 16.8956 19.7687 16.9185 19.7916C16.9413 19.8144 16.9542 19.8455 16.9542 19.8778C16.9542 19.9102 16.9413 19.9412 16.9185 19.964C16.8956 19.9869 16.8646 19.9998 16.8322 19.9998Z" fill="#000104" stroke="black" stroke-width="0.4" />
                    </svg>
                    {/* <svg onClick={()=>{handleDelete(item._id)}} className='mt-1 ' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
                    <svg onClick={(e) => {
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
                          handleDelete(item._id)
                        }
                      });
                    }} className='mt-1 ' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="30" height="30" rx="10" fill="#DB3022" fill-opacity="0.6" />
                      <path d="M11.4539 10.3129H13.4629V9.3151C13.4629 9.13129 13.5951 9 13.7801 9C13.7801 9 13.7801 9 13.8066 9L17.0051 9.02626C17.1637 9.02626 17.2959 9.15755 17.2959 9.3151V10.3129H19.1992H20.468C20.6266 10.3129 20.7588 10.4705 20.7588 10.628C20.7588 10.7856 20.6266 10.9168 20.468 10.9168H19.6221V20.2648C19.6221 20.4486 19.5428 20.6324 19.4107 20.7899C19.2785 20.9212 19.0934 21 18.882 21H11.9033C11.6918 21 11.5068 20.9212 11.3746 20.7899C11.2424 20.6324 11.1367 20.4486 11.1367 20.2648V10.9168H10.3172C10.1322 10.9168 10 10.7856 10 10.628C10 10.4705 10.1322 10.3129 10.3172 10.3129H11.1367H11.4539ZM14.0709 10.3129H16.6879V9.60394H14.0709V10.3129ZM17.4545 18.2954C17.4545 18.453 17.3223 18.5842 17.1637 18.5842C17.0051 18.5842 16.873 18.453 16.873 18.2954V13.0175C16.873 12.86 17.0051 12.7287 17.1637 12.7287C17.3223 12.7287 17.4545 12.86 17.4545 13.0175V18.2954ZM15.6834 18.2954C15.6834 18.453 15.5512 18.5842 15.3926 18.5842C15.2076 18.5842 15.0754 18.453 15.0754 18.2954V13.0175C15.0754 12.86 15.2076 12.7287 15.3926 12.7287C15.5512 12.7287 15.6834 12.86 15.6834 13.0175V18.2954ZM13.9123 18.2954C13.9123 18.453 13.7801 18.5842 13.5951 18.5842C13.4365 18.5842 13.3043 18.453 13.3043 18.2954V13.0175C13.3043 12.86 13.4365 12.7287 13.5951 12.7287C13.7801 12.7287 13.9123 12.86 13.9123 13.0175V18.2954ZM19.0406 10.9168H13.7801H11.7447V20.2648C11.7447 20.291 11.7447 20.3435 11.7975 20.3698C11.824 20.3961 11.8504 20.3961 11.9033 20.3961H18.882C18.9084 20.3961 18.9613 20.3961 18.9877 20.3698C19.0141 20.3435 19.0406 20.291 19.0406 20.2648V10.9168Z" fill="white" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="text-center mt-2 text-2xl font-semibold">{item.name}</div>
              <div className="text-center">
                <div className="text-center">
                  {item.currency} {item.amount.toFixed(1)} <span className="text-xs text-gray-400">/ Month</span>
                </div>
              </div>
              <hr className="mt-4 border-t border-gray-600" />
              {item.description.map((desc, index) => (
                <div key={index} className="flex items-center mt-4">
                  <div className="flex items-center" style={{ width: "30px" }}>
                    <svg
                      className="mr-3"
                      width="17"
                      height="18"
                      viewBox="0 0 17 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="8.5" cy="9" r="8.5" fill="#2F4EFF" />
                      <path
                        d="M4.72266 8.94881L7.40908 11.8337L12.2782 6.16699"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>{desc}</span>
                </div>
              ))}

              {
                item?.isDownloadable && (
                  <div
              //  key={index} 
               className="flex items-center mt-4">
                  <div className="flex items-center" style={{ width: "30px" }}>
                    <svg
                      className="mr-3"
                      width="17"
                      height="18"
                      viewBox="0 0 17 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="8.5" cy="9" r="8.5" fill="#2F4EFF" />
                      <path
                        d="M4.72266 8.94881L7.40908 11.8337L12.2782 6.16699"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>{item.isDownloadable ? "Download Available" :""}</span>
                </div>
                )
              }
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default FlicksMain