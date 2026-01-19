<script setup lang="ts">
  import { useTheme } from 'vuetify'
  import Navigation from '@/components/Navigation.vue'
  import { useUiStore } from '@/stores/ui.store'

  const theme = useTheme()
  const uiStore = useUiStore()
  const route = useRoute()

  const pageTitle = computed(() => {
    return route.meta.title ?? ''
  })
</script>

<template>
  <v-app>
    <Navigation />

    <v-main>
      <v-toolbar>
        <v-toolbar-title>
          {{ pageTitle }}
        </v-toolbar-title>

        <v-switch
          class="mr-4"
          density="compact"
          hide-details
          label="Tema escuro"
          @click="theme.toggle()"
        />
      </v-toolbar>

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
