// -React-
import { useState } from "react";
import { Link } from "react-router-dom";
// -Icons-
import { FaRegTrashAlt, FaTimes } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
// -Constants-
import { Links } from "../../constants/linksConstant";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userRole = JSON.parse(localStorage.getItem("loggedInUserData"))?.role;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-emerald-600 border-b-2 border-black border-opacity-20 font-montserrat">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/dashboard" className="flex items-center">
          <FaRegTrashAlt className="text-white cursor-pointer mr-2" />
          <div className="self-center text-xl font-medium font-montserrat whitespace-nowrap text-white">
            Tap Cleaner
          </div>
        </Link>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <FaTimes className="" /> : <FiMenu className="" />}
          </button>
        </div>
        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:flex md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0 text-white">
            {Links.map(
              (link, index) =>
                (link.title !== "Container Section" ||
                  userRole === "Admin") && (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="block py-2 px-4 text-center md:inline-block hover:text-gray-300 ease-in-out duration-300"
                    >
                      {link.title}
                    </Link>
                  </li>
                )
            )}
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("jwtToken");
                  window.location.href = "/";
                }}
                className="flex justify-center items-center py-2 md:pt-[0.6rem] mx-auto"
              >
                <MdLogout className="text-white mt-2 md:mt-0 mx-auto hover:text-gray-300 ease-in-out duration-300" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
