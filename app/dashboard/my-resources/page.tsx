import { requireAuth } from "@/lib/protect-server";
import clientPromise from "@/lib/db/mongodb";
import ResourceCard from "@/components/resource-card";
import { Resource } from "@/types/resource";

async function getMyResources(userId: string) {
    const client = await clientPromise;
    const db = client.db();

    const resources = await db
        .collection("resources")
        .find({ userId: userId, isDeleted: false })
        .sort({ createdAt: -1 })
        .toArray();

    return resources.map(r => ({
        ...r,
        _id: r._id.toString(),
        userId: r.userId.toString(),
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
    })) as unknown as Resource[];
}

export default async function MyResourcesPage() {
    const user = await requireAuth();
    const resources = await getMyResources(user.id);

    return (
        <>
            <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
                <div className="flex h-16 items-center px-6">
                    <h1 className="text-xl font-bold text-primary-darker">My Resources</h1>
                </div>
            </div>

            <div className="p-6 max-w-5xl mx-auto">
                {resources.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-200 border-dashed">
                        <div className="mb-4 rounded-full bg-gray-50 p-4">
                            <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No resources yet</h3>
                        <p className="max-w-sm text-center text-gray-500 mt-2">
                            You haven't posted any resources yet. Click the "Post" button in the sidebar to share something!
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {resources.map((resource) => (
                            <ResourceCard key={resource._id} resource={resource} isOwner={true} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
