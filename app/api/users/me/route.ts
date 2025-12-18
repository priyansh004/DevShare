import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/db/mongodb";

// GET /api/users/me - Get current user profile
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const client = await clientPromise;
        const db = client.db();

        // Find user by email
        const user = await db.collection("users").findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Return user data (convert ObjectId to string if needed, though JSON.stringify handles it usually)
        return NextResponse.json({
            ...user,
            id: user._id.toString(),
            _id: undefined // Hide internal _id in favor of id
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Failed to fetch user" },
            { status: 500 }
        );
    }
}

// PATCH /api/users/me - Update current user profile
export async function PATCH(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { name, image } = body;

        const client = await clientPromise;
        const db = client.db();

        // Update user
        const result = await db.collection("users").findOneAndUpdate(
            { email: session.user.email },
            {
                $set: {
                    ...(name && { name }),
                    ...(image && { image }),
                    updatedAt: new Date()
                }
            },
            { returnDocument: "after" }
        );

        if (!result) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            ...result,
            id: result._id.toString(),
            _id: undefined
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { error: "Failed to update user" },
            { status: 500 }
        );
    }
}
