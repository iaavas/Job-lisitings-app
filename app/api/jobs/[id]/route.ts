import connectMongoDB from "@/app/lib/mongodb";
import Job from "@/app/models/job.model";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  context: { params: { id: string } }
) => {
  await connectMongoDB();

  try {
    const jobId = context.params.id;

    console.log("aaavash dai job id is", jobId);

    if (!jobId) {
      return NextResponse.json(
        { message: "Invalid page or limit parameters" },
        { status: 400 }
      );
    }

    const job = await Job.findById(jobId);

    return NextResponse.json({
      job,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching job", error },
      { status: 500 }
    );
  }
};
