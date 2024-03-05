<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types';

const supabase = useSupabase();
const user = useSupabaseUser();
const user_id = user.value!.id;

const entry = reactive({
  date: new Date(),
  content: '',
  isPrivate: false,
});

let status: 'init' | 'submitting' | 'error' = 'init';

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!entry.content)
    errors.push({
      path: 'content',
      message: "It's an empty post!",
    });
  return errors;
};

const savePost = () => {
  console.log('click save');
};

const createEntry = async (event: FormSubmitEvent<any>) => {
  if (entry.content.trim().length === 0) {
    return;
  }

  const { data, error } = await supabase.from('entries').insert({
    content: entry.content,
    is_private: entry.isPrivate,
    created_ts: entry.date.toDateString(),
    user_id,
  });
  if (error) {
    status = 'error';
    return;
  } else {
    navigateTo('/today'); // redirecting to /today for now
  }
};
</script>

<template>
  <div v-if="status === 'error'">{{ 'there is something wrong' }}</div>
  <UForm
    :validate="validate"
    :state="entry"
    class="space-y-4"
    @submit="createEntry"
  >
    <UPopover overlay mode="click" :popper="{ placement: 'bottom-start' }">
      <span
        >writing a post for
        <UButton
          class="date"
          icon="i-heroicons-calendar-days-20-solid"
          :label="'[ [  ' + formatMmDdYyyy(entry.date.getTime()) + '  ] ]'"
      /></span>
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

<style>
.date {
  font-family: 'Italiana';
  font-size: 1.5rem;
  padding: 15px;
}
</style>
