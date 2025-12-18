import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/db/mongodb";
import { CreateResourceInput, Resource } from "@/types/resource";
import { ObjectId } from "mongodb";

// GET /api/resources - Get all non-deleted resources
export async function GET(request: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db();

        const resources = await db
            .collection("resources")
            .find({ isDeleted: false })
            .sort({ createdAt: -1 })
            .toArray();

        // Convert ObjectId to string for the client
        const sanitizedResources = resources.map((resource) => ({
            ...resource,
            _id: resource._id.toString(),
            userId: resource.userId.toString(),
        }));

        return NextResponse.json(sanitizedResources);
    } catch (error) {
        console.error("Error fetching resources:", error);
        return NextResponse.json(
            { error: "Failed to fetch resources" },
            { status: 500 }
        );
    }
}

// POST /api/resources - Create a new resource
export async function POST(request: NextRequest) {
    try {
        let userId: string | undefined;

        // AUTHENTICATION STRATEGY
        const session = await getServerSession(authOptions);
        if (session?.user?.id) {
            userId = session.user.id;
        }

        // DEV BACKDOOR: Allow 'x-dev-user-id' header in development only
        if (!userId && process.env.NODE_ENV === "development") {
            const devUserId = request.headers.get("x-dev-user-id");
            if (devUserId) {
                console.log("⚠️ USING DEV USER ID:", devUserId);
                userId = devUserId;
            }
        }

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body: CreateResourceInput = await request.json();
        const { title, description, type, link } = body;

        // Basic validation
        if (!title || !description || !type || !link) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db();

        const newResource: Omit<Resource, "_id"> = {
            userId: userId, // Use resolved userId
            title,
            description,
            type,
            link,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection("resources").insertOne(newResource);

        return NextResponse.json(
            {
                ...newResource,
                _id: result.insertedId.toString(),
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating resource:", error);
        return NextResponse.json(
            { error: "Failed to create resource" },
            { status: 500 }
        );
    }
}
