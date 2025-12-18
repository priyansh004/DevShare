import { requireAuth } from "@/lib/protect-server";
import SignOutButton from "@/components/sign-out-button";

export default async function ProfilePage() {
    const user = await requireAuth();

    return (
        <>
            <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
                <div className="flex h-16 items-center px-6">
                    <h1 className="text-xl font-bold text-primary-darker">Profile</h1>
                </div>
            </div>

            <div className="p-6 max-w-2xl mx-auto">
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                    <div className="bg-primary/10 h-32 w-full"></div>
                    <div className="px-6 pb-6 relative">
                        <div className="-mt-12 mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white p-1 shadow-md">
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-light text-3xl font-bold text-primary-darker">
                                {user.name?.[0] || user.email?.[0]?.toUpperCase() || "U"}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">{user.name || "User"}</h2>
                            <p className="text-gray-500">{user.email}</p>
                            {user.id && <p className="mt-1 text-xs text-gray-400">ID: {user.id}</p>}
                        </div>

                        <div className="space-y-4 pt-6 border-t border-gray-100">
                            <h3 className="font-semibold text-gray-900">Account Settings</h3>
                            <div className="flex flex-col gap-2">
                                <button className="flex w-full items-center justify-between rounded-lg p-3 text-left hover:bg-gray-50">
                                    <span className="text-gray-600">Edit Profile</span>
                                    <span className="text-gray-400">→</span>
                                </button>
                                <button className="flex w-full items-center justify-between rounded-lg p-3 text-left hover:bg-gray-50">
                                    <span className="text-gray-600">Notification Preferences</span>
                                    <span className="text-gray-400">→</span>
                                </button>
                            </div>
                        </div>

                        <div className="mt-8">
                            <SignOutButton />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
