// -React-
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
// -Icons-
import { IoArrowBack } from "react-icons/io5";
// -Components-
import { Navbar, CustomButton } from "../../components";

const QueryAnswer = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      navigate("/admin/all-queries");
      toast.success("Odgovor korisniku je uspješno poslan!");
    }
  };

  return (
    <>
      <Navbar />
      <Link
        to="/admin/all-queries"
        className="self-start flex justify-start items-center hover:text-emerald-600 ease-in-out duration-300 mt-6 ml-4"
      >
        <IoArrowBack className="h-4 w-4 mr-1" />
        <p className="text-sm font-subtitle">Nazad</p>
      </Link>
      <div className="w-[85%] md:max-w-xl mx-auto p-6 mt-6 rounded-lg shadow-lg border-[1px] border-emerald-600">
        <h2 className="text-2xl font-bold mb-4 font-montserrat text-center">
          Odgovor na Upit
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-2 text-center font-montserrat"
            >
              Odgovor na korisnički upit:
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Odgovor na korisnički upit.."
              required
              className="w-full min-h-[150px] p-2 border rounded border-gray-300 font-montserrat"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <CustomButton
            type="submit"
            className={`px-6 py-2 rounded-3xl shadow-md bg-emerald-600 text-white font-montserrat ease-in-out duration-300 ${
              message.trim()
                ? "hover:bg-emerald-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            title="Pošalji Odgovor"
            disabled={!message.trim()}
          />
        </form>
      </div>
    </>
  );
};

export default QueryAnswer;
