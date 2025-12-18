import { requireAuth } from "@/lib/protect-server";
import DashboardSidebar from "@/components/dashboard-sidebar";

export default async function DashboardPage() {
  const user = await requireAuth();

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
        <div className="p-6">
          {/* Welcome Card */}
          <div className="mb-6 rounded-2xl bg-gradient-to-r from-primary to-primary-dark p-6 text-white shadow-lg">
            <h2 className="text-2xl font-bold">
              Welcome back, {user.name || user.email}!
            </h2>
            <p className="mt-2 text-primary-light">
              Here's what's happening with your projects today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Projects</p>
                  <p className="mt-2 text-3xl font-bold text-primary-darker">12</p>
                </div>
                <div className="rounded-full bg-primary-light p-3">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Tasks</p>
                  <p className="mt-2 text-3xl font-bold text-primary-darker">8</p>
                </div>
                <div className="rounded-full bg-primary-light p-3">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Collaborators</p>
                  <p className="mt-2 text-3xl font-bold text-primary-darker">24</p>
                </div>
                <div className="rounded-full bg-primary-light p-3">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion</p>
                  <p className="mt-2 text-3xl font-bold text-primary-darker">67%</p>
                </div>
                <div className="rounded-full bg-primary-light p-3">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Activity */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-primary-darker">Recent Activity</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-4 border-b border-gray-100 pb-4 last:border-0">
                      <div className="rounded-full bg-primary-light p-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          New project created
                        </p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-primary-darker">Quick Actions</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button className="flex items-center gap-3 rounded-lg bg-primary px-4 py-3 text-white transition-all hover:bg-primary-dark hover:shadow-md">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="font-medium">New Project</span>
                  </button>
                  <button className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 transition-all hover:border-primary hover:bg-primary-light">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <span className="font-medium">View All</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-primary-darker">Profile</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-lg font-bold text-primary-darker">
                      {user.name?.[0] || user.email?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium text-gray-900">{user.name || "User"}</p>
                      <p className="truncate text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-primary-darker">Upcoming</h3>
                <div className="space-y-3">
                  <div className="rounded-lg border border-gray-200 p-3">
                    <p className="text-sm font-medium text-gray-900">Team Meeting</p>
                    <p className="text-xs text-gray-500">Today, 2:00 PM</p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-3">
                    <p className="text-sm font-medium text-gray-900">Project Review</p>
                    <p className="text-xs text-gray-500">Tomorrow, 10:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

