<script setup lang="ts">
let {
  params: { mmdd, username },
} = useRoute();

const monthDay = `${mmdd.slice(0, 2)}-${mmdd.slice(2)}`;
username = typeof username === 'string' ? username : username[0];

// TODO: refactor code by creating another composable that integrates INNER JOIN to fetch entries
// with username and mmdd (without having two requests userid, and then entries)
const { data } = await useUserByUsername(username);
if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}

const userId = data.value.user_id;
const entries = await useEntries({ userId, monthDay });

definePageMeta({
  validate: async (route) => {
    let { mmdd } = route.params;
    if (mmdd.length !== 4 || isNaN(Number(mmdd))) return false;

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
