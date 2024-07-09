import React, { useEffect, useState } from "react";
import Prossessingbar from "./Prossessingbar";
import {
  StripeValidation,
  paypalValidationfor,
  paypalValidationforBanner,
  stripeValidationForBanner,
} from "../../../Api/ApiCall";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function PaymentSccessPage() {
  const [persentege, setPersentege] = useState(50);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get("session_id");
  const cloudId = searchParams.get("cloudId");
  const payerId = searchParams.get("PayerID");
  const paymentId = searchParams.get("paymentId");
  const requstId = searchParams.get("requestId");
  const payAmount = searchParams.get("payAmount");
  useEffect(() => {
    setPersentege(50);
    if (cloudId && paymentId) {
      const validationData = {
        payerId: payerId,
        paymentId: paymentId,
        payAmount: "",
        cloudId: cloudId,
      };

      paypalValidationfor(validationData)
        .then((data) => {
          console.log(data);
          toast("new cloud purchased successfully");
          navigate("/cloud");
          setPersentege(100);
          setisLoading(false);
        })
        .catch((err) => {
          toast("something wrong");
          console.log(err);
          setisLoading(false);
        });
    } else if (requstId && paymentId) {
      const validationData = {
        payerId: payerId,
        paymentId: paymentId,
        requestId: requstId,
      };

      paypalValidationforBanner(validationData)
        .then((data) => {
          console.log(data);
          toast("your banner added successfully ");
          setPersentege(100);
          navigate("/slider");
          setisLoading(false);
        })
        .catch((err) => console.log(err));
    } else if (sessionId) {
      if (cloudId !== "undefined") {
        console.log(cloudId, "}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}]]");

        const validationData = {
          session_id: sessionId,
          cloudId: cloudId,
        };
        StripeValidation(validationData)
          .then((data) => {
            console.log(data);
            setPersentege(100);
            toast("new cloud purchased successfully");
            navigate("/cloud");
            setisLoading(false);
          })
          .catch((err) => console.log(err));
      } else {
        const validationData = {
          sessionId: sessionId,
          requestId: requstId,
        };
        stripeValidationForBanner(validationData)
          .then((data) => {
            console.log(data);
            setPersentege(100);
            toast("your banner added successfully");
            navigate("/slider");
            setisLoading(false);
          })
          .catch((err) => {
            setisLoading(false);
            console.log(err);
          });
      }
    }
  }, []);
  return (
    <div className="flex relative h-[80vh] justify-center p-6 w-full">
      <div className="bg-containerWhite absolute top-[20%] h-[65vh] flex justify-center w-full gap-14 shadow-md p-14 rounded-lg">
        <div className="flex items-center justify-center gap-4">
          <div className="">
            <h1 className="font-bold">Payment successful</h1>
            <p className="text-xs">thank you for choosing new cloud storage</p>
            <Prossessingbar percentage={persentege} />
            <div className="flex justify-end mt-10">
              <button
                onClick={() => {}}
                className="px-3 mt-10 flex gap-5 justify-center items-center
                 border-blue-500 border-2 text-blue-600 rounded-lg"
              >
                Go to home
                {isLoading && <img src="/loading.gif" className="w-6" />}
              </button>
            </div>
          </div>
        </div>
        <div className="sm:block hidden flex items-center">
          <img src="/Celebration-amico.png" className="h-full" alt="" />
        </div>
      </div>
    </div>
  );
}

export default PaymentSccessPage;
