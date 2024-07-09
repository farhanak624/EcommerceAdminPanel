import { useEffect, useRef, useState } from "react";
import { uploadImageV2 } from "../../imageUpload";
import Loading from "../../LodingDiv/LoaderSmall";

function Idaddmodal({
  modalHide,
  setFrontPageImage,
  frontPageImage,
  setBackPageImage,
  backPageImage,
}) {
  const fileInputRefFront = useRef(null);
  const fileInputRefBack = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loadingBack, setLoadingBack] = useState(false);
  const handleButtonClickFront = () => {
    fileInputRefFront.current.click();
  };

  const handleButtonClickBack = () => {
    fileInputRefBack.current.click();
  };

  const handleFileChangeFront = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      // const imageUrl = URL.createObjectURL(file);
      // const imageResponse = await uploadImageV2(file);
      // const imageUrl = imageResponse?.[0]?.imageUrl;
      // const imageUrl = imageResponse?.images[0]?.imageUrl;
      // console.log("imageUrlFront: ", imageUrl)
      setFrontPageImage(file);
      setLoading(false);
    }
  };

  const handleFileChangeBack = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoadingBack(true);
      // const imageUrl = URL.createObjectURL(file);
      // const imageResponse = await uploadImageV2(file);
      // const imageUrl = imageResponse?.images[0]?.imageUrl;
      // const imageUrl = imageResponse?.[0]?.imageUrl;

      // console.log("imageUrlBack: ", imageUrl)
      setBackPageImage(file);
      setLoadingBack(false);
    }
  };

  return (
    <div>
      <div
        className="w-full p-4 -mt-3 h-full absolute z-40 flex justify-center items-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.307)" }}
      >
        <div className="bg-containerWhite p-4 sm:p-8 rounded-lg text-center">
          <h1 className="font-bold text-xl">Upload id</h1>
          <div className="flex gap-4 sm:gap-16 mt-8">
            <div>
              <div className="border-2 border-dashed p-6 sm:p-10 rounded-lg">
                <p className="text-xs">Add front page</p>
                <div className="flex items-center justify-center mt-4">
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInputRefFront}
                    onChange={handleFileChangeFront}
                  />
                  {frontPageImage ? (
                    <img
                      src={URL.createObjectURL(frontPageImage)}
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                  ) : (
                    <img src="/uploadArrow.png" className="w-14" alt="" />
                  )}
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleButtonClickFront}
                  className="w-[100px] bg-navblue text-white p-1 rounded-lg"
                >
                  Upload
                </button>
              </div>
            </div>
            <div>
              <div className="border-2 border-dashed p-6 sm:p-10 rounded-lg">
                <p className="text-xs">Add back page</p>
                <div className="flex items-center justify-center mt-4">
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInputRefBack}
                    onChange={handleFileChangeBack}
                  />
                  {backPageImage ? (
                    <img
                      src={URL.createObjectURL(backPageImage)}
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                  ) : (
                    <img src="/uploadArrow.png" className="w-14" alt="" />
                  )}
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleButtonClickBack}
                  className="w-[100px] bg-navblue text-white p-1 rounded-lg"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-10">
            <button
              onClick={() => modalHide(false)}
              className="w-[150px] bg-navblue text-white p-1 rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Idaddmodal;
