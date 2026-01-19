<script setup lang="ts">
  import Navigation from '@/components/Navigation.vue'
  import { useUiStore } from '@/stores/ui.store'

  const uiStore = useUiStore()
</script>

<template>
  <v-app>
    <Navigation />

    <v-main>
      <router-view />
    </v-main>

    <v-snackbar
      v-model="uiStore.snackbar.show"
      :color="uiStore.snackbar.color"
      location="top end"
      :timeout="uiStore.snackbar.timeout"
      z-index="3000"
    >
      {{ uiStore.snackbar.text }}
    </v-snackbar>
  </v-app>
</template>
