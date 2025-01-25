// -React-
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// -Axios-
import axios from "axios";
// -Environments-
import { environment } from "../../environments/environments";
// -Components-
import { Navbar, CustomButton } from "../../components";
// -Icons-
import { FaRegMessage } from "react-icons/fa6";

const AdminQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    const loggedInUserData = localStorage.getItem("loggedInUserData");

    if (!loggedInUserData) {
      setError("Greška prilikom preuzimanja korisničkih podataka.");
      setLoading(false);
      return;
    }

    const loggedInUser = JSON.parse(loggedInUserData);
    const userEmail = loggedInUser?.email;
    const token = loggedInUser?.jwtToken;

    if (!userEmail || !token) {
      setError("Greška prilikom preuzimanja korisničkih podataka i tokena.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${environment.apiBaseUrl}/Query/GetUsersQueries`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setQueries(response.data);
    } catch (error) {
      setError("Greška prilikom preuzimanja podataka korisnika.");
      console.error("Error details:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Učitavanje...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="my-6 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-gray-400 from-emerald-600">
            Korisnički Upiti - Admin Panel
          </span>
        </h1>
        {queries.length === 0 ? (
          <p>Trenutno nema upita.</p>
        ) : (
          <ul className="space-y-4">
            {queries.map((item, index) => (
              <li
                key={index}
                className="p-4 border rounded shadow-md flex flex-col md:justify-between md:flex-row items-center space-x-4 font-montserrat w-[80%] md:w-[90%] mx-auto"
              >
                <div className="flex flex-col md:flex-row md:items-start items-center text-center md:text-start">
                  <img
                    src={item.user.imageUrl}
                    alt={`${item.user.firstName} ${item.user.lastName}`}
                    className="w-16 h-16 rounded-full object-cover md:mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">
                      {item.user.firstName} {item.user.lastName}
                    </h2>
                    <p className="text-sm text-gray-600">{item.user.email}</p>
                    <p className="mt-2 text-gray-800">{item.query}</p>
                  </div>
                </div>
                <Link to="/admin/query-answer">
                  <CustomButton
                    className="bg-emerald-600 hover:bg-emerald-700 ease-in-out duration-300 text-white font-medium py-2 px-4 rounded-3xl lg:w-[80px]"
                    Icon={FaRegMessage}
                    iconClassName="w-6 h-6"
                    onlyIcon={true}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default AdminQueries;
