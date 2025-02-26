import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function POST(req: NextRequest) {
  try {
    const { fileKey, deletionTime } = await req.json();
    if (!fileKey || !deletionTime) {
      return NextResponse.json({ error: "Body is missing fileKey or deletionTime." });
    }
    setTimeout(async () => {
      await utapi.deleteFiles(fileKey);
      return NextResponse.json({ success: true, message: "File deleted successfully." });
    }, deletionTime);
    return NextResponse.json({ success: true, message: "File deleted successfully." });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json({ error: "Error deleting file." });
  }
}
