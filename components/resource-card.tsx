"use client";

import { useState } from "react";
import { Resource } from "@/types/resource";
import {
    VideoCameraIcon,
    DocumentTextIcon,
    AcademicCapIcon,
    BookOpenIcon,
    LinkIcon,
    PencilSquareIcon,
    HeartIcon,
    ShareIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import CreateResourceModal from "./create-resource-modal";

const typeIcons = {
    video: VideoCameraIcon,
    article: DocumentTextIcon,
    tutorial: AcademicCapIcon,
    course: AcademicCapIcon,
    book: BookOpenIcon,
    other: LinkIcon,
};

interface ResourceCardProps {
    resource: Resource;
    isOwner?: boolean;
    currentUserId?: string;
}

export default function ResourceCard({ resource, isOwner, currentUserId }: ResourceCardProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const Icon = typeIcons[resource.type as keyof typeof typeIcons] || LinkIcon;

    // Like State not implemented yet
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(Math.floor(Math.random() * 1000) + 1);
    const [isLikeLoading, setIsLikeLoading] = useState(false);

    // Share State
    const [copied, setCopied] = useState(false);

    const handleLike = async () => {
        if (!currentUserId || isLikeLoading) return;

        // Optimistic update
        const previousLiked = liked;
        const previousCount = likesCount;

        setLiked(!liked);
        setLikesCount((prev: number) => liked ? prev - 1 : prev + 1);
        setIsLikeLoading(true);

        try {
            const res = await fetch(`/api/resources/${resource._id}/like`, { method: 'POST' });
            if (!res.ok) throw new Error();
        } catch (error) {
            // Revert
            setLiked(previousLiked);
            setLikesCount(previousCount);
        } finally {
            setIsLikeLoading(false);
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(resource.link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Format date
    const date = new Date(resource.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });

    return (
        <>
            <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md hover:ring-primary/20">
                <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary-darker">
                            <Icon className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-primary-dark transition-colors line-clamp-1">
                                {resource.title}
                            </h3>
                            <p className="text-xs text-gray-500 capitalize">
                                {resource.authorName ? <span className="font-medium text-gray-700">{resource.authorName}</span> : "Anonymous"} • {resource.type} • {date}
                            </p>
                        </div>
                    </div>

                    {isOwner && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setIsEditModalOpen(true);
                            }}
                            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-primary transition-colors"
                        >
                            <PencilSquareIcon className="h-5 w-5" />
                        </button>
                    )}
                </div>

                <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                    {resource.description}
                </p>

                {/* Link Preview Card */}
                {(resource.ogTitle || resource.ogImage) && (
                    <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-4 block overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition-colors hover:bg-gray-100"
                    >
                        {resource.ogImage && (
                            <div className="h-40 w-full overflow-hidden">
                                <img
                                    src={resource.ogImage}
                                    alt={resource.ogTitle || "Preview"}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        )}
                        <div className="p-3">
                            <h4 className="font-semibold text-gray-900 line-clamp-1">{resource.ogTitle || resource.title}</h4>
                            {resource.ogDescription && (
                                <p className="mt-1 text-xs text-gray-500 line-clamp-2">{resource.ogDescription}</p>
                            )}
                            <p className="mt-2 text-xs text-gray-400 truncate">{new URL(resource.link).hostname}</p>
                        </div>
                    </a>
                )}

                {/* Actions Row */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-4">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-2 text-sm font-medium transition-colors ${liked ? "text-red-500" : "text-gray-500 hover:text-red-500"
                                }`}
                        >
                            {liked ? <HeartIconSolid className="h-5 w-5" /> : <HeartIcon className="h-5 w-5" />}
                            <span>{likesCount}</span>
                        </button>

                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                            title="Copy Link"
                        >
                            <ShareIcon className="h-5 w-5" />
                            <span>{copied ? "Copied!" : "Share"}</span>
                        </button>
                    </div>

                    {!resource.ogTitle && !resource.ogImage && (
                        <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark hover:underline"
                        >
                            <LinkIcon className="h-4 w-4" />
                            Visit
                        </a>
                    )}
                </div>
            </div>

            <CreateResourceModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                initialData={resource}
            />
        </>
    );
}
