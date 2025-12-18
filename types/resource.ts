export type ResourceType = "video" | "article" | "tutorial" | "course" | "book" | "other";

export interface Resource {
    _id?: string; // MongoDB ID uses _id
    userId: string; // Foreign key to users collection
    title: string;
    description: string;
    type: ResourceType;
    link: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    authorName?: string;
    authorImage?: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateResourceInput {
    title: string;
    description: string;
    type: ResourceType;
    link: string;
}
