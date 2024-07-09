import React from "react";
import { useNavigate } from "react-router-dom";

function VendorsTable({ data }) {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <table className="w-full text-center mt-4 ">
        <thead
          className=" rounded-lg font-semibold"
          style={{
            backgroundColor: "rgba(242, 242, 242, 1)",
            height: "50px",
          }}
        >
          <tr className="rounded-md">
            <td>Name</td>
            <td>Phone number</td>
            <td>Mail ID</td>
            <td>Total Value</td>
            <td> Return%</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {data?.map((data) => (
            <tr
              style={{
                height: "60px",
              }}
            >
              <td>
                <div className="flex gap-1 items-center">
                  <div className="rounded-full w-10 h-10 bg-slate-200 bg overflow-hidden">
                    <img
                      src={
                        !data?.vendorDetails?.profileImage
                          ? "/propic.png"
                          : data?.vendorDetails?.profileImage
                      }
                      alt=""
                    />
                  </div>
                  {data?.name}
                </div>
              </td>
              <td>{data?.phoneNumber}</td>
              <td>{data?.email}</td>
              <td>
                $
                {data?.sellingDetails?.totalValues !== undefined &&
                  (data.sellingDetails.totalValues % 1 === 0
                    ? data.sellingDetails.totalValues
                    : data.sellingDetails.totalValues.toFixed(2))}
              </td>
              <td>
                {data?.sellingDetails?.sellingCounts !== 0
                  ? ((data?.sellingDetails?.returnCount * 100) /
                      data?.sellingDetails?.sellingCounts) %
                      1 ===
                    0
                    ? (data?.sellingDetails?.returnCount * 100) /
                      data?.sellingDetails?.sellingCounts
                    : (
                        (data?.sellingDetails?.returnCount * 100) /
                        data?.sellingDetails?.sellingCounts
                      ).toFixed(2)
                  : 0}
                %
              </td>
              <td>
                <button
                  className="p-1 py-2 rounded-lg"
                  style={{ backgroundColor: "rgba(242, 242, 242, 1)" }}
                  onClick={() => {
                    navigate(`/admin/vendorsOverview/${data._id}`);
                  }}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VendorsTable;
