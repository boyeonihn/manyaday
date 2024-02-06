<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types';
import { format } from 'date-fns';

const state = reactive({
  date: new Date(),
  content: '',
  isPrivate: false,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.content)
    errors.push({
      path: 'content',
      message: "It's an empty post!",
    });
  return errors;
};

</script>

<template>
  writing a post for [[ {{ format(state.date, 'MMM do, yyy') }} ]]
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UPopover overlay mode="click" :popper="{ placement: 'bottom-start' }">
      <UButton
        icon="i-heroicons-calendar-days-20-solid"
        :label="format(state.date, 'MMM do, yyy')"
      />
      <template #panel="{ close }">
        <DatePicker v-model="state.date" @close="close" />
      </template>
    </UPopover>
    <UCheckbox
      v-model="state.isPrivate"
      name="isPrivate"
      label="Make post public"
    />
    <UFormGroup label="Content" name="content">
      <UTextarea
        v-model="state.content"
        variant="outline"
        placeholder="Tell me about your day..."
      />
    </UFormGroup>

    <UButton @click="savePost" type="button">Save Draft</UButton>
    <UButton type="submit"> Publish </UButton>
  </UForm>
</template>
