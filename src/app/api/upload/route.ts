import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    // Next.js standard boundary checks
    const reqInstance = new NextRequest(req);
    const formData = await reqInstance.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    try {
      // 1. Attempt local file system write (Works in local dev environment)
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadsDir, { recursive: true });

      const fileExt = path.extname(file.name);
      const baseName = path.basename(file.name, fileExt).replace(/[^a-zA-Z0-9_-]/g, "_");
      const uniqueFileName = `${Date.now()}_${baseName}${fileExt}`;
      const filePath = path.join(uploadsDir, uniqueFileName);

      await fs.writeFile(filePath, buffer);

      const fileUrl = `/uploads/${uniqueFileName}`;
      return NextResponse.json({ success: true, url: fileUrl, fileName: file.name });
    } catch (writeError) {
      // 2. Serverless Read-only File System Fallback (Works in Vercel production environment)
      console.warn("Local file system write is disabled/read-only. Falling back to Base64 Data URL:", writeError);
      
      const base64 = buffer.toString("base64");
      const mimeType = file.type || "application/octet-stream";
      const dataUrl = `data:${mimeType};base64,${base64}`;
      
      return NextResponse.json({ 
        success: true, 
        url: dataUrl, 
        fileName: file.name,
        isFallback: true 
      });
    }
  } catch (error: any) {
    console.error("Upload API top-level error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload file" }, { status: 500 });
  }
}
