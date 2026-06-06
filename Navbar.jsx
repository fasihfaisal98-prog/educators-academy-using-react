import React, { useState } from "react";
import { Menu, X } from "lucide-react";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    program: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Admission Form Data:", formData);

    alert(
      `Admission Submitted Successfully!

Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Program: ${formData.program}
Message: ${formData.message}`
    );

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      program: "",
      message: "",
    });

    // Close modal
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold text-black">
              Educators<span className = ' text-blue-600'>Academy</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Home
              </a>

              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                About
              </a>

              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Programs
              </a>

              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Contact
              </a>

              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition"
              >
                Get Admission
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 border-t pt-4 space-y-4">
              <a
                href="#"
                className="block text-gray-700 hover:text-blue-600"
              >
                Home
              </a>

              <a
                href="#"
                className="block text-gray-700 hover:text-blue-600"
              >
                About
              </a>

              <a
                href="#"
                className="block text-gray-700 hover:text-blue-600"
              >
                Programs
              </a>

              <a
                href="#"
                className="block text-gray-700 hover:text-blue-600"
              >
                Contact
              </a>

              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Get Admission
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Admission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Admission Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Program */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Select Program
                </label>

                <select
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose a Program</option>
                  <option value="Web Development">
                    Web Development
                  </option>
                  <option value="Graphic Design">
                    Graphic Design
                  </option>
                  <option value="Digital Marketing">
                    Digital Marketing
                  </option>
                  <option value="Class 9th">
                    Class 9th
                  </option>
                   <option value="Class 10th">
                    Class 10th
                  </option>
                   <option value="Class 11th">
                    Class 11th
                  </option>
                   <option value="Class 12th">
                    Class 12th
                  </option>
                   <option value="Entry test classes">
                    Entry test classes
                  </option>
                     <option value="Selectives Subjects">
                    Selectives Subjects
                  </option>
                  
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Message
                </label>

                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition"
              >
                Submit Admission
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
