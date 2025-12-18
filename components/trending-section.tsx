"use client";

import useSWR from "swr";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

// Fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface RedditPost {
    data: {
        id: string;
        title: string;
        subreddit_name_prefixed: string;
        permalink: string;
        ups: number;
        thumbnail: string;
    };
}

export default function TrendingSection() {
    // SWR handles caching, revalidation, and deduping automatically
    const { data, error, isLoading } = useSWR(
        "https://www.reddit.com/r/popular.json?limit=5",
        fetcher,
        { refreshInterval: 60000 } // Refresh every minute
    );

    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200/50">
            <div className="mb-4 flex items-center gap-2">
                <ArrowTrendingUpIcon className="h-5 w-5 text-gray-900" />
                <h3 className="text-lg font-bold text-gray-900">What's happening</h3>
            </div>

            {isLoading && (
                <div className="space-y-4 animate-pulse">
                    {[1, 2, 3].map((i) => (
                        <div key={i}>
                            <div className="h-3 w-20 bg-gray-200 rounded mb-1"></div>
                            <div className="h-4 w-full bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <div className="text-sm text-red-500">
                    Failed to load trending topics.
                </div>
            )}

            {data && (
                <div className="flex flex-col">
                    {data.data.children.map((post: RedditPost) => (
                        <a
                            key={post.data.id}
                            href={`https://reddit.com${post.data.permalink}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group py-3 first:pt-0 last:pb-0 hover:bg-gray-100 -mx-4 px-4 transition-colors"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <p className="text-xs text-gray-500 mb-0.5 font-medium">
                                        {post.data.subreddit_name_prefixed}
                                    </p>
                                    <h4 className="text-sm font-bold text-gray-900 leading-snug group-hover:underline decoration-gray-900">
                                        {post.data.title}
                                    </h4>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {post.data.ups.toLocaleString()} upvotes
                                    </p>
                                </div>
                                {post.data.thumbnail && post.data.thumbnail.startsWith('http') && (
                                    <img
                                        src={post.data.thumbnail}
                                        alt="thumb"
                                        className="h-14 w-14 rounded-xl object-cover bg-gray-200 flex-shrink-0"
                                    />
                                )}
                            </div>
                        </a>
                    ))}
                </div>
            )}

            <div className="mt-4 pt-4 border-t border-gray-100">
                <a
                    href="https://reddit.com/r/popular"
                    target="_blank"
                    className="text-sm text-primary hover:text-primary-dark"
                >
                    Show more
                </a>
            </div>
        </div>
    );
}
