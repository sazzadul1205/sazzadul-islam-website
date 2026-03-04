"use client"

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiCopy,
  FiCheck,
  FiUser,
  FiShield,
  FiAlertCircle,
  FiUnlock,
  FiEye,
  FiEyeOff
} from "react-icons/fi";
import {
  FaUserTie,
  FaUserCog,
  FaUserFriends,
  FaExclamationTriangle,
  FaLock
} from "react-icons/fa";

// Protect against browser reading/caching
if (typeof window !== 'undefined') {
  // Disable right click
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  // Disable keyboard shortcuts for viewing source
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && e.key === 'I') || // Ctrl+Shift+I
      (e.ctrlKey && e.shiftKey && e.key === 'J') || // Ctrl+Shift+J
      (e.ctrlKey && e.key === 'U') || // Ctrl+U
      (e.ctrlKey && e.key === 'S') // Ctrl+S
    ) {
      e.preventDefault();
    }
  });
}

const credentials = [
  {
    email: "psazzadul@gmail.com",
    password: "NM5,2?3k#]f>~uk",
    role: "Admin",
    icon: FaUserTie,
    color: "from-purple-500 to-purple-700"
  },
  {
    email: "www.sazzadul14@gmail.com",
    password: "-}8+/@~Z9z(5Udl",
    role: "Manager",
    icon: FaUserCog,
    color: "from-blue-500 to-blue-700"
  },
  {
    email: "psazzadul1205@gmail.com",
    password: "rnL2]77F^jnH11+",
    role: "Staff",
    icon: FaUserFriends,
    color: "from-green-500 to-green-700"
  },
  {
    email: "spritom1205@gmail.com",
    password: "ozyLVZ^%>l748z*",
    role: "Staff",
    icon: FaUserFriends,
    color: "from-green-500 to-green-700"
  },
];

// Password Modal Component
const PasswordModal = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  // Get passwords from environment variables
  const validPasswords = [
    process.env.NEXT_PUBLIC_ADMIN_PASSWORD_1,
    process.env.NEXT_PUBLIC_ADMIN_PASSWORD_2,
  ].filter(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validPasswords.includes(password)) {
      setError("");
      setPassword("");
      setAttempts(0);
      onSuccess();
    } else {
      setError("Invalid password. Please try again.");
      setAttempts((prev) => prev + 1);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="text-black">
          {/* Blurred Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50"
            style={{ backdropFilter: "blur(8px)" }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative border border-gray-200">
              {/* Lock Icon */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full shadow-lg">
                  <FaLock className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Header */}
              <div className="text-center mt-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Protected Area
                </h2>
                <p className="text-gray-600">
                  Enter your password to access employee credentials
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter password"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <FiEyeOff className="w-5 h-5" />
                      ) : (
                        <FiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-600 text-sm flex items-center gap-2 bg-red-50 p-2 rounded-lg"
                    >
                      <FaExclamationTriangle className="w-4 h-4" />
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Attempts indicator */}
                {attempts > 0 && (
                  <p className="text-xs text-gray-500 text-center">
                    Failed attempts: {attempts}/5
                  </p>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <FiUnlock className="w-4 h-4" />
                    Unlock
                  </button>
                </div>
              </form>

              {/* Hint */}
              <p className="text-xs text-center text-gray-400 mt-4">
                Authorized personnel only
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const EMP = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  // Additional protection - clear sensitive data from memory when component unmounts
  useEffect(() => {
    return () => {
      // Clear any sensitive data
      setCopiedIndex(null);
      setCopiedField(null);
    };
  }, []);

  const copyToClipboard = (text, index, field) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedIndex(null);
      setCopiedField(null);
    }, 2000);
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    setShowPasswordModal(false);
  };

  const handleClose = () => {
    // Redirect to home or show message when cancelled
    window.location.href = "/";
  };

  // Show password modal when locked
  if (!isUnlocked) {
    return (
      <>
        <PasswordModal
          isOpen={showPasswordModal}
          onClose={handleClose}
          onSuccess={handleUnlock}
        />

        {/* Blurred background content */}
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 filter blur-sm">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Employee Credentials
            </h1>
            <p className="text-gray-600">
              🔒 Locked - Enter password to view
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="max-w-4xl w-full px-4 py-8"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <FiUser className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Employee Credentials
          </h1>
          <p className="text-gray-600">
            Securely access employee login information
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((item, index) => {
            const RoleIcon = item.icon;
            const isCopied = copiedIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
              >
                {/* Card Header with Role */}
                <div className={`bg-gradient-to-r ${item.color} p-4 text-white`}>
                  <div className="flex items-center gap-3">
                    <RoleIcon className="w-6 h-6" />
                    <span className="font-semibold">{item.role}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4">
                  {/* Email Field */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <FiMail className="w-4 h-4" />
                        Email
                      </span>
                      <button
                        onClick={() => copyToClipboard(item.email, index, 'email')}
                        className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1 text-sm"
                      >
                        {copiedIndex === index && copiedField === 'email' ? (
                          <>
                            <FiCheck className="w-4 h-4 text-green-600" />
                            <span className="text-green-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <FiCopy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-gray-800 font-mono text-sm bg-gray-50 p-2 rounded border border-gray-200 break-all">
                      {item.email}
                    </p>
                  </div>

                  {/* Password Field */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <FiLock className="w-4 h-4" />
                        Password
                      </span>
                      <button
                        onClick={() => copyToClipboard(item.password, index, 'password')}
                        className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1 text-sm"
                      >
                        {copiedIndex === index && copiedField === 'password' ? (
                          <>
                            <FiCheck className="w-4 h-4 text-green-600" />
                            <span className="text-green-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <FiCopy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-gray-800 font-mono text-sm bg-gray-50 p-2 rounded border border-gray-200">
                      ••••••••••••
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-gray-500 bg-white p-4 rounded-lg shadow border border-gray-100"
        >
          <FiAlertCircle className="inline-block w-4 h-4 mr-1 text-yellow-500" />
          These credentials are for testing purposes only. Do not share with unauthorized personnel.
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EMP;