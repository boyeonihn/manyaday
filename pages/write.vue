<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types';
import { format } from 'date-fns';

const entry = reactive({
  date: new Date(),
  content: '',
  isPrivate: false,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!entry.content)
    errors.push({
      path: 'content',
      message: "It's an empty post!",
    });
  return errors;
};

</script>

<template>
  writing a post for [[ {{ format(entry.date, 'MMM do, yyy') }} ]]
  <UForm
    :validate="validate"
    :state="entry"
    class="space-y-4"
    @submit="createEntry"
  >
    <UPopover overlay mode="click" :popper="{ placement: 'bottom-start' }">
      <UButton
        icon="i-heroicons-calendar-days-20-solid"
        :label="format(entry.date, 'MMM do, yyy')"
      />
      <template #panel="{ close }">
        <DatePicker v-model="entry.date" @close="close" />
      </template>
    </UPopover>
    <UCheckbox
      v-model="entry.isPrivate"
      name="isPrivate"
      label="Private post"
    />
    <UFormGroup label="Content" name="content">
      <UTextarea
        v-model="entry.content"
        variant="outline"
        placeholder="Tell me about your day..."
      />
    </UFormGroup>

    <UButton @click="savePost" type="button">Save Draft</UButton>
    <UButton type="submit"> Publish </UButton>
  </UForm>
</template>
