export interface Post {
    id: number;
    author: string;
    role: string;
    content: string;
    imageurl?: string;
    pdfurl?: string;
    createdAt: Date;
    responses?: Response[];
}

export interface Response {
    id: number;
    postId: number;
    author: string;
    role: string;
    content: string;
    imageUrl?: string;
    pdfUrl?: string;
    createdAt: Date;
}