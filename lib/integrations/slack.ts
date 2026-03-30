import { WebClient } from '@slack/web-api';

const client = new WebClient(process.env.SLACK_API_KEY);

export interface SlackMessage {
  channel: string;
  text: string;
  thread_ts?: string;
  attachments?: any[];
}

export interface SlackChannel {
  id: string;
  name: string;
  is_private: boolean;
  num_members: number;
}

export async function sendMessage(
  message: SlackMessage
): Promise<string> {
  try {
    const response = await client.chat.postMessage({
      channel: message.channel,
      text: message.text,
      thread_ts: message.thread_ts,
      attachments: message.attachments,
    });
    return response.ts || '';
  } catch (error) {
    throw new Error(`Slack API error: ${error}`);
  }
}

export async function getChannels(): Promise<SlackChannel[]> {
  try {
    const response = await client.conversations.list({
      types: 'public_channel,private_channel',
      exclude_archived: true,
    });
    return (response.channels || []) as SlackChannel[];
  } catch (error) {
    throw new Error(`Slack API error: ${error}`);
  }
}

export async function uploadFile(
  file: Buffer,
  filename: string,
  channels: string[]
): Promise<string> {
  try {
    const response = await client.files.upload({
      file,
      filename,
      channels: channels.join(','),
    });
    return response.file?.id || '';
  } catch (error) {
    throw new Error(`Slack API error: ${error}`);
  }
}