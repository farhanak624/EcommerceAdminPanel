export const handleOffer=(e)=>{
    const handleWheel = (e) => {
        e.preventDefault(); // Prevent scrolling
      };
    
      const inputElement = document.getElementById('numberOfDays');
    
      if (inputElement) {
        inputElement.addEventListener('wheel', handleWheel, { passive: false });
      }
    
      return () => {
        if (inputElement) {
          inputElement.removeEventListener('wheel', handleWheel);
        }
      };
}