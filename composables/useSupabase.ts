import type { Database } from '@/types/database.types';

export const useSupabase = () => {
  return useSupabaseClient<Database>();
};
