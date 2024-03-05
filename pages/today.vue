<script setup lang="ts">
import { format } from 'date-fns';
const user = useSupabaseUser();
const supabase = useSupabase();

const date = Date.now();
const user_id = user.value!.id;

const monthDay = extractMonthDay(date);
const { data: entries } = await useAsyncData('entries', async () => {
  const { data } = await supabase
    .from('entries')
    .select()
    .eq('user_id', user_id)
    .eq('month_day', monthDay)
    .order('created_ts', { ascending: false });
  return data;
});
</script>
<template>
  <h2>{{ upperCase('today is') }}</h2>
  <h1>{{ `[[  ${formatMmDdYyyy(date)}  ]]` }}</h1>
  <LogoutButton />
  <p>Here are all the diaries from {{ format(date, 'MMMM do') }}.</p>
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
