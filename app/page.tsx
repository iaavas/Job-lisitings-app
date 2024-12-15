import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Briefcase, Bookmark, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16 lg:py-24">
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                <span className="block">Find Your Dream</span>
                <span className="block text-blue-600">Career Path</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                Discover exciting job opportunities across various industries.
                Your next career move starts here with personalized job matching
                and comprehensive career resources.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
              <Link
                href="/jobs"
                className="group flex items-center justify-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
              >
                <Briefcase className="h-5 w-5" />
                <span>Browse Jobs</span>
                <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="/favorites"
                className="group flex items-center justify-center space-x-2 px-8 py-3 bg-blue-50 text-blue-700 rounded-lg transition-all duration-300 hover:bg-blue-100 hover:shadow-md"
              >
                <Bookmark className="h-5 w-5" />
                <span>Saved Jobs</span>
                <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-3xl font-bold text-blue-600">5K+</p>
                <p className="text-sm text-gray-600">Job Listings</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">200+</p>
                <p className="text-sm text-gray-600">Companies</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">95%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
            </div>
          </div>

          <div className="">
            <div className="relative">
              <Image
                src="/home.jpeg"
                alt="Career Opportunities"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl transform transition-transform hover:scale-105"
              />
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
