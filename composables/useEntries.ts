interface EntryInfo {
  userId: string;
  monthDay: string;
}

interface Entry {
  content: string;
  created_ts: string;
  id: string;
  is_private: boolean;
  month_day: string | null;
  updated_ts: string | null;
  user_id: string;
}

export const useEntries = async ({ userId, monthDay }: EntryInfo) => {
  const supabase = useSupabase();
  const { data: entries } = await useAsyncData('entries', async () => {
    const { data } = await supabase
      .from('entries')
      .select()
      .eq('user_id', userId)
      .eq('month_day', monthDay)
      .order('created_ts', { ascending: false });
    return data;
  });
  return entries;
};
