import { useNavigate } from "react-router-dom";

const ProcessingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-screen"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(48, 100, 200, 1), rgba(96, 126, 183, 1))",
      }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="bg-white rounded-lg p-20 flex flex-col items-center justify-center">
          <img src="/Animation - 1714383147911.gif" alt="Loading GIF" />
          <p className="text-xl font-bold mt-4">Please wait ...</p>
          <p className="text-sm mt-2 text-center text-gray-500">
            Your information will be reflected in a moment, kindly login again after a few minutes
          </p>
          <p
            onClick={() => navigate("/login")}
            className="cursor-pointer hover:text-navblue"
          >
            Back to login
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessingPage;
