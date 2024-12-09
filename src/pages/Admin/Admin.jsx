// -React-
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
// -Services-
import { fetchContainers } from "../../services/containersService";
// -Axios-
import axios from "axios";
// -Components-
import { Navbar } from "../../components";
// -Environment
import { environment } from "../../environments/environments";

const Admin = () => {
  const [containers, setContainers] = useState([]);
  const [filteredContainers, setFilteredContainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newContainer, setNewContainer] = useState({
    adress: "",
    coordinates: "",
    type: "",
  });

  useEffect(() => {
    const fetchData = async () => {
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

  const clearReports = async (containerName) => {
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
        `${environment.apiBaseUrl}/Container/CleanContainer`,
        containerName,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(`Reports for ${containerName} cleared successfully.`);
      const containersData = await fetchContainers(token);
      setFilteredContainers(containersData);
    } catch (err) {
      toast.error("Error clearing reports: " + err.message);
    }
  };

  const deleteContainer = async (containerName) => {
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

      await axios.request({
        method: "delete",
        url: `${environment.apiBaseUrl}/Container/DeleteContainerByName`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: containerName,
      });

      toast.success(`Container ${containerName} deleted successfully.`);
      const containersData = await fetchContainers(token);
      setFilteredContainers(containersData);
    } catch (err) {
      toast.error("Error deleting container: " + err.message);
    }
  };

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
      const containersData = await fetchContainers(token);
      setFilteredContainers(containersData);
      setNewContainer({ adress: "", coordinates: "", type: "" });
    } catch (err) {
      toast.error("Error adding container: " + err.message);
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
          Container Section
        </span>
      </h1>
      <div className="bg-white border-[1px] border-lightGreen p-6 rounded-lg shadow-md mt-6 md:w-[60%] w-[90%] mx-auto font-montserrat flex flex-col">
        <h2 className="text-xl font-bold mb-4 text-center">
          Add New Container
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Address
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
            Coordinates
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
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
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
          Add Container
        </button>
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
                <p className="font-medium mr-2">Address:</p>
                <p>{container.adress || ""}</p>
              </div>
              <div className="flex justify-center items-center mb-2">
                <p className="font-medium mr-2">Coordinates:</p>
                <p>{container.coordinates || ""}</p>
              </div>
              <div className="flex justify-center items-center mb-2">
                <p className="font-medium mr-2">Type:</p>
                <p>{container.type || ""}</p>
              </div>
              <div className="flex justify-center items-center mb-2">
                <p className="font-medium mr-2">Condition:</p>
                <p>{container.condition || ""}</p>
              </div>
              <div className="flex justify-center items-center mb-2">
                <p className="font-medium mr-2">Number of Reports:</p>
                <p>{container.numberOfReports || 0}</p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => clearReports(container.name)}
                  className="bg-emerald-600 hover:bg-emerald-800 duration-300 ease-in-out text-white font-medium py-2 px-6 rounded-3xl text-xs md:text-sm mr-2"
                >
                  Clear
                </button>
                <button
                  onClick={() => deleteContainer(container.name)}
                  className="bg-red-600 hover:bg-red-800 duration-300 ease-in-out text-white font-medium py-2 px-6 rounded-3xl text-xs md:text-sm"
                >
                  Delete
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
