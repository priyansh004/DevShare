import { requireAuth } from "@/lib/protect-server";
import clientPromise from "@/lib/db/mongodb";
import ResourceCard from "@/components/resource-card";
import ResourceFilters from "@/components/resource-filters";
import { Resource } from "@/types/resource";

interface DashboardPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getResources(searchParams: { [key: string]: string | string[] | undefined }) {
  const client = await clientPromise;
  const db = client.db();

  const { search, type, sort } = searchParams;

  // Build Query
  const query: any = { isDeleted: false };

  if (search && typeof search === 'string') {
    const searchRegex = { $regex: search, $options: "i" };
    query.$or = [
      { title: searchRegex },
      { description: searchRegex },
      { authorName: searchRegex }
    ];
  }

  if (type && typeof type === 'string') {
    query.type = type;
  }

  // Build Sort
  const sortOption: any = { createdAt: -1 }; // Default Newest
  if (sort === "oldest") {
    sortOption.createdAt = 1;
  }

  const resources = await db
    .collection("resources")
    .find(query)
    .sort(sortOption)
    .toArray();

  return resources.map(r => ({
    ...r,
    _id: r._id.toString(),
    userId: r.userId.toString(),
    createdAt: r.createdAt.toISOString(), // Serialize date for client component
    updatedAt: r.updatedAt.toISOString(),
  })) as unknown as Resource[];
}

export default async function DashboardPage(props: DashboardPageProps) {
  const searchParams = await props.searchParams;
  const user = await requireAuth();
  const resources = await getResources(searchParams);

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="flex h-16 items-center px-6">
          <h1 className="text-xl font-bold text-primary-darker">Home</h1>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-6">
        {/* Welcome Card */}
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-primary-light to-primary p-6 shadow-sm">
          <h2 className="text-xl font-bold text-primary-darker">
            Welcome back, {user.name || user.email}!
          </h2>
        </div>

        {/* Filters and Search */}
        <ResourceFilters />

        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 px-2">
            {resources.length} {resources.length === 1 ? 'Resource' : 'Resources'} Found
          </h3>
          {resources.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
              <p className="text-gray-500">No resources found matching your criteria.</p>
              {Object.keys(searchParams).length > 0 && (
                <a href="/dashboard" className="mt-2 inline-block text-sm text-primary hover:underline">
                  Clear Filters
                </a>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {resources.map((resource) => (
                <ResourceCard
                  key={resource._id}
                  resource={resource}
                  isOwner={user.id === resource.userId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
