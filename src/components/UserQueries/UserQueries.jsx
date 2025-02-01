// -React-
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// -Axios-
import axios from "axios";
// -Environments-
import { environment } from "../../environments/environments";
// -Components-
import CustomButton from "../Button/Button";

const UserQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userEmail = loggedInUser?.email;

  useEffect(() => {
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

      const emailString = `"${userEmail}"`;

      try {
        const response = await axios.post(
          `${environment.apiBaseUrl}/Query/GetUserQueries`,
          emailString,
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

    fetchQueries();
  }, []);

  if (loading) return <div>Učitavanje...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="my-6 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-gray-400 from-emerald-600">
          Upiti - {userEmail}
        </span>
      </h1>
      <Link to="/add-query">
        <CustomButton
          className="bg-emerald-600 hover:bg-emerald-700 ease-in-out duration-300 text-white font-medium py-2 px-6 rounded-3xl md:w-[30%] lg:w-[20%] mx-auto my-6"
          title="Dodaj Upit"
          titleClassName="group-hover:text-white font-subtitle"
        ></CustomButton>
      </Link>
      {queries.length === 0 ? (
        <p>Trenutno nema upita.</p>
      ) : (
        <ul className="space-y-4">
          {queries.map((item, index) => (
            <li
              key={index}
              className="p-4 border rounded shadow-md flex items-start space-x-4 font-montserrat w-[80%] md:w-[90%] mx-auto"
            >
              <img
                src={item.user.imageUrl}
                alt={`${item.user.firstName} ${item.user.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">
                  {item.user.firstName} {item.user.lastName}
                </h2>
                <p className="text-sm text-gray-600">{item.user.email}</p>
                <p className="mt-2 text-gray-800">{item.query}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserQueries;
