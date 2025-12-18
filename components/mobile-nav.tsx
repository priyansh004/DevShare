"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
import CreateResourceModal from "./create-resource-modal";

const navItems = [
    { name: "Home", href: "/dashboard", icon: HomeIcon, iconSolid: HomeIconSolid },
    { name: "My Resources", href: "/dashboard/my-resources", icon: FolderIcon, iconSolid: FolderIconSolid },
    { name: "Profile", href: "/dashboard/profile", icon: UserIcon, iconSolid: UserIconSolid },
];

export default function MobileNav() {
    const pathname = usePathname();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white pb-safe lg:hidden">
                <div className="flex items-center justify-around p-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = isActive ? item.iconSolid : item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors ${isActive ? "text-primary" : "text-gray-500"
                                    }`}
                            >
                                <Icon className="h-7 w-7" />
                            </Link>
                        );
                    })}

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30"
                    >
                        <PlusIcon className="h-6 w-6 stroke-[3px]" />
                    </button>
                </div>
            </div>

            {/* Spacer to prevent content from being hidden behind nav */}
            <div className="h-16 lg:hidden" />

            <CreateResourceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
