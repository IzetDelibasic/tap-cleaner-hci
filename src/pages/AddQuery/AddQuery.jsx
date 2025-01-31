import { ContactForm, Navbar } from "../../components";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const AddQuery = () => {
  return (
    <>
      <Navbar />
      <Link
        to="/support"
        className="self-start flex justify-start items-center hover:text-emerald-600 ease-in-out duration-300 mt-6 ml-4"
      >
        <IoArrowBack className="h-4 w-4 mr-1" />
        <p className="text-sm font-subtitle">Nazad</p>
      </Link>
      <h1 className="my-6 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center mb-8">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-gray-400 from-emerald-600">
          Dodavanje Upita
        </span>
      </h1>
      <ContactForm />
    </>
  );
};

export default AddQuery;
