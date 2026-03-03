"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import {
  FiUser,
  FiMail,
  FiMessageSquare,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiMapPin,
  FiPhone,
  FiClock
} from "react-icons/fi";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const formVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const inputVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
  focus: {
    scale: 1.02,
    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: { scale: 0.95 },
};

const infoCardVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      staggerChildren: 0.1,
    },
  },
};

const ContactForm = () => {
  const [isInView, setIsInView] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const sectionRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const message = watch("message", "");

  useEffect(() => {
    setCharCount(message.length);
  }, [message]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
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
      setCharCount(0);

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thanks for reaching out. I'll get back to you soon.",
        confirmButtonColor: "#3b82f6",
        background: "#fff",
        iconColor: "#3b82f6",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } catch (error) {
      console.error("Email send failed:", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again later.",
        confirmButtonColor: "#ef4444",
        background: "#fff",
        iconColor: "#ef4444",
      });
    }
  };

  const contactInfo = [
    { icon: FiMail, label: "Email", value: "Psazzadul@gmail.com", link: "mailto:Psazzadul@gmail.com" },
    { icon: FiPhone, label: "Phone", value: "+880 1234 567890", link: "tel:+8801234567890" },
    { icon: FiMapPin, label: "Location", value: "Dhaka, Bangladesh" },
    { icon: FiClock, label: "Response Time", value: "Within 24 hours" },
  ];

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 md:px-6 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-200 rounded-full filter blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={headerVariants} className="text-center mb-12">
          <motion.h3
            variants={headerVariants}
            className="uppercase font-bold text-black text-4xl md:text-5xl mb-4 font-poppins"
          >
            Contact
          </motion.h3>

          <motion.div
            variants={headerVariants}
            className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-8"
          />

          <motion.p
            variants={headerVariants}
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-gray-700 font-poppins"
          >
            Feel free to contact me by submitting the form below. I'll get back to
            you as soon as possible.
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <motion.div
            variants={infoCardVariants}
            className="lg:col-span-1 space-y-4"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  variants={inputVariants}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg text-white"
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <p className="text-sm text-gray-500">{info.label}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-800 font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Social Proof */}
            <motion.div
              variants={inputVariants}
              className="bg-gradient-to-br from-blue-600 to-indigo-600 p-6 rounded-xl shadow-lg text-white"
            >
              <h4 className="font-semibold mb-2">Why Contact Me?</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4" />
                  <span>Quick response within 24h</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4" />
                  <span>Free consultation</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4" />
                  <span>Detailed project discussion</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={formVariants}
            className="lg:col-span-2"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100"
            >
              {/* Name Field */}
              <motion.div
                variants={inputVariants}
                className="mb-5"
              >
                <label htmlFor="name" className="block font-semibold mb-2 text-gray-700">
                  <span className="flex items-center gap-2">
                    <FiUser className="w-4 h-4 text-blue-600" />
                    Your Name <span className="text-red-500">*</span>
                  </span>
                </label>
                <motion.div
                  whileFocus="focus"
                  variants={inputVariants}
                >
                  <input
                    id="name"
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition-all ${errors.name
                        ? "border-red-400 ring-2 ring-red-200"
                        : focusedField === "name"
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-300"
                      }`}
                    placeholder="John Doe"
                  />
                </motion.div>
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-red-600 mt-1 flex items-center gap-1"
                    >
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.name.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Email Field */}
              <motion.div
                variants={inputVariants}
                className="mb-5"
              >
                <label htmlFor="email" className="block font-semibold mb-2 text-gray-700">
                  <span className="flex items-center gap-2">
                    <FiMail className="w-4 h-4 text-blue-600" />
                    Your Email <span className="text-red-500">*</span>
                  </span>
                </label>
                <motion.div
                  whileFocus="focus"
                  variants={inputVariants}
                >
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
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition-all ${errors.email
                        ? "border-red-400 ring-2 ring-red-200"
                        : focusedField === "email"
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-300"
                      }`}
                    placeholder="john@example.com"
                  />
                </motion.div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-red-600 mt-1 flex items-center gap-1"
                    >
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Message Field */}
              <motion.div
                variants={inputVariants}
                className="mb-6"
              >
                <label htmlFor="message" className="block font-semibold mb-2 text-gray-700">
                  <span className="flex items-center gap-2">
                    <FiMessageSquare className="w-4 h-4 text-blue-600" />
                    Message <span className="text-red-500">*</span>
                  </span>
                </label>
                <motion.div
                  whileFocus="focus"
                  variants={inputVariants}
                  className="relative"
                >
                  <textarea
                    id="message"
                    rows="6"
                    {...register("message", { required: "Message is required" })}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 border rounded-xl resize-none focus:outline-none transition-all ${errors.message
                        ? "border-red-400 ring-2 ring-red-200"
                        : focusedField === "message"
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-300"
                      }`}
                    placeholder="Your message here..."
                  />
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${(charCount / 500) * 100}%` }}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-b-xl"
                  />
                </motion.div>
                <div className="flex justify-between items-center mt-1">
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-red-600 flex items-center gap-1"
                      >
                        <FiAlertCircle className="w-4 h-4" />
                        {errors.message.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <motion.span
                    animate={{ color: charCount > 400 ? "#ef4444" : "#6b7280" }}
                    className="text-xs text-gray-500 ml-auto"
                  >
                    {charCount}/500
                  </motion.span>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 relative overflow-hidden group"
                >
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </span>
                </button>
              </motion.div>

              {/* Form Footer */}
              <motion.p
                variants={inputVariants}
                className="text-xs text-center text-gray-500 mt-4"
              >
                Your information is safe and will never be shared with third parties.
              </motion.p>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactForm;