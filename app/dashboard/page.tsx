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

  const { search, type, sort, page } = searchParams;
  // Default limit 10 for initial load
  const limit = 10;
  // If page is provided, we could skip, but for infinite scroll initial load is usually page 1
  const currentPage = parseInt(Array.isArray(page) ? page[0] : page || "1") || 1;
  const skip = (currentPage - 1) * limit;

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
    .skip(skip)
    .limit(limit)
    .toArray();

  return resources.map(r => ({
    ...r,
    _id: r._id.toString(),
    userId: r.userId.toString(),
    createdAt: r.createdAt.toISOString(), // Serialize date for client component
    updatedAt: r.updatedAt.toISOString(),
  })) as unknown as Resource[];
}

import InfiniteFeed from "@/components/infinite-feed";

// ...

export default async function DashboardPage(props: DashboardPageProps) {
  const searchParams = await props.searchParams;
  const user = await requireAuth();

  // Always fetch page 1 for initial load of infinite feed
  const initialResources = await getResources({ ...searchParams, page: "1" });

  return (
    <>
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="flex h-16 items-center px-6">
          <h1 className="text-xl font-bold text-primary-darker">Home</h1>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-primary-light to-primary p-6 shadow-sm">
          <h2 className="text-xl font-bold text-primary-darker">
            Welcome back, {user.name || user.email}!
          </h2>
        </div>

        <ResourceFilters />

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-lg font-bold text-gray-900">
              {initialResources.length > 0 ? "Latest Resources" : "No Resources"}
            </h3>
          </div>

          {initialResources.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
              <p className="text-gray-500">No resources found matching your criteria.</p>
              {Object.keys(searchParams).length > 0 && (
                <a href="/dashboard" className="mt-2 inline-block text-sm text-primary hover:underline">
                  Clear Filters
                </a>
              )}
            </div>
          ) : (
            <InfiniteFeed
              initialResources={initialResources}
              userId={user.id}
            />
          )}
        </div>
      </div>
    </>
  );
}
