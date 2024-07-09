import axios from "axios";

export const uploadImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);
    const response = await axios.post(
      import.meta.env.VITE_REACT_APP_IMAGE_BASEURL,
      // "http://localhost:3000/upload",
      imageFile,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // Assuming the response includes the URL or identifier of the uploaded image
    return response.data;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

export const uploadImageV2 = async (imageFile, onUploadProgress) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);
    const response = await axios.post(
      import.meta.env.VITE_REACT_APP_IMAGE_BASEURL,
      // "http://localhost:3000/upload",

      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      }
    );
    console.log("response in upload image:", response);
    // Assuming the response includes the URL or identifier of the uploaded image
    return response.data;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

export const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  const pad = (num) => {
    return num < 10 ? '0' + num : num;
  };

  return `${pad(hours)}h :${pad(minutes)}m :${pad(remainingSeconds.toFixed(2))}s`;
};
