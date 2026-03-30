import { createClient } from '@/lib/supabase';
import type { User, Contact, Call, Transcript, Summary, ActionItem, CallParticipant, SyncJob } from '@/types';

const supabase = createClient();

// Users
export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, role, name, created_at, updated_at')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch users: ${error.message}`);
  return data || [];
}

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, role, name, created_at, updated_at')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch user: ${error.message}`);
  return data || null;
}

export async function createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select('id, email, role, name, created_at, updated_at')
    .single();
  
  if (error) throw new Error(`Failed to create user: ${error.message}`);
  return data;
}

// Contacts
export async function getAllContacts(): Promise<Contact[]> {
  const { data, error } = await supabase
    .from('contacts')
    .select('id, user_id, name, email, company, role, metadata, created_at, updated_at')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch contacts: ${error.message}`);
  return data || [];
}

export async function getContactById(id: string): Promise<Contact | null> {
  const { data, error } = await supabase
    .from('contacts')
    .select('id, user_id, name, email, company, role, metadata, created_at, updated_at')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch contact: ${error.message}`);
  return data || null;
}

export async function createContact(contact: Omit<Contact, 'id' | 'created_at' | 'updated_at'>): Promise<Contact> {
  const { data, error } = await supabase
    .from('contacts')
    .insert(contact)
    .select('id, user_id, name, email, company, role, metadata, created_at, updated_at')
    .single();
  
  if (error) throw new Error(`Failed to create contact: ${error.message}`);
  return data;
}

export async function updateContact(id: string, updates: Partial<Omit<Contact, 'id' | 'created_at' | 'updated_at'>>): Promise<Contact> {
  const { data, error } = await supabase
    .from('contacts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, user_id, name, email, company, role, metadata, created_at, updated_at')
    .single();
  
  if (error) throw new Error(`Failed to update contact: ${error.message}`);
  return data;
}

export async function deleteContact(id: string): Promise<void> {
  const { error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete contact: ${error.message}`);
}

// Calls
export async function getAllCalls(): Promise<Call[]> {
  const { data, error } = await supabase
    .from('calls')
    .select('id, user_id, fathom_id, title, call_date, duration_minutes, sync_status, created_at, updated_at')
    .order('call_date', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch calls: ${error.message}`);
  return data || [];
}

export async function getCallById(id: string): Promise<Call | null> {
  const { data, error } = await supabase
    .from('calls')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch call: ${error.message}`);
  return data || null;
}

export async function createCall(call: Omit<Call, 'id' | 'created_at' | 'updated_at'>): Promise<Call> {
  const { data, error } = await supabase
    .from('calls')
    .insert(call)
    .select('*')
    .single();
  
  if (error) throw new Error(`Failed to create call: ${error.message}`);
  return data;
}

export async function updateCall(id: string, updates: Partial<Omit<Call, 'id' | 'created_at' | 'updated_at'>>): Promise<Call> {
  const { data, error } = await supabase
    .from('calls')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single();
  
  if (error) throw new Error(`Failed to update call: ${error.message}`);
  return data;
}

// Transcripts
export async function getTranscriptByCallId(callId: string): Promise<Transcript | null> {
  const { data, error } = await supabase
    .from('transcripts')
    .select('*')
    .eq('call_id', callId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch transcript: ${error.message}`);
  return data || null;
}

export async function createTranscript(transcript: Omit<Transcript, 'id' | 'created_at' | 'updated_at'>): Promise<Transcript> {
  const { data, error } = await supabase
    .from('transcripts')
    .insert(transcript)
    .select('*')
    .single();
  
  if (error) throw new Error(`Failed to create transcript: ${error.message}`);
  return data;
}

// Summaries
export async function getSummariesByCallId(callId: string): Promise<Summary[]> {
  const { data, error } = await supabase
    .from('summaries')
    .select('*')
    .eq('call_id', callId)
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch summaries: ${error.message}`);
  return data || [];
}

export async function createSummary(summary: Omit<Summary, 'id' | 'created_at' | 'updated_at'>): Promise<Summary> {
  const { data, error } = await supabase
    .from('summaries')
    .insert(summary)
    .select('*')
    .single();
  
  if (error) throw new Error(`Failed to create summary: ${error.message}`);
  return data;
}

// Action Items
export async function getActionItemsByCallId(callId: string): Promise<ActionItem[]> {
  const { data, error } = await supabase
    .from('action_items')
    .select('*')
    .eq('call_id', callId)
    .order('due_date', { ascending: true });
  
  if (error) throw new Error(`Failed to fetch action items: ${error.message}`);
  return data || [];
}

export async function updateActionItem(id: string, updates: Partial<Omit<ActionItem, 'id' | 'created_at' | 'updated_at'>>): Promise<ActionItem> {
  const { data, error } = await supabase
    .from('action_items')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single();
  
  if (error) throw new Error(`Failed to update action item: ${error.message}`);
  return data;
}

// Call Participants
export async function getCallParticipants(callId: string): Promise<(CallParticipant & { contact: Contact })[]> {
  const { data, error } = await supabase
    .from('call_participants')
    .select('*, contact:contacts(*)')
    .eq('call_id', callId);
  
  if (error) throw new Error(`Failed to fetch call participants: ${error.message}`);
  return data || [];
}

// Sync Jobs
export async function getSyncJobsByStatus(status: SyncJob['status']): Promise<SyncJob[]> {
  const { data, error } = await supabase
    .from('sync_jobs')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch sync jobs: ${error.message}`);
  return data || [];
}

export async function updateSyncJob(id: string, updates: Partial<Omit<SyncJob, 'id' | 'created_at' | 'updated_at'>>): Promise<SyncJob> {
  const { data, error } = await supabase
    .from('sync_jobs')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single();
  
  if (error) throw new Error(`Failed to update sync job: ${error.message}`);
  return data;
}