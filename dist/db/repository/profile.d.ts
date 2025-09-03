import { profileT, ProfileType } from '../schema/profile';
export declare function createProfile(data: typeof profileT.$inferInsert): Promise<{
    id: number;
    name: string;
    createdAt: Date;
    userId: number;
    age: number;
    photo: string[];
    city: string;
    aboutMe: string | null;
}>;
export declare function updateProfile(id: number, data: Partial<ProfileType>): Promise<{
    id: number;
    userId: number;
    name: string;
    age: number;
    photo: string[];
    city: string;
    aboutMe: string | null;
    createdAt: Date;
}>;
