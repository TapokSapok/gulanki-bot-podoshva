import 'dotenv/config';
export declare class Config {
    static bot: {
        token: string;
    };
    static db: {
        database: string;
        host: string;
        port: number;
        username: string;
        password: string;
    };
}
