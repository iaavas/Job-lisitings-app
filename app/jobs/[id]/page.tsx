import JobDetails from "@/app/components/JobDetails";

interface Params {
  id: string;
}

export default async function Page({ params }: { params: Params }) {
  const { id } = params;

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <JobDetails id={id} />
    </div>
  );
}
