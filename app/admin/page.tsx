"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2, Save, X, PlusCircle } from "lucide-react";

interface Job {
  _id?: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements?: string[];
  salary?: number;
  createdAt?: Date;
}

const AdminJobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [jobForm, setJobForm] = useState<Job>({
    title: "",
    company: "",
    location: "",
    description: "",
    requirements: [],
    salary: undefined,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const fetchJobs = async (page = 1) => {
    try {
      const response = await axios.get<{
        jobs: Job[];
        currentPage: number;
        totalPages: number;
      }>(`/api/jobs?page=${page}&limit=10`);

      setJobs(response.data.jobs);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      alert("Failed to fetch jobs. Please try again.");
    }
  };

  const addRequirement = () => {
    setJobForm((prev) => ({
      ...prev,
      requirements: [...(prev.requirements || []), ""],
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setJobForm((prev) => {
      const updatedRequirements = [...(prev.requirements || [])];
      updatedRequirements[index] = value;
      return { ...prev, requirements: updatedRequirements };
    });
  };

  const removeRequirement = (index: number) => {
    setJobForm((prev) => {
      const updatedRequirements = [...(prev.requirements || [])];
      updatedRequirements.splice(index, 1);
      return { ...prev, requirements: updatedRequirements };
    });
  };

  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this job listing?")) {
      try {
        await axios.delete(`/api/jobs/${id}`);
        fetchJobs(currentPage);
        alert("Job listing deleted successfully!");
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("Failed to delete job listing. Please try again.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !jobForm.title ||
      !jobForm.company ||
      !jobForm.location ||
      !jobForm.description
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      if (isEditing && jobForm._id) {
        await axios.put(`/api/jobs/${jobForm._id}`, jobForm);
        alert("Job listing updated successfully!");
      } else {
        await axios.post("/api/jobs", jobForm);
        alert("Job listing created successfully!");
      }

      setJobForm({
        title: "",
        company: "",
        location: "",
        description: "",
        requirements: [],
        salary: undefined,
      });
      setIsEditing(false);
      fetchJobs(currentPage);
    } catch (error) {
      console.error("Error submitting job:", error);
      alert("Failed to submit job listing. Please try again.");
    }
  };

  const startEditing = (job: Job) => {
    setJobForm(job);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setJobForm({
      title: "",
      company: "",
      location: "",
      description: "",
      requirements: [],
      salary: undefined,
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen  py-12 px-0 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white  rounded-2xl overflow-hidden border border-blue-200">
        <div className="bg-blue-600 text-white p-6 shadow-md">
          <h1 className="text-4xl font-extrabold text-center tracking-tight">
            Job Management Dashboard
          </h1>
          <p className="text-center text-blue-100 mt-2">
            Create, Edit, and Manage Job Listings
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 bg-white space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium  ">Job Title</label>
              <input
                type="text"
                value={jobForm.title}
                onChange={(e) =>
                  setJobForm({ ...jobForm, title: e.target.value })
                }
                className="block w-full px-4 py-3 border   rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter job title"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium ">Company</label>
              <input
                type="text"
                value={jobForm.company}
                onChange={(e) =>
                  setJobForm({ ...jobForm, company: e.target.value })
                }
                className="block w-full px-4 py-3 border   rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter company name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium ">Location</label>
              <input
                type="text"
                value={jobForm.location}
                onChange={(e) =>
                  setJobForm({ ...jobForm, location: e.target.value })
                }
                className="block w-full px-4 py-3 border   rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter job location"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium  ">
                Salary (Optional)
              </label>
              <input
                type="number"
                value={jobForm.salary || ""}
                onChange={(e) =>
                  setJobForm({ ...jobForm, salary: Number(e.target.value) })
                }
                className="block w-full px-4 py-3 border   rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter salary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium  ">
              Job Description
            </label>
            <textarea
              value={jobForm.description}
              onChange={(e) =>
                setJobForm({ ...jobForm, description: e.target.value })
              }
              className="block w-full px-4 py-3 border   rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              placeholder="Enter detailed job description"
              rows={5}
              required
            ></textarea>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium  ">
                Job Requirements
              </label>
              <button
                type="button"
                onClick={addRequirement}
                className="flex items-center text-blue-600 hover:text-blue-800 transition"
              >
                <PlusCircle className="mr-2" /> Add Requirement
              </button>
            </div>
            {jobForm.requirements?.map((req, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => updateRequirement(index, e.target.value)}
                  className="flex-grow px-4 py-2 border   rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder={`Requirement ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeRequirement(index)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Remove Requirement"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            {isEditing && (
              <button
                type="button"
                onClick={cancelEditing}
                className="px-6 py-3 bg-blue-50 text-blue-800 rounded-lg hover:bg-blue-100 transition flex items-center"
              >
                <X className="mr-2" /> Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
            >
              <Save className="mr-2" />{" "}
              {isEditing ? "Update Job Listing" : "Create Job Listing"}
            </button>
          </div>
        </form>

        <div className="p-8 bg-blue-50">
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-blue-100 text-blue-800">
                <tr>
                  {["Title", "Company", "Location", "Actions"].map((header) => (
                    <th
                      key={header}
                      className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                        header === "Actions" ? "text-center" : ""
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr
                    key={job._id}
                    className="border-b hover:bg-blue-50 transition"
                  >
                    <td className="px-6 py-4">{job.title}</td>
                    <td className="px-6 py-4">{job.company}</td>
                    <td className="px-6 py-4">{job.location}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={() => startEditing(job)}
                          className="text-blue-500 hover:  transition"
                          title="Edit Job Listing"
                        >
                          <Pencil />
                        </button>
                        <button
                          onClick={() => handleDelete(job._id!)}
                          className="text-red-500 hover:text-red-700 transition"
                          title="Delete Job Listing"
                        >
                          <Trash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border-t border-blue-200 px-8 py-6 flex justify-between items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-6 py-3 bg-blue-50 text-blue-800 rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center"
          >
            Prev
          </button>
          <span className="  font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminJobsPage;
