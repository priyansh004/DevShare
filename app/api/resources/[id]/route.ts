import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/db/mongodb";
import { ObjectId } from "mongodb";

function isValidObjectId(id: string) {
    return ObjectId.isValid(id) && (String(new ObjectId(id)) === id);
}

// GET /api/resources/[id] - Get single resource
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!isValidObjectId(id)) {
            return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();

        const resource = await db.collection("resources").findOne({
            _id: new ObjectId(id),
            isDeleted: false,
        });

        if (!resource) {
            return NextResponse.json({ error: "Resource not found" }, { status: 404 });
        }

        return NextResponse.json({
            ...resource,
            _id: resource._id.toString(),
            userId: resource.userId.toString(),
        });
    } catch (error) {
        console.error("Error fetching resource:", error);
        return NextResponse.json(
            { error: "Failed to fetch resource" },
            { status: 500 }
        );
    }
}

// PATCH /api/resources/[id] - Update resource
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        if (!isValidObjectId(id)) {
            return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
        }

        const body = await request.json();
        const { title, description, type, link, isDeleted } = body;

        const client = await clientPromise;
        const db = client.db();

        // Verify ownership
        const resource = await db.collection("resources").findOne({
            _id: new ObjectId(id),
        });

        if (!resource) {
            return NextResponse.json({ error: "Resource not found" }, { status: 404 });
        }

        if (resource.userId.toString() !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Update
        const result = await db.collection("resources").findOneAndUpdate(
            { _id: new ObjectId(id) },
            {
                $set: {
                    ...(title && { title }),
                    ...(description && { description }),
                    ...(type && { type }),
                    ...(link && { link }),
                    ...(typeof isDeleted === "boolean" && { isDeleted }),
                    updatedAt: new Date(),
                },
            },
            { returnDocument: "after" }
        );

        if (!result) {
            return NextResponse.json({ error: "Update failed" }, { status: 500 });
        }

        return NextResponse.json({
            ...result,
            _id: result._id.toString(),
            userId: result.userId.toString(),
        });
    } catch (error) {
        console.error("Error updating resource:", error);
        return NextResponse.json(
            { error: "Failed to update resource" },
            { status: 500 }
        );
    }
}

// DELETE /api/resources/[id] - Hard delete (Optional, usually we utilize soft delete via PATCH)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        if (!isValidObjectId(id)) {
            return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();

        // Verify ownership
        const resource = await db.collection("resources").findOne({
            _id: new ObjectId(id),
        });

        if (!resource) {
            return NextResponse.json({ error: "Resource not found" }, { status: 404 });
        }

        if (resource.userId.toString() !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Instead of removing document, we perform a soft delete (consistent with isDeleted field)
        // Or if checking strictly, we can use deleteOne()
        // Based on user request "isDeleted boolean", I will perform soft delete here as well
        // but typically DELETE verb implies hard delete.
        // I'll stick to setting isDeleted: true for safety.

        const result = await db.collection("resources").findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { isDeleted: true, updatedAt: new Date() } },
            { returnDocument: "after" }
        );

        return NextResponse.json({ message: "Resource deleted successfully" });
    } catch (error) {
        console.error("Error deleting resource:", error);
        return NextResponse.json(
            { error: "Failed to delete resource" },
            { status: 500 }
        );
    }
}
