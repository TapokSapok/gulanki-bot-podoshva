import { profileT } from '../schema/profile';
import { userT, UserType } from '../schema/user';
export declare function getUserByTgIdWithProfile(tgId: number): Promise<{
    user: typeof userT.$inferSelect | null;
    profile: typeof profileT.$inferSelect | null;
}>;
export declare function getUserByTgId(tgId: number): Promise<{
    id: number;
    tg_id: number;
    username: string | null;
    firstName: string | null;
    karma: number;
    role: import("../schema/user").Role;
    isBanned: boolean;
    createdAt: Date;
}>;
export declare function createUser(data: typeof userT.$inferInsert): Promise<{
    id: number;
    tg_id: number;
    username: string | null;
    firstName: string | null;
    karma: number;
    role: import("../schema/user").Role;
    isBanned: boolean;
    createdAt: Date;
}>;
export declare function updateUser(id: number, data: Partial<UserType>): Promise<{
    id: number;
    tg_id: number;
    username: string | null;
    firstName: string | null;
    karma: number;
    role: import("../schema/user").Role;
    isBanned: boolean;
    createdAt: Date;
}>;
