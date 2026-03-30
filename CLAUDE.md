# CLAUDE.md - Development Briefing

> Read this file before making any changes. This is your guide to working on the Fathom Call Connector And Summarizer project.

## Project Overview

This tool automatically pulls Fathom call transcripts, stores them in Google Drive, uploads them to Claude for AI analysis, and provides a comprehensive interface for CEOs to manage and extract insights from all business conversations. Think of it as a personal business therapist that knows everything discussed across all calls.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **AI**: Claude (Anthropic)
- **Deployment**: Vercel
- **Integrations**: Fathom, Google Drive, Gmail, Slack, Zapier, Google Sheets, Notion

## Folder Structure


app/
├── (protected)/           # Auth-required pages
│   ├── dashboard/         # Main dashboard
│   ├── calls/             # Call management
│   ├── summaries/         # Weekly summaries
│   ├── action-items/      # Task tracking
│   ├── compare/           # Call comparison
│   ├── insights/          # AI-generated insights
│   ├── competitors/       # Competitor intelligence
│   ├── contacts/          # Contact management
│   ├── pipeline/          # Sync pipeline status
│   ├── settings/          # User preferences
│   └── users/             # User management
├── (public)/              # Public pages
│   └── login/             # Authentication
└── api/                   # API routes
    ├── sync/              # Data sync endpoints
    └── process/           # AI processing endpoints

components/
├── ui/                    # Shadcn/ui components
├── forms/                 # Form components
├── tables/                # Data table components
└── charts/                # Visualization components

lib/
├── auth.ts                # Authentication utilities
├── database.ts            # Database connection
├── integrations.ts        # Third-party API clients
├── ai.ts                  # Claude AI processing
├── sync.ts                # Data sync logic
└── utils.ts               # General utilities

actions/
├── calls.ts               # Call-related server actions
├── summaries.ts           # Summary generation actions
├── sync.ts                # Sync pipeline actions
└── auth.ts                # Authentication actions

db/
├── queries/               # Database query functions
├── migrations/            # Supabase migrations
└── types.ts               # Database type definitions

integrations/
├── fathom.ts              # Fathom API client
├── google-drive.ts        # Google Drive integration
├── claude.ts              # Claude API client
├── gmail.ts               # Gmail integration
├── slack.ts               # Slack integration
└── zapier.ts              # Zapier webhooks


## Coding Conventions

- **TypeScript**: Strict mode enabled, no `any` types
- **Components**: Server components by default, use `'use client'` only when needed
- **Data Access**: All database queries in `/db/queries/`
- **Business Logic**: Keep in `/lib/` and `/actions/`
- **Security**: No API keys or secrets in client components
- **Styling**: Tailwind CSS with consistent spacing scale
- **Forms**: Use React Hook Form with Zod validation
- **Error Handling**: Consistent error boundaries and toast notifications

## Current State (Scaffold)

✅ **Completed**:
- Next.js 15 project structure with app router
- Supabase configuration with auth and database
- Complete data model (12 tables)
- Route stubs for all 17 pages from sitemap
- Basic UI components (buttons, forms, tables)
- Authentication with role-based access (Me, Assistant, My assistant)
- Integration stubs for all required services
- Responsive layout with mobile-first design

❌ **Not Built Yet**:
- Fathom API integration and sync pipeline
- Claude project upload automation
- Call transcript processing
- Weekly summary generation
- Action item extraction
- Call comparison interface
- Competitor intelligence tracking
- Real-time sync status updates

## V1 Features to Build

### High Priority
1. **Automated Sync Pipeline**: Fathom → Google Drive → Claude with 30min processing time
2. **Call Management Interface**: View, search, and organize transcripts
3. **Action Item Extraction**: AI-powered task identification and tracking
4. **Weekly Contact Summaries**: Automated relationship management reports
5. **Call Comparison Tool**: Multi-call analysis for pattern recognition

### Integration Priority
1. Fathom API (critical path)
2. Claude API (critical path) 
3. Google Drive (critical path)
4. Gmail (nice to have)
5. Slack (nice to have)

## Never Touch (Without Explicit Instruction)

- `.env` files - these contain secrets
- Migration files in `/supabase/migrations/` - can break database
- RLS policies without security review
- Authentication configuration
- Production environment variables
- Webhook endpoints without proper validation

## How to Work on This Project

### Before Starting
1. **Read this file completely**
2. Check `TECHNICAL_DEBT.md` for known issues
3. Review `ROADMAP.md` for context on priorities
4. Ensure environment is set up correctly

### During Development
1. **Build incrementally** - start with data flow, then UI
2. **Test integrations early** - API limits and rate limits matter
3. **Mobile-first** - CEO needs this on mobile between meetings
4. **Real-time feedback** - sync status and processing updates
5. **Error handling** - graceful fallbacks for API failures

### Before Committing
1. `npm run build` - ensure no build errors
2. `npm run lint` - fix any linting issues
3. Test the specific feature you built
4. Update technical debt document if shortcuts taken

### Commit Messages
Use conventional commits:
- `feat: add fathom transcript sync pipeline`
- `fix: handle claude api rate limiting`
- `docs: update integration setup guide`

### Documentation
- **Code comments**: Explain complex business logic
- **API documentation**: Document all custom endpoints
- **Integration notes**: Document API quirks and limitations
- **Technical debt**: Explicitly call out shortcuts taken

## Key Business Rules

- All transcripts must be processed within 30 minutes
- Assistant role has same access as CEO
- Mobile experience is non-negotiable
- Privacy: transcripts never leave user's Claude project
- Reliability: graceful degradation if integrations fail
- Speed: recent conversations prioritized for quick access

## Performance Requirements

- Page load times under 2 seconds
- Real-time sync status updates
- Responsive on mobile devices
- Handle 100+ calls per week per user
- Search results in under 1 second

---

**Remember**: This tool becomes the user's external business brain. Every decision should optimize for making scattered conversation data immediately actionable for strategic decision-making.