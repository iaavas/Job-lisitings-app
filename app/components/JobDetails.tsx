"use client";
import { useState, useEffect } from "react";
import useFavoriteJobsStore from "@/app/stores/favoriteJobsStore";
import JobApplicationForm from "@/app/components/JobApplicationForm";
import Loader from "./Loader";
import Job from "@/app/types/job.type";
import { BookmarkIcon, MapPinIcon, BriefcaseIcon } from "lucide-react";

interface JobDetailsParams {
  id: string;
}

const Modal: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({
  children,
  onClose,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white  shadow-2xl max-w-lg w-full p-8 relative transform transition-all duration-300 ease-out">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors rounded-full p-2 hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

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
    return <Loader />;
  }

  const toggleFavorite = () => {
    if (isFavorite(job._id)) {
      removeFavoriteJob(job._id);
    } else {
      addFavoriteJob(job);
    }
  };

  return (
    <div className="container mx-auto  py-8 w-full">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0">
            <div className="flex-grow pr-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {job.title}
              </h1>
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <BriefcaseIcon className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">{job.company}</span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="h-5 w-5 text-gray-500" />
                  <span>{job.location}</span>
                </div>
              </div>
            </div>
            <button
              onClick={toggleFavorite}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                isFavorite(job._id)
                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
              aria-label="Favorite Job"
            >
              <BookmarkIcon
                className={`h-7 w-7 ${
                  isFavorite(job._id) ? "fill-current" : ""
                }`}
              />
            </button>
          </div>

          {job.salary && (
            <div className="flex items-center space-x-2 text-xl font-semibold text-green-700 mt-4">
              <span>${job.salary.toLocaleString()} / year</span>
            </div>
          )}
        </div>

        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-3">
            Job Description
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            {job.description}
          </p>

          {job.requirements && job.requirements.length > 0 && (
            <div className="mb-6 bg-gray-50 p-5 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-3 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Requirements
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-3">
                {job.requirements.map((req, index) => (
                  <li key={index} className="pl-2">
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={() => setShowApplicationForm(true)}
              className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out transform hover:scale-[1.02] shadow-md hover:shadow-lg"
            >
              Apply for this Job
            </button>

            {showApplicationForm && (
              <Modal onClose={() => setShowApplicationForm(false)}>
                <JobApplicationForm jobId={job._id} />
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
