<script setup lang="ts">
import { format } from 'date-fns';

const date = Date.now();
</script>
<template>
  <h1>today is</h1>
  <h2>{{ format(date, 'MMM do, yyy') }}</h2>
  <LogoutButton />
  <p>Here are all the diaries from this MM-DD date.</p>
</template>
