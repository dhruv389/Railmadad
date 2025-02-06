import React from 'react'
import load from "../Images/loader.gif"

const Loader = () => {
  return (
    <div className='flex  h-[80vh] w-screen bg-white justify-center items-center flex-col'>
<div className="loader"></div>

<p className='font-bold text-black text-2xl mt-3'>Loading ...</p>
       
    </div>
  )
}

export default Loader;