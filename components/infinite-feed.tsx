"use client";

import { Resource } from "@/types/resource";
import ResourceCard from "./resource-card";
import useSWRInfinite from "swr/infinite";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

// Fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface InfiniteFeedProps {
    initialResources: Resource[];
    userId: string; // for isOwner check
}

export default function InfiniteFeed({ initialResources, userId }: InfiniteFeedProps) {
    const searchParams = useSearchParams();

    // Ref for infinite scroll
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const [isObserveOutput, setIsObserveOutput] = useState(false);

    // Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsObserveOutput(true);
                } else {
                    setIsObserveOutput(false);
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const getKey = (pageIndex: number, previousPageData: Resource[]) => {
        // If no data on previous page, stop
        if (previousPageData && !previousPageData.length) return null;

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", (pageIndex + 1).toString());
        params.set("limit", "10");

        return `/api/resources?${params.toString()}`;
    };

    const { data, size, setSize, isValidating } = useSWRInfinite<Resource[]>(
        getKey,
        fetcher,
        {
            fallbackData: [initialResources],
            revalidateFirstPage: false
        }
    );

    // Trigger load more when intersecting
    useEffect(() => {
        if (isObserveOutput && !isValidating && data && data[data.length - 1]?.length > 0) {
            setSize(size + 1);
        }
    }, [isObserveOutput, isValidating, data, size, setSize]);

    // Flatten data arrays
    const resources = data ? data.flat() : [];
    const isEmpty = resources.length === 0;
    const isEnd = data && data[data.length - 1]?.length < 10;

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4">
                {resources.map((resource) => (
                    <ResourceCard
                        key={resource._id}
                        resource={resource}
                        isOwner={userId === resource.userId}
                    />
                ))}
            </div>

            {/* Loading / End State */}
            <div ref={loadMoreRef} className="py-8 text-center">
                {isValidating && (
                    <div className="flex justify-center">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                    </div>
                )}

                {isEnd && !isEmpty && (
                    <p className="text-sm text-gray-400">You're all caught up!</p>
                )}
            </div>
        </div>
    );
}
