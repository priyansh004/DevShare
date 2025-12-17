"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { User } from "next-auth";

interface AuthButtonsProps {
  user: User | null | undefined;
}

export default function AuthButtons({ user }: AuthButtonsProps) {
  if (user) {
    return (
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex h-12 w-full items-center justify-center rounded-full border border-primary px-5 text-primary transition-colors hover:bg-primary-light md:w-auto md:px-8"
      >
        Sign Out
      </button>
    );
  }

  return (
    <Link
      href="/auth/signin"
      className="flex h-12 w-full items-center justify-center rounded-full border border-primary px-5 text-primary transition-colors hover:bg-primary-light md:w-auto md:px-8"
    >
      Get Started
    </Link>
  );
}

