import { NextResponse } from "next/server";
import clientPromise from "@/lib/db/mongodb";

export async function GET() {
    // Safety check: Only run in development
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json({ error: "Seeding not allowed in production" }, { status: 403 });
    }

    try {
        const client = await clientPromise;
        const db = client.db();

        // 1. Get a user to assign resources to (Using the first found user)
        const user = await db.collection("users").findOne({});
        if (!user) {
            return NextResponse.json({ error: "No users found. Please sign in once to create a user." }, { status: 400 });
        }

        const userId = user._id.toString();
        const authorName = user.name || "Seeded User";
        const authorImage = user.image || undefined;

        // 2. Generate 100 dummy resources
        const resources = [];
        const types = ["video", "article", "tutorial", "course", "book"];
        const topics = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "Docker", "AWS", "GraphQL", "Rust"];

        for (let i = 0; i < 100; i++) {
            const type = types[Math.floor(Math.random() * types.length)];
            const topic = topics[Math.floor(Math.random() * topics.length)];
            const randomNum = Math.floor(Math.random() * 1000);

            resources.push({
                userId,
                authorName,
                authorImage,
                title: `${topic} Masterclass: Part ${randomNum}`,
                description: `Learn everything about ${topic} in this comprehensive guide. This is a seeded resource generated for testing purposes. #${i + 1}`,
                type,
                link: "https://example.com/dummy-link",
                ogTitle: `${topic} Masterclass`,
                ogDescription: "The best way to learn modern web development.",
                isDeleted: false,
                // Spread creation dates over the last 10 days
                createdAt: new Date(Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000)),
                updatedAt: new Date(),
            });
        }

        // 3. Bulk Insert
        await db.collection("resources").insertMany(resources);

        return NextResponse.json({
            success: true,
            message: `Successfully created 100 resources for user '${authorName}'`,
            userId
        });

    } catch (error) {
        console.error("Seeding error:", error);
        return NextResponse.json({ error: "Failed to seed data" }, { status: 500 });
    }
}
