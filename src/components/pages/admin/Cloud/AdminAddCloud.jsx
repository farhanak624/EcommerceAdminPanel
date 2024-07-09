import React, { useEffect, useState } from 'react'
import currencySymbolMap from 'currency-symbol-map';
import { addCloudAdmin, editCloudAdmin } from '../../../../Api/ApiCall';
import { useLocation, useNavigate } from 'react-router-dom';
import { uploadImageV2 } from '../../../imageUpload';
import { toast } from "react-toastify";

const AdminAddCloud = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [flickdata, setFlickData] = useState(location.state?.data || null);
  console.log("data:", flickdata)

  const [selectedFile, setSelectedFile] = useState(null);
  const [cloudName, setCloudName] = useState('')
  const [cloudPrice, setCloudPrice] = useState('')
  const [specification, setspecification] = useState(['', '', ''])
  const [storage, setStorage] = useState('')
  const [storageCapacity, setStorageCapacity] = useState('')
  const [image, setImage] = useState('')

  useEffect(() => {
    // Set initial state values if flickdata exists
    if (flickdata) {
      setCloudName(flickdata.cloudName || '');
      setCloudPrice(flickdata.cloudPrice || '');
      setspecification(flickdata.specification || ['', '', '']);
      setImage(flickdata.image || '');
      setStorage(flickdata.cloudStorage.storage || '');
      setStorageCapacity(flickdata.cloudStorage.storageCapacity || '');
    }
  }, [flickdata]);

  const handlespecificationChange = (index, value) => {
    setspecification(prevspecifications => {
      const newspecifications = [...prevspecifications];
      newspecifications[index] = value;
      return newspecifications;
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    // const imageUrl = URL.createObjectURL(file);
    //   setImage(imageUrl);
    if (file) {
      console.log("file: ", file)
      setSelectedFile(file)
      const imageResponse = await uploadImageV2(file);
      console.log("imageResponse: ", imageResponse)
      const imageUrl = imageResponse?.images[0]?.imageUrl;
      console.log("imageUriCloud: ", imageUrl)
      setImage(imageUrl);
    }
  };

  const handleSave = async () => {
    try {
      const MAX_DESCRIPTION_WORDS = 100;

      const isValidDescription = (specification) => {
        if (!specification.trim()) {
          // If description is empty, return false
          return false;
        }
        const words = specification.trim().split(/\s+/);
        return words.length <= MAX_DESCRIPTION_WORDS;
      };

      if (!cloudName || !cloudPrice || !specification.every((field) => isValidDescription(field)) || !storage || !storageCapacity || !image) {
        toast.error("Please fill in all fields with specification containing 100 words or fewer.");
        return;
      }
      let response;
      if (flickdata) {
        response = await editCloudAdmin({
          id: flickdata._id,
          cloudName,
          specification,
          cloudPrice,
          storage,
          storageCapacity,
          image
        });
        if (response.data) {
          toast.success("Cloud edited successfully");
        }
      } else {
        response = await addCloudAdmin({ cloudName, specification, cloudPrice, storage, storageCapacity, image });
        if (response.data) {
          toast.success("Cloud added successfully");
        }
      }

      console.log("response: ", response);

      if (response.data) {
        setCloudName('');
        setCloudPrice('');
        setspecification(['', '', '']);
        setImage('');
        setStorage('');
        setStorageCapacity('');

        // Redirect to desired page after submission
        navigate('/admin/cloud');
      }
    } catch (error) {
      console.log("error in adding/editing cloud: ", error);
      toast.error(error?.response?.data?.message);
    }
  };


  return (
    <>

      <div>
        <h1 className='font-bold'>Add Plan</h1>
        <div className="flex text-sm mt-5 gap-4 flex-col md:flex-row p-3 bg-containerWhite rounded-lg">
          <div className="w-full md:w-[50%]">
            <div className=" p-3 rounded-md">
              <p className="mt-4 mb-1">Plan Name</p>
              <input
                type="text"
                className="bg-bodycolur  w-full p-1 outline-none border border-gray-200 rounded-md shadow-sm"
                placeholder="Enter Plan name"
                name=""
                id=""
                value={cloudName}
                onChange={(e) => { setCloudName(e.target.value) }}
              />


              <p className="mt-5 mb-1">Specification</p>
              <input
                type="text"
                className="bg-bodycolur  w-full p-1 outline-none border border-gray-200 rounded-md shadow-sm"
                placeholder="Enter Plan Specification"
                name=""
                id=""
                value={specification[0]}
                onChange={(e) => handlespecificationChange(0, e.target.value)}
              />
              <input
                type="text"
                className="bg-bodycolur  mt-10 w-full p-1 outline-none border border-gray-200 rounded-md shadow-sm"
                placeholder="Enter Plan Specification"
                name=""
                id=""
                value={specification[1]}
                onChange={(e) => handlespecificationChange(1, e.target.value)}
              />
              <input
                type="text"
                className="bg-bodycolur  mt-10 w-full p-1 outline-none border border-gray-200 rounded-md shadow-sm"
                placeholder="Enter Plan Specification"
                name=""
                id=""
                value={specification[2]}
                onChange={(e) => handlespecificationChange(2, e.target.value)}
              />
            </div>
          </div>

          <div className="w-full notfi md:w-[50%]">
            <div className=" p-3 rounded-md">
              <p className="mt-4 mb-1">Prize</p>
              <input
                type="number"
                className="bg-bodycolur w-full p-1 outline-none border border-gray-200 rounded-md shadow-sm"
                placeholder="Enter Plan Prize"
                name=""
                id=""
                value={cloudPrice}
                onChange={(e) => { setCloudPrice(e.target.value) }}
              />
              <p className="mt-5 mb-1">Storage</p>
              <input
                type="text"
                className="bg-bodycolur w-full p-1 outline-none border border-gray-200 rounded-md shadow-sm"
                placeholder="Plan Storage"
                name=""
                id=""
                value={storage}
                onChange={(e) => { setStorage(e.target.value) }}
              />
              <p className="mt-5 mb-1">Storage Capacity</p>
              <input
                type="number"
                className="bg-bodycolur w-full p-1 outline-none border border-gray-200 rounded-md shadow-sm"
                placeholder="Plan Storage Capacity"
                name=""
                id=""
                value={storageCapacity}
                onChange={(e) => { setStorageCapacity(e.target.value) }}
              />

              <p className="mt-4 mb-1">Image</p>
              <div className="relative">
                <input
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  name=""
                  accept="image/*"
                  id="file-input"
                  type="file"
                  onChange={handleFileChange}
                />
                <input
                  className="bg-bodycolur w-full p-1 outline-none border border-gray-200 rounded-md shadow-sm pr-10 relative z-10"
                  placeholder={selectedFile ? selectedFile.name : image ? image : "Upload Plan Image"}
                  readOnly
                />
                <label
                  htmlFor="file-input"
                  className="absolute inset-y-0 right-0 flex items-center p-3 mt-1 mb-1 mr-1 text-gray-400 cursor-pointer bg-white rounded-md text-xs"
                  style={{ zIndex: 10 }}
                >
                  Upload
                  <svg className='ml-2' width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.31836 0C2.38119 0 0 2.38119 0 5.31836C0 8.25553 2.38119 10.6367 5.31836 10.6367C8.25553 10.6367 10.6367 8.25553 10.6367 5.31836C10.6367 2.38119 8.25553 0 5.31836 0ZM5.31836 10.2276C2.60702 10.2276 0.409105 8.0297 0.409105 5.31836C0.409105 2.60702 2.60702 0.409105 5.31836 0.409105C8.0297 0.409105 10.2276 2.60702 10.2276 5.31836C10.2276 8.0297 8.0297 10.2276 5.31836 10.2276Z" fill="#667085" />
                    <path d="M8.69625 5.11463H5.52569V1.94407C5.52569 1.88762 5.47987 1.8418 5.42342 1.8418H5.21886C5.16241 1.8418 5.11659 1.88762 5.11659 1.94407V5.11463H1.94603C1.88957 5.11463 1.84375 5.16045 1.84375 5.21691V5.42146C1.84375 5.47792 1.88957 5.52374 1.94603 5.52374H5.11659V8.6943C5.11659 8.75055 5.16241 8.79658 5.21886 8.79658H5.42342C5.47987 8.79658 5.52569 8.75055 5.52569 8.6943V5.52374H8.69625C8.75251 5.52374 8.79853 5.47792 8.79853 5.42146V5.21691C8.79853 5.16045 8.75251 5.11463 8.69625 5.11463Z" fill="#667085" />
                  </svg>

                </label>
              </div>




            </div>
          </div>


        </div>
        <div className="flex justify-center bg-containerWhite rounded-lg">
          <button
            onClick={handleSave}
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-8"
          >
            {flickdata ? 'Save' : 'Submit'}
          </button>
        </div>
      </div>


    </>
  );
}

export default AdminAddCloud