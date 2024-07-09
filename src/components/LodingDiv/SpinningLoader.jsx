import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  ClipLoader,
  HashLoader,
  ClimbingBoxLoader,
  BarLoader,
  PuffLoader,
} from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "yellow",
};
const SpinningLoader = () => {
  const [color, setColor] = useState("#2f4eff");
  const spinnerLoader = useSelector((state) => state.navbar.spinnerLoader);
  if (!spinnerLoader) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {spinnerLoader ? (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <PuffLoader
            color={color}
            loading={spinnerLoader}
            cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SpinningLoader;
