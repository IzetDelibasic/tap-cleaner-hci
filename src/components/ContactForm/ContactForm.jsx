// -React-
import { useState, useRef } from "react";
// -Axios-
import axios from "axios";
// -Components-
import CustomButton from "../Button/Button";
// -Environments-
import { environment } from "../../environments/environments";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const query = formData.get("message");

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
    const email = loggedInUser?.email;

    if (!email) {
      alert("Vaša sesija je istekla.");
      setIsSubmitting(false);
      return;
    }

    const payload = { email, query };

    try {
      const response = await axios.post(
        `${environment.apiBaseUrl}/Query/AddQuery`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Vaša poruka je poslana, zahvaljujemo se na Vašem upitu!");

      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      alert(
        `Došlo je do greške prilikom slanja poruke: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[85%] md:max-w-xl mx-auto p-6 mt-6 rounded-lg shadow-lg border-[1px] border-emerald-600">
      <h2 className="text-2xl font-bold mb-4 font-montserrat text-center">
        Kontaktirajte nas
      </h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-4" ref={formRef}>
        {" "}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium mb-2 text-center font-montserrat"
          >
            Vaša poruka ili upit za nas:
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Upišite svoj upit ili sugestiju.."
            required
            className="w-full min-h-[150px] p-2 border rounded border-gray-300 font-montserrat"
          />
        </div>
        <CustomButton
          type="submit"
          title={isSubmitting ? "Slanje Upita..." : "Pošaljite Vaš Upit"}
          className="px-6 py-2 rounded-3xl shadow-md bg-emerald-600 text-white hover:bg-emerald-700 ease-in-out duration-300 font-montserrat"
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default ContactForm;
