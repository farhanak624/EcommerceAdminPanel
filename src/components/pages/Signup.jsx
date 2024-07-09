import { useState } from "react";
import { signup } from "../../Api/ApiCall";
import { useNavigate } from "react-router-dom";
import { validateFirstName, validateLastName, validateEmail, validatePhoneNumber, validatePassword, validateConfirmPassword } from '../validation'
import { toast } from "react-toastify";
import Loading from "../LodingDiv/LoaderSmall";
import { logo } from "../../../public/Assets/assets";

// import Loading from "../LodingDiv/Loading";

const Signup = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setlastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigate = useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const firstNameValidationResult = validateFirstName(firstName);
    setFirstNameError(firstNameValidationResult);

    const lastNameValidationResult = validateLastName(lastName);
    setlastNameError(lastNameValidationResult);

    const emailValidationResult = validateEmail(email);
    setEmailError(emailValidationResult);

    const phoneNumberValidationResult = validatePhoneNumber(phoneNumber);
    setPhoneNumberError(phoneNumberValidationResult);

    const passwordValidationResult = validatePassword(password);
    setPasswordError(passwordValidationResult);

    const confirmPasswordValidationResult = validateConfirmPassword(password, confirmPassword);
    setConfirmPasswordError(confirmPasswordValidationResult);

    if (
      !firstNameValidationResult &&
      !lastNameValidationResult &&
      !emailValidationResult &&
      !phoneNumberValidationResult &&
      !passwordValidationResult &&
      !confirmPasswordValidationResult
    ) {
      try {
        const res = await signup({ firstName, lastName, email, phoneNumber, password })
        console.log('responseSignup:', res)
        if (res.data.message) {
          const responseEmail = res.data.email
          setIsLoading(false);
          navigate('/verifyOTP', { state: { email: responseEmail } });
        } else {
          console.log("error")
          setIsLoading(false);
          toast.error(res.error.data.message);
        }
      } catch (err) {
        console.log(err)
        //toast.error('Register Failed'); 
        setIsLoading(false);
        toast.error(err?.response?.data?.message || err.error);
      }
    } else{
      setIsLoading(false);
    }
  };

  return (
    /* Group 1000006508 */
    <div className="w-full h-screen md:h-auto py-auto md:py-24" style={{ backgroundImage: `url('/bg.png')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: "rgba(63, 90, 242, .95)" }}>
      {/* Right Section */}
      <div className="w-full md:w-5/12 mx-auto rounded-3xl px-8 md:px-0" style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}>
        {/* Sign up fields go here */}
        <div className="pt-16">
          <div className="flex mx-3 md:mx-16">
          <img src={logo}  alt="" />


          </div>
          <div className="flex mx-3 my-6 md:mx-16">
            <p className="text-xl font-medium">Sign Up To Your Account</p>
          </div>
          <div className="flex items-center justify-center ml-2 w-full">
            <div className="">
              <form onSubmit={submitHandler}>
                <div className="">
                  <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm pb-2 font-medium text-[#07074D]"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          name="area"
                          id="area"
                          placeholder="Enter First name"
                          style={{ border: 'solid rgba(213, 213, 213, 1) .69px', backgroundColor: 'rgba(246, 246, 246, 1)' }}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-1.5 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          value={firstName} onChange={(e) => { setFirstName(e.target.value) }}
                        />
                        {firstNameError && <p className='text-red-500'>{firstNameError}</p>}
                      </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium pb-2 text-[#07074D]"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          placeholder="Enter last name"
                          style={{ border: 'solid rgba(213, 213, 213, 1) .69px', backgroundColor: 'rgba(246, 246, 246, 1)' }}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-1.5 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          value={lastName}
                          onChange={(e) => { setLastName(e.target.value) }}
                        />
                        {lastNameError && <p className='text-red-500'>{lastNameError}</p>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#07074D] pb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="name"
                    id="name"
                    style={{ border: 'solid rgba(213, 213, 213, 1) .69px', backgroundColor: 'rgba(246, 246, 246, 1)' }}
                    placeholder="Enter email"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-1.5 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                  />
                  {emailError && <p className='text-red-500'>{emailError}</p>}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-[#07074D] pb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    style={{ border: 'solid rgba(213, 213, 213, 1) .69px', backgroundColor: 'rgba(246, 246, 246, 1)' }}
                    placeholder="Enter phone number"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-1.5 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={phoneNumber}
                    onChange={(e) => { setPhoneNumber(e.target.value) }}
                  />
                  {phoneNumberError && <p className='text-red-500'>{phoneNumberError}</p>}
                </div>
                <div className="mb-3 w-full">
                  <label
                    htmlFor="email"
                    className=" block text-sm font-medium pb-2 text-[#07074D]"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    style={{ border: 'solid rgba(213, 213, 213, 1) .69px', backgroundColor: 'rgba(246, 246, 246, 1)' }}
                    placeholder="Enter password"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-1.5 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                  />
                  {passwordError && <p className='text-red-500'>{passwordError}</p>}
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="email"
                    className=" block text-sm font-medium text-[#07074D] pb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="confirmPassword"
                    placeholder="Enter password to confirm"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-1.5 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={confirmPassword}
                    style={{ border: 'solid rgba(213, 213, 213, 1) .69px', backgroundColor: 'rgba(246, 246, 246, 1)' }}
                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                  />
                  {confirmPasswordError && <p className='text-red-500'>{confirmPasswordError}</p>}
                </div>
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2"></div>
                </div>

                <div className="pt-8 w-full flex justify-center">
                  <button className="hover:shadow-form  w-3/4 rounded-md bg-navblue py-2 px-8 text-center text-base font-thin text-white outline-none">
                    {isLoading ? (
                      <Loading />
                    ) : (
                      'SIGN UP'
                    )}
                  </button> 
                </div>
              </form>
              <div className="flex justify-center py-6">
                <p className="text-xs">Already have an account</p> &nbsp;
                <a className="text-navblue text-xs" href="/login">
                  {"  "}
                  login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
