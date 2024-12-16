"use client";
import React from "react";
import Link from "next/link";
import { MapPin, Briefcase, BookmarkIcon } from "lucide-react";
import Job from "../types/job.type";
import useFavoriteJobsStore from "../stores/favoriteJobsStore";

const JobCard = ({ job }: { job: Job }) => {
  const { addFavoriteJob, removeFavoriteJob, isFavorite } =
    useFavoriteJobsStore();

  const toggleFavorite = (job: Job) => {
    if (isFavorite(job._id)) {
      removeFavoriteJob(job._id);
    } else {
      addFavoriteJob(job);
    }
  };

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ease-in-out">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-grow pr-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2 truncate">
              {job.title}
            </h2>
            <div className="flex items-center space-x-2 text-gray-600 mb-2">
              <Briefcase className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">{job.company}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500 mb-4">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{job.location}</span>
            </div>
          </div>

          <button
            onClick={() => toggleFavorite(job)}
            aria-label="Favorite Job"
            className={`
              relative z-10 w-10 h-10 rounded-full flex items-center justify-center
              transition-all duration-200 ease-in-out
              ${
                isFavorite(job._id)
                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }
              focus:outline-none focus:ring-2 focus:ring-offset-2 
              ${
                isFavorite(job._id)
                  ? "focus:ring-red-200"
                  : "focus:ring-gray-300"
              }
            `}
          >
            <BookmarkIcon
              className={`w-5 h-5 transition-transform duration-300 ${
                isFavorite(job._id) ? "fill-current" : "hover:scale-110"
              }`}
            />
          </button>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-3 text-sm leading-relaxed">
          {job.description}
        </p>

        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
          <Link
            href={`/jobs/${job._id}`}
            className="
              text-blue-600 hover:text-blue-800 
              font-semibold text-sm
              transition-colors duration-200
              flex items-center space-x-1
              group-hover:underline
            "
          >
            <span>View Details</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div
        className="
          absolute inset-0 
          border-2 border-transparent 
          group-hover:border-blue-200 
          rounded-xl 
          pointer-events-none 
          transition-all 
          duration-300 
          ease-in-out
        "
      ></div>
    </div>
  );
};

export default JobCard;
