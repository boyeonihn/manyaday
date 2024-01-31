<script setup lang="ts">
import { ref } from 'vue';

const date = ref(Date.now());
</script>
<template>
  <h1>today is</h1>
  <h2>[ {{ date }}]</h2>
  <LogoutButton />
  <p>Here are all the diaries from this MM-DD date.</p>
</template>
