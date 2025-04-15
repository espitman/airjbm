export interface AccommodationData {
  result: {
    meta: {
      isFavorite: boolean
      isBnplOrder: boolean
      disableCancelOrder: boolean
      affiliateLink: string
      link: string
      affiliateLinkDescription: string
      hostInfo: {
        phone: string | null
        uun: number
        fistName: string
        lastName: string
        registerDate: string
        avatar: string
        placeName: string | null
      }
      reviews: {
        id: string
        hostId: number
        overalRating: number
        rating: number
        reviewsCount: number
        items: Array<{
          reviewsCount: number
          rating: number
          ratingItemId: number
          ratingItem: {
            id: number
            title: string
            icon: string
            body: string
            subject: string
            order: number
            inVisible: boolean
            reasons: any[]
          }
        }>
        reviews: Array<{
          id: number
          placeId: string
          place: any
          orderId: number
          comment: string
          reviewDate: string
          images: any
          userId: number
          user: {
            id: number
            name: string
            avatar: string
          }
          hostId: number
          host: {
            id: number
            name: string
            avatar: string
          }
          rating: number
          overalRating: number
          subTitles: string[]
          response: any
          reviewInfo: Array<{
            icon: any
            text: string
          }>
        }>
        starsChart: Array<{
          starsCount: number
          reviewsCount: number
        }>
      }
      paymentInsurance: boolean
      bnpl: any
    }
    item: {
      accommodationMetrics: {
        areaSize: number
        bathroomsCount: number
        bedroomsCount: number
        buildingSize: number
        floor: number
        fullOccupancy: boolean
        iranianToiletsCount: number
        stairsCount: number
        toiletsCount: number
      }
      affiliateCode: string
      alibabaReseller: boolean
      alibabaTitle: string
      amenities: Array<{
        icon: {
          url: string
        }
        id: string
        title: {
          en: string
          fa: string
        }
      }>
      amenitiesV2: Array<{
        icon: {
          url: string
        }
        state: boolean
        title: {
          en: string
          fa: string
        }
      }>
      announcements: any[]
      autoDiscount: {
        active: boolean
        items: any[]
      }
      badges: {
        data: any[]
        main: Array<{
          data: string[]
          helper: any
          icon: string
          name: string
          title: string
        }>
        secondary: Array<{
          data: string[]
          helper: string
          icon: string
          name: string
          title: string
        }>
      }
      bnplCalendarBanner: {
        icon_url: string
        text: string
        type: string
      }
      bnplCapability: {
        icon_url: string
        subtitle: string
        title: string
      }
      bnplPeriods: Array<{
        color: string
        dates: string[]
        id: string
        isDefault: boolean
        title: string
      }>
      calendar: Array<{
        availableUnits: number
        basePrice: number
        capacity: number
        cost: number
        date: string
        discount: number
        extraPeople: number
        guarantee: boolean
        guestShare: number
        instant: boolean
        isCustomHoliday: boolean
        isExtraDay: boolean
        isHoliday: boolean
        isPackaged: boolean
        jabamaDiscount: number
        jalaliDateString: string
        maxAvailableUnits: number
        minNight: number
        periods: any[]
        price: number
        status: string
        totalPrice: number
        type: string
      }>
      canSetPriceOnGuarantDays: boolean
      cancellationPolicy: {
        afterCheckIn: {
          jabamaShare: number
          passedNightsPercent: number
          remainingNightsPercent: number
        }
        beforeCheckIn: {
          days: number
          firstNightPercent: number
          jabamaShare: number
          remainingNightsPercent: number
        }
        id: string
        jabamaCommission: number
        title: string
        untilCheckIn: {
          days: number
          firstNightPercent: number
          hostShare: number
          jabamaShare: number
          remainingNightsPercent: number
        }
      }
      cancellationPolicyDetails: {
        afterCheckIn: {
          color: string
          icon: string
          text: string
          title: string
        }
        beforeCheckIn: {
          color: string
          icon: string
          text: string
          title: string
        }
        description: string
        id: string
        isDefault: boolean
        jabamaCommission: number
        title: string
        untilCheckIn: {
          color: string
          icon: string
          text: string
          title: string
        }
      }
      cancellationPolicyText: string
      cancellationRevenuePercentage: number
      capacity: {
        beds: {
          double: number
          mattress: number
          single: number
          twin: number
        }
        guests: {
          base: number
          extra: number
        }
      }
      category: any
      chatCapability: boolean
      checkIn: string
      checkOut: string
      code: number
      commissionRate: number
      commonImages: any
      commonalities: {
        bathroomsCount: number
        iranianToiletsCount: number
        toiletsCount: number
      }
      createdAt: string
      creator: string
      customInternalLink: {
        accommodation: string
        internalLinks: any
      }
      dataService: {
        status: string
      }
      deleted: boolean
      description: string
      disinfected: boolean
      extraDescription: Array<{
        subTitle: string
        text: string
        title: string
      }>
      extraServices: any[]
      extraServicesCommissionRate: any[]
      faq: {
        list: any[]
        title: string
      }
      fieldStatuses: any
      guaranteeDays: any
      hasEditorialTag: boolean
      hasOtherRoom: boolean
      host: string
      hostAcquisitionStatus: number
      hostProfile: {
        items: Array<{
          icon: string
          subText: string
          text: string
        }>
        video: {
          thumbNail: string
          url: string
        }
      }
      id: string
      imagesSort: string[]
      isExclusive: boolean
      isInstantPerNight: boolean
      isOwner: boolean
      isVendor: boolean
      justForPassengers: boolean
      lqaConfirmed: {
        amenities: boolean
        description: boolean
        images: boolean
        info: boolean
        photography: boolean
      }
      mainPrice: number
      maxAvailableCalendarDays: number
      maxDiscountPercent: number
      meal: {
        breakfast: boolean
        dinner: boolean
        lunch: boolean
      }
      minDiscountedPrice: number
      minNight: number
      missedAmenities: Array<{
        icon: {
          url: string
        }
        id: string
        title: {
          en: string
          fa: string
        }
      }>
      moreInfo: string
      nativeSeo: {
        alternates: {
          canonical: string
        }
        description: string
        keywords: any[]
        markup_schema: any[]
        openGraph: {
          cover: string
          description: string
          images: Array<{
            alt: string
            height: string
            secure_url: string
            url: string
            width: string
          }>
          locale: string
          site_name: string
          title: string
          type: string
          url: string
        }
        robots: {
          index: boolean
        }
        title: string
        twitter: {
          card: string
          cover: string
          description: string
          image: {
            alt: string
            height: string
            secure_url: string
            url: string
            width: string
          }
          title: string
          url: string
        }
      }
      nearbyCenters: any[]
      nearbyCentersV2: Array<{
        items: Array<{
          accessibleBy: string
          key: string
          value: string
        }>
        title: string
      }>
      negativeRestrictedRules: Array<{
        id: string
        name: string
        negative: string
        positive: string
      }>
      notes: any
      oldJabamaId: number
      ownerName: string
      packages: any[]
      partialPaymentRate: number
      paymentType: string
      payout: {
        type: string
        xHoursAfter: number
      }
      peakCancellationPolicy: string
      periods: Array<{
        color: string
        dates: string[]
        id: string
        isDefault: boolean
        title: string
      }>
      photography: {
        done: boolean
        score: number
      }
      placeDocs: any
      placeImages: Array<{
        caption: string
        type: string
        uploadId: string
        url: string
      }>
      placeOfResidence: {
        area: {
          areaType: string
          areaTypeDetails: {
            image: string
            title: string
            title_fa: string
          }
          city: {
            id: string
            location: {
              lat: number
              lng: number
              radius: number
            }
            name: {
              en: string
              fa: string
            }
            province: {
              id: string
              location: {
                lat: number
                lng: number
                radius: number
              }
              name: {
                en: string
                fa: string
              }
              type: string
            }
            type: string
          }
          neighborhood: {
            id: string
            name: {
              en: string
              fa: string
            }
          }
        }
        location: {
          lat: number
          lng: number
          radius: number
        }
      }
      placeType: string
      postalCode: string
      price: {
        base: number
        custom: any[]
        extraPeople: {
          base: number
          holiday: number
          weekend: number
        }
        holiday: number
        longStaysDiscount: {
          long: number
          short: number
        }
        weekend: number
      }
      pricingType: string
      rateAndReview: {
        count: number
        score: number
      }
      rejectTimes: {
        ahd: number
        lqa: number
      }
      reservationType: string
      restrictedRules: Array<{
        id: string
        name: string
        negative: string
        positive: string
      }>
      selectedAmenitiesCount: number
      seo: {
        canonical: any
        description: any
        h1: any
        metaDescription: string
        robots: any
        title: string
      }
      specialAmenities: any[]
      status: string
      statusDetails: {
        en: string
        fa: string
        sortPriority: string
        title: string
      }
      step: any
      suitableForElderlyAndDisabled: boolean
      tags: any[]
      telephone: string
      title: string
      type: string
      typeDetails: {
        _id: string
        image: string
        title: string
        title_fa: string
      }
      unitCount: number
      updatedAt: string
      vatStatus: boolean
      visible: boolean
      wowCheckIn: boolean
    }
  }
  targetUrl: any
  success: boolean
  error: any
  unauthorizedRequest: boolean
  __wrapped: boolean
  __traceId: string
} 