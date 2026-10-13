<script setup lang="ts">
definePageMeta({ layout: 'auth' })

useSeoMeta({ title: 'Sign Up | Vortex' })

const state = reactive({
  username: '',
  email: '',
  password: '',
  terms: false,
})

const showPassword = ref(false)
const loading = ref(false)

function validate(values: typeof state) {
  const errors: { name: string, message: string }[] = []
  if (values.username.trim().length < 3) {
    errors.push({ name: 'username', message: 'Username must be at least 3 characters' })
  }
  if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.push({ name: 'email', message: 'Enter a valid email address' })
  }
  if (values.password.length < 8) {
    errors.push({ name: 'password', message: 'Password must be at least 8 characters' })
  }
  if (!values.terms) {
    errors.push({ name: 'terms', message: 'You need to agree to continue' })
  }
  return errors
}

const inputUi = {
  leadingIcon: 'text-white!',
  base: 'bg-neutral-700 rounded-lg border border-neutral-600 py-2 text-base text-white lg:py-2.5 lg:text-sm placeholder:text-neutral-300',
}

const signupEmail = useState<string>('signup-email', () => '')

async function onSubmit() {
  loading.value = true
  // TODO: send to the backend first. Then go to step 2.
  console.log('sign up:', { username: state.username, email: state.email })
  signupEmail.value = state.email
  await navigateTo('/verify')
  loading.value = false
}
</script>

<template>
  <AuthShell>
    <header class="mt-16 space-y-3 text-center lg:mt-0 lg:space-y-2">
      <p class="text-sm lg:text-xs">
        Step <strong class="font-semibold">1</strong> of <strong class="font-semibold">2</strong>
      </p>
      <h1 class="text-3xl font-semibold">
        Sign Up
      </h1>
      <p class="text-base font-medium">
        Join thousands of players discovering new games.
      </p>
    </header>

    <UForm :state="state" :validate="validate" class="mt-6 space-y-4 lg:mt-8" @submit="onSubmit">
      <UFormField label="Username" name="username" :ui="{ label: 'text-base font-medium text-white lg:text-sm' }">
        <UInput v-model="state.username" icon="i-ph-user" placeholder="Your username" autocomplete="username" size="lg"
          variant="none" class="w-full" :ui="inputUi" />
      </UFormField>

      <UFormField label="Email" name="email" :ui="{ label: 'text-base font-medium text-white lg:text-sm' }">
        <UInput v-model="state.email" type="email" icon="i-ph-envelope" placeholder="you@example.com"
          autocomplete="email" size="lg" variant="none" class="w-full" :ui="inputUi" />
      </UFormField>

      <UFormField label="Create Password" name="password"
        :ui="{ label: 'text-base font-medium text-white lg:text-sm' }">
        <UInput v-model="state.password" :type="showPassword ? 'text' : 'password'" icon="i-ph-key"
          placeholder="At least 8 characters" autocomplete="new-password" size="lg" variant="none" class="w-full"
          :ui="inputUi">
          <template #trailing>
            <button type="button" :aria-label="showPassword ? 'Hide password' : 'Show password'"
              class="text-white transition hover:text-white/70" @click="showPassword = !showPassword">
              <UIcon :name="showPassword ? 'i-ph-eye' : 'i-ph-eye-slash'" class="size-5" />
            </button>
          </template>
        </UInput>
      </UFormField>

      <UFormField name="terms" class="lg:mb-6 mb-6">
        <UCheckbox v-model="state.terms" color="primary">
          <template #label>
            <!-- TODO: link Terms and Privacy Policy when those pages exist -->
            <span class="text-sm lg:text-xs">I agree to the Terms and Privacy Policy</span>
          </template>
        </UCheckbox>
      </UFormField>

      <button type="submit" :disabled="loading"
        class="w-full rounded-lg bg-primary py-2 text-lg font-medium text-nav-active lg:py-2 lg:text-lg transition hover:bg-primary/90 disabled:opacity-60">
        Sign Up
      </button>
    </UForm>

    <AuthSocial label="Or sign up with" class="mt-5" />

    <p class="mt-5 text-center text-sm">
      Already have an account?
      <NuxtLink to="/sign-in" class="text-pigment-200 hover:underline">
        Sign in here
      </NuxtLink>
    </p>
  </AuthShell>
</template>