import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  createdTime: string;
}

export interface UploadOptions {
  name: string;
  parents?: string[];
  mimeType?: string;
}

export async function uploadFile(
  content: Buffer | string,
  options: UploadOptions
): Promise<DriveFile> {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: options.name,
        parents: options.parents,
      },
      media: {
        mimeType: options.mimeType || 'application/octet-stream',
        body: content,
      },
    });
    return response.data as DriveFile;
  } catch (error) {
    throw new Error(`Google Drive API error: ${error}`);
  }
}

export async function listFiles(folderId?: string): Promise<DriveFile[]> {
  try {
    const response = await drive.files.list({
      q: folderId ? `'${folderId}' in parents` : undefined,
      fields: 'files(id,name,mimeType,createdTime)',
    });
    return (response.data.files || []) as DriveFile[];
  } catch (error) {
    throw new Error(`Google Drive API error: ${error}`);
  }
}