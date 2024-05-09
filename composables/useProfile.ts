export const useProfile = async () => {
  const user = useUser();
  const supabase = useSupabase();
  const { data } = await supabase
    .from('profiles')
    .select()
    .eq('user_id', user.value.id)
    .single();

  return data;
};
