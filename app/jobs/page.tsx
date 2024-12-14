import JobList from "@/app/components/JobList";
import Navbar from "@/app/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="p-4 bg-gray-50 rounded-lg">
        <JobList />
      </div>
    </>
  );
}
