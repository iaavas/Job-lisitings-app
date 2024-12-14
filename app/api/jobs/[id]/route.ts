import connectMongoDB from "@/app/lib/mongodb";
import Job from "@/app/models/job.model";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  context: { params: Promise<{ id: string }> }
) => {
  await connectMongoDB();

  try {
    const { id: jobId } = await context.params;

    console.log("Fetching job with ID:", jobId);

    if (!jobId) {
      return NextResponse.json({ message: "Invalid job ID" }, { status: 400 });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ job });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching job", error },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: Request,
  context: { params: Promise<{ id: string }> }
) => {
  await connectMongoDB();

  try {
    const { id: jobId } = await context.params;

    console.log("Deleting job with ID:", jobId);

    if (!jobId) {
      return NextResponse.json({ message: "Invalid job ID" }, { status: 400 });
    }

    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Job deleted successfully",
      deletedJob,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting job", error },
      { status: 500 }
    );
  }
};

export const PUT = async (
  req: Request,
  context: { params: Promise<{ id: string }> }
) => {
  await connectMongoDB();

  try {
    const { id: jobId } = await context.params;
    const updatedData = await req.json();

    console.log("Updating job with ID:", jobId);

    if (!jobId) {
      return NextResponse.json({ message: "Invalid job ID" }, { status: 400 });
    }

    const updatedJob = await Job.findByIdAndUpdate(jobId, updatedData, {
      new: true,
    });

    if (!updatedJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Job updated successfully",
      updatedJob,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating job", error },
      { status: 500 }
    );
  }
};
