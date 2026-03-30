BEGIN;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('assistant', 'me', 'my_assistant')),
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX users_email_idx ON users(email);
CREATE INDEX users_created_at_idx ON users(created_at);

-- Create contacts table
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT,
    company TEXT,
    role TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX contacts_user_id_idx ON contacts(user_id);
CREATE INDEX contacts_email_idx ON contacts(email);
CREATE INDEX contacts_company_idx ON contacts(company);
CREATE INDEX contacts_created_at_idx ON contacts(created_at);

-- Create calls table
CREATE TABLE calls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    fathom_id TEXT NOT NULL,
    title TEXT NOT NULL,
    call_date TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER,
    transcript_url TEXT,
    recording_url TEXT,
    drive_folder_id TEXT,
    claude_project_id TEXT,
    sync_status TEXT NOT NULL CHECK (sync_status IN ('pending', 'syncing', 'completed', 'failed')),
    last_synced_at TIMESTAMPTZ,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX calls_user_id_idx ON calls(user_id);
CREATE UNIQUE INDEX calls_fathom_id_idx ON calls(fathom_id);
CREATE INDEX calls_call_date_idx ON calls(call_date);
CREATE INDEX calls_sync_status_idx ON calls(sync_status);
CREATE INDEX calls_created_at_idx ON calls(created_at);

-- Create call_participants table
CREATE TABLE call_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    call_id UUID NOT NULL REFERENCES calls(id) ON DELETE CASCADE,
    contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX call_participants_user_id_idx ON call_participants(user_id);
CREATE INDEX call_participants_call_id_idx ON call_participants(call_id);
CREATE INDEX call_participants_contact_id_idx ON call_participants(contact_id);
CREATE UNIQUE INDEX call_participants_call_contact_idx ON call_participants(call_id, contact_id);
CREATE INDEX call_participants_created_at_idx ON call_participants(created_at);

-- Create transcripts table
CREATE TABLE transcripts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    call_id UUID NOT NULL REFERENCES calls(id) ON DELETE CASCADE,
    raw_content TEXT NOT NULL,
    processed_content JSONB,
    word_count INTEGER,
    processing_status TEXT NOT NULL CHECK (processing_status IN ('pending', 'processing', 'completed', 'failed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX transcripts_user_id_idx ON transcripts(user_id);
CREATE UNIQUE INDEX transcripts_call_id_idx ON transcripts(call_id);
CREATE INDEX transcripts_processing_status_idx ON transcripts(processing_status);
CREATE INDEX transcripts_created_at_idx ON transcripts(created_at);

-- Create summaries table
CREATE TABLE summaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    summary_type TEXT NOT NULL CHECK (summary_type IN ('call', 'weekly_contact', 'comparison')),
    call_id UUID REFERENCES calls(id) ON DELETE CASCADE,
    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
    period_start TIMESTAMPTZ,
    period_end TIMESTAMPTZ,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    key_topics JSONB,
    decisions_made JSONB,
    follow_ups JSONB,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX summaries_user_id_idx ON summaries(user_id);
CREATE INDEX summaries_summary_type_idx ON summaries(summary_type);
CREATE INDEX summaries_call_id_idx ON summaries(call_id);
CREATE INDEX summaries_contact_id_idx ON summaries(contact_id);
CREATE INDEX summaries_period_start_idx ON summaries(period_start);
CREATE INDEX summaries_created_at_idx ON summaries(created_at);

-- Create action_items table
CREATE TABLE action_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    call_id UUID NOT NULL REFERENCES calls(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('task', 'commitment', 'deadline', 'follow_up')),
    priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    assigned_to UUID REFERENCES contacts(id) ON DELETE SET NULL,
    due_date TIMESTAMPTZ,
    status TEXT NOT NULL CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
    completed_at TIMESTAMPTZ,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX action_items_user_id_idx ON action_items(user_id);
CREATE INDEX action_items_call_id_idx ON action_items(call_id);
CREATE INDEX action_items_category_idx ON action_items(category);
CREATE INDEX action_items_status_idx ON action_items(status);
CREATE INDEX action_items_due_date_idx ON action_items(due_date);
CREATE INDEX action_items_assigned_to_idx ON action_items(assigned_to);
CREATE INDEX action_items_created_at_idx ON action_items(created_at);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE action_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "owner_all" ON users FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON contacts FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON calls FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON call_participants FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON transcripts FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON summaries FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON action_items FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

COMMIT;