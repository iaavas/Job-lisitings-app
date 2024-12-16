import JobList from "@/app/components/JobList";

async function fetchJobs(page: number = 1, limit: number = 6) {
  const API_URL = process.env.API_URL || "http://localhost:3000";
  try {
    const response = await fetch(
      `${API_URL}/api/jobs?page=${page}&limit=${limit}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return { jobs: [], currentPage: 1, totalPages: 0 };
  }
}

export const revalidate = 60;

export const dynamicParams = true;

export async function generateStaticParams() {
  const API_URL = process.env.API_URL || "http://localhost:3000";

  try {
    const response = await fetch(`${API_URL}/api/jobs?limit=1`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch job count");
    }

    const data = await response.json();

    const totalPages = data.totalPages;

    const params = [];
    for (let page = 1; page <= totalPages; page++) {
      params.push({
        page: String(page),
      });
    }

    return params;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page } = await searchParams;

  const pageNumber = parseInt(page as string, 10) || 1;

  try {
    const { jobs, currentPage, totalPages } = await fetchJobs(pageNumber);

    return (
      <div className="p-4 bg-gray-50/0 rounded-lg min-h-screen">
        <JobList
          jobs={jobs}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    );
  } catch (error) {
    console.error("Error rendering page:", error);
    return <div>Error loading jobs</div>;
  }
}
