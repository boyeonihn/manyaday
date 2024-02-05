<script setup>
const supabase = useSupabaseClient();

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error);
  navigateTo('/login');
};
</script>
<template>
  <UButton @click="signOut">Signout</UButton>
</template>
