import React, { useState } from "react";


const SweetAlertDialog = ({ isOpen, onClose, title, text, icon }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-lg shadow-lg max-w-xs w-full mx-4 sm:mx-0 text-center p-6">
        {icon && (
          <div className="text-5xl mb-4">
            {icon === "success" && <span className="text-green-500">✔️</span>}
            {icon === "error" && <span className="text-red-500">❌</span>}
            {icon === "warning" && <span className="text-yellow-500">⚠️</span>}
            {icon === "info" && <span className="text-blue-500">ℹ️</span>}
          </div>
        )}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">{text}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

const Apprecian = () => {
  
     const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className="p-6">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={openDialog}
      >
        Show SweetAlert-like Dialog
      </button>

      <SweetAlertDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title="Success"
        text="Your action was successful!"
        icon="success"
      />
    </div>
  )
}

export default Apprecian