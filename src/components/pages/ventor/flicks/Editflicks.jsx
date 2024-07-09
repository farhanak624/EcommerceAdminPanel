import React, { useState } from "react";
import { movieGenre } from "./moviegenreLis";

function Editflicks() {
  const [specification, setSpecification] = useState([
    {
      speci: "",
      name: "",
    },
  ]);
  const handilonClick = () => {
    setSpecification([...specification, { speci: "", name: "" }]);
  };
  const removeOne = (indexToRemove) => {
    setSpecification(
      specification.filter((_, index) => index !== indexToRemove)
    );
  };
  return (
    <div className="p-4 flex justify-center">
      <div className="w-full md:max-w-[80%]">
        <h1 className="text-center text-2xl font-bold">Edit video</h1>
        <div className="flex md:flex-row flex-col gap-4 p-4 mt-10 w-full">
          <div>
            <img src="/flash.png" className="w-96" alt="" />
          </div>
          <div className="flex flex-col w-full relative ">
            <div className="bottom-0 mt-28">
              <input
                placeholder="Name"
                type="text"
                className="border-none shadow-sm px-1 mt-4 outline-none bg-white w-full h-11 rounded-lg"
              />
              <input
                placeholder="Year"
                type="text"
                className="border-none shadow-sm px-1 outline-none bg-white mt-4 w-full h-11 rounded-lg"
              />
              <div className="flex flex-col gap-4 sm:flex-row mt-3 items-center justify-center">
                <div className="flex h-11 shadow-sm bg-white  rounded-xl w-full px-1">
                  <select
                    name=""
                    className=" h-full  bg-transparent w-full outline-none border-none"
                    id=""
                  >
                    <option selected disabled>
                      select age
                    </option>
                    <option value="18+">18+</option>
                    <option value="genaral">General</option>
                    <option value="kids">Kids</option>
                  </select>
                </div>
                <div className="flex h-11 bg-white shadow-sm rounded-xl w-full px-1">
                  <select
                    name=""
                    className="p-2 h-full bg-transparent w-full outline-none border-none"
                    id=""
                  >
                    <option disabled selected>
                      select genre
                    </option>
                    {movieGenre[0] &&
                      movieGenre.map((data) => {
                        return <option value={data?.name}>{data?.name}</option>;
                      })}
                  </select>
                  {/* <input type="text" placeholder="Genre" /> */}
                </div>
                <div className="flex h-11 bg-white shadow-sm rounded-xl w-full px-1">
                  <input
                    type="text"
                    className="p-2 h-full bg-transparent w-full outline-none border-none"
                    placeholder="Category"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <textarea
          name=""
          className="bg-containerWhite shadow-sm rounded-xl w-full mt-4"
          id=""
          cols="30"
          rows="2"
        ></textarea>

        <section className="3 mt-8">
          <div className="flex justify-between">
            <h1 className="font-bold">Specification</h1>
            <button
              onClick={handilonClick}
              className="bg-white shadow-sm p-2 flex justify-center items-center gap-2 rounded-md"
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
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mt-1">
                    <input
                      type="text"
                      placeholder="Specification"
                      className="w-full bg-white shadow-sm outline-none border-none p-3 pl-3 rounded-xl"
                      name=""
                      id=""
                    />
                    <input
                      type="text"
                      placeholder="name"
                      className="w-full bg-white shadow-sm outline-none border-none p-3 pl-3 rounded-xl"
                      name=""
                      id=""
                    />
                  </div>
                </div>
              );
            })}
        </section>
      </div>
    </div>
  );
}

export default Editflicks;
