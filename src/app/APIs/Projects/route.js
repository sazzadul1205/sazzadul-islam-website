import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const title = searchParams.get("title");

  const db = await connectDB();
  const ProjectsCollection = db.collection("Projects");

  try {
    let query = {};

    if (id) {
      if (!ObjectId.isValid(id)) {
        return NextResponse.json(
          { error: "Invalid id format" },
          { status: 400 },
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
          { status: 404 },
        );
      }
    } else {
      // Get all projects, sorted by order field if it exists
      result = await ProjectsCollection.find()
        .sort({ order: 1, createdAt: -1 })
        .toArray();
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch project(s)" },
      { status: 500 },
    );
  }
};

// Create a new project
export const POST = async (req) => {
  const db = await connectDB();
  const ProjectsCollection = db.collection("Projects");

  try {
    const projectData = await req.json();

    // Get the highest order number
    const lastProject = await ProjectsCollection.find()
      .sort({ order: -1 })
      .limit(1)
      .toArray();

    const newOrder =
      lastProject.length > 0 ? (lastProject[0].order || 0) + 1 : 0;

    // Add timestamps and order
    const newProject = {
      ...projectData,
      order: newOrder,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await ProjectsCollection.insertOne(newProject);

    return NextResponse.json(
      {
        message: "Project created successfully",
        project: { ...newProject, _id: result.insertedId },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
};

// Update a project
export const PUT = async (req) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  const db = await connectDB();
  const ProjectsCollection = db.collection("Projects");

  try {
    const updateData = await req.json();

    // Remove _id from update data if it exists
    delete updateData._id;

    // Add updated timestamp
    updateData.updatedAt = new Date();

    const result = await ProjectsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Project updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
};

// Delete a project
export const DELETE = async (req) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  const db = await connectDB();
  const ProjectsCollection = db.collection("Projects");

  try {
    const result = await ProjectsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 },
    );
  }
};

// Reorder projects
export const PATCH = async (req) => {
  const db = await connectDB();
  const ProjectsCollection = db.collection("Projects");

  try {
    const { projects } = await req.json();

    if (!Array.isArray(projects)) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 },
      );
    }

    // Update each project's order
    const updatePromises = projects.map((project, index) => {
      if (!ObjectId.isValid(project._id)) {
        throw new Error(`Invalid project ID: ${project._id}`);
      }

      return ProjectsCollection.updateOne(
        { _id: new ObjectId(project._id) },
        {
          $set: {
            order: index,
            updatedAt: new Date(),
          },
        },
      );
    });

    await Promise.all(updatePromises);

    return NextResponse.json(
      { message: "Projects reordered successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to reorder projects" },
      { status: 500 },
    );
  }
};
