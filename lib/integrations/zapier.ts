import axios from 'axios';

const client = axios.create({
  baseURL: 'https://hooks.zapier.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ZapierWebhookData {
  [key: string]: any;
}

export interface ZapierResponse {
  status: string;
  attempt: string;
  id: string;
}

export async function triggerWebhook(
  webhookUrl: string,
  data: ZapierWebhookData
): Promise<ZapierResponse> {
  try {
    const response = await client.post(webhookUrl, data);
    return response.data;
  } catch (error) {
    throw new Error(`Zapier webhook error: ${error}`);
  }
}

export async function triggerCallSummaryZap(
  summary: string,
  participants: string[],
  duration: number,
  timestamp: string
): Promise<ZapierResponse> {
  try {
    const webhookUrl = process.env.ZAPIER_CALL_SUMMARY_WEBHOOK;
    if (!webhookUrl) {
      throw new Error('Zapier webhook URL not configured');
    }
    
    const data = {
      summary,
      participants,
      duration,
      timestamp,
      source: 'fathom-connector',
    };
    
    return await triggerWebhook(webhookUrl, data);
  } catch (error) {
    throw new Error(`Zapier call summary trigger error: ${error}`);
  }
}