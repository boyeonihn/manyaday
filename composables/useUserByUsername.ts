export const useUserByUsername = async (username: string) => {
  const nuxtApp = useNuxtApp();
  const key = `user-by-username-${username}`;
  const handler = async () => {
    console.log(`🌙 fetcher function being called for ${username}`);
    const supabase = useSupabase();
    const { data, error } = await supabase
      .from('profiles')
      .select('user_id, username')
      .eq('username', username)
      .single();

    console.log('trying to get supabase data');
    if (data) {
      return data;
    }
    return null;
  };

  const options = {
    getCachedData: (key: string) => {
      // console.log('✨ cached', {
      //   key,
      //   cached: nuxtApp.payload.data[key] || nuxtApp.static.data[key],
      // });
      return nuxtApp.isHydrating
        ? nuxtApp.payload.data[key]
        : nuxtApp.static.data[key];
    },
  };

  return await useAsyncData(key, handler, options);
};
