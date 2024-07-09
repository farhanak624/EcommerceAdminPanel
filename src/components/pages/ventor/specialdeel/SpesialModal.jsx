import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addSpcialDeal, getsearchProduct } from "../../../../Api/ApiCall";
import { toast } from "react-toastify";
import { itemSelection } from "@syncfusion/ej2-react-maps";

function SpesialModal({ setOpen, callback }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [search, setSearch] = useState("");
  const [productData, setProductData] = useState([]);
  const [selectedProduct, setSlectedProduct] = useState([]);
  const [discount, setDiscount] = useState();
  const [dropdown, setdropdown] = useState(false);
  useEffect(() => {
    const div = document.getElementById("specialAdd");
    div.style.top = "0%";
    setTimeout(() => {
      div.style.top = "10%";
    }, 100);
  }, []);
  useEffect(() => {
    getsearchProduct(search)
      .then((data) => {
        // console.log(data?.data?.productData);
        setProductData(data?.data?.productData);
      })
      .catch((err) => console.log(err));
  }, [search]);
  const [porductName, setProductname] = useState([]);

  const handleselect = (id, name) => {
    if (selectedProduct.includes(id)) {
      setProductname(porductName.filter((item) => item?.id !== id));
      setSlectedProduct(selectedProduct.filter((item) => item !== id));
    } else {
      setProductname([...porductName, { productName: name, id: id }]);
      setSlectedProduct([...selectedProduct, id]);
    }
  };
  const handleSubmit = () => {
    if (selectedProduct.length === 0) {
      toast("Please select at least one product.");
      return;
    }
    if (discount <= 0 || discount > 101) {
      toast("pleas set discount more than 0 and less then 100 or 100");
      return;
    }
    if (!startDate) {
      toast("Please select a start date.");
      return;
    }

    if (!endDate) {
      toast("Please select an end date.");
      return;
    }

    addSpcialDeal({
      startDate: startDate,
      endDate: endDate,
      offer: discount,
      products: selectedProduct,
    })
      .then((data) => {
        console.log(data);
        toast("special deals added successfully");
        callback();
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        toast("something wrong");
      });
  };
  return (
    <div
      className="absolute w-full -top-5 h-[90vh] z-50"
      style={{ backgroundColor: " rgba(0, 0, 0, 0.179)" }}
    >
      <div className="relative w-full h-full flex justify-center">
        <div
          id="specialAdd"
          className={`p-4 bg-containerWhite max-w-[400px] absolute top-4 rounded-md `}
        >
          <div
            className="flex justify-end p-2 mb-1"
            onClick={() => setOpen(false)}
          >
            <button className="text-xl">X</button>
          </div>
          <h1 className="text-center font-bold">Add Deal</h1>

          <p className="mt-3 text-xs mb-1">Add Product</p>
          <div
            onClick={() => setdropdown(!dropdown)}
            className="w-full relative h-8 flex rounded-lg"
            style={{
              backgroundColor: `${
                dropdown ? "rgba(47, 78, 255, 1)" : "#F4F5FA"
              }`,
              color: `${dropdown ? "white" : "black"}`,
            }}
          >
            <input
              type="text"
              placeholder="Search Product "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" bg-transparent outline-none border-none px-3 w-[90%]"
            />
            <div className="w-[10%] flex items-center justify-center">
              {" "}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0716 6.05627C12.0716 2.74169 9.37084 0 6.01535 0C2.65985 0 0 2.74169 0 6.05627C0 9.37084 2.70077 12.1125 6.05627 12.1125C6.272 12.1125 6.48525 12.1009 6.69541 12.0782C8.76394 11.8551 11.1726 11.7455 12.6437 13.2166L15.1407 15.7136C15.2989 15.8718 15.5554 15.8718 15.7136 15.7136C15.8718 15.5554 15.8718 15.2989 15.7136 15.1407L13.1869 12.614C11.7238 11.1509 11.8071 8.77292 12.0351 6.71644C12.0592 6.49948 12.0716 6.2792 12.0716 6.05627ZM6.05627 0.818414C8.92072 0.818414 11.2941 3.15089 11.2941 6.05627C11.2941 8.96164 8.96164 11.2941 6.05627 11.2941C3.15089 11.2941 0.818414 8.92072 0.818414 6.05627C0.818414 3.19182 3.15089 0.818414 6.05627 0.818414Z"
                  fill="black"
                  fill-opacity="0.6"
                />
              </svg>
            </div>
            {dropdown && (
              <div
                className="w-full  bg-navblue overflow-y-auto absolute h-40  top-9 rounded-md z-50"
                style={{ scrollbarWidth: "none" }}
              >
                {productData.length != 0 &&
                  productData.map((data) => {
                    // console.log(data);
                    return (
                      <div
                        className={`flex cursor-pointer items-center gap-3 mb-4 mt-2
                        ${
                          selectedProduct.find((data1) => data1 === data?._id)
                            ? "bg-blue-400"
                            : ""
                        }
                        `}
                        onClick={() =>
                          handleselect(data?._id, data?.productName)
                        }
                      >
                        <div className="rounded-full w-10 h-10 overflow-hidden">
                          <img
                            className="w-full h-full"
                            src={data?.images?.length != 0 && data?.images[0]}
                            alt=""
                          />
                        </div>
                        {data?.productName}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
          {porductName?.length > 0 && (
            <div className=" max-h-20 w-[350px] overflow-y-auto p-1  gap-2">
              {porductName?.length > 0 &&
                porductName?.map((data) => {
                  console.log(data);
                  return (
                    <div className="flex gap-1 items-center mb-1 mt-3">
                      <p className="text-xs text-red-500  bg-[#F4F5FA] p-1 px-3 rounded-l-lg w-auto ">
                        {data?.productName}
                      </p>
                      <button
                        className="text-black flex items-center "
                        onClick={() => {
                          console.log(data);
                          handleselect(data?.id, data?.productName);
                        }}
                      >
                        X
                      </button>
                    </div>
                  );
                })}
            </div>
          )}
          <p className="mt-5 text-xs mb-1">Discount (%)</p>
          <div
            className="w-full relative h-8 flex rounded-lg overflow-hidden"
            style={{ backgroundColor: "#F4F5FA" }}
          >
            <input
              type="number"
              className="outline-none border-none bg-transparent px-3 w-full"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <div className="w-9 h-8 rounded-lg flex items-center justify-center bg-navblue text-white">
              {" "}
              %
            </div>
          </div>
          <p className="mt-5 text-xs mb-3">Offer Validity Period</p>
          <div className="flex gap-3 flex-col md:flex-row">
            <div
              className="w-full customDate relative h-8 flex rounded-lg "
              style={{ backgroundColor: "#F4F5FA" }}
            >
              <ReactDatePicker
                placeholderText="Starting on"
                className="w-full h-full bg-transparent px-3 outline-none border-none"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={new Date()}
              />
              <div className="w-9 h-8 rounded-lg  flex items-center justify-center bg-navblue text-white">
                {" "}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 2H16.0049C17.1068 2 18 2.89451 18 3.99406V16.0059C18 17.1072 17.1074 18 16.0049 18H1.99509C0.893231 18 0 17.1055 0 16.0059V3.99406C0 2.89277 0.892622 2 1.99509 2H3V0.490479C3 0.219595 3.23193 0 3.5 0C3.77614 0 4 0.215057 4 0.490479V2H14V0.490479C14 0.219595 14.2319 0 14.5 0C14.7761 0 15 0.215057 15 0.490479V2ZM15 3V3.50952C15 3.78041 14.7681 4 14.5 4C14.2239 4 14 3.78494 14 3.50952V3H4V3.50952C4 3.78041 3.76807 4 3.5 4C3.22386 4 3 3.78494 3 3.50952V3H1.99509C1.44505 3 1 3.44491 1 3.99406V16.0059C1 16.5538 1.44614 17 1.99509 17H16.0049C16.5549 17 17 16.5551 17 16.0059V3.99406C17 3.44618 16.5539 3 16.0049 3H15ZM1 5H17V6H1V5ZM13 8.50468C13 8.22596 13.214 8 13.5047 8H14.4953C14.774 8 15 8.21404 15 8.50468V9.49532C15 9.77404 14.786 10 14.4953 10H13.5047C13.226 10 13 9.78596 13 9.49532V8.50468ZM8 8.50468C8 8.22596 8.21404 8 8.50468 8H9.49532C9.77404 8 10 8.21404 10 8.50468V9.49532C10 9.77404 9.78596 10 9.49532 10H8.50468C8.22596 10 8 9.78596 8 9.49532V8.50468ZM3 8.50468C3 8.22596 3.21404 8 3.50468 8H4.49532C4.77404 8 5 8.21404 5 8.50468V9.49532C5 9.77404 4.78596 10 4.49532 10H3.50468C3.22596 10 3 9.78596 3 9.49532V8.50468ZM3 13.5047C3 13.226 3.21404 13 3.50468 13H4.49532C4.77404 13 5 13.214 5 13.5047V14.4953C5 14.774 4.78596 15 4.49532 15H3.50468C3.22596 15 3 14.786 3 14.4953V13.5047ZM8 13.5047C8 13.226 8.21404 13 8.50468 13H9.49532C9.77404 13 10 13.214 10 13.5047V14.4953C10 14.774 9.78596 15 9.49532 15H8.50468C8.22596 15 8 14.786 8 14.4953V13.5047ZM13 13.5047C13 13.226 13.214 13 13.5047 13H14.4953C14.774 13 15 13.214 15 13.5047V14.4953C15 14.774 14.786 15 14.4953 15H13.5047C13.226 15 13 14.786 13 14.4953V13.5047Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <div
              className="w-full customDate relative h-8 flex rounded-lg "
              style={{ backgroundColor: "#F4F5FA" }}
            >
              <ReactDatePicker
                placeholderText="Expire on"
                className="w-full h-full bg-transparent px-3 outline-none border-none"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                minDate={new Date(startDate)}
              />
              <div className="w-9 h-8 rounded-lg  flex items-center justify-center bg-navblue text-white">
                {" "}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 2H16.0049C17.1068 2 18 2.89451 18 3.99406V16.0059C18 17.1072 17.1074 18 16.0049 18H1.99509C0.893231 18 0 17.1055 0 16.0059V3.99406C0 2.89277 0.892622 2 1.99509 2H3V0.490479C3 0.219595 3.23193 0 3.5 0C3.77614 0 4 0.215057 4 0.490479V2H14V0.490479C14 0.219595 14.2319 0 14.5 0C14.7761 0 15 0.215057 15 0.490479V2ZM15 3V3.50952C15 3.78041 14.7681 4 14.5 4C14.2239 4 14 3.78494 14 3.50952V3H4V3.50952C4 3.78041 3.76807 4 3.5 4C3.22386 4 3 3.78494 3 3.50952V3H1.99509C1.44505 3 1 3.44491 1 3.99406V16.0059C1 16.5538 1.44614 17 1.99509 17H16.0049C16.5549 17 17 16.5551 17 16.0059V3.99406C17 3.44618 16.5539 3 16.0049 3H15ZM1 5H17V6H1V5ZM13 8.50468C13 8.22596 13.214 8 13.5047 8H14.4953C14.774 8 15 8.21404 15 8.50468V9.49532C15 9.77404 14.786 10 14.4953 10H13.5047C13.226 10 13 9.78596 13 9.49532V8.50468ZM8 8.50468C8 8.22596 8.21404 8 8.50468 8H9.49532C9.77404 8 10 8.21404 10 8.50468V9.49532C10 9.77404 9.78596 10 9.49532 10H8.50468C8.22596 10 8 9.78596 8 9.49532V8.50468ZM3 8.50468C3 8.22596 3.21404 8 3.50468 8H4.49532C4.77404 8 5 8.21404 5 8.50468V9.49532C5 9.77404 4.78596 10 4.49532 10H3.50468C3.22596 10 3 9.78596 3 9.49532V8.50468ZM3 13.5047C3 13.226 3.21404 13 3.50468 13H4.49532C4.77404 13 5 13.214 5 13.5047V14.4953C5 14.774 4.78596 15 4.49532 15H3.50468C3.22596 15 3 14.786 3 14.4953V13.5047ZM8 13.5047C8 13.226 8.21404 13 8.50468 13H9.49532C9.77404 13 10 13.214 10 13.5047V14.4953C10 14.774 9.78596 15 9.49532 15H8.50468C8.22596 15 8 14.786 8 14.4953V13.5047ZM13 13.5047C13 13.226 13.214 13 13.5047 13H14.4953C14.774 13 15 13.214 15 13.5047V14.4953C15 14.774 14.786 15 14.4953 15H13.5047C13.226 15 13 14.786 13 14.4953V13.5047Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="p-2 bg-navblue rounded-md text-white mt-5"
              onClick={handleSubmit}
            >
              Add Deal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpesialModal;
