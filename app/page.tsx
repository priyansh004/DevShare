import { requireAuth } from "@/lib/protect-server";
import Link from "next/link";
import AuthButtons from "@/components/auth-buttons";

export default async function Home() {
  // Middleware handles authentication redirect, but we need user data
  const user = await requireAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-light px-4">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <div className="w-full">
          <h1 className="text-5xl font-bold text-primary-darker mb-4">
            DevShare
          </h1>
          <p className="text-xl text-primary-dark mb-8">
            Share and collaborate on your development projects
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full">
          <h2 className="text-3xl font-semibold text-primary-darker">
            Welcome back, {user.name || user.email}!
          </h2>
          <p className="max-w-md text-lg leading-8 text-gray-600">
            Continue to your dashboard to manage your projects and collaborate with your team.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row w-full">
          <Link
            href="/dashboard"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-white transition-colors hover:bg-primary-dark md:w-auto md:px-8"
          >
            Go to Dashboard
          </Link>
          <AuthButtons user={user} />
        </div>
      </main>
    </div>
  );
}
