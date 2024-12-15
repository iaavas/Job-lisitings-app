"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Home, Briefcase, User, Star, Menu, X } from "lucide-react";
import useFavoriteJobsStore from "../stores/favoriteJobsStore";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { favoriteJobs } = useFavoriteJobsStore();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/jobs", label: "Jobs", icon: Briefcase },
    { href: "/admin", label: "Admin", icon: User },
    { href: "/favorites", label: "Favorites", icon: Star },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-100 z-40 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 text-blue-600 mr-3 group-hover:rotate-6 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                JobBoard
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-2">
            {NavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 group transition-all duration-300 ease-in-out"
              >
                <link.icon className="h-5 w-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                <span>{link.label}</span>
                {link.label === "Favorites" && favoriteJobs.length > 0 && (
                  <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full group-hover:bg-blue-600 transition-colors">
                    {favoriteJobs.length}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 bg-white shadow-lg sm:hidden animate-slide-down">
          <div className="pt-2 pb-6 space-y-1 px-3">
            {NavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center space-x-3 px-3 py-3 rounded-lg text-lg font-medium transition-all"
                onClick={toggleMobileMenu}
              >
                <link.icon className="h-6 w-6 text-gray-500" />
                <span>{link.label}</span>
                {link.label === "Favorites" && favoriteJobs.length > 0 && (
                  <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {favoriteJobs.length}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
