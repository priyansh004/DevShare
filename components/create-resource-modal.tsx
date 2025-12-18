"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Resource } from "@/types/resource";

const resourceSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    type: z.enum(["video", "article", "tutorial", "course", "book", "other"], {
        message: "Please select a resource type",
    }),
    link: z.string().url("Please enter a valid URL"),
});

type ResourceFormData = z.infer<typeof resourceSchema>;

interface CreateResourceModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: Resource; // Optional prop for editing
}

export default function CreateResourceModal({ isOpen, onClose, initialData }: CreateResourceModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ResourceFormData>({
        resolver: zodResolver(resourceSchema),
        defaultValues: {
            title: "",
            description: "",
            link: "",
            type: undefined,
        }
    });

    // Reset form when initialData changes or modal opens
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                reset({
                    title: initialData.title,
                    description: initialData.description,
                    link: initialData.link,
                    type: initialData.type,
                });
            } else {
                reset({
                    title: "",
                    description: "",
                    link: "",
                    type: undefined,
                });
            }
        }
    }, [isOpen, initialData, reset]);

    if (!isOpen) return null;

    const onSubmit = async (data: ResourceFormData) => {
        setIsSubmitting(true);
        try {
            const url = initialData ? `/api/resources/${initialData._id}` : "/api/resources";
            const method = initialData ? "PATCH" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                reset();
                onClose();
                router.refresh();
            } else {
                console.error("Failed to save resource");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!initialData || !confirm("Are you sure you want to delete this resource?")) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/resources/${initialData._id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                onClose();
                router.refresh();
            }
        } catch (error) {
            console.error("Error deleting resource:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-primary-darker">
                        {initialData ? "Edit Resource" : "Share Resource"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
                        <input
                            {...register("title")}
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                            placeholder="e.g., Advanced React Patterns"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Link</label>
                        <input
                            {...register("link")}
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                            placeholder="https://..."
                        />
                        {errors.link && (
                            <p className="mt-1 text-sm text-red-500">{errors.link.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Type</label>
                        <select
                            {...register("type")}
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all bg-white"
                        >
                            <option value="">Select type...</option>
                            <option value="video">Video</option>
                            <option value="article">Article</option>
                            <option value="tutorial">Tutorial</option>
                            <option value="course">Course</option>
                            <option value="book">Book</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.type && (
                            <p className="mt-1 text-sm text-red-500">{errors.type.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            {...register("description")}
                            rows={4}
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                            placeholder="What makes this resource helpful?"
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="pt-2 flex gap-3">
                        {initialData && (
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={isSubmitting}
                                className="rounded-xl border border-red-200 p-3 text-red-500 hover:bg-red-50 transition-colors"
                                title="Delete Resource"
                            >
                                <TrashIcon className="h-6 w-6" />
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-xl bg-primary px-4 py-3 font-semibold border-1 text-primary-darker shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-primary/50 disabled:opacity-50"
                        >
                            {isSubmitting ? "Saving..." : (initialData ? "Update Resource" : "Post Resource")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
