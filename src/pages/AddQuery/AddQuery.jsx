import { ContactForm, Navbar } from "../../components";

const AddQuery = () => {
  return (
    <>
      <Navbar />
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
