import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const title = searchParams.get("title");

  // console.log("API called with:", { id, title });

  const db = await connectDB();
  const ProjectsCollection = db.collection("Projects");

  try {
    let query = {};

    if (id) {
      if (id.length !== 24) {
        return NextResponse.json(
          { error: "Invalid id format" },
          { status: 400 }
        );
      }
      query._id = new ObjectId(id);
    } else if (title) {
      // Case-insensitive exact match for title
      query.title = { $regex: `^${title}$`, $options: "i" };
    }

    let result;
    if (Object.keys(query).length) {
      result = await ProjectsCollection.findOne(query);
      if (!result) {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }
    } else {
      result = await ProjectsCollection.find().toArray();
    }

    // console.log("Mongo query result:", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch project(s)" },
      { status: 500 }
    );
  }
};
