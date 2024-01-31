<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types';

const supabase = useSupabaseClient();
const user = useSupabaseUser();

watchEffect(() => {
  if (user.value) {
    console.log('logged in');
    navigateTo('/today');
  }
});

// EMAIL LOGIN setup
/*
const state = reactive({
  email: undefined,
  password: undefined,
});

const onEmailLogin = async (event: FormSubmitEvent<any>) => {
  if (!state.email || !state.password) {
    return;
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email: state.email,
    password: state.password,
  });
};

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: 'email', message: 'Required' });
  if (!state.password) errors.push({ path: 'password', message: 'Required' });
  return errors;
};
*/
</script>

<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <h2 class="my-6 text-center text-3xl font-extrabold u-text-white">
      Sign in to your account
    </h2>
    <LoginCard>
      <!-- <UForm :state="state" :validate="validate" @submit="onEmailLogin">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>
        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>
        <UButton type="submit"> Login </UButton>
      </UForm>
      <UButton
        class="mt-3"
        icon="i-mdi-github"
        block
        label="Github"
        @click="supabase.auth.signInWithOAuth({ provider: 'github' })"
      /> -->
      <UButton
        class="mt-3"
        icon="i-mdi-google"
        block
        label="Google"
        @click="
          supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: 'http://localhost:3000/confirm',
            },
          })
        "
      />
    </LoginCard>
  </div>
</template>
