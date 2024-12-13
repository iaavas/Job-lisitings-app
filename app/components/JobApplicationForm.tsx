"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod Schema for Form Validation
const ApplicationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email format"),
  coverLetter: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof ApplicationSchema>;

interface JobApplicationFormProps {
  jobId: string;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ jobId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(ApplicationSchema),
  });

  const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setResumeFileName(files[0].name);
    } else {
      setResumeFileName(null);
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    if (data.coverLetter) {
      formData.append("coverLetter", data.coverLetter);
    }

    // Add resume file if selected
    const resumeInput = document.getElementById("resume") as HTMLInputElement;
    if (resumeInput?.files && resumeInput.files.length > 0) {
      formData.append("resume", resumeInput.files[0]);
    }

    try {
      const response = await fetch(`/api/apply/${jobId}`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        reset();
        setResumeFileName(null);
        setTimeout(() => setSubmitSuccess(false), 3000);
      } else {
        setSubmitError(result.errors?.join(", ") || "Submission failed");
      }
    } catch (e) {
      console.error(e);
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Job Application
      </h2>

      {submitSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          Application submitted successfully!
        </div>
      )}

      {submitError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-medium mb-2"
          >
            Full Name
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            {...register("fullName")}
            className={`
              w-full px-3 py-2 border rounded-md focus:outline-none
              ${
                errors.fullName
                  ? "border-red-500 focus:ring-2 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }
            `}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email Address
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`
              w-full px-3 py-2 border rounded-md focus:outline-none
              ${
                errors.email
                  ? "border-red-500 focus:ring-2 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }
            `}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="resume"
            className="block text-gray-700 font-medium mb-2"
          >
            Resume
            <span className="text-gray-500 ml-1">(Optional)</span>
          </label>
          <div className="relative">
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <span className="text-gray-600">
                {resumeFileName || "Upload Resume"}
              </span>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="coverLetter"
            className="block text-gray-700 font-medium mb-2"
          >
            Cover Letter
            <span className="text-gray-500 ml-1">(Optional)</span>
          </label>
          <textarea
            id="coverLetter"
            {...register("coverLetter")}
            rows={4}
            className="
              w-full px-3 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
            "
            placeholder="Write your cover letter (optional)"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full py-3 rounded-md text-white font-semibold transition-colors
            ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }
          `}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
