export type ResourceType = "video" | "article" | "tutorial" | "course" | "book" | "other";

export interface Resource {
    _id?: string; // MongoDB ID uses _id
    userId: string; // Foreign key to users collection
    title: string;
    description: string;
    type: ResourceType;
    link: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateResourceInput {
    title: string;
    description: string;
    type: ResourceType;
    link: string;
}
