<script setup lang="ts">
const user = useSupabaseUser();
</script>
<template>
  <h1 class="font-bold text-xl">many a day</h1>
  <span>A line a day</span>
  <div v-if="user">
    <UButton
      ><ULink to="/today"
        >You're logged in. Go to your Diaries today!</ULink
      ></UButton
    >
    <LogoutButton />
  </div>
  <UButton v-else
    ><ULink to="/login">You're not logged in, LOGIN!</ULink>
  </UButton>
</template>
