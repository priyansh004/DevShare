"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    HomeIcon,
    UserIcon,
    FolderIcon,
    Cog6ToothIcon,
    BellIcon,
    BookmarkIcon,
    ChartBarIcon
} from "@heroicons/react/24/outline";
import {
    HomeIcon as HomeIconSolid,
    UserIcon as UserIconSolid,
    FolderIcon as FolderIconSolid,
    Cog6ToothIcon as Cog6ToothIconSolid,
    BellIcon as BellIconSolid,
    BookmarkIcon as BookmarkIconSolid,
    ChartBarIcon as ChartBarIconSolid
} from "@heroicons/react/24/solid";
import SignOutButton from "./sign-out-button";

interface NavItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    iconSolid: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
    { name: "Home", href: "/dashboard", icon: HomeIcon, iconSolid: HomeIconSolid },
    { name: "Resources", href: "/resources", icon: FolderIcon, iconSolid: FolderIconSolid },
    { name: "Analytics", href: "/dashboard/analytics", icon: ChartBarIcon, iconSolid: ChartBarIconSolid },
    { name: "Notifications", href: "/dashboard/notifications", icon: BellIcon, iconSolid: BellIconSolid },
    { name: "Bookmarks", href: "/dashboard/bookmarks", icon: BookmarkIcon, iconSolid: BookmarkIconSolid },
    { name: "Profile", href: "/dashboard/profile", icon: UserIcon, iconSolid: UserIconSolid },
    { name: "Settings", href: "/dashboard/settings", icon: Cog6ToothIcon, iconSolid: Cog6ToothIconSolid },
];

export default function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
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
            </nav>

            {/* User Section */}
            <div className="border-t border-gray-200 p-4">
                <SignOutButton />
            </div>
        </aside>
    );
}
