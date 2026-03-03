import { getDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET - Fetch projects (single by id/title or all)
export const GET = async (req) => {
  try {
    const db = await getDB();
    const ProjectsCollection = db.collection("Projects");

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const title = searchParams.get("title");

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
      // Get all projects, sorted by order field first, then by createdAt
      result = await ProjectsCollection.find()
        .sort({ order: 1, createdAt: -1 })
        .toArray();
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ Projects API GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch project(s)" },
      { status: 500 },
    );
  }
};

// POST - Create a new project
export const POST = async (req) => {
  try {
    const db = await getDB();
    const ProjectsCollection = db.collection("Projects");

    const projectData = await req.json();

    // Validate required fields
    if (!projectData.title) {
      return NextResponse.json(
        { error: "Project title is required" },
        { status: 400 },
      );
    }

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
      view: projectData.view || 0, // Ensure view count exists
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await ProjectsCollection.insertOne(newProject);

    // Log for audit (optional)
    console.log(
      `✅ Project created: ${newProject.title} (ID: ${result.insertedId})`,
    );

    return NextResponse.json(
      {
        message: "Project created successfully",
        project: { ...newProject, _id: result.insertedId },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("❌ Projects API POST error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
};

// PUT - Update a project (full update)
export const PUT = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 },
      );
    }

    const db = await getDB();
    const ProjectsCollection = db.collection("Projects");

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

    console.log(`✅ Project updated: ${id}`);

    return NextResponse.json(
      { message: "Project updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ Projects API PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
};

// PATCH - Partially update a project or reorder projects
export const PATCH = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const action = searchParams.get("action");

    const db = await getDB();
    const ProjectsCollection = db.collection("Projects");

    // Handle reordering (bulk update)
    if (action === "reorder") {
      const { projects } = await req.json();

      if (!Array.isArray(projects)) {
        return NextResponse.json(
          { error: "Invalid data format for reordering" },
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

      console.log(`🔄 Projects reordered successfully`);

      return NextResponse.json(
        { message: "Projects reordered successfully" },
        { status: 200 },
      );
    }

    // Handle single project partial update
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 },
      );
    }

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

    console.log(`✅ Project partially updated: ${id}`);

    return NextResponse.json(
      { message: "Project updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ Projects API PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
};

// DELETE - Delete a project
export const DELETE = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 },
      );
    }

    const db = await getDB();
    const ProjectsCollection = db.collection("Projects");

    // Optional: Get project details before deletion for logging
    const project = await ProjectsCollection.findOne(
      { _id: new ObjectId(id) },
      { projection: { title: 1 } },
    );

    const result = await ProjectsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    console.log(`🗑️ Project deleted: ${project?.title || id}`);

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ Projects API DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 },
    );
  }
};

// Helper endpoint to increment view count
export const incrementView = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 },
      );
    }

    const db = await getDB();
    const ProjectsCollection = db.collection("Projects");

    const result = await ProjectsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $inc: { view: 1 },
        $set: { updatedAt: new Date() },
      },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "View count incremented successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ Projects API incrementView error:", error);
    return NextResponse.json(
      { error: "Failed to increment view count" },
      { status: 500 },
    );
  }
};
