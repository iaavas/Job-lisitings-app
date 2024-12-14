"use client";
import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import JobCard from "./JobCard";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
}

const JobList: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/jobs?page=${page}&limit=6`);
        const data = await response.json();
        setJobs(data.jobs);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [page]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Job Listings
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard job={job} key={job._id} />
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-600"
        >
          Prev
        </button>
        <span className="self-center text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobList;
