export const useProfileByUsername = async (username: string) => {
  const nuxtApp = useNuxtApp();
  const key = `profile-by-username-${username}`;
  const handler = async () => {
    const supabase = useSupabase();
    const { data, error } = await supabase
      .from('profiles')
      .select('user_id, username')
      .eq('username', username)
      .single();

    if (data) {
      return data;
    }
    return null;
  };

  const options = {
    getCachedData: (key: string) => {
      return nuxtApp.isHydrating
        ? nuxtApp.payload.data[key]
        : nuxtApp.static.data[key];
    },
  };

  return await useAsyncData(key, handler, options);
};
