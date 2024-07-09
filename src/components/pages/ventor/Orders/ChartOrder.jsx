import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ChartOrder = ({graphData}) => {
  useEffect(() => {
    const sortedGraphDatas = graphData?.sort((a, b) => a._id - b._id);
console.log("sortedGraphDatas: ", sortedGraphDatas)
    const categories = sortedGraphDatas?.map((data) => data.month);
    const seriesData = sortedGraphDatas?.map((data) => data.totalOrders);

    const options = {
      // set the labels option to true to show the labels on the X and Y axis
      xaxis: {
        show: true,
        categories: categories,
        // categories: [
        //   "Jan",
        //   "Feb",
        //   "Mar",
        //   "Apr",
        //   "May",
        //   "Jun",
        //   "Jul",
        //   "Aug",
        //   "Sep",
        //   "Oct",
        //   "Nov",
        //   "Dec"
        // ],
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
        tickAmount: 12,
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
          }
        },
      },
      series: [
        {
          name: "Max Gain",
          data: seriesData,
          // data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200],
          color: "rgba(166, 179, 255, 1)",
        },
      ],
      chart: {
        sparkline: {
          enabled: false,
        },
        height: "400px",
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
  }, [graphData]);

  return (
    <div className="w-full">
      <div className="p-4 md:p-6 pb-0 md:pb-0">
        <p className="text-base font-bold">
          Order Overviews
        </p>
      </div>
      {graphData && (
        <div id="labels-chart" className="px-2.5 grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5 p-4 md:p-6 pt-0 md:pt-0" style={{ width: "100%" }}></div>
      )}
    </div>
  );
};

export default ChartOrder;
