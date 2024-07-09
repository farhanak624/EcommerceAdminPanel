
import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { verifyOTP, resendOTP } from "../../Api/ApiCall";

const VentorOTP = () => {

    const location = useLocation();
    const email = location.state.email;
    const [otpArray, setOtpArray] = useState(['', '', '', '','','']);
    const inputRefs = useRef([null, null, null, null]);
    const [countdown, setCountdown] = useState(180);

    const navigate = useNavigate()
    useEffect(() => {
        // Check if all OTP digits are entered
        if (otpArray.every(digit => digit !== '')) {
        const otp = otpArray.join('');
        submitHandler(otp);
        }
    }, [otpArray]); // Run this effect whenever the 'otp' state changes

    useEffect(() => {
        let timer;

        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [countdown]);

    // Function to format the countdown time
    const formatCountdown = (countdown) => {
        const minutes = Math.floor(countdown / 60);
        const seconds = countdown % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };

  const handleOtpChange = (e, index) => {
    const newOtp = [...otpArray];
    newOtp[index] = e.target.value;
    setOtpArray(newOtp);

    if (e.target.value && index < 5) {
        setTimeout(() => {
        inputRefs.current[index + 1].focus();
        }, 0);
    }
    };

    const resendOtpHandler = async () => {
        try {
            setOtpArray(['', '', '', '','',''])
            const res = await resendOTP({ email })
            console.log('res in resend: ', res)
            toast.success(res?.data?.message || error.error);
            setCountdown(180); 
        } catch (error) {
            console.log("error resend: ", error);
            toast.error(error?.data?.message || error.error);
        } 
    };


    const submitHandler = async (otp) => {
        try {
        const res = await verifyOTP({ otp, email })
        console.log("res in verifyOTP: ", res)
        if (res.data.message) {
          const responseEmail = res.data.email
          toast.success(res?.data?.message || error.error);
          console.log("responseEmail in verifyOTP: ", responseEmail)
            navigate('/addProfile', { state: { email: responseEmail } });
        } else {
            console.log("error in verifyOTP")
            toast.error(res.error.data.message);
        } 
      } catch (error) {
            console.log("error otp verify: ", error.response.data.message)
            toast.error(error.response.data.message);
      }
  };

  return (
    <div className="w-full h-screen py-24" style={{backgroundImage : `url('/bg.png')`,backgroundSize: 'cover', backgroundPosition : 'center', backgroundColor : "rgba(63, 90, 242, .95)"}}>
      
      {/* Right Section */}
      <div className="w-full md:w-4/12 mx-auto rounded-3xl" style={{backgroundColor : 'rgba(255, 255, 255, 1)'}}>
        {/* OTP fields go here */}
        <div className="pt-16">
        <div className="flex mx-16">
          <svg width="43" height="54" viewBox="0 0 43 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.12213 49.6218C3.26669 49.3327 3.41125 49.1194 3.5522 48.9749L35.2839 5.37091H4.77738C3.84133 5.37091 3.04985 4.57943 3.04985 3.64338C3.04985 2.70733 3.84133 1.91584 4.77738 1.91584H38.2366C38.739 1.77128 39.2449 1.91584 39.675 2.20497C39.8196 2.27725 40.0328 2.42182 40.1774 2.56638C40.6797 3.14102 40.6797 4.07707 40.1774 4.72399L8.15655 48.4725H38.8112C39.7473 48.4725 40.5388 49.1917 40.5388 50.2723C40.5388 51.2084 39.7473 51.9999 38.8112 51.9999H4.63282C4.48825 51.9999 4.27141 51.9276 4.13046 51.9276C3.98589 51.8553 3.84133 51.783 3.70038 51.6385C3.05346 51.2084 2.83661 50.3446 3.12574 49.6218H3.12213Z" fill="#2F4EFF" stroke="#2F4EFF" stroke-width="3" stroke-miterlimit="10"/>
          </svg>
          <svg width="146" height="52" viewBox="0 0 146 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M91.239 15.1473C85.6588 8.23714 78.8969 3.79904 69.5942 5.69644C59.0772 7.83959 53.1248 15.4039 52.5682 26.9473C51.99 38.9352 43.468 49.1089 32.0547 51.4399C20.1571 53.8686 8.26315 47.8114 3.18897 36.7378C-1.82739 25.7908 1.50119 12.556 11.0857 5.34949C18.8596 -0.490878 29.561 -1.39079 38.2673 2.88468C40.1539 3.80989 45.7376 6.41926 44.7112 9.17681C44.5016 9.7406 44.0643 10.1888 43.5872 10.5538C43.1608 10.879 42.6873 11.1537 42.1633 11.2549C40.9056 11.5007 40.2189 10.4598 39.3443 9.75867C38.3974 8.99972 37.3855 8.31665 36.3193 7.73117C34.2665 6.59996 32.0185 5.83016 29.7019 5.47598C24.9747 4.75678 20.121 5.841 16.0479 8.31665C7.86198 13.2933 4.13586 22.9609 6.91148 32.0142C9.60397 40.8037 18.079 47.0163 27.0853 46.8103C36.4097 46.5971 44.6606 39.8857 46.7459 30.677C47.2555 28.4182 47.4471 26.0763 47.6531 23.7633C48.6036 12.9716 54.4186 5.61332 64.2454 1.82937C73.9311 -1.89676 82.9338 0.188571 90.8125 6.99751C93.5339 9.35028 94.8892 11.8115 91.239 15.1473Z" fill="#2F4EFF"/>
          <path d="M119.828 0.210208C134.183 0.20298 145.9 11.8693 145.838 26.1051C145.777 40.3989 134.085 51.8664 119.643 51.7905C105.4 51.7182 94.211 40.5145 94.1062 26.2136C93.9978 11.7102 105.364 0.217437 119.828 0.210208ZM99.2346 25.6642C99.1081 37.2149 108.216 46.6512 119.647 46.8103C130.952 46.9657 140.428 37.5184 140.457 26.069C140.482 14.616 131.046 5.082 119.763 5.16512C108.664 5.24825 99.3575 14.5401 99.2346 25.6642Z" fill="#2F4EFF"/>
          <path d="M91.6015 36.9258C94.4675 40.2182 93.6037 42.5818 90.81 45.1081C80.8821 54.0782 65.4861 54.0385 55.7245 45.0647C52.6416 42.2313 52.2116 39.8243 55.3811 36.9764C66.845 50.2003 77.7921 50.2256 91.6051 36.9258H91.6015Z" fill="#2F4EFF"/>
          </svg>


          </div>
          <div className="flex  my-6 mx-16">
            <p className="text-xl font-medium">Get Verified</p>
          </div>
          <div className="flex justify-center w-11/12">
            <p className="text-md mx-16">Enter 4 digit OTP code that has been sent to your email</p>
        </div>
         
          <div className="flex items-center px-2 w-full">
            <div className="">
            <div className="py-4 px-12 mx-2">
                {countdown > 0 ? (
                <p className="text-xs ">
                    Remaining Time{" "}
                    <span className="text-navblue">
                        {"\u00A0"}{formatCountdown(countdown)}
                    </span>
                </p>
            ) : (
                <p className="text-xs ">Time to enter OTP has expired. Click 'Resend OTP' to get a new one.</p>
            )}
            </div>
           
              <form onSubmit={e => e.preventDefault()} className="px-7">
                <div className="mb-4 pl-6">
                    {[...Array(6)].map((_, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        className="w-12 h-12 rounded-md border border-[#e0e0e0] bg-white text-center text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mx-1"
                        value={otpArray[index] || ''}
                        onChange={(e) => handleOtpChange(e, index)}
                        ref={(input) => inputRefs.current[index] = input}
                    />
                    ))}
                </div>
             </form>
              <div className="flex px-12 mx-2 py-3 pb-10">
                <p className="text-xs">I didn't receive the code</p> &nbsp;
                <p className="text-navblue text-xs cursor-pointer" onClick={resendOtpHandler}>
                  {"  "}
                  Resend OTP
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VentorOTP
