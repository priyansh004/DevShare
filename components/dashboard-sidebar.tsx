"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    HomeIcon,
    UserIcon,
    FolderIcon,
    PlusIcon
} from "@heroicons/react/24/outline";
import {
    HomeIcon as HomeIconSolid,
    UserIcon as UserIconSolid,
    FolderIcon as FolderIconSolid,
} from "@heroicons/react/24/solid";
import SignOutButton from "./sign-out-button";
import CreateResourceModal from "./create-resource-modal";

interface NavItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    iconSolid: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
    { name: "Home", href: "/dashboard", icon: HomeIcon, iconSolid: HomeIconSolid },
    { name: "My Resources", href: "/dashboard/my-resources", icon: FolderIcon, iconSolid: FolderIconSolid },
    { name: "Profile", href: "/dashboard/profile", icon: UserIcon, iconSolid: UserIconSolid },
];

export default function DashboardSidebar() {
    const pathname = usePathname();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <aside className="hidden sticky top-0 h-screen w-64 flex-col bg-white xl:w-72 lg:flex">
                {/* Logo/Brand */}
                <div className="flex h-16 items-center px-6">
                    <Link href="/dashboard" className="text-2xl font-bold text-primary-darker">
                        DevShare
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 px-3 py-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = isActive ? item.iconSolid : item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center gap-4 rounded-full px-4 py-3 text-lg font-medium transition-colors ${isActive
                                    ? "bg-primary-light text-primary-darker"
                                    : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                <Icon className="h-6 w-6" />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}

                    <div className="pt-4 px-2">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex w-full border-1 items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-lg font-bold text-primary-darker shadow-xl shadow-primary/30 transition-all hover:bg-primary-dark hover:scale-[1.02] hover:shadow-primary/50"
                        >
                            <PlusIcon className="h-6 w-6 stroke-[3px]" />
                            <span>Post</span>
                        </button>
                    </div>
                </nav>

                {/* User Section */}
                {/* <div className="border-t border-gray-200 p-4">
                    <SignOutButton />
                </div> */}
            </aside>

            <CreateResourceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
