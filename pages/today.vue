<script setup lang="ts">
const user = useSupabaseUser();

const date = Date.now();
const user_id = user.value!.id;
const monthDay = extractMonthDay(date);

const { entries } = useEntries({ user_id, monthDay });
// const { data: entries } = await useAsyncData('entries', async () => {
//   const { data } = await supabase
//     .from('entries')
//     .select()
//     .eq('user_id', user_id)
//     .eq('month_day', monthDay)
//     .order('created_ts', { ascending: false });
//   return data;
// });
</script>
<template>
  <h2>{{ upperCase('today is') }}</h2>
  <h1>{{ `[[  ${formatDate({ date, includeYear: true })}  ]]` }}</h1>
  <LogoutButton />
  <p>Here are all the diaries from {{ formatDate({ date }) }}.</p>
  <ul>
    <li v-for="entry in entries" :key="entry.id">
      <EntryUnit :content="entry.content" :createdAt="entry.created_ts" />
    </li>
  </ul>
</template>

<style>
h1 {
  font-family: 'Italiana';
  font-size: 3rem;
}
</style>
