// -React-
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// -Axios-
import axios from "axios";
// -Components-
import { Navbar } from "../../components";
// -Environments-
import { environment } from "../../environments/environments";
// -Icons-
import { IoArrowBack } from "react-icons/io5";

const AddContainer = () => {
  const [newContainer, setNewContainer] = useState({
    adress: "",
    coordinates: "",
    type: "",
  });

  const navigate = useNavigate();

  const addContainer = async () => {
    try {
      const loggedInUserData = localStorage.getItem("loggedInUserData");

      if (!loggedInUserData) {
        console.error("User data not found in local storage.");
        return;
      }

      const parsedUserData = JSON.parse(loggedInUserData);
      const token = parsedUserData.jwtToken;

      if (!token) {
        throw new Error("Token not found in local storage.");
      }

      await axios.post(
        `${environment.apiBaseUrl}/Container/AddContainer`,
        newContainer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/dashboard");
      toast.success("Kontejner uspješno dodan.");
    } catch (err) {
      toast.error("Greška pri dodavanju: " + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <Link
        to="/admin"
        className="self-start flex justify-start items-center hover:text-emerald-600 ease-in-out duration-300 mt-6 ml-4"
      >
        <IoArrowBack className="h-4 w-4 mr-1" />
        <p className="text-sm font-subtitle">Nazad</p>
      </Link>
      <h1 className="my-6 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-gray-400 from-emerald-600">
          Dodaj Kontejner
        </span>
      </h1>
      <div className="bg-white border-[1px] border-lightGreen p-6 rounded-lg shadow-md mt-6 md:w-[60%] w-[90%] mx-auto font-montserrat flex flex-col">
        <h2 className="text-xl font-bold mb-4 text-center">
          Dodaj Novi Kontejner
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Adresa
          </label>
          <input
            type="text"
            value={newContainer.adress}
            onChange={(e) =>
              setNewContainer({ ...newContainer, adress: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Koordinate
          </label>
          <input
            type="text"
            value={newContainer.coordinates}
            onChange={(e) =>
              setNewContainer({
                ...newContainer,
                coordinates: e.target.value,
              })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Tip</label>
          <select
            value={newContainer.type}
            onChange={(e) =>
              setNewContainer({ ...newContainer, type: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          >
            <option value="">-- Odaberite tip kontejnera --</option>
            <option value="Plastika">Plastika</option>
            <option value="Metal">Metal</option>
            <option value="Biootpad">Biootpad</option>
            <option value="Papir">Papir</option>
            <option value="Staklo">Staklo</option>
          </select>
        </div>

        <button
          onClick={addContainer}
          className="bg-emerald-600 hover:bg-emerald-700 ease-in-out duration-300 text-white font-medium py-2 px-6 rounded-3xl md:w-[40%] mx-auto"
        >
          Dodaj
        </button>
      </div>
    </>
  );
};

export default AddContainer;
