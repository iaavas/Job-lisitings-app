import connectMongoDB from "@/app/lib/mongodb";
import Application from "@/app/models/application.model";
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();

    const { id: jobId } = await context.params;

    if (!jobId) {
      return NextResponse.json(
        { message: "Job ID is required" },
        { status: 400 }
      );
    }
    const formData = await req.formData();

    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const coverLetter = formData.get("coverLetter") as string | null;
    const resume = formData.get("resume") as File | null;

    if (!fullName || !email) {
      return NextResponse.json(
        { message: "Full name and email are required" },
        { status: 400 }
      );
    }

    let resumePath: string | undefined;

    if (resume) {
      const buffer = await resume.arrayBuffer();
      const fileName = `${Date.now()}_${resume.name}`;
      const filePath = path.join(process.cwd(), "public/uploads", fileName);

      await fs.writeFile(filePath, Buffer.from(buffer));
      resumePath = `/uploads/${fileName}`;
    }

    const application = await Application.create({
      fullName,
      email,
      coverLetter,
      resumePath,
      jobId,
    });

    await application.save();

    return NextResponse.json(
      { message: "Application submitted successfully", application },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error submitting application", error },
      { status: 500 }
    );
  }
}
