import React from 'react'

const Card = ({text,img,data}) => {
  return (
    <div className="bg-containerWhite rounded-xl p-4 border border-gray-300 shadow-lg">
      <div className=" w-full text-sm">
        <p className=' text-center text-xl font-semibold'>{text}</p>
        
      </div>
      <div className="flex gap-4 mt-1 justify-center items-center">
        <div className="p-4 rounded-full border ml-1 md:ml-4 border-gray-300 shadow-md" >
        {img}

        </div>
        <div className=' text-center'>
          
            <div>
              <p className="text-xl text-center font-bold m-1">{data?.totalCount}</p>
              { data?.persetage !== undefined  && <p className="flex gap-1 text-center items-center m-1" style={{color : data?.persetage >= 0 ? "rgba(63, 197, 0, 1)" : "red"}}>
                
                <span
                  className="mb-1"
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.2em", // Adjust font size to make it smaller
                    lineHeight: "0.1", // Adjust line height to make it smaller
                  }}
                >
                  {data?.persetage >= 0 ? "\u2191" : "\u2193"}
                </span>
                {data?.persetage?.toFixed(0)}% <span className=' text-black text-sm'>This Month </span>
              </p>}
              <div className='flex my-2'>
                {data?.img?.length != 0 && data?.img?.slice(0, 4)?.map(((image,i) => {
                    if(i == 0){
                        return (<div className='rounded-full bg-slate-200 overflow-hidden w-8 h-8 border border-black'>
                            <img src={!image ? '/propic.png' : image} alt="" />
                        </div>)
                    }else{
                        return (<div className='-ml-1 rounded-full bg-slate-200 overflow-hidden w-8 h-8 border border-black'>
                            <img src={!image ? '/propic.png' : image} alt="" />
                        </div>)
                    }
                }))}
                
              </div>
            </div>
          
        </div>
      </div>
    </div>
  )
}

export default Card
