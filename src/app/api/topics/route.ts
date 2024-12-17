import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { Topic } from "@/types";

export async function GET() {
  try {
    const dataDirectory = path.join(process.cwd(), "radar_data");
    const fileNames = await fs.readdir(dataDirectory);

    const topics = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith(".json"))
        .map(async (fileName) => {
          const filePath = path.join(dataDirectory, fileName);
          const fileContents = await fs.readFile(filePath, "utf8");
          return JSON.parse(fileContents) as Topic;
        }),
    );

    return NextResponse.json(topics);
  } catch (error) {
    console.error("Error loading topic data:", error);
    return NextResponse.json([], { status: 500 });
  }
}
