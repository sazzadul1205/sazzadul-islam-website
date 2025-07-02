import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const db = await connectDB();
    const AboutCollection = db.collection("About");

    const result = await AboutCollection.findOne({}); // Or use `.find({}).toArray()` for multiple

    return NextResponse.json(result);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch about information" },
      { status: 500 }
    );
  }
};
