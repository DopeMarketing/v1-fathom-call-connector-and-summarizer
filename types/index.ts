export interface User {
  id: string;
  email: string;
  role: 'assistant' | 'me' | 'my_assistant';
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Contact {
  id: string;
  user_id: string;
  name: string;
  email: string | null;
  company: string | null;
  role: string | null;
  metadata: any;
  created_at: Date;
  updated_at: Date;
}

export interface Call {
  id: string;
  user_id: string;
  fathom_id: string;
  title: string;
  call_date: Date;
  duration_minutes: number | null;
  transcript_url: string | null;
  recording_url: string | null;
  drive_folder_id: string | null;
  claude_project_id: string | null;
  sync_status: 'pending' | 'syncing' | 'completed' | 'failed';
  last_synced_at: Date | null;
  metadata: any;
  created_at: Date;
  updated_at: Date;
}

export interface CallParticipant {
  id: string;
  user_id: string;
  call_id: string;
  contact_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface Transcript {
  id: string;
  user_id: string;
  call_id: string;
  raw_content: string;
  processed_content: any;
  word_count: number | null;
  processing_status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: Date;
  updated_at: Date;
}

export interface Summary {
  id: string;
  user_id: string;
  summary_type: 'call' | 'weekly_contact' | 'comparison';
  call_id: string | null;
  contact_id: string | null;
  period_start: Date | null;
  period_end: Date | null;
  title: string;
  content: string;
  key_topics: any;
  decisions_made: any;
  follow_ups: any;
  metadata: any;
  created_at: Date;
  updated_at: Date;
}

export interface ActionItem {
  id: string;
  user_id: string;
  call_id: string;
  title: string;
  description: string | null;
  category: 'task' | 'commitment' | 'deadline' | 'follow_up';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to: string | null;
  due_date: Date | null;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  completed_at: Date | null;
  metadata: any;
  created_at: Date;
  updated_at: Date;
}

export interface Theme {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  category: string | null;
  frequency_score: number;
  importance_score: number;
  first_mentioned: Date;
  last_mentioned: Date;
  metadata: any;
  created_at: Date;
  updated_at: Date;
}

export interface CallTheme {
  id: string;
  user_id: string;
  call_id: string;
  theme_id: string;
  relevance_score: number;
  mentions_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface CompetitorIntelligence {
  id: string;
  user_id: string;
  call_id: string;
  type: 'competitor' | 'market_trend' | 'industry_insight';
  entity_name: string;
  content: string;
  sentiment: 'positive' | 'negative' | 'neutral' | null;
  confidence_score: number;
  tags: any;
  metadata: any;
  created_at: Date;
  updated_at: Date;
}

export interface SyncJob {
  id: string;
  user_id: string;
  job_type: 'fathom_sync' | 'drive_upload' | 'claude_upload' | 'process_transcript' | 'generate_summary';
  entity_type: 'call' | 'transcript' | 'summary';
  entity_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  started_at: Date | null;
  completed_at: Date | null;
  error_message: string | null;
  metadata: any;
  created_at: Date;
  updated_at: Date;
}

export interface Integration {
  id: string;
  user_id: string;
  service_name: 'claude' | 'google_drive' | 'gmail' | 'slack' | 'zapier' | 'google_sheets' | 'notion';
  is_active: boolean;
  credentials: any;
  configuration: any;
  last_sync_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface Database {
  users: User;
  contacts: Contact;
  calls: Call;
  call_participants: CallParticipant;
  transcripts: Transcript;
  summaries: Summary;
  action_items: ActionItem;
  themes: Theme;
  call_themes: CallTheme;
  competitor_intelligence: CompetitorIntelligence;
  sync_jobs: SyncJob;
  integrations: Integration;
}