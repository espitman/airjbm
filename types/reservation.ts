export interface ReceiptRequest {
  accommodationId: string
  checkIn: string
  checkOut: string
  passengers: {
    adults: number
    children: number
  }
}

export interface CancellationPolicy {
  title: string
  text: string
  color: string
  icon: string
}

export interface CancellationPolicyDetails {
  id: string
  title: string
  beforeCheckIn: CancellationPolicy
  untilCheckIn: CancellationPolicy
  afterCheckIn: CancellationPolicy
  isDefault: boolean
  jabamaCommission: number
}

export interface AccommodationDetails {
  accommodationId: string
  accommodationTitle: string
  minNight: number
  capacity: {
    extra: number
    base: number
  }
  reservationType: string
  placeType: string
  type: string
  code: number
  cityId: string
  cityFa: string
  cityEn: string
  provinceFa: string
  areaType: string
  cancellationPolicyDetails: CancellationPolicyDetails
  image: string
  chatCapability: boolean
}

export interface PriceItem {
  title: string
  price: string
  priceColor?: string
}

export interface ReceiptPayload {
  details: AccommodationDetails
  price: {
    total: number
    full: number
  }
  items: PriceItem[]
  bnpl: {
    showBNPLBanner: boolean
    bnplBanner: null | any
  }
}

export interface ReceiptResponse {
  result: ReceiptPayload
  targetUrl: string | null
  success: boolean
  error: string | null
  unauthorizedRequest: boolean
  __wrapped: boolean
  __traceId: string | null
} 