import axios from 'axios'
import type { ReceiptRequest, ReceiptResponse } from '~/types/reservation'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const baseURL = 'https://jayaber.liara.run/gw.jabama.com/api/v1/accommodation'

  return {
    provide: {
      reservationApi: {
        receipt: async (data: ReceiptRequest): Promise<ReceiptResponse> => {
          try {
            const response = await axios.post(
              `${baseURL}/public/guest/orders/receipt`,
              data,
              {
                headers: {
                  'accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              }
            )
            return response.data
          } catch (error) {
            console.error('Error in receipt API call:', error)
            throw error
          }
        }
      }
    }
  }
}) 