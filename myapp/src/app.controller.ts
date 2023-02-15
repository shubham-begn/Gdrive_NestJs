import { Controller, Get, Post,Req,Param } from '@nestjs/common';
import { AppService } from './app.service';
import {  Request } from 'express';

@Controller('/user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getHello')
  getHello():any{
    return this.appService.getHello();
  }

  @Get('/deleteFile/:id')
   deleteFile(@Param() id: string): any{
     return this.appService.deleteFile();
  }
  @Get('/uploadFile')
   uploadFile(): any{
     return this.appService.uploadFile();
   }
   @Get('/generatePublicUrl')
   generatePublicUrl():any{
   return this.appService.generatePublicUrl();
   }
   @Get('/listFile')
  listFile(): any{
       return this.appService.listFile();
     }

     @Get('/searchDrive')
     searchDrive(): any{
      const results=this.appService.searchDrive("name contains 'Eazydiner.png'");
          
console.log(results);
        }

  
}
