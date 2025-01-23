
import React from 'react'
import CustomizedDialogs from './DialogBox'

const Footer = () => {
  return (
    <footer className="footbar">
    <div>
      <p>Copyright &copy;2019 RAILMADAD. All Rights Reserved.</p>
    </div>
    <div >
      <a className="ml-2 mr-1 hover:underline" href="#">Home</a> |
      {/* <a className="ml-2 mr-1 hover:underline" href="#">FAQs</a> 
      | */}
      <CustomizedDialogs /> |
      <a className="ml-2 mr-1 hover:underline" href="#">Railway Admin Login</a> |
      <a className="ml-2 mr-1 hover:underline" href="#">MIS Report Login</a>
    </div>
  </footer>
  )
}


export default Footer