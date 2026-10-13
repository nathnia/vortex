<script setup lang="ts">
import type { GameDetail, GameSpecs } from '~/types/game'

const props = defineProps<{ game: GameDetail }>()

// Spec lines in the order the design shows them. Empty values are skipped.
const specLabels: [keyof GameSpecs, string][] = [
  ['os', 'OS'],
  ['processor', 'Processor'],
  ['memory', 'Memory'],
  ['graphics', 'Graphics'],
  ['storage', 'Storage'],
  ['notes', 'Additional Notes'],
]

const columns = computed(() => {
  const requirements = props.game.requirements
  if (!requirements) return []
  return [
    { title: 'Minimum', specs: requirements.minimum },
    { title: 'Recommended', specs: requirements.recommended },
  ]
})

function specLines(specs: GameSpecs) {
  return specLabels
    .filter(([key]) => specs[key])
    .map(([key, label]) => ({ label, value: specs[key] }))
}
</script>

<template>
  <div class="space-y-8">
    <section v-if="game.about">
      <h2 class="mb-3 text-lg font-semibold">
        About the Game
      </h2>
      <p class="text-sm text-neutral-100">
        {{ game.about }}
      </p>
    </section>

    <section v-if="game.keyFeatures?.length">
      <h2 class="mb-3 text-lg font-semibold">
        Key Features
      </h2>
      <ul class="list-disc space-y-1.5 ps-5 text-sm text-neutral-100 marker:text-neutral-400">
        <li v-for="feature in game.keyFeatures" :key="feature">
          {{ feature }}
        </li>
      </ul>
    </section>

    <section v-if="columns.length">
      <h2 class="mb-3 text-lg font-semibold">
        System Requirements
      </h2>
      <!-- 2 columns only on xl: the text column is narrow before that -->
      <div class="grid gap-6 xl:grid-cols-2">
        <div v-for="column in columns" :key="column.title">
          <h3 class="mb-3 text-sm font-semibold">
            {{ column.title }}
          </h3>
          <ul class="list-disc space-y-1.5 ps-5 text-sm text-neutral-100 marker:text-neutral-400">
            <li v-if="column.specs.intro">
              {{ column.specs.intro }}
            </li>
            <li v-for="line in specLines(column.specs)" :key="line.label">
              <span class="font-semibold text-white">{{ line.label }}:</span> {{ line.value }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>