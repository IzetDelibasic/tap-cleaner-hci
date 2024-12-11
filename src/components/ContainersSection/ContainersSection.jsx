// -React-
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
// -Services-
import { fetchContainers } from "../../services/containersService";
// -Axios-
import axios from "axios";
// -Environment-
import { environment } from "../../environments/environments";

const ContainersSection = () => {
  const [containers, setContainers] = useState([]);
  const [filteredContainers, setFilteredContainers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggedInUserData = localStorage.getItem("loggedInUserData");

        if (!loggedInUserData) {
          console.error("Podaci korisnika nisu pronađeni u lokalnoj pohrani.");
          return;
        }

        const parsedUserData = JSON.parse(loggedInUserData);
        const token = parsedUserData.jwtToken;

        if (!token) {
          throw new Error("Vaša sesija nije ispravna. Pokušajte ponovno!");
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

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = containers.filter((container) =>
        container.adress.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredContainers(filtered);
    } else {
      setFilteredContainers(containers);
    }
  }, [searchQuery, containers]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchLocation = (coordinates) => {
    window.open(`https://www.google.com/maps?q=${coordinates}`, "_blank");
  };

  const handleReportCondition = async (index) => {
    try {
      const loggedInUserData = localStorage.getItem("loggedInUserData");

      if (!loggedInUserData) {
        toast.error("Podaci korisnika nisu pronađeni u lokalnoj pohrani.");
        return;
      }

      const parsedUserData = JSON.parse(loggedInUserData);
      const token = parsedUserData.jwtToken;
      const userEmail = parsedUserData.email;

      if (!token) {
        throw new Error("Token nije pronađen u lokalnoj pohrani.");
      }

      const container = containers[index];

      if (!container) {
        throw new Error("Kontejner nije pronađen.");
      }

      await axios.post(
        `${environment.apiBaseUrl}/Container/ReportContainer`,
        {
          userEmail: userEmail,
          containerName: container.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Vaša prijava je uspješno poslana, naš tim će reagovati u što kraćem roku."
      );
    } catch (err) {
      toast.error("Greška nastala prilikom prijave kontejnera: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center font-montserrat text-xl mt-6">
        Učitavanje kontejnera...
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
    <div>
      <h1 className="my-6 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-gray-400 from-emerald-600">
          Kontejneri
        </span>
      </h1>
      <div className="p-4">
        <input
          type="text"
          placeholder="Pretraga putem adrese.."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border rounded-lg p-2 w-full mb-4"
        />
      </div>
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
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => handleSearchLocation(container.coordinates)}
                  className="bg-emerald-600 text-white font-medium py-2 px-4 rounded-3xl hover:bg-emerald-800 transition duration-300 ease-in-out"
                >
                  Lokacija
                </button>
                <button
                  onClick={() => handleReportCondition(index)}
                  className="bg-red-600 text-white font-medium py-2 px-4 rounded-3xl hover:bg-red-800 transition duration-300 ease-in-out"
                >
                  Prijavi
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center font-montserrat text-xl">
            Trenutno nema dostupnih kontejnera.
          </p>
        )}
      </div>
    </div>
  );
};

export default ContainersSection;
