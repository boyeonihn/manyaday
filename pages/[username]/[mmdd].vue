<script setup lang="ts">
let {
  params: { mmdd, username },
} = useRoute();

const monthDay = `${mmdd.slice(0, 2)}-${mmdd.slice(2)}`;
username = typeof username === 'string' ? username : username[0];

const userId = (await useFindUser(username)) as string;
const entries = await useEntries({ userId, monthDay });

definePageMeta({
  validate: async (route) => {
    let { username, mmdd } = route.params;
    username = typeof username === 'string' ? username : username[0];

    const fetchedUserId = await useFindUser(username);
    if (!fetchedUserId || mmdd.length != 4) return false;

    return true;
  },
});
</script>
<template>
  <h1>{{ username }}'s entries for {{ monthDay }}</h1>
  <ul>
    <li v-for="entry in entries" :key="entry.id">
      <EntryUnit :content="entry.content" :createdAt="entry.created_ts" />
    </li>
  </ul>
</template>
