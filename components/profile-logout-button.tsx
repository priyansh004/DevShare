"use client";

import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

export default function ProfileLogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-4 rounded-2xl p-4 text-left hover:bg-red-50 transition-colors group"
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600 group-hover:bg-red-100 transition-colors">
                <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            </div>
            <div className="flex-1">
                <h4 className="font-semibold text-red-600 group-hover:text-red-700">Log Out</h4>
                <p className="text-sm text-red-400 group-hover:text-red-500">Securely end your session</p>
            </div>
        </button>
    );
}
