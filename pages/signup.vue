<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types';

const supabase = useSupabaseClient();

const state = reactive({
  email: undefined,
  password: undefined,
  passwordConfirm: undefined,
  name: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: 'email', message: 'Required' });
  if (!state.password) errors.push({ path: 'password', message: 'Required' });
  if (!state.passwordConfirm)
    errors.push({ path: 'passwordConfirm', message: 'Required' });
  if (!state.name) errors.push({ path: 'name', message: 'Required' });
  return errors;
};

const signupEmail = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: state.email!,
    password: state.password!,
  });

  console.log(data);
};
</script>

<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <h2 class="my-6 text-center text-3xl font-extrabold u-text-white">
      Create your account
    </h2>

    <UForm :state="state" :validate="validate" @submit="signupEmail">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" type="email" />
      </UFormGroup>
      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" type="text" />
      </UFormGroup>
      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>
      <UFormGroup label="Confirm Password" name="passwordConfirm">
        <UInput v-model="state.passwordConfirm" type="password" />
      </UFormGroup>
      <UButton type="submit"> Signup </UButton>
    </UForm>
    <UButton
      class="mt-3"
      icon="i-mdi-github"
      block
      label="Github"
      @click="supabase.auth.signInWithOAuth({ provider: 'github' })"
    />
  </div>
</template>
