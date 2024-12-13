// // pages/api/apply/[jobId].ts
// import type { NextApiRequest, NextApiResponse } from "next";
// import { z } from "zod";
// import formidable from "formidable";

// import path from "path";

// // Disable bodyParser to handle form-data
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // Zod Schema for Validation
// const ApplicationSchema = z.object({
//   fullName: z.string().min(2, "Full name is required"),
//   email: z.string().email("Invalid email format"),
//   coverLetter: z.string().optional(),
// });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const form = new formidable.IncomingForm();
//   form.uploadDir = path.join(process.cwd(), "public", "uploads");
//   form.keepExtensions = true;

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       return res.status(500).json({ error: "File upload failed" });
//     }

//     try {
//       // Validate form data
//       const validatedData = ApplicationSchema.parse({
//         fullName: fields.fullName as string,
//         email: fields.email as string,
//         coverLetter: fields.coverLetter as string,
//       });

//       // Handle resume upload
//       const resumeFile = files.resume as formidable.File;
//       const resumePath = resumeFile
//         ? `/uploads/${path.basename(resumeFile.filepath)}`
//         : null;

//       // TODO: Save application to database
//       // This would typically involve creating an Application model and saving the data

//       res.status(200).json({
//         message: "Application submitted successfully",
//         application: {
//           ...validatedData,
//           resumePath,
//         },
//       });
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         return res.status(400).json({
//           errors: error.errors.map((e) => e.message),
//         });
//       }
//       res.status(500).json({ error: "Submission failed" });
//     }
//   });
// }
