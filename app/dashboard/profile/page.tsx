import { requireAuth } from "@/lib/protect-server";
import clientPromise from "@/lib/db/mongodb";
import ProfileLogoutButton from "@/components/profile-logout-button";
import {
    PencilSquareIcon,
    Cog6ToothIcon,
    BellIcon,
    ShieldCheckIcon
} from "@heroicons/react/24/outline";

async function getUserStats(userId: string) {
    const client = await clientPromise;
    const db = client.db();
    const postsCount = await db.collection("resources").countDocuments({
        userId: userId,
        isDeleted: false
    });

    // Fake stats for now
    const viewCount = 0;
    const likesCount = 0;

    return { postsCount, viewCount, likesCount };
}

export default async function ProfilePage() {
    const user = await requireAuth();
    const stats = await getUserStats(user.id);

    return (
        <>
            <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
                <div className="flex h-16 items-center px-6">
                    <h1 className="text-xl font-bold text-primary-darker">Profile</h1>
                </div>
            </div>

            <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6">
                {/* Profile Card */}
                <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">
                    {/* Cover Image */}
                    <div className="h-40 w-full bg-gradient-to-r from-primary-dark to-primary relative">
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>

                    <div className="px-6 sm:px-10 pb-8 relative">
                        {/* Avatar & Action Button */}
                        <div className="flex justify-between items-end -mt-12 mb-6">
                            <div className="relative h-28 w-28 rounded-full ring-4 ring-white bg-white p-1 shadow-lg">
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt="Avatar"
                                        className="h-full w-full rounded-full object-cover bg-gray-100"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-light text-4xl font-bold text-primary-darker uppercase">
                                        {(user.name?.[0] || user.email?.[0] || "U").toUpperCase()}
                                    </div>
                                )}
                            </div>

                            <button className="mb-2 hidden sm:flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
                                <PencilSquareIcon className="h-4 w-4" />
                                Edit Profile
                            </button>
                        </div>

                        {/* User Info */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">{user.name || "Anonymous User"}</h2>
                            <p className="text-gray-500 font-medium">{user.email}</p>
                            <p className="mt-2 text-sm text-gray-400 max-w-md">
                                Full-stack developer passionate about building scalable applications and sharing knowledge with the community.
                            </p>
                        </div>

                        {/* Stats Row */}
                        <div className="flex w-full gap-8 border-t border-gray-100 py-6">
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{stats.postsCount}</p>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Posts</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{stats.viewCount}</p>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Views</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{stats.likesCount}</p>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Likes</p>
                            </div>
                        </div>

                        {/* Mobile Edit Button */}
                        <button className="mt-4 flex w-full sm:hidden items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 transition-all active:scale-[0.98]">
                            <PencilSquareIcon className="h-4 w-4" />
                            Edit Profile
                        </button>

                    </div>
                </div>

                {/* Settings Section */}
                <div className="rounded-3xl bg-white p-2 shadow-sm ring-1 ring-gray-100">
                    <div className="space-y-1">
                        <button className="flex w-full items-center gap-4 rounded-2xl p-4 text-left hover:bg-gray-50 transition-colors group">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                                <BellIcon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">Notifications</h4>
                                <p className="text-sm text-gray-500">Manage email and push notifications</p>
                            </div>
                            <span className="text-gray-400">→</span>
                        </button>

                        <button className="flex w-full items-center gap-4 rounded-2xl p-4 text-left hover:bg-gray-50 transition-colors group">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 text-purple-600 group-hover:bg-purple-100 transition-colors">
                                <ShieldCheckIcon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">Privacy & Security</h4>
                                <p className="text-sm text-gray-500">Update password and security settings</p>
                            </div>
                            <span className="text-gray-400">→</span>
                        </button>

                        <button className="flex w-full items-center gap-4 rounded-2xl p-4 text-left hover:bg-gray-50 transition-colors group">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-600 group-hover:bg-gray-100 transition-colors">
                                <Cog6ToothIcon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">General Settings</h4>
                                <p className="text-sm text-gray-500">Language, theme, and other preferences</p>
                            </div>
                            <span className="text-gray-400">→</span>
                        </button>

                        <div className="pt-2 border-t border-gray-100 mt-2">
                            <ProfileLogoutButton />
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
