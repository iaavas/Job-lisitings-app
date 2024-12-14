import JobDetails from "@/app/components/JobDetails";
import Navbar from "@/app/components/Navbar";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <Navbar />
      <div className="p-4 bg-gray-50 rounded-lg">
        <JobDetails id={id} />
      </div>
    </>
  );
}
