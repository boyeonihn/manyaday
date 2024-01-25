<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error);
};
console.log(user);
</script>
<template>
  <div v-if="user">
    <UButton @click="signOut">Signout</UButton>
  </div>

  <h1 class="font-bold text-xl">HELLO</h1>
</template>
