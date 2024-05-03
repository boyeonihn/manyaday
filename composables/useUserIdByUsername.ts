export const useUserIdByUsername = async (username: string) => {
  const nuxtApp = useNuxtApp();
  const key = `userId-by-username-${username}`;
  const handler = async () => {
    console.log(`🌙 fetcher function being called for ${username}`);
    const supabase = useSupabase();
    const { data, error } = await supabase
      .from('profiles')
      .select('user_id')
      .eq('username', username)
      .single();

    if (data) {
      const userId = data.user_id;
      return userId;
    }
    return null;
  };

  const options = {
    getCachedData: (key: string) => {
      console.log('✨ cached', {
        key,
        cached: nuxtApp.payload.data[key] || nuxtApp.static.data[key],
      });
      console.log(`nuxtApp hydrating?`, nuxtApp.isHydrating);
      return nuxtApp.isHydrating
        ? nuxtApp.payload.data[key]
        : nuxtApp.static.data[key];
    },
  };

  return await useAsyncData(key, handler, options);
};
