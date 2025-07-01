// ContactForm.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [status, setStatus] = useState(null); // "success" | "error"

  const onSubmit = async (data) => {
    setStatus(null);
    try {
      await emailjs.send(
        "service_rrexxzy",
        "template_zxjvjc9",
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          to_name: "Sazzadul",
        },
        "2E4m6SmAxA_qFfFN9"
      );
      setStatus("success");
      reset();
    } catch (error) {
      console.error("Email send failed:", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen px-6">
      {/* Title */}
      <h3 className="uppercase text-center font-semibold font-poppins text-black py-3 pt-16 text-4xl font-sans">
        Contact
      </h3>

      {/* Divider */}
      <p className="bg-blue-500 w-10 py-1 mx-auto text-center rounded-full mb-6" />

      {/* Main Description */}
      <p className="text-center text-lg leading-8 max-w-2xl mx-auto text-gray-700 font-poppins">
        Feel free to Contact me by submitting the form below and I will get back
        to you as soon as possible
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 text-black"
      >
        {/* Name */}
        <div className="mb-5">
          <label htmlFor="name" className="block font-semibold mb-1">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-400 ring-red-300"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-5">
          <label htmlFor="email" className="block font-semibold mb-1">
            Your Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-400 ring-red-300"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Message */}
        <div className="mb-6">
          <label htmlFor="message" className="block font-semibold mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            {...register("message", { required: "Message is required" })}
            rows="6"
            className={`w-full px-4 py-2 border rounded resize-none focus:outline-none focus:ring-2 ${
              errors.message
                ? "border-red-400 ring-red-300"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.message && (
            <p className="text-sm text-red-600 mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-all duration-200 disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
