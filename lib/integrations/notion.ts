import { Client } from '@notionhq/client';

const client = new Client({
  auth: process.env.NOTION_API_KEY,
});

export interface NotionPage {
  id: string;
  title: string;
  url: string;
  created_time: string;
}

export interface CreatePageOptions {
  parent_id: string;
  title: string;
  content: string;
}

export async function createPage(
  options: CreatePageOptions
): Promise<NotionPage> {
  try {
    const response = await client.pages.create({
      parent: {
        database_id: options.parent_id,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: options.title,
              },
            },
          ],
        },
      },
      children: [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: options.content,
                },
              },
            ],
          },
        },
      ],
    });
    return response as NotionPage;
  } catch (error) {
    throw new Error(`Notion API error: ${error}`);
  }
}

export async function searchPages(query: string): Promise<NotionPage[]> {
  try {
    const response = await client.search({
      query,
      filter: {
        property: 'object',
        value: 'page',
      },
    });
    return response.results as NotionPage[];
  } catch (error) {
    throw new Error(`Notion API error: ${error}`);
  }
}