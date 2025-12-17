"use client";

import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/lib/auth-client";
import Link from "next/link";

export default function ProtectedPage() {
  return (
    <ProtectedRoute>
      <ProtectedContent />
    </ProtectedRoute>
  );
}

function ProtectedContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-primary-light">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary-darker">
              Protected Page
            </h1>
            <Link
              href="/"
              className="rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary-light"
            >
              Home
            </Link>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-primary-darker">
              Client-Side Protected Route
            </h2>
            <p className="mb-4 text-gray-600">
              This page is protected using the client-side ProtectedRoute
              component. It will redirect unauthenticated users to the sign-in
              page.
            </p>
            <div className="rounded-lg bg-primary-light p-4">
              <p className="text-sm text-primary-dark">
                <strong>User:</strong> {user?.email || "Loading..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

