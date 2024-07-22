export interface IVideo{
    id?: number;
    title: string;
    description: string;
    videoUrl: string;
    videoPublicId: string;
    duration: number;
    thumbnailUrl: string;
    isPublished?: boolean;
}