import connectMongoDB from "@/app/lib/mongodb";
import Job from "@/app/models/job.model";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  await connectMongoDB();

  try {
    const { searchParams } = new URL(req.url);
    const pageNumber: number = parseInt(searchParams.get("page") || "1");
    const limitNumber: number = parseInt(searchParams.get("limit") || "10");

    if (
      isNaN(pageNumber) ||
      isNaN(limitNumber) ||
      pageNumber <= 0 ||
      limitNumber <= 0
    ) {
      return NextResponse.json(
        { message: "Invalid page or limit parameters" },
        { status: 400 }
      );
    }

    const totalJobs = await Job.countDocuments();
    const jobs = await Job.find()
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    return NextResponse.json({
      jobs,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalJobs / limitNumber),
      totalJobs,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching jobs", error },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  await connectMongoDB();

  try {
    const body = await req.json();

    const newJob = await Job.create(body);
    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating job", error },
      { status: 500 }
    );
  }
};
