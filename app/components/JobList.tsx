import React from "react";
import JobCard from "./JobCard";
import Pagination from "./Pagination";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
}

interface JobListProps {
  jobs: Job[];
  currentPage: number;
  totalPages: number;
}

const JobList: React.FC<JobListProps> = ({ jobs, currentPage, totalPages }) => {
  return (
    <div className="container mx-auto sm:px-4 px-1 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Job Listings
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard job={job} key={job._id} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default JobList;
