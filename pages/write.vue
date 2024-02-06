<script setup lang="ts">
import { format } from 'date-fns';

const date = ref(new Date());
</script>

<template>
  <UPopover overlay mode="hover" :popper="{ placement: 'bottom-start' }">
    <UButton
      icon="i-heroicons-calendar-days-20-solid"
      :label="format(date, 'd MMM, yyy')"
    />

    <template #panel="{ close }">
      <DatePicker v-model="date" @close="close" />
    </template>
  </UPopover>
</template>
