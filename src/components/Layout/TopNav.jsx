import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { openSidebar } from "../../Redux/Features/NavbarSlice";
import { useDispatch } from "react-redux";
import wavFile from "../../assets/short-success-sound-glockenspiel-treasure-video-game-6346.mp3";
import { onMessageListener, requestForToken } from "../firebace/Firebaseconfig";
import { toast } from "react-toastify";

const TopNav = () => {
  const user = JSON.parse(localStorage.getItem("encryptedToken"));
  const dispatch = useDispatch();
  // const [notificationnew, setNotificationnew] = useState([]);
  const [notificationnew, setNotificationnew] = useState([
    {
      notification: {
        title: "Dummy Notification 1",
        body: "This is a dummy notification body 1",
      },
    },
    {
      notification: {
        title: "Dummy Notification 2",
        body: "This is a dummy notification body 2",
      },
    },
    {
      notification: {
        title: "Dummy Notification 3",
        body: "This is a dummy notification body 3",
      },
    },
  ]);

  const [audio] = useState(new Audio(wavFile));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    console.log(user);
    requestForToken();
  }, []);

  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        console.log(
          payload,
          "its coming ????))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))"
        );

        audio.play().catch((err) => {
          console.log(err);
        });

        setNotificationnew(payload);

        // setNotificationnew((prevNotifications) => [
        //   ...prevNotifications,
        //   payload,
        // ]);

        toast((t) => (
          <div
            className={`${t.isVisible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {payload?.notification?.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {payload?.notification?.body}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div> */}
          </div>
        ));
      })
      .catch((err) => console.log("failed: ", err));
  }, [notificationnew]);

  // Close dropdown on clicking outside or on the notification button
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, buttonRef]);

  return (
    <>
      <nav className="top-0 z-50 w-full pt-3 pb-1 bg-[rgba(244,245,250,1)]">
        <div class="flex flex-wrap justify-between items-center px-4 lg:px-6 w-full">
          <div className="lg:hidden">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm  rounded-lg sm:hidden hover:bg-gray-100  focus:ring-2 focus:ring-gray-200 dark:text-gray-400  "
              onClick={() => {
                dispatch(openSidebar());
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
          </div>
          <div class="flex-1 flex justify-end"></div>

          <div className="flex p-3 relative bg-white rounded-full justify-center items-center mr-6">
            <button
              ref={buttonRef}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="focus:outline-none"
            >
              <svg
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.8469 18.6686H2.15098C1.45191 18.6686 0.882812 18.0998 0.882812 17.4004C0.882812 16.5295 1.2626 15.7057 1.92481 15.1404C2.37645 14.7544 2.63547 14.1927 2.63547 13.599V7.82441C2.63547 3.76418 5.93871 0.460938 9.99894 0.460938C14.0592 0.460938 17.3624 3.76418 17.3624 7.82441V13.5988C17.3624 14.1927 17.6214 14.7547 18.0728 15.1401C18.735 15.7057 19.1148 16.5293 19.1148 17.4002C19.1148 18.0998 18.546 18.6686 17.8469 18.6686ZM9.99894 1.40627C6.46007 1.40627 3.58081 4.28554 3.58081 7.82441V13.5988C3.58081 14.4697 3.20102 15.2935 2.53881 15.8588C2.08717 16.2448 1.82815 16.8065 1.82815 17.4002C1.82815 17.5782 1.97302 17.723 2.15098 17.723H17.8469C18.0249 17.723 18.1695 17.5782 18.1695 17.4002C18.1695 16.8063 17.9105 16.2443 17.4588 15.8588C16.7966 15.2933 16.4171 14.4694 16.4171 13.5988V7.82441C16.4171 4.28554 13.538 1.40627 9.99894 1.40627Z"
                  fill="black"
                />
                <path
                  d="M9.99985 21.7304C8.06143 21.7304 6.48438 20.1534 6.48438 18.2147C6.48438 18.2055 6.48485 18.1899 6.48556 18.1785C6.49454 17.9252 6.70251 17.7227 6.95799 17.7227C7.2189 17.7227 7.43066 17.9344 7.43066 18.1953C7.43066 18.2029 7.43042 18.2149 7.42971 18.2256C7.43538 19.6379 8.58633 20.7851 9.99985 20.7851C11.4129 20.7851 12.5634 19.6389 12.5702 18.2275C12.5697 18.2218 12.5695 18.2156 12.5693 18.2123C12.5601 17.9514 12.764 17.7326 13.0249 17.7231C13.2955 17.7144 13.5047 17.9179 13.5141 18.1788C13.5144 18.1842 13.5156 18.2095 13.5156 18.2149C13.5156 20.1534 11.9385 21.7304 9.99985 21.7304Z"
                  fill="black"
                />
              </svg>
              <span className="bg-notificolor bottom-3 right-2 bo p-1 rounded-full absolute"></span>
            </button>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-80 w-64 bg-white shadow-lg rounded-lg max-h-64 overflow-y-auto z-50"
              >
                <ul>
                  {notificationnew?.length > 0 ? (
                    notificationnew.map((notification, index) => (
                      <li key={index} className="p-4 border-b">
                        <p className="text-sm font-medium text-gray-900">
                          {notification?.notification?.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {notification?.notification?.body}
                        </p>
                      </li>
                    ))
                  ) : (
                    <li className="p-4 text-sm text-gray-500">
                      No notifications
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pl-0 sm:pl-2 bg-none sm:bg-white rounded-full ">
            {/* Example SVG Icon 1 */}

            {/* Example SVG Icon 2 */}

            <div className="hidden sm:flex flex-col  rounded-s-full">
              <div className="flex justify-end">
                <span className="text-lg capitalize font-semibold dark:text-black hidden md:block">
                  {user?.role}
                </span>
              </div>
              <div className="justify-end text-xs dark:text-gray-500 md:block">
                <div className="flex justify-end ml-6">
                  <span className="text-xs dark:text-black hidden md:block">
                    {user?.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-16 rounded-full flex relative">
              <div className="overflow-hidden w-16 h-16 rounded-full">
                <img
                  src={user?.image ? user?.image : "/propic.png"}
                  class="w-16 h-16 rounded-full object-fill"
                  alt="Flowbite Logo"
                />
              </div>
              <span className="bg-onlinecolur absolute p-1.5 rounded-full bottom-1 right-1"></span>
            </div>
          </div>
          {/* <button
        data-collapse-toggle="navbar-dropdown"
        type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-dropdown"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown"></div> */}
        </div>
      </nav>
    </>
  );
};

export default TopNav;
