<script setup lang="ts">
// Uses layouts/auth.vue (no sidebar / topbar / footer)
definePageMeta({ layout: 'auth' })

useSeoMeta({ title: 'Sign In | Vortex' })

const state = reactive({
  email: '',
  password: '',
  remember: false,
})

const showPassword = ref(false)
const loading = ref(false)

// Simple checks, no extra library. Each error shows under its own field.
function validate(values: typeof state) {
  const errors: { name: string, message: string }[] = []
  if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.push({ name: 'email', message: 'Enter a valid email address' })
  }
  if (!values.password) {
    errors.push({ name: 'password', message: 'Enter your password' })
  }
  return errors
}

// Same look as the sign up inputs (dark grey box like the design)
const inputUi = {
  leadingIcon: 'text-white!',
  base: 'bg-neutral-700 rounded-lg border border-neutral-600 py-2 text-base text-white lg:py-2.5 lg:text-sm placeholder:text-neutral-300',
}

async function onSubmit() {
  loading.value = true
  // TODO: send to the backend and choose where to go after sign in.
  console.log('sign in:', { email: state.email, remember: state.remember })
  loading.value = false
}
</script>

<template>
  <AuthShell image="/images/auth/sign-in.webp" title="Thousands of worlds are waiting!"
    subtitle="Jump back in and pick up where you left off.">
    <!-- mt-16: pushes the text AND everything under it down on mobile so the picture shows (desktop unchanged) -->
    <header class="mt-16 space-y-2 px-8 lg:px-0 text-center lg:mt-0 lg:space-y-2">
      <h1 class="text-3xl font-semibold">
        Sign In
      </h1>
      <p class="text-base font-medium">
        Thousands of worlds are waiting. Jump back in!
      </p>
    </header>

    <UForm :state="state" :validate="validate" class="mt-6 space-y-4 lg:mt-8" @submit="onSubmit">
      <UFormField label="Email" name="email" :ui="{ label: 'text-base font-medium text-white lg:text-sm' }">
        <UInput v-model="state.email" type="email" icon="i-ph-envelope" placeholder="you@example.com"
          autocomplete="email" size="lg" variant="none" class="w-full" :ui="inputUi" />
      </UFormField>

      <UFormField label="Password" name="password" :ui="{ label: 'text-base font-medium text-white lg:text-sm' }">
        <UInput v-model="state.password" :type="showPassword ? 'text' : 'password'" icon="i-ph-key"
          placeholder="Your password" autocomplete="current-password" size="lg" variant="none" class="w-full"
          :ui="inputUi">
          <template #trailing>
            <button type="button" :aria-label="showPassword ? 'Hide password' : 'Show password'"
              class="text-white transition hover:text-white/70" @click="showPassword = !showPassword">
              <UIcon :name="showPassword ? 'i-ph-eye' : 'i-ph-eye-slash'" class="size-5" />
            </button>
          </template>
        </UInput>
      </UFormField>

      <div class="flex items-center justify-between mb-6">
        <UCheckbox v-model="state.remember" color="primary">
          <template #label>
            <span class="text-sm lg:text-xs">Remember Me?</span>
          </template>
        </UCheckbox>

        <!-- TODO: link to the forgot password page when it exists -->
        <button type="button" class="text-sm text-pigment-200 hover:underline lg:text-xs">
          Forgot Password?
        </button>
      </div>

      <button type="submit" :disabled="loading"
        class="w-full rounded-lg bg-primary py-2 text-lg font-medium text-nav-active lg:py-2 lg:text-lg transition hover:bg-primary/90 disabled:opacity-60">
        Sign In
      </button>
    </UForm>

    <AuthSocial label="Or sign in with" class="mt-5" />

    <p class="mt-5 text-center text-sm">
      New here?
      <NuxtLink to="/sign-up" class="text-pigment-200 hover:underline">
        Create an account
      </NuxtLink>
    </p>
  </AuthShell>
</template>