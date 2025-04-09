import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  text: string;
  link?: string;
  buttonType?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const KantaButton: React.FC<ButtonProps> = ({ text, link, buttonType = "button", onClick }) => {
  return (
    <div>
      {link ? (
        <Link to={link}>
          <button
            type={buttonType}
            className="bg-purple500 text-center text-white py-3 rounded px-2"
            onClick={onClick}
          >
            {text}
          </button>
        </Link>
      ) : (
        <button
          type={buttonType}
          className="bg-purple500 text-center text-white py-3 px-4 rounded"
          onClick={onClick}
        >
          {text}
        </button>
      )}
    </div>
  );
};

export default KantaButton;
