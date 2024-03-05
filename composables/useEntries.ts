interface EntryInfo {
  user_id: string;
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
export const useEntries = ({ user_id, monthDay }: EntryInfo) => {
  const supabase = useSupabase();
  const error = ref<null | Error>(null);
  const entries = ref<Entry[] | null>([]);

  const getEntries = async () => {
    try {
      const { data } = await supabase
        .from('entries')
        .select()
        .eq('user_id', user_id)
        .eq('month_day', monthDay)
        .order('created_ts', { ascending: false });

      entries.value = data;
    } catch (err) {
      error.value = err as Error;
      console.error('Error fetching entries: ', error);
    }
  };

  getEntries();
  return {
    entries,
    getEntries,
  };
};
