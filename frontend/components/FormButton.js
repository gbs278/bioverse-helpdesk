import { useState } from "react";
import Form from "./Form";

const FormButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="font-semibold h-screen flex flex-col justify-center items-center">
      <button
        className="rounded-lg bg-gradient-to-tr bg-white py-4 px-8 text-center font-sans text-lg font-bold uppercase text-gray-900 shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        onClick={openModal}
      >
        {!isOpen ? "Add Ticket" : "Discard Ticket"}
      </button>

      {isOpen && (
        <div>
          <Form closeModal={closeModal} />
        </div>
      )}
    </div>
  );
};

export default FormButton;
