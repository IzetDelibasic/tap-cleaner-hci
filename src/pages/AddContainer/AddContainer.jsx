import { useState } from "react";
import { Navbar } from "../../components";
import axios from "axios";
import { environment } from "../../environments/environments";
import { toast } from "react-toastify";

const AddContainer = () => {
  const [newContainer, setNewContainer] = useState({
    adress: "",
    coordinates: "",
    type: "",
  });

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

      toast.success("Container added successfully.");
    } catch (err) {
      toast.error("Error adding container: " + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="my-6 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-gray-400 from-emerald-600">
          Dodaj Kontejnner
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
          <input
            type="text"
            value={newContainer.type}
            onChange={(e) =>
              setNewContainer({ ...newContainer, type: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          />
        </div>
        <button
          onClick={addContainer}
          className="bg-gradient-to-r to-emerald-500 from-emerald-700 text-white font-medium py-2 px-6 rounded-3xl md:w-[40%] mx-auto"
        >
          Dodaj
        </button>
      </div>
    </>
  );
};

export default AddContainer;
