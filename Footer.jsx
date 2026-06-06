import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Educators Academy
            </h2>
            <p className="text-gray-400 text-sm leading-6">
              We are providing great eduaction to our students since 2001 
              and our students are highly eduacted with bright future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>

              <li>
                <a href="/about" className="hover:text-white transition">
                  About Us
                </a>
              </li>

              <li>
                <a href="/destinations" className="hover:text-white transition">
                  Courses
                </a>
              </li>

              <li>
                <a href="/contact" className="hover:text-white transition">
                  Gallery
                </a>
              </li>

                 <li>
                <a href="/destinations" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Services
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>Yearly eduaction</li>
              <li>Selectives subjects</li>
              <li>Computer courses</li>
              <li>English courses</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Contact Us
            </h3>

            <div className="space-y-2 text-gray-400 text-sm">
              <p>Email: info@EducatorsAcademy.com</p>
              <p>Phone: +92 300 1234567</p>
              <p>Address: Karachi, Pakistan</p>
            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} EducatorsAcademy. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;