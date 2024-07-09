import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import "react-datepicker/dist/react-datepicker.css";
import { getVendorSalesAnalysis } from "../../Api/ApiCall";
const ChartComponent = () => {
  const [data, setData] = useState({});
  const [selected, setselected] = useState("Current Year");
  const [dropdown, setdropdown] = useState(false);

  useEffect(() => {
    getSalesAnalysis(selected);
  }, [selected]);
  const getSalesAnalysis = async (selected) => {
    try {
      const res = await getVendorSalesAnalysis(selected);

      setData(res.data);
    } catch (error) {
      console.log(error, "sfdhhhhhhhhhhhhh");
    }
  };

  useEffect(() => {
    const options = {
      // set the labels option to true to show the labels on the X and Y axis
      xaxis: {
        show: true,
        categories: data.months,
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
          },
          formatter: function (value) {
            return "$" + value;
          },
        },
      },
      series: [
        {
          name: "Max Gain",
          data: data.sales,
          color: "rgba(166, 179, 255, 1)",
        },
      ],
      chart: {
        sparkline: {
          enabled: false,
        },
        height: "100%",
        width: "100%",
        type: "area",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          var name = w.globals.initialSeries[seriesIndex].name;
          var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

          return (
            "<ul style='background-color: rgba(166, 179, 255, 1); text-align: center; padding: 10px; font-size: 16px; border:none;'>" +
            "<li style='color: gray;'>" +
            name +
            "</li>" +
            "<li style='color: white;'>" +
            data +
            "</li></ul>"
          );
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: "#1C64F2",
          //   gradientToColors: ["rgba(255, 255, 255, 0,1)"],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 6,
      },
      legend: {
        show: false,
      },
      grid: {
        show: true,
        strokeDashArray: 4,
      },
    };

    let chart = new ApexCharts(
      document.getElementById("labels-chart"),
      options
    );
    chart.render();

    // Cleanup function to destroy the chart instance when component unmounts
    return () => {
      chart.destroy();
    };
  }, [data]);

  return (
    <div class="w-full h-[90%]">
      <div class="flex justify-between w-full">
        <p class="text-base font-bold text-gray-500 dark:text-gray-400">
          Sales Analytics
        </p>

        <div className="">
          <div
            className="p-1.5 relative flex justify-between min-w-[20%] items-center rounded-lg cursor-pointer"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
            onClick={() => setdropdown(!dropdown)}
          >
            <p className="px-2">{selected}</p>

            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.375076 1.70711L3.96086 5.29289C4.35139 5.68342 4.98455 5.68342 5.37508 5.29289L8.96086 1.70711C9.59083 1.07714 9.14466 0 8.25376 0H1.08218C0.191278 0 -0.254888 1.07714 0.375076 1.70711Z"
                fill="black"
              />
            </svg>

            {dropdown && (
              <ul
                style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", zIndex: 999 }}
                className="absolute top-9 w-full bg-black rounded-md left-0 hover:cursor-pointer"
              >
                <li
                  className="p-1 flex justify-center hover:bg-gray-600 hover:text-white hover:rounded-md"
                  onClick={(e) => {
                    setselected("Current Year");
                    setdropdown(!dropdown);
                  }}
                >
                  Current Year
                </li>
                <li
                  className="p-1 flex justify-center hover:bg-gray-600 hover:text-white hover:rounded-md"
                  onClick={(e) => {
                    setselected("Last Year");
                    setdropdown(!dropdown);
                  }}
                >
                  Last Year
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div id="labels-chart" class="px-2.5"></div>
      <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5 p-4 md:p-6 pt-0 md:pt-0">
        {/* <div class="flex justify-between items-center pt-5">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="lastDaysdropdown"
            data-dropdown-placement="bottom"
            class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
            type="button"
          >
            Last 7 days
            <svg
              class="w-2.5 m-2.5 ms-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <div
            id="lastDaysdropdown"
            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              class="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Yesterday
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Today
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Last 7 days
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Last 30 days
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Last 90 days
                </a>
              </li>
            </ul>
          </div>
          <a
            href="#"
            class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
          >
            Sales Report
            <svg
              class="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default ChartComponent;
