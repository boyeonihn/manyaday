export const useFindUser = async (username: string) => {
  const supabase = useSupabase();
  const { data } = await supabase
    .from('profiles')
    .select('user_id')
    .eq('username', username);

  if (!data) return null;

  const userId = data[0].user_id;
  return userId;
};
