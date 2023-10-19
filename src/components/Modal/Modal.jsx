const Modal = ({ isOpen, onClose, children }) => {
  const overlayClasses = isOpen
    ? "fixed inset-0 bg-black opacity-50 z-50"
    : "hidden";
  const modalClasses = isOpen
    ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg p-6 z-50"
    : "hidden";

  return (
    <>
      <div className={overlayClasses} onClick={onClose}></div>
      <div className={modalClasses}>
        <button
          className="absolute top-0 right-0 p-1"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6 text-gray-500 hover:text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        {children}
      </div>
    </>
  );
};

export default Modal;
