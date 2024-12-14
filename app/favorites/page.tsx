"use client";
import React from "react";

import useFavoriteJobsStore from "@/app/stores/favoriteJobsStore";
import Job from "@/app/types/job.type";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";

const FavoritesPage = () => {
  const { favoriteJobs } = useFavoriteJobsStore();

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-8  bg-gray-50 h-screen">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Favorite Jobs
        </h1>

        {favoriteJobs.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p className="text-xl">
              You haven&apos;t saved any favorite jobs yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favoriteJobs.map((job: Job) => (
              <JobCard job={job} key={job._id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FavoritesPage;
