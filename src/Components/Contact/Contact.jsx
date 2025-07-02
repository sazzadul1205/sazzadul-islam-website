"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        "service_rrexxzy",
        "template_zxjvjc9",
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          to_name: "Sazzadul Islam",
          to_email: "Psazzadul@gmail.com",
        },
        "2E4m6SmAxA_qFfFN9"
      );

      reset();

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thanks for reaching out. I’ll get back to you soon.",
        confirmButtonColor: "#3b82f6",
      });
    } catch (error) {
      console.error("Email send failed:", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again later.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="min-h-screen px-6 py-10">
      {/* Title */}
      <h3
        className="text-4xl uppercase font-semibold text-center text-black pt-16 pb-3 font-poppins"
        data-aos="fade-up"
      >
        Contact
      </h3>

      {/* Divider */}
      <div
        className="w-10 h-1 bg-blue-500 mx-auto rounded-full mb-6"
        data-aos="zoom-in"
      />

      {/* Description */}
      <p
        className="text-center text-lg leading-8 max-w-2xl mx-auto text-gray-700 font-poppins"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Feel free to contact me by submitting the form below. I’ll get back to
        you as soon as possible.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 text-black"
        data-aos="fade-up"
        data-aos-delay="200"
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
            rows="6"
            {...register("message", { required: "Message is required" })}
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
          className="w-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded transition-all duration-200 disabled:opacity-50 cursor-pointer disabled:hover:bg-blue-600"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
