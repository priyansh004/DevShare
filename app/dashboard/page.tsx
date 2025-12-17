import { requireAuth } from "@/lib/protect-server";
import Link from "next/link";
import SignOutButton from "@/components/sign-out-button";

export default async function DashboardPage() {
  // Middleware handles authentication, but we still need user data
  const user = await requireAuth();

  return (
    <div className="min-h-screen bg-primary-light">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between rounded-lg bg-white p-6 shadow-md">
            <div>
              <h1 className="text-3xl font-bold text-primary-darker">
                Dashboard
              </h1>
              <p className="mt-2 text-primary-dark">
                Welcome back, {user.name || user.email}!
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/"
                className="rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary-light"
              >
                Home
              </Link>
              <SignOutButton />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-primary-darker">
                Profile Information
              </h2>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                {user.name && (
                  <p>
                    <span className="font-medium">Name:</span> {user.name}
                  </p>
                )}
                <p>
                  <span className="font-medium">User ID:</span> {user.id}
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-primary-darker">
                Protected Content
              </h2>
              <p className="text-sm text-gray-600">
                This is a protected route. Only authenticated users can see this
                content.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-primary-darker">
                Quick Actions
              </h2>
              <div className="space-y-2">
                <button className="w-full rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-dark">
                  Create New Project
                </button>
                <button className="w-full rounded-lg border border-primary px-4 py-2 text-primary transition-colors hover:bg-primary-light">
                  View Projects
                </button>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-primary-darker">
                Recent Activity
              </h2>
              <p className="text-sm text-gray-600">
                No recent activity to display.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

