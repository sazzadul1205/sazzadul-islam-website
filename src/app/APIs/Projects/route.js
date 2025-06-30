import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await connectDB();
  const ProjectsCollection = db.collection("Projects");
  try {
    const Projects = await ProjectsCollection.find().toArray();
    return NextResponse.json(Projects);
  } catch (error) {
    console.log(error);
  }
};
