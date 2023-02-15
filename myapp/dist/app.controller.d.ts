import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): any;
    deleteFile(id: string): any;
    uploadFile(): any;
    generatePublicUrl(): any;
    listFile(): any;
    searchDrive(): any;
}
