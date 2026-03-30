import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
  scopes: ['https://www.googleapis.com/auth/gmail.send'],
});

const gmail = google.gmail({ version: 'v1', auth });

export interface EmailOptions {
  to: string;
  subject: string;
  body: string;
  attachments?: { filename: string; content: string }[];
}

export interface EmailThread {
  id: string;
  snippet: string;
  historyId: string;
}

export async function sendEmail(options: EmailOptions): Promise<string> {
  try {
    const message = [
      `To: ${options.to}`,
      `Subject: ${options.subject}`,
      '',
      options.body,
    ].join('\n');
    
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    
    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });
    return response.data.id || '';
  } catch (error) {
    throw new Error(`Gmail API error: ${error}`);
  }
}

export async function getThreads(query?: string): Promise<EmailThread[]> {
  try {
    const response = await gmail.users.threads.list({
      userId: 'me',
      q: query,
    });
    return (response.data.threads || []) as EmailThread[];
  } catch (error) {
    throw new Error(`Gmail API error: ${error}`);
  }
}