import { NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const name = formData.get("name") as string;

  if (!file || !name) {
    return NextResponse.json({ error: "Missing file or name" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const stream = Readable.from(buffer);

  const uniquePublicId = `${name}-${Date.now()}`;

  const uploadPromise = (): Promise<UploadApiResponse> =>
    new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "uploads",
          public_id: uniquePublicId,
          overwrite: false,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else if (result) resolve(result);
          else reject(new Error("Unknown Cloudinary error"));
        }
      );

      stream.pipe(uploadStream);
    });

  try {
    const result = await uploadPromise();

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Cloudinary upload failed" },
      { status: 500 }
    );
  }
}
