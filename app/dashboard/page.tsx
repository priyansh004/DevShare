import { requireAuth } from "@/lib/protect-server";
import DashboardSidebar from "@/components/dashboard-sidebar";
import clientPromise from "@/lib/db/mongodb";
import ResourceCard from "@/components/resource-card";
import { Resource } from "@/types/resource";

async function getResources() {
  const client = await clientPromise;
  const db = client.db();

  const resources = await db
    .collection("resources")
    .find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .toArray();

  return resources.map(r => ({
    ...r,
    _id: r._id.toString(),
    userId: r.userId.toString(),
    createdAt: r.createdAt.toISOString(), // Serialize date for client component
    updatedAt: r.updatedAt.toISOString(),
  })) as unknown as Resource[];
}

export default async function DashboardPage() {
  const user = await requireAuth();
  const resources = await getResources();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="flex h-16 items-center px-6">
            <h1 className="text-xl font-bold text-primary-darker">Home</h1>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 max-w-5xl mx-auto">
          {/* Welcome Card */}
          <div className="mb-8 rounded-2xl bg-gradient-to-r from-primary-light to-primary p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-primary-darker">
              Welcome back, {user.name || user.email}!
            </h2>
            <p className="mt-2 text-primary-dark">
              Here's what your community is sharing today.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Latest Resources</h3>
            {resources.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
                <p className="text-gray-500">No resources shared yet. Be the first to post!</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {resources.map((resource) => (
                  <ResourceCard key={resource._id} resource={resource} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
