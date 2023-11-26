const Modal = ({ isOpen, onClose, children }) => {
  const overlayClasses = isOpen
    ? "fixed inset-0  z-50 bg-primary-400 opacity-50"
    : "hidden";
  const modalClasses = isOpen
    ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md   z-50"
    : "hidden";

  return (
    <>
      <div className={overlayClasses} onClick={onClose}></div>
      <div className={modalClasses}>
        <button
          className="absolute top-0 right-0 p-2"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18 6L6 18"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {children}
      </div>
    </>
  );
};

export default Modal;
