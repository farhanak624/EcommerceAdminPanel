import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import "react-datepicker/dist/react-datepicker.css";

const LineChart = ({ data }) => {
  const [maxmonth, setmaxmonth] = useState("");
  const [minmonth, setminmonth] = useState("");
  const [maxvalue, setmaxvalue] = useState("");
  const [minvalue, setminvalue] = useState("");

  useEffect(() => {
    
    // Updated categories
    const data1 = data?.revenue?.map((item) =>Math.floor(item));
    const month = data?.months;
    const options = {
      xaxis: {
        show: true,
        categories: month,
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
          },
        },
        axisBorder: {
          show: true,
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
          // formatter: function (value) {
          //   return value + " k";
          // },
        },
      },
      series: [
        {
          name: "selling details this month",
          data: data1,
          color: "#000088",
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
        enabled: true, // Disable default tooltip
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0.2,
          shade: "#000088",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 3, // Set the desired width in pixels
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
    <div className="w-full ">
      <div id="labels-chart"></div>
    </div>
  );
};

export default LineChart;
