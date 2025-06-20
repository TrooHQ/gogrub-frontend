import React, { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  bg?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  bg = "bg-white",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <style>{`
        .no-scroll {
          overflow: hidden;
        }
      `}</style>
      <div
        className="fixed inset-0 z-50 bg-black bg-opacity-50 "
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center ">
        <div
          className={`${bg} rounded-[20px] md:min-w-[30vw] max-w-full max-h-[90%] overflow-y-auto p-4`}
        >
          <div>{children}</div>
          {/* <div className="text-right">
            <button
              className="px-4 py-2 mt-4 text-white bg-gray-500 rounded hover:bg-gray-700"
              onClick={onClose}
            >
              Close
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Modal;
