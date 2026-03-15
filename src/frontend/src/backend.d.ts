import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Sorry = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export type TestimonialResult = {
    __kind__: "ok";
    ok: bigint;
} | {
    __kind__: "err";
    err: string;
};
export interface Lead {
    id: bigint;
    orgType: string;
    name: string;
    createdAt: bigint;
    message: string;
    phone: string;
}
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    isPublished: boolean;
    slug: string;
    publishedAt: bigint;
    author: string;
    excerpt: string;
}
export type PostResult = {
    __kind__: "ok";
    ok: bigint;
} | {
    __kind__: "err";
    err: string;
};
export type UpdateResult = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export type LeadResult = {
    __kind__: "ok";
    ok: bigint;
} | {
    __kind__: "err";
    err: string;
};
export interface UserProfile {
    name: string;
}
export interface Testimonial {
    id: bigint;
    name: string;
    role: string;
    quote: string;
    isVisible: boolean;
    organization: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    claimOwnerAdmin(): Promise<Sorry>;
    createPost(title: string, slug: string, content: string, excerpt: string, author: string, isPublished: boolean): Promise<PostResult>;
    createTestimonial(quote: string, name: string, role: string, organization: string, isVisible: boolean): Promise<TestimonialResult>;
    deletePost(id: bigint): Promise<UpdateResult>;
    deleteSiteContent(key: string): Promise<void>;
    deleteTestimonial(id: bigint): Promise<UpdateResult>;
    getAllPosts(): Promise<Array<BlogPost>>;
    getAllSiteContent(): Promise<Array<[string, string]>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getLeads(): Promise<Array<Lead>>;
    getPostBySlug(slug: string): Promise<BlogPost | null>;
    getPublishedPosts(): Promise<Array<BlogPost>>;
    getSiteContent(key: string): Promise<string | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVisibleTestimonials(): Promise<Array<Testimonial>>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setSiteContent(key: string, value: string): Promise<void>;
    submitLead(name: string, phone: string, orgType: string, message: string): Promise<LeadResult>;
    updatePost(id: bigint, title: string, slug: string, content: string, excerpt: string, author: string, isPublished: boolean): Promise<UpdateResult>;
    updateTestimonial(id: bigint, quote: string, name: string, role: string, organization: string, isVisible: boolean): Promise<UpdateResult>;
}
