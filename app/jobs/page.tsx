import JobList from "@/app/components/JobList";

export default function Home() {
  return (
    <>
      <div className="p-4 bg-gray-50/0 rounded-lg min-h-screen">
        <JobList />
      </div>
    </>
  );
}
