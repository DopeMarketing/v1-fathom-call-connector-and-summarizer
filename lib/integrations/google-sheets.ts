import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export interface SheetData {
  range: string;
  values: string[][];
}

export interface AppendOptions {
  spreadsheetId: string;
  range: string;
  values: string[][];
}

export async function appendData(
  options: AppendOptions
): Promise<void> {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: options.spreadsheetId,
      range: options.range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: options.values,
      },
    });
  } catch (error) {
    throw new Error(`Google Sheets API error: ${error}`);
  }
}

export async function readData(
  spreadsheetId: string,
  range: string
): Promise<string[][]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values || [];
  } catch (error) {
    throw new Error(`Google Sheets API error: ${error}`);
  }
}