import { supabase } from './supabase';

export interface ArchiveItem {
  id: string;
  title: string;
  category: string;
  description: string;
  file_url: string;
  author_or_source: string;
  created_at: string;
}

// Fetch items from Supabase, with optional category filtering
export async function getArchiveItems(categoryFilter?: string): Promise<ArchiveItem[]> {
  try {
    let query = supabase.from('archive_items').select('*');

    // If a tab is selected and it's not 'all', filter by category
    if (categoryFilter && categoryFilter !== 'all') {
      query = query.eq('category', categoryFilter);
    }

    // Order by newest first
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching archive items from Supabase:', error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error:', err);
    return [];
  }
}