# V1 - Fathom Call Connector And Summarizer

> Your personal business therapist that captures, organizes, and makes actionable all your strategic conversations.

## What This Does

This tool automatically pulls Fathom call transcripts, stores them in Google Drive, uploads them to Claude for AI analysis, and provides a comprehensive interface to manage, compare, and extract insights from all your business conversations. Built for CEOs who need to stay on top of countless calls and conversations without losing valuable strategic insights.

## For Who

- CEOs and business leaders drowning in calls
- Teams that need centralized conversation intelligence
- Anyone who wants to turn scattered call transcripts into actionable business insights

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **AI**: Claude (Anthropic)
- **Integrations**: Google Drive, Gmail, Slack, Zapier, Google Sheets, Notion
- **Deployment**: Vercel
- **Authentication**: Supabase Auth with role-based access

## Prerequisites

- Node.js 20+
- npm or pnpm
- Supabase CLI
- Git
- Accounts for: Anthropic (Claude), Google Drive, Fathom, Slack

## Local Setup

1. **Clone and install**
bash
git clone <your-repo>
cd fathom-call-connector
npm install


2. **Environment setup**
bash
cp .env.example .env.local
# Fill in your environment variables (see table below)


3. **Start Supabase**
bash
supabase start
supabase db reset


4. **Run development server**
bash
npm run dev


Visit `http://localhost:3000`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key for server actions | Yes |
| `ANTHROPIC_API_KEY` | Claude API key for AI processing | Yes |
| `FATHOM_API_KEY` | Fathom API key for transcript sync | Yes |
| `GOOGLE_DRIVE_CLIENT_ID` | Google Drive OAuth client ID | Yes |
| `GOOGLE_DRIVE_CLIENT_SECRET` | Google Drive OAuth client secret | Yes |
| `GMAIL_CLIENT_ID` | Gmail API client ID | Yes |
| `GMAIL_CLIENT_SECRET` | Gmail API client secret | Yes |
| `SLACK_BOT_TOKEN` | Slack bot token for integrations | Yes |
| `ZAPIER_WEBHOOK_URL` | Zapier webhook for automation triggers | No |
| `NOTION_API_KEY` | Notion integration token | No |
| `WEBHOOK_SECRET` | Secret for validating incoming webhooks | Yes |

## Database Setup

The database schema is automatically applied when you run `supabase db reset`. It includes:

- 12 tables for users, calls, transcripts, summaries, action items, etc.
- Row Level Security policies for multi-tenant access
- Automated triggers for sync jobs
- Full-text search indexes for transcripts

## Deploy to Vercel

1. **Connect your repository**
bash
vercel --prod


2. **Add environment variables** in Vercel dashboard

3. **Update Supabase settings**
   - Add your Vercel domain to Supabase Auth settings
   - Update CORS settings if needed

## Project Structure


├── app/                    # Next.js 15 app router
│   ├── (protected)/       # Protected routes with auth
│   ├── api/               # API routes
│   └── (public)/          # Public routes
├── components/            # Reusable UI components
├── lib/                   # Business logic and utilities
├── actions/               # Server actions
├── db/                    # Database queries and schema
├── integrations/          # Third-party API clients
├── supabase/             # Supabase migrations and config
└── types/                # TypeScript type definitions


## Key Features

- 🔄 **Auto-sync**: Fathom transcripts → Google Drive → Claude
- 📊 **Weekly summaries**: Know what you discussed with each contact
- ✅ **Action tracking**: Extract and manage tasks from calls
- 🔍 **Call comparison**: Find patterns across conversations
- 📱 **Mobile-friendly**: Access insights on the go
- 🤖 **AI insights**: Strategic recommendations from your call data

## Getting Help

- Check the `CLAUDE.md` file for AI development guidelines
- Review `TECHNICAL_DEBT.md` for known limitations
- See `ROADMAP.md` for planned features

---

Built with ❤️ for business leaders who need their conversations to work as hard as they do.