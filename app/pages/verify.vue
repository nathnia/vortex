<script setup lang="ts">
// Step 2 of 2. Uses layouts/auth.vue (no sidebar / topbar / footer)
definePageMeta({ layout: 'auth' })

useSeoMeta({ title: 'Verify Your Email | Vortex' })

// Saved by the sign up page (step 1)
const email = useState<string>('signup-email', () => '')

// ---- the 4 boxes ----
// type="number" makes each box a number (or undefined while empty).
// Number.isInteger (not Boolean) so the digit 0 counts as filled too.
const code = ref<(number | undefined)[]>([])
const canVerify = computed(() => code.value.filter(digit => Number.isInteger(digit)).length === 4)

const toast = useToast()
const loading = ref(false)

async function onVerify() {
  if (!canVerify.value) return
  loading.value = true
  // TODO: send the code to the backend, then go to the next page
  console.log('verify code:', code.value.join(''))
  toast.add({ title: 'Email verified', description: 'Your account is ready.' })
  await navigateTo('/')
  loading.value = false
}

// ---- resend countdown ----
const RESEND_SECONDS = 25
const remaining = ref(RESEND_SECONDS)
let timer: ReturnType<typeof setInterval> | undefined

function startTimer() {
  clearInterval(timer)
  remaining.value = RESEND_SECONDS
  timer = setInterval(() => {
    if (remaining.value > 0) remaining.value -= 1
    else clearInterval(timer)
  }, 1000)
}

onMounted(startTimer)
onBeforeUnmount(() => clearInterval(timer))

// 25 -> "00:25"
const clock = computed(() => {
  const minutes = String(Math.floor(remaining.value / 60)).padStart(2, '0')
  const seconds = String(remaining.value % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
})

function resend() {
  // TODO: ask the backend to send the email again
  console.log('resend email to:', email.value)
  startTimer()
}
</script>

<template>
  <AuthShell>
    <!-- mt-16: pushes the text AND everything under it down on mobile (desktop unchanged) -->
    <header class="mt-24 space-y-3 text-center lg:mt-0 lg:space-y-2">
      <p class="text-sm lg:text-xs">
        Step <strong class="font-semibold">2</strong> of <strong class="font-semibold">2</strong>
      </p>
      <h1 class="text-3xl font-semibold">
        Verify Your Email
      </h1>
      <p class="text-base font-medium lg:text-sm">
        We've sent a verification link to
        <span class="text-primary">{{ email || 'your email' }}</span>.
        Please check your email and click the link to activate your account.
      </p>
    </header>

    <form class="mt-8 space-y-5" @submit.prevent="onVerify">
      <!-- 4 dark boxes, numbers only. You can paste a code, it fills all the boxes. -->
      <UPinInput v-model="code" :length="4" type="number" otp autofocus variant="none" placeholder=""
        aria-label="Verification code" :ui="{
          root: 'grid w-full grid-cols-4 gap-3',
          base: 'h-14 w-full rounded-lg border border-neutral-600 bg-neutral-700 text-center text-xl text-white focus-visible:outline-2 focus-visible:outline-pigment-400',
        }" />

      <button type="submit" :disabled="!canVerify || loading"
        class="w-full rounded-lg bg-primary py-2 text-lg font-medium text-nav-active lg:py-2 lg:text-lg transition hover:bg-primary/90 disabled:opacity-60">

        Verify
      </button>
    </form>

    <p v-if="remaining > 0" class="mt-5 text-center text-sm lg:text-xs">
      You can resend the email in <span class="font-medium text-primary">{{ clock }}</span>
    </p>
    <p v-else class="mt-5 text-center text-sm lg:text-xs">
      Didn't get the email?
      <button type="button" class="text-primary hover:underline" @click="resend">
        Resend email
      </button>
    </p>
  </AuthShell>
</template>