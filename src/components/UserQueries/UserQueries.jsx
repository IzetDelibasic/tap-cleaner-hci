// -React-
import { useEffect, useState } from "react";
// -Axios-
import axios from "axios";
// -Environments-
import { environment } from "../../environments/environments";

const UserQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userEmail = loggedInUser?.email;
  const token = loggedInUser?.jwtToken;

  useEffect(() => {
    const emailString = `"${userEmail}"`;
    const fetchQueries = async () => {
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
        setError("Failed to fetch user queries.");
        console.error("Error details:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (loggedInUser && token) {
      fetchQueries();
    } else {
      setError("User is not logged in or token is missing.");
      setLoading(false);
    }
  }, [loggedInUser, token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="my-6 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-gray-400 from-emerald-600">
          Vaši Upiti
        </span>
      </h1>
      {queries.length === 0 ? (
        <p>No queries found.</p>
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
