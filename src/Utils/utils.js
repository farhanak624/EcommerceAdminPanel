export const inputNumberPreventScroll = (fieldname) => {
  const handleWheel = (e) => {
    e.preventDefault(); // Prevent scrolling
  };
  const inputElement = document.getElementById(fieldname);

  if (inputElement) {
    inputElement.addEventListener("wheel", handleWheel, { passive: false });
  }

  return () => {
    if (inputElement) {
      inputElement.removeEventListener("wheel", handleWheel);
    }
  };
};
