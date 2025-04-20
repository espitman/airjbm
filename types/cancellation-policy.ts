export interface CancellationPolicyItem {
  id: string
  title: string
  beforeCheckIn: {
    title: string
    text: string
    color: string
    icon: string
  }
  untilCheckIn: {
    title: string
    text: string
    color: string
    icon: string
  }
  afterCheckIn: {
    title: string
    text: string
    color: string
    icon: string
  }
  isDefault: boolean
  jabamaCommission: number
  description: string
}

export interface CancellationPolicyResponse {
  result: {
    cancellationPolicy: CancellationPolicyItem[]
  }
  targetUrl: string | null
  success: boolean
  error: string | null
  unauthorizedRequest: boolean
  __wrapped: boolean
  __traceId: string | null
} 