"use client";

import { signIn, useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

function SignInContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-light px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary-darker mb-2">
            DevShare
          </h1>
          <h2 className="text-2xl font-semibold text-primary-dark">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to continue to your account
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-800">
              {error === "OAuthSignin" && "Error occurred during sign in"}
              {error === "OAuthCallback" && "Error in OAuth callback"}
              {error === "OAuthCreateAccount" && "Could not create account"}
              {error === "EmailCreateAccount" && "Could not create account"}
              {error === "Callback" && "Error in callback"}
              {error === "OAuthAccountNotLinked" &&
                "Account already exists with different provider"}
              {error === "EmailSignin" && "Check your email address"}
              {error === "CredentialsSignin" &&
                "Invalid credentials"}
              {error === "SessionRequired" && "Please sign in to access this page"}
              {!["OAuthSignin", "OAuthCallback", "OAuthCreateAccount", "EmailCreateAccount", "Callback", "OAuthAccountNotLinked", "EmailSignin", "CredentialsSignin", "SessionRequired"].includes(error) &&
                "An error occurred"}
            </p>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              powered by NextAuth
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-primary-light flex items-center justify-center">Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}

