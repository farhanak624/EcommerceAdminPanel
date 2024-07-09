import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import "react-datepicker/dist/react-datepicker.css";

const ChartComponent = ({total, minMonth, minValue, maxMonth, maxValue, data}) => {

  useEffect(() => {
    const categories = []; // Updated categories
    data?.forEach(element => {
      categories[parseInt(element._id) -1] = element.month.slice(0,3)
    });
   const newArray =  categories.filter(x => x !== undefined)
    console.log(categories,categories[1],newArray,'dddddddddddddddddddd')
    
    const seriesData = data?.map((value, index) => {
      return {
        x: newArray.indexOf(value.month.slice(0,3)) +1, // Start index from 1 instead of 0
        y: value.totalOrders,
        name: value.month.slice(0,3)
      };
    });

    
   
    const options = {
      xaxis: {
        show: true,
        categories: newArray,
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
        show: false,
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
          name: "selling details this month",
          data: seriesData,
          color: "rgba(16, 200, 0, 0.6)",
        },
      ],
      annotations: {
        points: [
          {
            x: newArray.indexOf(maxMonth?.slice(0,3)) + 1, // Adjust index to start from 1
            y: maxValue,
           
            marker: {
              size: 5, // Adjust the size of the marker
              fillColor: "rgba(16, 200, 0, 1)",
              strokeColor: "white", // Set the color of the marker's border
              strokeWidth: 1, // Adjust the stroke width of the marker's border
              shadow: {
                enabled: true, // Enable shadow for the marker
                left: 2, // Adjust shadow offset from the left
                top: 2, // Adjust shadow offset from the top
                blur: 5, // Adjust shadow blur radius
                opacity: 0.5, // Adjust shadow opacity
              },
            },
          },
          {
            x: newArray.indexOf(minMonth?.slice(0,3)) + 1, // Adjust index to start from 1
            y: minValue,
            marker: {
              size: 5, // Adjust the size of the marker
              fillColor: "rgba(219, 48, 34, 1)",
              strokeColor: "white", // Set the color of the marker's border
              strokeWidth: 1, // Adjust the stroke width of the marker's border
              shadow: {
                enabled: true, // Enable shadow for the marker
                left: 2, // Adjust shadow offset from the left
                top: 2, // Adjust shadow offset from the top
                blur: 1, // Adjust shadow blur radius
                opacity: 1, // Adjust shadow opacity
              },
            },
          },
        ],
      },
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
          shade: "rgba(16, 200, 0, 0.5)",
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        width: 3, // Set the desired width in pixels
      },
      legend: {
        show: false,
      },
      grid: {
        show: true,
        strokeDashArray: 3,
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
  }, [minMonth]);

  return (
    <div className="w-full flex gap-2 h-[90%]">
      <div className=" w-[45%]">
        <h1>Total Orders</h1>
        <div className="flex gap-3 mt-8">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="64"
              height="64"
              rx="7"
              fill="#FFC700"
              fill-opacity="0.08"
            />
            <g opacity="0.6">
              <path
                d="M16.5 43.6465H45.3742V44.9415H16.5V43.6465Z"
                stroke="#FFC700"
              />
              <path
                d="M44.2461 42.7678V42.7654L45.8097 43.5434L47.2988 44.2844C46.9425 44.4617 46.5134 44.6752 46.0742 44.8938C45.4177 45.2206 44.7385 45.5586 44.2461 45.8035V45.8016V45.7957V45.7897V45.7837V45.7777V45.7717V45.7656V45.7596V45.7535V45.7474V45.7413V45.7352V45.7291V45.723V45.7168V45.7106V45.7045V45.6983V45.692V45.6858V45.6796V45.6733V45.667V45.6608V45.6545V45.6481V45.6418V45.6355V45.6291V45.6228V45.6164V45.61V45.6036V45.5972V45.5907V45.5843V45.5778V45.5713V45.5648V45.5583V45.5518V45.5453V45.5388V45.5322V45.5257V45.5191V45.5125V45.5059V45.4993V45.4927V45.486V45.4794V45.4727V45.466V45.4594V45.4527V45.4459V45.4392V45.4325V45.4258V45.419V45.4122V45.4055V45.3987V45.3919V45.3851V45.3782V45.3714V45.3646V45.3577V45.3509V45.344V45.3371V45.3302V45.3233V45.3164V45.3095V45.3025V45.2956V45.2886V45.2817V45.2747V45.2677V45.2607V45.2537V45.2467V45.2397V45.2326V45.2256V45.2185V45.2115V45.2044V45.1973V45.1902V45.1831V45.176V45.1689V45.1618V45.1547V45.1475V45.1404V45.1332V45.1261V45.1189V45.1117V45.1045V45.0973V45.0901V45.0829V45.0757V45.0684V45.0612V45.054V45.0467V45.0395V45.0322V45.0249V45.0176V45.0103V45.0031V44.9957V44.9884V44.9811V44.9738V44.9665V44.9591V44.9518V44.9444V44.9371V44.9297V44.9224V44.915V44.9076V44.9002V44.8928V44.8854V44.878V44.8706V44.8632V44.8558V44.8484V44.8409V44.8335V44.8261V44.8186V44.8112V44.8037V44.7962V44.7888V44.7813V44.7738V44.7663V44.7588V44.7514V44.7439V44.7364V44.7289V44.7214V44.7138V44.7063V44.6988V44.6913V44.6837V44.6762V44.6687V44.6611V44.6536V44.646V44.6385V44.6309V44.6234V44.6158V44.6083V44.6007V44.5931V44.5855V44.578V44.5704V44.5628V44.5552V44.5476V44.5401V44.5325V44.5249V44.5173V44.5097V44.5021V44.4945V44.4869V44.4793V44.4716V44.464V44.4564V44.4488V44.4412V44.4336V44.426V44.4183V44.4107V44.4031V44.3955V44.3879V44.3802V44.3726V44.365V44.3573V44.3497V44.3421V44.3345V44.3268V44.3192V44.3116V44.3039V44.2963V44.2887V44.281V44.2734V44.2658V44.2581V44.2505V44.2429V44.2353V44.2276V44.22V44.2124V44.2047V44.1971V44.1895V44.1819V44.1742V44.1666V44.159V44.1514V44.1437V44.1361V44.1285V44.1209V44.1133V44.1057V44.0981V44.0904V44.0828V44.0752V44.0676V44.06V44.0524V44.0448V44.0372V44.0297V44.0221V44.0145V44.0069V43.9993V43.9917V43.9842V43.9766V43.969V43.9614V43.9539V43.9463V43.9388V43.9312V43.9237V43.9161V43.9086V43.901V43.8935V43.8859V43.8784V43.8709V43.8634V43.8559V43.8483V43.8408V43.8333V43.8258V43.8183V43.8108V43.8034V43.7959V43.7884V43.7809V43.7735V43.766V43.7585V43.7511V43.7436V43.7362V43.7287V43.7213V43.7139V43.7065V43.6991V43.6916V43.6842V43.6768V43.6694V43.6621V43.6547V43.6473V43.6399V43.6326V43.6252V43.6179V43.6105V43.6032V43.5959V43.5885V43.5812V43.5739V43.5666V43.5593V43.552V43.5447V43.5375V43.5302V43.5229V43.5157V43.5084V43.5012V43.494V43.4868V43.4795V43.4723V43.4651V43.4579V43.4508V43.4436V43.4364V43.4293V43.4221V43.415V43.4078V43.4007V43.3936V43.3865V43.3794V43.3723V43.3652V43.3582V43.3511V43.344V43.337V43.33V43.3229V43.3159V43.3089V43.3019V43.2949V43.288V43.281V43.274V43.2671V43.2602V43.2532V43.2463V43.2394V43.2325V43.2256V43.2187V43.2119V43.205V43.1982V43.1913V43.1845V43.1777V43.1709V43.1641V43.1573V43.1506V43.1438V43.1371V43.1303V43.1236V43.1169V43.1102V43.1035V43.0969V43.0902V43.0835V43.0769V43.0703V43.0637V43.0571V43.0505V43.0439V43.0373V43.0308V43.0242V43.0177V43.0112V43.0047V42.9982V42.9917V42.9853V42.9788V42.9724V42.966V42.9595V42.9531V42.9468V42.9404V42.934V42.9277V42.9214V42.915V42.9087V42.9025V42.8962V42.8899V42.8837V42.8775V42.8712V42.865V42.8588V42.8527V42.8465V42.8404V42.8342V42.8281V42.822V42.8159V42.8099V42.8038V42.7978V42.7918V42.7858V42.7798V42.7738V42.7678Z"
                stroke="#FFC700"
              />
              <path
                d="M19.4453 23.0329C19.4453 22.8606 19.5866 22.7168 19.7649 22.7168H22.2246C22.4029 22.7168 22.5442 22.8606 22.5442 23.0329V41.7151C22.5442 41.8872 22.4028 42.0312 22.2246 42.0312H19.7649C19.5868 42.0312 19.4453 41.8872 19.4453 41.7151V23.0329Z"
                stroke="#FFC700"
              />
              <path
                d="M38.0586 27.9603C38.0586 27.7884 38.1998 27.6445 38.3782 27.6445H40.8379C41.0163 27.6445 41.1575 27.7884 41.1575 27.9603V41.7129C41.1575 41.8851 41.016 42.029 40.8379 42.029H38.3782C38.2001 42.029 38.0586 41.885 38.0586 41.7129V27.9603Z"
                stroke="#FFC700"
              />
              <path
                d="M31.8633 25.5837C31.8633 25.4117 32.0046 25.2676 32.1833 25.2676H34.6425C34.8212 25.2676 34.9625 25.4117 34.9625 25.5837V41.716C34.9625 41.888 34.8212 42.0321 34.6425 42.0321H32.1833C32.0046 42.0321 31.8633 41.888 31.8633 41.716V25.5837Z"
                stroke="#FFC700"
              />
              <path
                d="M25.6562 18.4157C25.6562 18.2436 25.7977 18.0996 25.9759 18.0996H28.4355C28.614 18.0996 28.7555 18.2439 28.7555 18.4157V41.716C28.7555 41.8879 28.614 42.0321 28.4355 42.0321H25.9759C25.7977 42.0321 25.6562 41.8882 25.6562 41.716V18.4157Z"
                stroke="#FFC700"
              />
            </g>
          </svg>
          <div>
            <p className="font-bold text-xl">{total}</p>
            <p
              className="flex items-center"
              style={{ color: "rgba(16, 200, 0, 1)" }}
            >
              <p className="mb-1">{"\u2191"}</p> 12 %
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          {/* salecolor */}
          <div className="mt-3">
            <p className="text-xs text-gray-700 py-2"> Best sale month</p>
            <div
              className="crad text-xs text-gray-900 p-1 rounded-lg pl-4"
              style={{ backgroundColor: "rgba(16, 200, 0, 0.1)" }}
            >
              <p> {maxMonth}</p>
              <p className="text-green-600 mt-1">{maxValue} Orders</p>
            </div>
          </div>
          {/* frist end */}
          <div className="mt-3">
            <p className="text-xs text-gray-700 py-2"> Least sale month</p>
            <div
              className="crad text-xs text-gray-900 p-1 rounded-lg pl-4"
              style={{ backgroundColor: "rgba(219, 48, 34, 0.1)" }}
            >
              <p> {minMonth}</p>
              <p className="text-red-600 mt-1">{minValue} Orders</p>
            </div>
          </div>
          {/* salecolor */}
        </div>
      </div>
      <div id="labels-chart" className="px-2.5 w-full"></div>
    </div>
  );
};

export default ChartComponent;
