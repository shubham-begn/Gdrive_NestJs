export declare class AppService {
    getHello(): void;
    filePath: string;
    listFile(): Promise<void>;
    generatePublicUrl(): Promise<void>;
    uploadFile(): Promise<any>;
    deleteFile(): Promise<void>;
    searchDrive(query: any): Promise<any>;
}
