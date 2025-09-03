export declare function createCity(cityName: string, publicChannelId: number, moderateChannelId: number): Promise<{
    id: number;
    name: string;
    createdAt: Date;
    publicChannelId: number;
    moderateChannelId: number;
}>;
export declare function removeCity(cityName: string): Promise<{
    id: number;
    name: string;
    createdAt: Date;
    publicChannelId: number;
    moderateChannelId: number;
}>;
export declare function getCityById(id: number): Promise<{
    id: number;
    name: string;
    publicChannelId: number;
    moderateChannelId: number;
    createdAt: Date;
}>;
export declare function getCityByName(cityName: string): Promise<{
    id: number;
    name: string;
    publicChannelId: number;
    moderateChannelId: number;
    createdAt: Date;
}>;
export declare function getAllCities(): Promise<{
    id: number;
    name: string;
    publicChannelId: number;
    moderateChannelId: number;
    createdAt: Date;
}[]>;
