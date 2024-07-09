import React, { useEffect, useState } from "react";
import { login } from "../../Api/ApiCall";
import { useNavigate } from "react-router-dom";
import { loginValidateEmail, loginValidatePassword } from "../validation";
import { toast } from "react-toastify";
import Loading from "../LodingDiv/Loading";
import { logo } from "../../../public/Assets/assets";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("encryptedToken"));

  //   useEffect(() => {
  //     if (userInfo) {
  //         navigate('/')
  //     }
  // }, [navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const emailValidationResult = loginValidateEmail(email);
    setEmailError(emailValidationResult);

    // Validate Password
    const passwordValidationResult = loginValidatePassword(password);
    setPasswordError(passwordValidationResult);

    if (!emailValidationResult && !passwordValidationResult) {
      try {
        const res = await login({ email, password });
        console.log("responseLogin:", res);
        if (res.status === 201) {
          console.log("otp not verified");
          toast.info(res.data.message);
          const emailOtp = email;
          setIsLoading(false);
          navigate("/verifyOTP", { state: { email: emailOtp } });
        } else if (res.status === 203) {
          toast.info(res.data.message);
          const emailProfile = email;
          setIsLoading(false);
          navigate("/addProfile", { state: { email: emailProfile } });
        }
        if (res.data.role) {
          setIsLoading(false);
          localStorage.setItem("encryptedToken", JSON.stringify(res.data));
          localStorage.setItem("token", res?.data?.encryptedToken);
          // localStorage.setItem("role", res.data.role); // Add role to localStorage
          if (res.data.role === "vendor") {
            navigate("/");
          } else if (res.data.role === "admin") {
            navigate("/admin");
          }
        } else {
          console.log("error");
          setIsLoading(false);
          toast.error(res.error.data.message);
        }
      } catch (err) {
        console.log("error login catch: ", err);
        setIsLoading(false);
        if (err?.message === "Network Error") {
          toast("Check your connection");
        }
        // toast.error('User Not Found');
        toast.error(err.response.data.message);
        if (err.response.status === 403) {
          navigate("/processing");
        } else if (err.response.status === 401) {
          setIsLoading(false);
          navigate("/blocked");
        }
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative w-[100%] h-screen justify-center p-5 items-center flex"
      style={{ backgroundColor: "#4660F5" }}
    >
      {isLoading && <Loading />}
      <div className="absolute top-0 left-[20%] w-[60%] h-[20vh]">
        <svg
          className="h-[300px] md:h-[700px] w-full"
          viewBox="0 0 1753 1763"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M359.759 1597.07C547.538 1597.07 699.764 1444.85 699.764 1257.07C699.764 1156.68 457.508 1239.91 388.323 1177.67C328.093 1123.49 447.152 917.063 359.759 917.063C171.979 917.063 19.7539 1069.29 19.7539 1257.07C19.7539 1444.85 171.979 1597.07 359.759 1597.07Z"
            fill="#3F5AF2"
          />
          <path
            opacity="0.8"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M809.528 389.835C771.565 605.136 915.325 810.446 1130.63 848.409C1245.72 868.704 1199.28 574.118 1284.62 507.377C1358.92 449.274 1571.53 627.514 1589.2 527.312C1627.16 312.012 1483.4 106.702 1268.1 68.7386C1052.8 30.7753 847.491 174.535 809.528 389.835Z"
            fill="#3F5AF2"
          />
          <path
            opacity="0.6"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M319.501 370.818C143.046 435.043 52.0651 630.152 116.29 806.607C150.624 900.939 349.804 739.875 436.103 774.697C511.233 805.013 469.955 1039.71 552.078 1009.82C728.533 945.594 819.514 750.485 755.29 574.03C691.065 397.575 495.956 306.594 319.501 370.818Z"
            fill="#3F5AF2"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1677.14 1332.64C1719.04 1095.02 1560.37 868.433 1322.76 826.535C1195.73 804.136 1246.99 1129.26 1152.8 1202.91C1070.8 1267.04 836.155 1070.33 816.656 1180.91C774.758 1418.53 933.418 1645.12 1171.03 1687.02C1408.65 1728.91 1635.24 1570.25 1677.14 1332.64Z"
            fill="#3F5AF2"
          />
        </svg>
      </div>
      {/* Left Section */}
      {/* <div
        className="w-[50%] h-full hidden md:block "
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(48, 100, 200, 1), rgba(96, 126, 183, 1))",
        }}
      >
        <div className="flex items-center justify-center p-10">
          <div className="items-center text-center">
            <h2 className="text-3xl text-white font-semibold ">
              Welcome To Our Platform!
            </h2>
            <div className="h-32"></div>
            <div className="p-5">
              <img src="/Group2.png" className="w-80 h-auto" alt="" srcSet="" />
            </div>
          </div>
        </div>
        {/* <div>
          <p className=" top-7">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
            blanditiis inventore, similique saepe deleniti perferendis, et
            temporibus incidunt distinctio maiores ducimus repellendus ipsa
            obcaecati molestiae. Dolore deserunt nihil nesciunt aperiam.
          </p>
        </div> */}
      {/* </div> */}
      {/* Right Section */}
      <div className=" flex z-20 justify-center p-5 max-w-[400px] rounded-3xl items-center bg-containerWhite ">
        {/* Sign up fields go here */}
        <div className="w-96">
          <div className="flex justify-start ">
            <img src={logo} className="w-36 p-1" alt="" />
          </div>
          <div className="flex justify-start mb-4">
            <p className="text-md font-medium p-1">Signin To Your Account</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full p-2">
              <form onSubmit={submitHandler}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#07074D]"
                  >
                    Username
                  </label>
                  <input
                    type="email"
                    name="name"
                    id="name"
                    placeholder="Username or Email"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  {emailError && <p className="text-red-500">{emailError}</p>}
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className=" block text-sm font-medium text-[#07074D]"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  {passwordError && (
                    <p className="text-red-500">{passwordError}</p>
                  )}
                </div>

                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2"></div>
                </div>

                <div className="pt-2">
                  <button className="flex gap-6 justify-center items-center hover:shadow-form w-full rounded-md bg-navblue py-2 px-20 text-center text-base font-thin text-white outline-none">
                    Login
                  </button>
                </div>
              </form>
              <div className="flex justify-center mt-5">
                <p className="text-xs">New to this website</p> &nbsp;
                <a className="text-navblue text-xs" href="/signup">
                  Register
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Login;
