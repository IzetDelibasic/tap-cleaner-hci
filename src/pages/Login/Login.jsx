// -React-
import { useState } from "react";
import { useNavigate, Link, Form } from "react-router-dom";
import { toast } from "react-toastify";
// -Constants-
import { trashIcon, backgroundImage } from "../../constants/imageConstant";
//- Axios -
import axios from "axios";
// -Components-
import { FormRow } from "../../components";
// -Environment-
import { environment } from "../../environments/environments";
// -Icons-
import { IoArrowBack } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    setFormValid(email.trim() !== "" && password.trim() !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${environment.apiBaseUrl}/User/Login`,
        { email, password }
      );
      const { token, rola } = response.data;

      localStorage.clear();
      localStorage.setItem(
        "loggedInUserData",
        JSON.stringify({ jwtToken: token, email, role: rola })
      );

      toast.success("Vaša prijava je uspješna!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Greška prilikom prijave. Pokušajte ponovno!");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-center md:justify-start cursor-default mx-auto pb-4 pt-0">
        <img src={trashIcon} alt="Logo" className="w-[48px] h-[48px]" />
        <div className="text-3xl font-montserrat pl-[0.5rem] text-white">
          Tap Cleaner
        </div>
      </div>
      <div className="bg-white bg-opacity-80 xl:w-[25%] w-[97%] sm:w-[50%] md:w-[40%] p-8 rounded-[10px] rounded-bl-none flex flex-col items-center">
        <Link
          to="/"
          className="self-start flex justify-center items-center hover:text-emerald-600 ease-in-out duration-300"
        >
          <IoArrowBack className="h-4 w-4 mr-1" />
          <p className="text-sm font-subtitle">Početna</p>
        </Link>
        <h1 className="text-2xl font-bold text-bluePurple uppercase mb-4 text-center">
          Prijava
        </h1>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <FormRow
            type="email"
            name="email"
            labelText="Email"
            onChange={handleInputChange}
          />
          <FormRow
            type="password"
            name="password"
            labelText="Lozinka"
            onChange={handleInputChange}
          />
          <button
            className={`relative bg-blue-500 text-white font-medium py-[1rem] px-[3.5rem] md:px-[4rem] lg:px-[5rem] mr-0 mb-[20px] md:mb-0 rounded-[3rem] group overflow-hidden z-[1] flex items-center justify-center ${
              (!formValid || isLoading) && "opacity-50 cursor-not-allowed"
            }`}
            type="submit"
            disabled={!formValid || isLoading}
          >
            {isLoading ? (
              <FaSpinner className="animate-spin h-5 w-5" />
            ) : (
              <div>Prijavi se</div>
            )}
          </button>
        </form>
        <div className="pt-2 font-montserrat">
          Nemate račun?
          <Link to="/register" className="ml-1 font-medium text-emerald-600">
            Registracija
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
