import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../../../Api/ApiCall";
import Swal from "sweetalert2";

function ProductCard({ product, callback }) {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  const rating =
    product?.ratings?.average > 0 && product?.ratings?.average.toFixed(1);

  const sameamount = product?.discountPrice === product.price;

  const toggleOptions = (e) => {
    // alert("sdgsds");
    e.stopPropagation();
    console.log(!showOptions);
    setShowOptions(!showOptions);
  };

  const handleDelete = (productId) => {
    deleteProduct(productId)
      .then((data) => {
        console.log("deletedProduct", data);
        toast.success("Product Deleted Successfully");
        callback();
      })
      .catch((error) => {
        console.log("error", error.response.data);
      });
  };

  return (
    <>
      <div
        onClick={() => {
          navigate("/productDetailed", {
            state: { productDetails: product},
          });
        }}
        className="flex flex-col justify-between bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden relative"
      >
      
       <a href="#">
          <div className="flex justify-center p-3">
            <img
              className="rounded-t-lg  object-cover h-32"
              src={product?.images[0]}
              alt="Product"
            />
          </div>
        </a>
        {/* <div
          className="absolute top-3 right-2 bg-gray-400/40 w-[30px] flex justify-center items-center h-[30px] px-2 py-2 rounded-full cursor-pointer"
          onClick={(e) => toggleOptions(e)}
        >
         
          <svg
            width="4"
            height="14"
            viewBox="0 0 4 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.55556 10.8889C2.41466 10.8889 3.11111 11.5853 3.11111 12.4444C3.11111 13.3036 2.41466 14 1.55556 14C0.696446 14 0 13.3036 0 12.4444C0 11.5853 0.696446 10.8889 1.55556 10.8889ZM1.55556 5.44444C2.41466 5.44444 3.11111 6.14089 3.11111 7C3.11111 7.85911 2.41466 8.55556 1.55556 8.55556C0.696446 8.55556 0 7.85911 0 7C0 6.14089 0.696446 5.44444 1.55556 5.44444ZM1.55556 0C2.41466 0 3.11111 0.696446 3.11111 1.55556C3.11111 2.41466 2.41466 3.11111 1.55556 3.11111C0.696446 3.11111 0 2.41466 0 1.55556C0 0.696446 0.696446 0 1.55556 0Z"
              fill="black"
              fill-opacity="0.5"
            />
          </svg>
        </div> */}
        <div className="ms-4 flex flex-col justify-between">
          <a href="#">
            <h5 className=" text-md font-bold tracking-tight text-gray-900 dark:text-black mt-2 text-transform: capitalize">
              {product?.productName}
            </h5>
          </a>
          <p className="mb-1 text-xs font-normal text-gray-700 dark:text-gray-400 text-transform: capitalize">
            {product?.description}
          </p>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-lg font-semibold text-gray-900 ">
                {product?.currency} {""}
                {product?.discountPrice?.toFixed()}
              </span>
              <span className="text-sm text-gray-400 line-through ml-2 p-2">
                {product?.price === product?.discountPrice
                  ? ""
                  : product?.currency}
                {" "}
                {product?.price === product?.discountPrice
                  ? ""
                  : product?.price?.toFixed()}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center p-2">
            <div className="flex items-center">
              {/* Placeholder for rating */}
              <span className="text-sm font-medium text-gray-900 dark:text-black">
                {rating > 0 && rating}
              </span>
              {rating > 0 && (
                <svg
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 0L9.32866 3.79487L13.6574 4.83688L10.7679 8.22425L11.1145 12.6631L7 10.9618L2.8855 12.6631L3.23214 8.22425L0.342604 4.83688L4.67133 3.79487L7 0Z"
                    fill="#FFC833"
                  />
                </svg>
              )}
            </div>

            {/* <div
             
              className="bg-navblue rounded-full w-12 h-12 mr-1 mb-1 cursor-pointer"
            >
              {" "}
              <img
                src="/downArrow.png"
                className={`my-5 mx-5 w-3 h-2 translate -rotate-90`}
                alt=""
              />
            </div> */}
          </div>
        </div>

        {/* Options */}
        {showOptions && (
          <div className="absolute top-9 right-1 flex flex-col gap-2 bg-white p-2 rounded-md ">
            <button className="text-black">
              <svg
                width="52"
                onClick={() => {
                  navigate("/editProduct", {
                    state: { productDetails: product },
                  });
                }}
                height="52"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_1770_15462)">
                  <circle cx="26" cy="26" r="20" fill="#FAFAFC" />
                </g>
                <path
                  d="M18.7852 33.2187C18.7586 33.2183 18.7324 33.2126 18.7081 33.2019C18.6837 33.1911 18.6618 33.1756 18.6436 33.1563C18.6254 33.1369 18.6113 33.1141 18.6021 33.0891C18.5929 33.0642 18.5888 33.0377 18.5901 33.0111L18.7977 29.6568C18.7994 29.609 18.8195 29.5637 18.8539 29.5304L30.0593 18.3249C30.2679 18.1168 30.5506 18 30.8452 18C31.1399 18 31.4225 18.1168 31.6311 18.3249L33.4838 20.1855C33.6915 20.3943 33.8081 20.6768 33.8081 20.9714C33.8081 21.2659 33.6915 21.5484 33.4838 21.7573L22.2784 32.9549C22.2449 32.989 22.1997 33.009 22.152 33.0111L18.7977 33.2187H18.7852ZM19.1816 29.7536L18.9928 32.8144L22.0536 32.6271L33.2076 21.4732C33.3424 21.3375 33.418 21.154 33.418 20.9628C33.418 20.7715 33.3424 20.5881 33.2076 20.4524L31.3564 18.6012C31.2207 18.4664 31.0372 18.3908 30.846 18.3908C30.6547 18.3908 30.4713 18.4664 30.3356 18.6012L19.1816 29.7536Z"
                  fill="black"
                />
                <path
                  d="M20.6384 31.3595C20.5998 31.3598 20.5618 31.3487 20.5295 31.3275C20.4972 31.3063 20.4718 31.2759 20.4568 31.2403C20.4417 31.2047 20.4376 31.1654 20.4449 31.1274C20.4523 31.0894 20.4707 31.0545 20.498 31.027L30.1613 21.3668C30.1794 21.3486 30.201 21.3343 30.2247 21.3244C30.2484 21.3146 30.2738 21.3096 30.2994 21.3096C30.3251 21.3096 30.3505 21.3146 30.3742 21.3244C30.3979 21.3343 30.4194 21.3486 30.4376 21.3668C30.4557 21.3849 30.4701 21.4065 30.4799 21.4302C30.4897 21.4539 30.4948 21.4793 30.4948 21.5049C30.4948 21.5306 30.4897 21.556 30.4799 21.5797C30.4701 21.6034 30.4557 21.6249 30.4376 21.6431L20.7774 31.3033C20.7401 31.3393 20.6903 31.3595 20.6384 31.3595Z"
                  fill="black"
                />
                <path
                  d="M31.8677 23.2729C31.8159 23.2729 31.7661 23.2528 31.7288 23.2168L28.5805 20.0669C28.5474 20.0297 28.5298 19.9811 28.5313 19.9313C28.5329 19.8815 28.5534 19.8341 28.5888 19.7989C28.6241 19.7638 28.6716 19.7435 28.7215 19.7422C28.7713 19.741 28.8197 19.7589 28.8568 19.7922L32.0051 22.9405C32.0321 22.9678 32.0505 23.0024 32.0579 23.0401C32.0654 23.0778 32.0615 23.1168 32.0468 23.1523C32.0322 23.1878 32.0073 23.2182 31.9755 23.2397C31.9436 23.2611 31.9061 23.2727 31.8677 23.2729Z"
                  fill="black"
                />
                <path
                  d="M22.2113 32.9351C22.1857 32.9353 22.1603 32.9303 22.1367 32.9203C22.113 32.9104 22.0917 32.8958 22.0739 32.8773L18.9241 29.7291C18.906 29.711 18.8917 29.6896 18.882 29.666C18.8722 29.6425 18.8672 29.6172 18.8672 29.5917C18.8672 29.5662 18.8722 29.5409 18.882 29.5174C18.8917 29.4938 18.906 29.4724 18.9241 29.4544C18.9421 29.4363 18.9635 29.422 18.9871 29.4122C19.0107 29.4025 19.0359 29.3975 19.0614 29.3975C19.0869 29.3975 19.1122 29.4025 19.1358 29.4122C19.1593 29.422 19.1808 29.4363 19.1988 29.4544L22.3471 32.6026C22.3652 32.6206 22.3796 32.642 22.3894 32.6656C22.3992 32.6892 22.4042 32.7144 22.4042 32.74C22.4042 32.7655 22.3992 32.7908 22.3894 32.8144C22.3796 32.8379 22.3652 32.8593 22.3471 32.8773C22.3295 32.8956 22.3084 32.9101 22.285 32.92C22.2617 32.9299 22.2366 32.9351 22.2113 32.9351Z"
                  fill="black"
                />
                <path
                  d="M18.1945 33.8043C18.1689 33.8045 18.1435 33.7995 18.1199 33.7895C18.0963 33.7796 18.075 33.765 18.0572 33.7465C18.0391 33.7286 18.0247 33.7072 18.0149 33.6836C18.0051 33.66 18 33.6347 18 33.6092C18 33.5837 18.0051 33.5584 18.0149 33.5348C18.0247 33.5112 18.0391 33.4898 18.0572 33.4718L18.6441 32.8834C18.6622 32.8652 18.6837 32.8509 18.7075 32.841C18.7312 32.8312 18.7566 32.8262 18.7822 32.8262C18.8079 32.8262 18.8333 32.8312 18.857 32.841C18.8807 32.8509 18.9022 32.8652 18.9203 32.8834C18.9385 32.9015 18.9529 32.9231 18.9627 32.9468C18.9725 32.9705 18.9776 32.9959 18.9776 33.0215C18.9776 33.0472 18.9725 33.0726 18.9627 33.0963C18.9529 33.12 18.9385 33.1415 18.9203 33.1597L18.3319 33.7465C18.3141 33.765 18.2928 33.7796 18.2692 33.7895C18.2455 33.7995 18.2202 33.8045 18.1945 33.8043Z"
                  fill="black"
                />
                <path
                  d="M28.9272 34.0006H23.035C22.9832 34.0006 22.9336 33.98 22.897 33.9434C22.8604 33.9068 22.8398 33.8572 22.8398 33.8055C22.8398 33.7537 22.8604 33.7041 22.897 33.6675C22.9336 33.6309 22.9832 33.6104 23.035 33.6104H28.9272C28.979 33.6104 29.0286 33.6309 29.0652 33.6675C29.1018 33.7041 29.1223 33.7537 29.1223 33.8055C29.1223 33.8572 29.1018 33.9068 29.0652 33.9434C29.0286 33.98 28.979 34.0006 28.9272 34.0006Z"
                  fill="black"
                />
                <defs>
                  <filter
                    id="filter0_d_1770_15462"
                    x="0"
                    y="0"
                    width="52"
                    height="52"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="3" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_1770_15462"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_1770_15462"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </button>
            <button className="text-black">
              <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click from bubbling to the card div
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You want to delete this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      // If confirmed, perform the delete operation
                      // You can place your delete logic here
                      deleteProduct(product?._id)
                        .then((data) => {
                          console.log("success", data?.data);
                          if (result.isConfirmed) {
                          }
                          callback();
                        })
                        .catch((err) => {
                          console.log(err.response.data);
                        });
                      Swal.fire(
                        "Deleted!",
                        "Your file has been deleted.",
                        "success"
                      );
                      // For demonstration purposes, let's just log the deletion
                      console.log("Item deleted");
                    }
                  });
                }}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_1770_15461)">
                  <circle cx="26" cy="26" r="20" fill="#FF7266" />
                </g>
                <path
                  d="M20.9385 19.7505H23.6172V18.4201C23.6172 18.1751 23.7934 18 24.0402 18C24.0402 18 24.0402 18 24.0754 18L28.3402 18.035C28.5516 18.035 28.7279 18.2101 28.7279 18.4201V19.7505H31.2656H32.9574C33.1689 19.7505 33.3451 19.9606 33.3451 20.1707C33.3451 20.3807 33.1689 20.5558 32.9574 20.5558H31.8295V33.0197C31.8295 33.2648 31.7238 33.5098 31.5475 33.7199C31.3713 33.895 31.1246 34 30.8426 34H21.5377C21.2557 34 21.009 33.895 20.8328 33.7199C20.6566 33.5098 20.5156 33.2648 20.5156 33.0197V20.5558H19.423C19.1762 20.5558 19 20.3807 19 20.1707C19 19.9606 19.1762 19.7505 19.423 19.7505H20.5156H20.9385ZM24.4279 19.7505H27.9172V18.8053H24.4279V19.7505ZM28.9393 30.3939C28.9393 30.6039 28.7631 30.779 28.5516 30.779C28.3402 30.779 28.1639 30.6039 28.1639 30.3939V23.3567C28.1639 23.1466 28.3402 22.9716 28.5516 22.9716C28.7631 22.9716 28.9393 23.1466 28.9393 23.3567V30.3939ZM26.5779 30.3939C26.5779 30.6039 26.4016 30.779 26.1902 30.779C25.9434 30.779 25.7672 30.6039 25.7672 30.3939V23.3567C25.7672 23.1466 25.9434 22.9716 26.1902 22.9716C26.4016 22.9716 26.5779 23.1466 26.5779 23.3567V30.3939ZM24.2164 30.3939C24.2164 30.6039 24.0402 30.779 23.7934 30.779C23.582 30.779 23.4057 30.6039 23.4057 30.3939V23.3567C23.4057 23.1466 23.582 22.9716 23.7934 22.9716C24.0402 22.9716 24.2164 23.1466 24.2164 23.3567V30.3939ZM31.0541 20.5558H24.0402H21.3262V33.0197C21.3262 33.0547 21.3262 33.1247 21.3967 33.1597C21.432 33.1947 21.4672 33.1947 21.5377 33.1947H30.8426C30.8779 33.1947 30.9484 33.1947 30.9836 33.1597C31.0189 33.1247 31.0541 33.0547 31.0541 33.0197V20.5558Z"
                  fill="white"
                />
                <defs>
                  <filter
                    id="filter0_d_1770_15461"
                    x="0"
                    y="0"
                    width="52"
                    height="52"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="3" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_1770_15461"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_1770_15461"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </button>
          </div>
        )}
       
       
      </div>
    </>
  );
}

export default ProductCard;
