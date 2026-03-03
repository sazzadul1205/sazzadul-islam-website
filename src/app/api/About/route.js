import { getDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const GET = async (request) => {
  try {
    // Use getDB() which returns the cached connection
    const db = await getDB();
    const AboutCollection = db.collection("About");

    // Get the about document (assuming there's only one)
    const result = await AboutCollection.findOne({});

    if (!result) {
      return NextResponse.json(
        { error: "About information not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ About API GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch about information" },
      { status: 500 },
    );
  }
};

// POST - Create new about document (if needed)
export const POST = async (request) => {
  try {
    const db = await getDB();
    const AboutCollection = db.collection("About");

    const aboutData = await request.json();

    // Add timestamps
    const newAbout = {
      ...aboutData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await AboutCollection.insertOne(newAbout);

    return NextResponse.json(
      {
        message: "About information created successfully",
        about: { ...newAbout, _id: result.insertedId },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("❌ About API POST error:", error);
    return NextResponse.json(
      { error: "Failed to create about information" },
      { status: 500 },
    );
  }
};

// PUT - Update about document
export const PUT = async (request) => {
  try {
    const db = await getDB();
    const AboutCollection = db.collection("About");

    const updateData = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Remove _id from update data if it exists
    delete updateData._id;

    // Add updated timestamp
    updateData.updatedAt = new Date();

    let result;

    if (id && ObjectId.isValid(id)) {
      // Update by specific ID
      result = await AboutCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData },
      );
    } else {
      // Update the first document (assuming single document)
      result = await AboutCollection.updateOne(
        {}, // empty filter to match first document
        { $set: updateData },
      );
    }

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "About information not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "About information updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ About API PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update about information" },
      { status: 500 },
    );
  }
};

// DELETE - Delete about document
export const DELETE = async (request) => {
  try {
    const db = await getDB();
    const AboutCollection = db.collection("About");

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    let result;

    if (id && ObjectId.isValid(id)) {
      // Delete by specific ID
      result = await AboutCollection.deleteOne({ _id: new ObjectId(id) });
    } else {
      // Delete the first document (use with caution!)
      result = await AboutCollection.deleteOne({});
    }

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "About information not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "About information deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ About API DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete about information" },
      { status: 500 },
    );
  }
};

// PATCH - Partially update about document
export const PATCH = async (request) => {
  try {
    const db = await getDB();
    const AboutCollection = db.collection("About");

    const updateData = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Remove _id from update data if it exists
    delete updateData._id;

    // Add updated timestamp
    updateData.updatedAt = new Date();

    let result;

    if (id && ObjectId.isValid(id)) {
      // Update by specific ID
      result = await AboutCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData },
      );
    } else {
      // Update the first document
      result = await AboutCollection.updateOne({}, { $set: updateData });
    }

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "About information not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "About information updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ About API PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update about information" },
      { status: 500 },
    );
  }
};
