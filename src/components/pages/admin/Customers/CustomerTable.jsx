import React, {useState, useRef, useEffect} from 'react'
import { toast } from "react-toastify";
import { adminRemindNotification } from '../../../../Api/ApiCall';
import CountryFlag from 'react-country-flag';
import countryCodeLookup from 'country-code-lookup';

const CustomerTable = ({data,setPage,count,page,selected}) => {
    const [ title, setTitle ] = useState('');
    const [ image, setImage ] = useState();
    const [ description, setDescription ] = useState('');
    const [ titleError, setTitleError ] = useState('');
    const [ imgError, setImgError ] = useState('');
    const [ userId, setUserId ] = useState('');
    const [ descriptionError, setDescriptionError ] = useState('');
    const [showModal, setShowModal] = useState(false);
    
    const openModal = (id) => {
      setUserId(id);
        setShowModal(true);
    };

    const closeModal = () => {
        setTitle('');
        setTitleError('')
        setImage();
        setImgError('');
        setDescription('');
        setDescriptionError('');
        setShowModal(false);
        setUserId('')
    };
     const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!title.trim()){
            setTitleError('Title is required')
        }else if(!image){
            setImgError('Image is required')
        }else if(!description.trim()){
            setDescriptionError('Description is required')
        }else{
            try {
              const res = await adminRemindNotification({image, description, title, userId});
              if(res.data.message == 'Notification Sent Succesfully'){ 
              toast("Notification Sent Successfully.");
              }
              closeModal()
            } catch (error) {
                toast.error(error.message);
            }
        }
        try {
            
        } catch (error) {
            
        }
     }
    
    const loader = useRef(null);
  
    useEffect(() => {
      // Function to check if the document height is greater than the viewport height
      const isScrollRequired = () => {
        return document.documentElement.scrollHeight > window.innerHeight;
      };
  
      const options = {
        root: null,
        rootMargin: "20px",
        threshold: 0,
      };
  
      const observerCallback = (entities) => {
        const target = entities[0];
        const totalPages = Math.ceil(count / 10);
        if (target.isIntersecting) {
          if(page < totalPages){
            setPage((prev) => prev + 1);  
          }
          
        }else {
          // If scrolling back and the loader is not intersecting, decrement page
          setPage((prev) => Math.max(prev - 1, 1)); // Ensure page doesn't go below 1
        }
      };
  
      const observer = new IntersectionObserver(observerCallback, options);
  
      // Setup observer if scrolling is required
      const setupObserver = () => {
        if (loader.current && isScrollRequired()) {
          observer.observe(loader.current);
        } else {
          // Use a timeout to retry after some time, in case content or images are still loading
          setTimeout(setupObserver, 500);
        }
      };
  
      setupObserver();
  
      return () => {
        if (loader.current) {
          observer.unobserve(loader.current);
        }
      };
    }, []);
    
  return (
    <div className="w-full bg-containerWhite p-3 mt-5 rounded-lg overflow-x-auto">
      
      {/* buttondiv */}

      {/* table */}
     {data && <table className="w-full text-center mt-4">
        <thead
          className=" rounded-lg font-semibold"
          style={{
            backgroundColor: "rgba(242, 242, 242, 1)",
            height: "50px",
          }}
        >
          <tr className="rounded-md">
            <td>Customer Name</td>
            <td>Email</td>
            <td>Country </td>
            {data[0]?.flicksMembership?.membershipPlan && <td>Last Plan</td>}
            <td>Phone Number</td>  
          </tr>
        </thead>
        <tbody>
          {/* demo tr */}
          {data.map((data,i)=>(
            <tr key={i}
            style={{
              height: "60px",
            }}
            className='text-sm'
          >
            <td>
              {" "}
              <div className="flex gap-1 items-center">
                <div className="rounded-full w-10 h-10 overflow-hidden bg-slate-50 border border-gray-400 mx-3 shadow-md">
                  <img className={data?.details?.profilePicture == '' ?  'p-2' : ''} src={data?.details?.profilePicture == '' ? '/customer.png' : data?.details?.profilePicture} alt="" />
                </div>
                {data?.name ? data?.name : 'N/A'}
              </div>
            </td>
            <td className=" truncate">{data?.email ? data?.email : 'N/A'}</td>
            
            <td>
              {" "}
              <div className="flex gap-2 items-center">
              <div className={`w-6 h-6 overflow-hidden  rounded-full relative flex items-center justify-center ${data?.details.country ? '' : 'bg-gray-200'}`}>
   {data?.details.country && <CountryFlag
        className="w-full h-full object-cover"
        countryCode={countryCodeLookup.byCountry(data?.details.country)?.iso2 || ''}
        svg 
    />}
</div>
                {data?.details.country ? data?.details.country : 'N/A'}
              </div>
            </td>
            {selected == 'Flicks' && <td>${data?.flicksMembership?.membershipPlan?.name ? data?.flicksMembership?.membershipPlan?.name : "N/A" }</td>}
            <td>
               {data?.phoneNumber ? data?.phoneNumber : 'N/A'}  
            </td>
            
          </tr>
          ))}
          
        </tbody>
      </table>}
      {showModal && (
                    <div className="fixed top-0 left-16 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-80">
                        <div className="relative bg-white rounded-2xl w-2/5">
                            <svg onClick={closeModal} className="absolute top-0 right-0 m-5 cursor-pointer" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.57896 17.4211L13 13M13 13L17.4211 8.57894M13 13L17.4211 17.4211M13 13L8.57896 8.57894M25 13C25 19.6274 19.6274 25 13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13Z" stroke="black" stroke-width="1.25" stroke-linecap="round" />
                            </svg>
                            <div className="p-8">
                                <h1 className=' text-center font-semibold text-xl m-3 mb-8'>Send Notification</h1>
                                <form onSubmit={handleSubmit}>
                                <div className="">
                                <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-4">
                                    
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="Add Title"
                                        style={{border: 'solid rgba(213, 213, 213, 1) .69px', backgroundColor: 'rgba(246, 246, 246, 1)'}}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        value={title} onChange={(e) => {setTitleError(''); setTitle(e.target.value) }}
                                    />
                                    {titleError && <p className='text-red-500'>{titleError}</p>}
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-4">
                                    
                                    <label style={{border: '1px solid rgba(208, 213, 221, 1)', backgroundColor: 'rgba(246, 246, 246, 1)',}} className='flex  justify-between border-gray-800 shadow-lg w-full rounded-md border bg-white py-1.5 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'>
                                    <span className="text-base font-medium text-[#6B7280] opacity-60 my-auto truncate">{image?.name ? image?.name :'Add Image'}</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="img"
                                        id="city"
                                        placeholder="Add Image"
                                        className=" hidden"
                                        onChange={(e) => {setImgError(''); setImage(e.target.files[0]) }}
                                    />
                                    <div className='flex bg-white p-1.5 px-3 border-gray-500 shadow-md rounded-lg'>
                                        <span>Upload</span> <span className='p-1'><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.63601 0C3.6195 0 0.363281 3.25622 0.363281 7.27273C0.363281 11.2892 3.6195 14.5455 7.63601 14.5455C11.6525 14.5455 14.9087 11.2892 14.9087 7.27273C14.9087 3.25622 11.6525 0 7.63601 0ZM7.63601 13.986C3.92832 13.986 0.922722 10.9804 0.922722 7.27273C0.922722 3.56504 3.92832 0.559441 7.63601 0.559441C11.3437 0.559441 14.3493 3.56504 14.3493 7.27273C14.3493 10.9804 11.3437 13.986 7.63601 13.986Z" fill="#667085"/>
                                        <path d="M12.2534 6.9931H7.91778V2.65744C7.91778 2.58024 7.85512 2.51758 7.77792 2.51758H7.4982C7.42099 2.51758 7.35834 2.58024 7.35834 2.65744V6.9931H3.02267C2.94547 6.9931 2.88281 7.05576 2.88281 7.13296V7.41268C2.88281 7.48989 2.94547 7.55254 3.02267 7.55254H7.35834V11.8882C7.35834 11.9651 7.42099 12.0281 7.4982 12.0281H7.77792C7.85512 12.0281 7.91778 11.9651 7.91778 11.8882V7.55254H12.2534C12.3304 7.55254 12.3933 7.48989 12.3933 7.41268V7.13296C12.3933 7.05576 12.3304 6.9931 12.2534 6.9931Z" fill="#667085"/>
                                        </svg></span>

                                    </div>
                                    </label>
                                    {imgError && <p className='text-red-500'>{imgError}</p>}
                                    </div>
                                </div>
                                </div>
                                </div>
                                <div className="mb-4">
                                    
                                    <textarea
                                    type="text"
                                    name="description"
                                    id="description"
                                    style={{border: 'solid rgba(213, 213, 213, 1) .69px', backgroundColor: 'rgba(246, 246, 246, 1)'}}
                                    placeholder="Description"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-1.5 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    value={description}
                                    onChange={(e) => { setDescriptionError(''); setDescription(e.target.value) }}
                                    ></textarea>
                                    {descriptionError && <p className='text-red-500'>{descriptionError}</p>}
                                </div>
                                <div className='text-center'>
                                    <button type='submit' className=' text-white px-20 rounded-xl py-2' style={{backgroundColor : 'rgba(47, 78, 255, 1)'}}>
                                        <div className='flex justify-center'>
                                            <span className='px-2'>Send</span>
                                            <span className='pt-0.5'>
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.99233 17C6.9454 17.0001 6.89891 16.991 6.85547 16.9733C6.78806 16.946 6.73033 16.8993 6.68969 16.839C6.64905 16.7788 6.62734 16.7077 6.62736 16.635V12.8728C6.62747 12.7882 6.65681 12.7062 6.71041 12.6407L11.0137 7.41435L5.20564 12.3606C5.14781 12.4096 5.07619 12.4395 5.00067 12.446C4.92515 12.4526 4.84945 12.4356 4.78401 12.3973L1.17999 10.2788C1.1248 10.2464 1.07911 10.2 1.04752 10.1443C1.01592 10.0886 0.99954 10.0255 1.00001 9.96152C1.00048 9.89749 1.01779 9.83471 1.05019 9.77949C1.0826 9.72426 1.12896 9.67854 1.18463 9.6469L16.3278 1.0478C16.3883 1.01333 16.4574 0.99691 16.527 1.00048C16.5966 1.00405 16.6636 1.02746 16.7203 1.06794C16.777 1.10843 16.8209 1.16429 16.8468 1.22893C16.8728 1.29357 16.8797 1.36429 16.8667 1.43272L14.1797 15.6278C14.1693 15.6831 14.1462 15.7352 14.1123 15.7801C14.0784 15.825 14.0346 15.8615 13.9843 15.8866C13.934 15.9118 13.8785 15.9249 13.8223 15.9251C13.766 15.9253 13.7105 15.9125 13.66 15.8876L9.97798 14.0764L7.25465 16.8888C7.22064 16.924 7.17989 16.952 7.13482 16.9711C7.08974 16.9902 7.04128 17 6.99233 17ZM7.35729 13.0036V15.7333L9.63832 13.3778C9.69209 13.3224 9.762 13.2854 9.83805 13.2722C9.9141 13.2589 9.9924 13.2701 10.0617 13.304L13.5517 15.0209L16.0031 2.07141L2.09454 9.96945L4.93014 11.6364L13.6793 4.18528C13.7488 4.12618 13.8379 4.09523 13.929 4.09853C14.0202 4.10183 14.1068 4.13913 14.1719 4.2031C14.2369 4.26706 14.2756 4.35305 14.2805 4.44415C14.2853 4.53524 14.2558 4.62484 14.1979 4.6953L7.35729 13.0036Z" fill="white" stroke="white" stroke-width="0.5"/>
                                            </svg>

                                            </span>
                                        </div>
                                        </button>
                                </div>
                                </form>
                                
                            </div>
                        </div>
                    </div>
                        )}
      <div ref={loader} className="h-10" />
      {/* table */}
      {/* buttondiv */}
    </div>
  )
}

export default CustomerTable
