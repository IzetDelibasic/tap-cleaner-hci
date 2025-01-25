// -React-
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// -Services-
import { fetchContainers } from "../../services/containersService";
// -Axios-
import axios from "axios";
// -Components-
import { Navbar, CustomButton } from "../../components";
// -Environment
import { environment } from "../../environments/environments";

const Admin = () => {
  const [containers, setContainers] = useState([]);
  const [filteredContainers, setFilteredContainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const loggedInUserData = localStorage.getItem("loggedInUserData");

      if (!loggedInUserData) {
        console.error("Korisnički podaci nisu pronađeni.");
        return;
      }

      const parsedUserData = JSON.parse(loggedInUserData);
      const token = parsedUserData.jwtToken;

      if (!token) {
        throw new Error("Token nije pronađen.");
      }

      const containersData = await fetchContainers(token);
      setContainers(containersData);
      setFilteredContainers(containersData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearReports = async (containerName) => {
    try {
      const loggedInUserData = localStorage.getItem("loggedInUserData");

      if (!loggedInUserData) {
        console.error("Korisnički podaci nisu pronađeni.");
        return;
      }

      const parsedUserData = JSON.parse(loggedInUserData);
      const token = parsedUserData.jwtToken;

      if (!token) {
        throw new Error("Token nije pronađen.");
      }

      await axios.post(
        `${environment.apiBaseUrl}/Container/CleanContainer`,
        containerName,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(`Prijava za ${containerName} uspješno očišćena.`);
      const containersData = await fetchContainers(token);
      setFilteredContainers(containersData);
    } catch (err) {
      toast.error("Greška pri čišćenju kontejnera");
    }
  };

  const deleteContainer = async (containerName) => {
    try {
      const loggedInUserData = localStorage.getItem("loggedInUserData");

      if (!loggedInUserData) {
        console.error("Korisnički podaci nisu pronađeni.");
        return;
      }

      const parsedUserData = JSON.parse(loggedInUserData);
      const token = parsedUserData.jwtToken;

      if (!token) {
        throw new Error("Token nije pronađen.");
      }

      await axios.request({
        method: "delete",
        url: `${environment.apiBaseUrl}/Container/DeleteContainerByName`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: containerName,
      });

      toast.success(`Kontejner ${containerName} uspješno obrisan.`);
      const containersData = await fetchContainers(token);
      setFilteredContainers(containersData);
    } catch (err) {
      toast.error("Greška pri brisanju kontejnera.");
    }
  };

  if (loading) {
    return (
      <div className="text-center font-montserrat text-xl mt-6">
        Containers loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center font-montserrat text-xl mt-6">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <h1 className="my-6 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-gray-400 from-emerald-600">
          Admin Panel
        </span>
      </h1>
      <Link to="/admin/add-container">
        <CustomButton
          className="bg-emerald-600 hover:bg-emerald-700 ease-in-out duration-300 text-white font-medium py-2 px-6 rounded-3xl md:w-[30%] lg:w-[20%] mx-auto my-4"
          title="Dodaj Kontejner"
          titleClassName="group-hover:text-white font-subtitle"
        ></CustomButton>
      </Link>
      <Link to="/admin/all-queries">
        <CustomButton
          className="bg-emerald-600 hover:bg-emerald-700 ease-in-out duration-300 text-white font-medium py-2 px-6 rounded-3xl md:w-[30%] lg:w-[20%] mx-auto my-4"
          title="Pregled Upita"
          titleClassName="group-hover:text-white font-subtitle"
        ></CustomButton>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {filteredContainers.length > 0 ? (
          filteredContainers.map((container, index) => (
            <div
              className="bg-white rounded-lg shadow-md p-6 mb-4 text-sm lg:text-base text-center border-[1px] border-opacity-25 border-black hover:border-blueColor ease-in-out duration-300 font-montserrat"
              key={index}
            >
              <h2 className="text-xl font-bold mb-2">{container.name || ""}</h2>
              <div className="flex justify-center items-center mb-2">
                <p className="font-medium mr-2">Adresa:</p>
                <p>{container.adress || ""}</p>
              </div>
              <div className="flex justify-center items-center mb-2">
                <p className="font-medium mr-2">Koordinate:</p>
                <p>{container.coordinates || ""}</p>
              </div>
              <div className="flex justify-center items-center mb-2">
                <p className="font-medium mr-2">Tip:</p>
                <p>{container.type || ""}</p>
              </div>
              <div className="flex justify-center items-center mb-2">
                <p className="font-medium mr-2">Stanje:</p>
                <p>{container.condition || ""}</p>
              </div>
              <div className="flex justify-center items-center mb-2">
                <p className="font-medium mr-2">Broj prijava:</p>
                <p>{container.numberOfReports || 0}</p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => clearReports(container.name)}
                  className="bg-emerald-600 hover:bg-emerald-800 duration-300 ease-in-out text-white font-medium py-2 px-6 rounded-3xl text-xs md:text-sm mr-2"
                >
                  Očisti
                </button>
                <button
                  onClick={() => deleteContainer(container.name)}
                  className="bg-red-600 hover:bg-red-800 duration-300 ease-in-out text-white font-medium py-2 px-6 rounded-3xl text-xs md:text-sm"
                >
                  Obriši
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-1 md:col-span-2 text-xl font-bold">
            No containers available.
          </div>
        )}
      </div>
    </>
  );
};

export default Admin;
