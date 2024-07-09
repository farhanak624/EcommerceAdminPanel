import React from "react";
import { getSections } from "../../../../Api/ApiCall";

const Sections = () => {
    const [sectionList, setSectionList] = useState([]);
  useEffect(() => {
    console.log("Brands Page");
    getProductSections();
  }, []);
  const getProductSections = () => {
    getSections().then((data) => {
      console.log("sections", data?.data?.sectionData);
      setSectionList(data?.data?.sectionData);
    });
  };
  return (
    <div>
        <div className="flex justify-between mt-2 w-full">
        {/* <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 pt-6  ">
          <div className="flex items-center gap-2">
            
          </div>
          <div className="flex items-center gap-2">
            <select
              name="brand"
              className="p-3 rounded-lg outline-none bg-[rgba(244,245,250,1)] border-none w-full"
              id=""
              
            >
              <option disabled selected value="">
                Category
              </option>
              <option value="">afsaf</option>;
            </select>
          </div>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-full p-3 ps-10 text-sm bg-bodycolur rounded-lg"
              placeholder="Search Product"
              
            />
          </div>
          <button className="bg-navblue text-white px-4 py-2 rounded-lg">
            Add Brand
          </button>
        </div> */}
      </div>
      <div className=" mt-6">
        <div className="table-responsive ">
          <table className="table align-middle table-nowrap mb-0 h-9 w-full overflow-x-auto">
            <thead className="bg-gray-100 h-10">
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 ">
                <td className="text-sm text-center py-3 cursor-pointer">
                  <div className="flex flex-col items-center justify-center sm:flex-row sm:items-center">
                    <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
                    <span className="sm:ml-2 sm:mt-0">Nike</span>
                  </div>
                </td>
                <td className="text-sm py-3">
                  <div className="flex sm:justify-center gap-2 sm:flex-row">
                    <button className=" w-8 h-8 hover:bg-slate-200 rounded-full ">
                      {/* <EditIcon  /> */}
                    </button>
                    <button className="w-8 h-8 hover:bg-slate-200 rounded-full">
                      {/* <DeleteIcon color="error" /> */}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sections;
