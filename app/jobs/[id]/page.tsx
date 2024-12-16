import JobDetails from "@/app/components/JobDetails";
import Job from "@/app/types/job.type";

export const revalidate = 60;

export const dynamicParams = true;

export async function generateStaticParams() {
  const API_URL = process.env.API_URL || "http://localhost:3000";

  try {
    const response = await fetch(`${API_URL}/api/jobs`);
    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }
    const data = await response.json();

    return data["jobs"].map((job: Job) => ({
      id: String(job._id),
    }));
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const API_URL = process.env.API_URL || "http://localhost:3000";
  const data = await fetch(`${API_URL}/api/jobs/${id}`).then((res) =>
    res.json()
  );

  return (
    <>
      <div className="p-4 bg-gray-50/0 rounded-lg">
        <JobDetails job={data["job"]} />
      </div>
    </>
  );
}
