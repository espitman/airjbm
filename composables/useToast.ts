import { ref } from 'vue'

const toastMessage = ref('')
const showToast = ref(false)

export function useToast() {
  const showToastMessage = (message: string, duration = 3000) => {
    toastMessage.value = message
    showToast.value = true

    setTimeout(() => {
      showToast.value = false
    }, duration)
  }

  return {
    toastMessage,
    showToast,
    showToastMessage
  }
} 