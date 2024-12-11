// -React-
import { useState } from "react";
// -Components-
import CustomButton from "../Button/Button";
// -Environments-
import { environment } from "../../environments/environments";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const response = await fetch(`${environment.apiBaseUrl}/User/AddQuery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Poruka nije poslana uspješno!");
      }

      alert("Vaša poruka je poslana, zahvaljujemo se na Vašem upitu!");

      if (event.currentTarget) {
        event.currentTarget.reset();
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Type your query or question here..."
            required
            className="w-full min-h-[150px] p-2 border rounded border-gray-300"
          />
        </div>
        <CustomButton
          type="submit"
          title={isSubmitting ? "Sending..." : "Send Message"}
          className="px-6 py-2 rounded-3xl shadow-md bg-blue-500 text-white hover:bg-blue-600"
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default ContactForm;
