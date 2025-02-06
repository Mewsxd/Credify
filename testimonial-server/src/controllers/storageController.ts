// import multer from "multer";
// import supabase from "../util/supabase";

import { Request, Response } from "express";
import catchAsync from "../util/catchAsync";

// // Configure multer for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// app.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const filePath = `uploads/${Date.now()}-${req.file.originalname}`;

//     // Upload file to Supabase Storage
//     const { data, error } = await supabase.storage
//       .from("testimony-vids")
//       .upload(filePath, req.file.buffer, {
//         contentType: req.file.mimetype,
//       });

//     if (error) {
//       throw error;
//     }

//     return res.json({ message: "File uploaded successfully", data });
//   } catch (error) {
//     console.error("Upload error:", error);
//     return res.status(500).json({ error: error.message });
//   }
// });

// import { createClient } from "@supabase/supabase-js";
// import { NextApiRequest, NextApiResponse } from "next";
// import formidable from "formidable";
// import fs from "fs";
// import path from "path";

// export const config = {
//     api: {
//       bodyParser: false,
//     },
//   };

//   export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== "POST") {
//       return res.status(405).json({ error: "Method not allowed" });
//     }

//     const form = new formidable.IncomingForm();
//     form.uploadDir = path.join(process.cwd(), "public/uploads");
//     form.keepExtensions = true;

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         return res.status(500).json({ error: "Error parsing the form" });
//       }

//       const { spaceName, title, message } = fields;
//       const imageFile = files.image as formidable.File;

//       if (!imageFile) {
//         return res.status(400).json({ error: "No image uploaded" });
//       }

//       const fileData = fs.readFileSync(imageFile.filepath);
//       const fileName = `${Date.now()}_${imageFile.originalFilename}`;

//       const { data, error } = await supabase.storage
//         .from("uploads") // Change 'uploads' to your Supabase storage bucket
//         .upload(fileName, fileData, {
//           contentType: imageFile.mimetype || "image/jpeg",
//         });

//       if (error) {
//         return res.status(500).json({ error: "Failed to upload image" });
//       }

//       return res.status(200).json({ imageUrl: data?.path, spaceName, title, message });
//     });
//   }

// const sendImage = async (req: Request, res: Response) => {
//   const { file } = req.body;
//   console.log(file);
// };
