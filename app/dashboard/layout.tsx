import DashboardSidebar from "@/components/dashboard-sidebar";
import MobileNav from "@/components/mobile-nav";
import TrendingSection from "@/components/trending-section";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto flex max-w-7xl">
                {/* Left Sidebar */}
                <DashboardSidebar />

                {/* Main Feed Section (Centered) */}
                <main className="flex w-full min-w-0 flex-1 flex-col border-x border-gray-100 sm:max-w-2xl lg:max-w-2xl xl:max-w-2xl">
                    {children}
                </main>

                {/* Right Sidebar Placeholder */}
                <div className="hidden w-80 lg:block lg:pl-8 py-6">
                    <div className="sticky top-6">
                        <TrendingSection />
                    </div>
                </div>
            </div>
            <MobileNav />
        </div>
    );
}
