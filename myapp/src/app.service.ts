
import { Injectable } from '@nestjs/common';
const { google } = require('googleapis');

import * as path from 'path';
import * as fs from 'fs';

import * as dotenv from 'dotenv';
dotenv.config();

import {Request} from 'express';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const REFRESH_TOKEN =process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
    REDIRECT_URI
  );
  
  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  
  const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
  });
  
  
  @Injectable()
  export class AppService {
  
  
  getHello() {
    console.log(process.env.CLIENT_ID);
    return;
}

filePath = path.join(__dirname, 'Eazydiner.png');

async listFile() {
     
  
    const res = await drive.files.list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    });
   
    const files = res.data.files;
if (files.length === 0) {
  console.log('No files found.');
  return;
}

// console.log( await res)

console.log('Files:');
files.map((file) => {
  console.log(`${file.name} (${file.id})`);
})

  return;
}

async  generatePublicUrl() {
  try {
    const fileId = '1nNistIrMIKb4WjjDMVSGWhXPt-mNGRbP';
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

  
    const result = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink, webContentLink',
    });
    console.log(result.data);
  } catch (error) {
    console.log(error.message);
  }
}

async  uploadFile() {


  try {
    const response = await drive.files.create({
      requestBody: {
        name: 'Eazydiner.png', 
        mimeType: 'image/png',
      },
      media: {
        mimeType: 'image/png',
        body: fs.createReadStream(this.filePath),
      },
    });
    console.log(response.data);
    return response.data.id;
  } catch (error) {
    console.log(error.message);
  }
}

async  deleteFile() {
  try {
    const response = await drive.files.delete({
      fileId:'1YSqH8a-nKxubEyHI5NBTJL8TSIY52VH2'
    });
    console.log(response.data, response.status);
  } catch (error) {
    console.log(error.message);
  }
}

async searchDrive(query) {
  try {
    const res = await drive.files.list({
      q: query,
      fields: 'files(id, name)',
    });
    console.log(res.data);
    return res.data.files;
    
  } catch (err) {
    console.log(`The API returned an error: ${err}`);
    return [];
  }
}
}
