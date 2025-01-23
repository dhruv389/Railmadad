import React from 'react'
import load from "../Images/loader.gif"

const Loader = () => {
  return (
    <div className='flex h-screen w-screen bg-white justify-center items-center flex-col'>

        <img src={load} alt="" className='h-[14rem] w-[14rem]' />
      
        <h1 className='text-2xl font-light '>Loading...</h1>
    </div>
  )
}

export default Loader;