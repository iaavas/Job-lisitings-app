"use client";
import { useState, useEffect } from "react";
import useFavoriteJobsStore from "@/app/stores/favoriteJobsStore";
import JobApplicationForm from "@/app/components/JobApplicationForm";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements?: string[];
  salary?: number;
}

interface JobDetailsParams {
  id: string;
}

const JobDetails: React.FC<JobDetailsParams> = ({ id }) => {
  const [job, setJob] = useState<Job | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const { addFavoriteJob, removeFavoriteJob, isFavorite } =
    useFavoriteJobsStore();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`/api/jobs/${id}`);
        const data = await response.json();

        if (response.ok) {
          setJob(data.job);
        } else {
          console.error("Failed to fetch job details:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch job details", error);
      }
    };

    if (id) fetchJobDetails();
  }, [id]);

  if (!job) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  const toggleFavorite = () => {
    if (isFavorite(job._id)) {
      removeFavoriteJob(job._id);
    } else {
      addFavoriteJob(job);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {job.title}
              </h1>
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <span>{job.company}</span>
                <span className="text-gray-400">•</span>
                <span>{job.location}</span>
              </div>
            </div>
            <button
              onClick={toggleFavorite}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isFavorite(job._id)
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-500"
              } hover:bg-opacity-80 transition-colors`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill={isFavorite(job._id) ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          {job.salary && (
            <div className="text-xl font-semibold text-green-600 mt-2">
              ${job.salary.toLocaleString()} / year
            </div>
          )}
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Job Description
          </h2>
          <p className="text-gray-700 mb-6">{job.description}</p>

          {job.requirements && job.requirements.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Requirements
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={() => setShowApplicationForm(!showApplicationForm)}
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {showApplicationForm
                ? "Close Application Form"
                : "Apply for this Job"}
            </button>

            {showApplicationForm && (
              <div className="mt-6">
                <JobApplicationForm jobId={job._id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
