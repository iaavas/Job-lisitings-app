"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2, Save, X } from "lucide-react";

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
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`/api/jobs/${id}`);
        fetchJobs(currentPage);
        alert("Job deleted successfully!");
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("Failed to delete job. Please try again.");
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
        alert("Job updated successfully!");
      } else {
        await axios.post("/api/jobs", jobForm);
        alert("Job created successfully!");
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
      alert("Failed to submit job. Please try again.");
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
    <>
      <div className="min-h-screen bg-white py-10 px-5">
        <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-blue-800 text-white p-6">
            <h1 className="text-3xl font-bold text-center">
              Job Management Dashboard
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6 bg-gray-50">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  value={jobForm.title}
                  onChange={(e) =>
                    setJobForm({ ...jobForm, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter job title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={jobForm.company}
                  onChange={(e) =>
                    setJobForm({ ...jobForm, company: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={jobForm.location}
                  onChange={(e) =>
                    setJobForm({ ...jobForm, location: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter job location"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary (Optional)
                </label>
                <input
                  type="number"
                  value={jobForm.salary || ""}
                  onChange={(e) =>
                    setJobForm({ ...jobForm, salary: Number(e.target.value) })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter salary"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description
                </label>
                <textarea
                  value={jobForm.description}
                  onChange={(e) =>
                    setJobForm({ ...jobForm, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter job description"
                  rows={4}
                  required
                ></textarea>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Requirements
              </label>
              {jobForm.requirements?.map((req, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder={`Requirement ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="ml-2 text-red-500 hover:text-red-600"
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addRequirement}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800"
              >
                Add Requirement
              </button>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              {isEditing && (
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center"
                >
                  <X className="mr-2" /> Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
              >
                <Save className="mr-2" />{" "}
                {isEditing ? "Update Job" : "Create Job"}
              </button>
            </div>
          </form>

          {/* Jobs Table */}
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr
                      key={job._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3">{job.title}</td>
                      <td className="px-4 py-3">{job.company}</td>
                      <td className="px-4 py-3">{job.location}</td>
                      <td className="px-4 py-3 flex justify-center space-x-2">
                        <button
                          onClick={() => startEditing(job)}
                          className="text-yellow-500 hover:text-yellow-600 transition"
                          title="Edit Job"
                        >
                          <Pencil />
                        </button>
                        <button
                          onClick={() => handleDelete(job._id!)}
                          className="text-red-500 hover:text-red-600 transition"
                          title="Delete Job"
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center p-6 bg-gray-100">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 flex items-center"
            >
              Prev
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 flex items-center"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminJobsPage;
