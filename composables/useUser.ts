import type { User } from '@supabase/supabase-js';

export const useUser = () => {
  const user = useSupabaseUser();

  return user as Ref<User>;
};
