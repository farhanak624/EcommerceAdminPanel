import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import { getVendorProduct, activeProduct, changeCommissionSingle, changeCommissionAll } from "../../../../Api/ApiCall";
import Loading from "../../../LodingDiv/LoaderSmall";
import CommissionModal from "./CommissionModal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../../../Redux/Features/NavbarSlice";
import { debounce } from "chart.js/helpers";

const VenProducts = ({ id }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [pages, setPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loader = useRef(null);
  const [totalpages, setTotalPage] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchKey(value);
      setProducts([]);
      setPages(1);
      getProducts(id, value, 1, true);
    }, 300),
    []
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPages((prev) => prev + 1);
      }
    };

    const observer = new IntersectionObserver(observerCallback, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader]);

  useEffect(() => {
    getProducts(id, searchKey, pages);
  }, [id, pages]);

  const getProducts = async (id, searchKey, pages, isNewSearch = false) => {
    try {
      // setProducts([]);
      console.log("searchKey", isNewSearch);
      dispatch(loadSpinner());
      const response = await getVendorProduct(id, searchKey, pages);
      setProducts((prevProducts) =>
        isNewSearch
          ? response?.data?.products
          : [...prevProducts, ...response?.data?.products]
      );
      console.log("padefe", response?.data);
      setTotalPages(response?.data?.totalPages);
      dispatch(loadSpinner());
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products.");
      dispatch(loadSpinner());
    }
  };

  const handleActiveProduct = async (productId) => {
    const product = products.find((v) => v._id === productId);
    const action = product.activeStatus ? "In-activated" : "Activated";

    setProductId(productId);

    activeProduct(productId)
      .then((data) => {
        console.log("data in action On product: ", data);
        setProducts((prevProducts) =>
          prevProducts.map((prod) =>
            prod._id === productId
              ? { ...prod, activeStatus: !prod.activeStatus }
              : prod
          )
        );
        Swal.fire(
          `${action.charAt(0).toUpperCase() + action.slice(1)}`,
          `Product has been ${action}.`,
          "success"
        );
      })
      .catch((error) => {
        console.error("Error updating product status:", error);
        Swal.fire("Failed!", `Failed to ${action} the product.`, "error");
      });

    setProductId("");
  };

  const handleProductClick = (productId) => {
    setProductId(productId);
    setIsModalOpen(true);
  };

  const handleModalConfirm = async ({ option, commission }) => {
    try {
      if (option === "single") {
        await changeCommissionSingle(productId, commission);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId ? { ...product, commission } : product
          )
        );
      } else if (option === "all") {
        await changeCommissionAll(id, commission);
        setProducts((prevProducts) =>
          prevProducts.map((product) => ({ ...product, commission }))
        );
      }
      toast.success("Commission updated successfully.");
    } catch (error) {
      console.error("Error updating commission:", error);
      toast.error("Failed to update commission.");
    } finally {
      setIsModalOpen(false);
      setProductId('');
    }
  };


  // const handleModalConfirm = async ({ option, commission }) => {
  //   if (option === "single") {
  //     await changeCommissionSingle(productId, commission);
  //   } else if (option === "all") {
  //     console.log("vendorId: ", id)
  //     await changeCommissionAll(id, commission);
  //   }
  //   setIsModalOpen(false);
  //   setProductId('')
  // };

  return (
    <>
      <div className="flex justify-end">
        <input
          type="text"
          className="w-1/4 h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Search Product.."
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
      <div className="mt-8 overflow-x-auto border rounded-xl shadow-md">
        <div className="table-responsive">
          <table className="table align-middle table-nowrap mb-0 h-9 w-full text-sm">
            <thead className="bg-gray-100 h-10">
              <tr>
                <th>Product Details</th>
                <th>Category</th>
                <th>Options</th>
                <th>Rate</th>
                <th>Quantity</th>
                <th>Comm.%</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products?.map((product, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 cursor-pointer"
                    onClick={() => handleProductClick(product?._id)}
                  >
                    <td className="text-center py-3">
                      <div className="flex flex-col items-center justify-start sm:flex-row sm:items-center">
                        <img
                          src={product?.images[0]}
                          className="m-2 w-7 h-7 mr-2 rounded-full"
                          alt="product Profile"
                        />
                        <span className="sm:ml-2 sm:mt-0">
                          {product?.productName}
                        </span>
                      </div>
                    </td>
                    <td className="text-center py-3">
                      <div className="flex flex-wrap justify-center gap-1">
                        <div className="bg-gray-200 rounded-md px-2 py-1 overflow-hidden whitespace-nowrap text-xs">
                          {product?.category}
                        </div>
                        {/* {product?.category?.map((category, index) => (
                                                <div key={index} className="bg-gray-200 rounded-md px-2 py-1 overflow-hidden whitespace-nowrap text-xs">
                                                    {category}
                                                </div>
                                            ))} */}
                      </div>
                    </td>
                    <td className="text-center py-3">
                      <div className="flex flex-wrap justify-center gap-1">
                        {product?.details.map((option, index) => (
                          <div
                            key={index}
                            className="bg-gray-200 rounded-full px-2 py-1 overflow-hidden whitespace-nowrap text-xs"
                          >
                            {option?.size}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="text-center py-3">
                      {product?.price.toFixed(1)}
                    </td>
                    <td className="text-center py-3">
                      {product?.totalQuantity}
                    </td>
                    <td className="text-center py-3">{product?.commission}%</td>
                    <td className="text-center py-3">
                      <div
                        className={`text-xs font-bold py-1 px-2 rounded-full cursor-default ${product?.activeStatus === true
                          ? "bg-green-100 text-green-900"
                          : "bg-red-100 text-red-600 hover:bg-red-500"
                          }`}
                      >
                        {product?.activeStatus === true
                          ? "Active"
                          : "In Active"}
                      </div>
                    </td>
                    <td className="text-center py-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          Swal.fire({
                            title: "Are you sure?",
                            text: `You want ${product.activeStatus === true
                              ? "In-activate"
                              : "Activate"
                              } this product!`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleActiveProduct(product?._id);
                            }
                          });
                        }}
                        className={`w-10 h-6 rounded-full focus:outline-none ${product?.activeStatus === true
                          ? "bg-blue-600"
                          : "bg-gray-300"
                          }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full m-1 shadow-md transform duration-300 ${product?.activeStatus === true
                            ? "translate-x-4 bg-white"
                            : "translate-x-0 bg-gray-100"
                            }`}
                        ></div>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="text-red-600 text-center text-xl py-3"
                  >
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div ref={loader} className="h-10" />
        </div>
        <CommissionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleModalConfirm}
        />
      </div>
    </>
  );
};

export default VenProducts;
