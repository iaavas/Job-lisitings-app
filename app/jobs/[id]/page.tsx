import JobDetails from "@/app/components/JobDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <div className="p-4 bg-gray-50/0 rounded-lg">
        <JobDetails id={id} />
      </div>
    </>
  );
}
