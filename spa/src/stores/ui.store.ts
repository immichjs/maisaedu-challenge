import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    snackbar: {
      show: false,
      text: '',
      color: 'success',
      timeout: 3000,
    },
  }),

  actions: {
    showSnackbar (
      text: string,
      color: 'success' | 'error' | 'info' = 'success',
    ) {
      this.snackbar = {
        show: true,
        text,
        color,
        timeout: 3000,
      }
    },

    hideSnackbar () {
      this.snackbar.show = false
    },
  },
})
