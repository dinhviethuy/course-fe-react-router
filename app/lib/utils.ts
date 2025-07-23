import { AxiosError } from 'axios'
import { clsx, type ClassValue } from 'clsx'
import { format, intervalToDuration } from 'date-fns'
import type { UseFormSetError } from 'react-hook-form'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import { CouponType } from '~/constants/counpon.constant'
import { OrderStatus, type OrderStatusType } from '~/constants/order.constant'
import type {
  GetCourseDetailResType,
  GetCourseDetailResTypeForAdmin,
  ReorderChaptersAndLessonsBodyType
} from '~/types/course.type'
import type { ErrorResponse } from '~/types/success.type'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractYoutubeId(url: string): string | null {
  try {
    const parsed = new URL(url)
    const hostname = parsed.hostname

    // Case 1: youtube.com/watch?v=ID
    if (hostname.includes('youtube.com')) {
      return parsed.searchParams.get('v')
    }

    // Case 2: youtu.be/ID
    if (hostname.includes('youtu.be')) {
      return parsed.pathname.split('/')[1] // /drx9y7gj_Fc
    }

    return null
  } catch (error) {
    console.error(error)
    return null
  }
}

export function formatCurrency(value: number) {
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}

export const handleError = ({
  error,
  setError,
  duration = 3000
}: {
  error: any
  setError?: UseFormSetError<any>
  duration?: number
}) => {
  if (error instanceof AxiosError) {
    const { statusCode, message } = error.response?.data as ErrorResponse
    if (statusCode === 422) {
      if (Array.isArray(message) && setError) {
        message.forEach((item) => {
          setError(item.path as any, { message: item.message })
        })
      } else {
        if (Array.isArray(message)) {
          const errorMessage = message.map((item) => item.message).join(', ')
          toast.error(errorMessage)
        } else {
          toast.error(message as string)
        }
      }
    } else {
      let message = 'Đã xảy ra lỗi'
      if (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
        message = (error.response.data as { message: string }).message
      }
      toast.error(message, {
        duration
      })
    }
  }
}

export const formatDate = (date: string | Date, formatString: string = 'dd/MM/yyyy') => {
  return format(date, formatString)
}

export const formatDuration = (duration: number): string => {
  const {
    hours = 0,
    minutes = 0,
    seconds = 0
  } = intervalToDuration({
    start: 0,
    end: duration * 1000
  })

  const pad = (num: number) => String(num).padStart(2, '0')
  return [pad(hours), pad(minutes), pad(seconds)].join(':').replace(/^00:/, '')
}

export const getLessonIdAndChapterId = (chapters: GetCourseDetailResType['chapters'], lessonId: number) => {
  let lessonIdQuery: number | undefined = undefined
  let chapterIdQuery: number | undefined = undefined
  let lessonIdPrev: number | undefined = undefined
  let lessonIdNext: number | undefined = undefined
  const lessonIds: number[] = []
  if (chapters.length === 0)
    return {
      lessonIdQuery,
      chapterIdQuery,
      lessonIdPrev,
      lessonIdNext
    }
  for (const chapter of chapters) {
    for (const lesson of chapter.lessons) {
      if (lesson.id === lessonId) {
        lessonIdQuery = lesson.id
        chapterIdQuery = chapter.id
      }
      lessonIds.push(lesson.id)
    }
  }

  const findIndexLessonId = lessonIds.findIndex((lesson) => lesson === lessonId)
  if (findIndexLessonId != -1) {
    lessonIdQuery = lessonIds[findIndexLessonId]
    if (findIndexLessonId > 0) {
      lessonIdPrev = lessonIds[findIndexLessonId - 1]
    }
    if (findIndexLessonId < lessonIds.length - 1) {
      lessonIdNext = lessonIds[findIndexLessonId + 1]
    }
  } else {
    lessonIdQuery = lessonIds[0]
    chapterIdQuery = chapters[0].id
    lessonIdNext = lessonIds.length > 1 ? lessonIds[1] : undefined
  }
  return {
    lessonIdQuery,
    chapterIdQuery,
    lessonIdPrev,
    lessonIdNext
  }
}

export const getTotalPrice = ({
  coursePrice,
  courseDiscount,
  couponDiscount: couponDiscountFromParam,
  couponType: couponTypeFromParam
}: {
  coursePrice: number | null
  courseDiscount: number | null
  couponDiscount: number | null
  couponType: CouponType | null
}) => {
  const price = coursePrice ?? 0
  const discount = courseDiscount ?? 0
  const couponDiscount = couponDiscountFromParam ?? 0
  const couponType = couponTypeFromParam ?? CouponType.PERCENT
  const priceAfterDiscount = price * (1 - discount / 100)
  let totalPrice = priceAfterDiscount
  let discountFixed = couponDiscount
  if (couponType === CouponType.PERCENT) {
    discountFixed = (totalPrice * couponDiscount) / 100
    totalPrice = totalPrice - discountFixed
  } else {
    discountFixed = Math.min(couponDiscount, totalPrice)
    totalPrice = totalPrice - discountFixed
  }
  return {
    totalPrice,
    price,
    discountFixed,
    priceAfterDiscount
  }
}

export const getOrderStatus = (status: OrderStatusType) => {
  const orderStatus = {
    [OrderStatus.PAID]: 'Đã thanh toán',
    [OrderStatus.PENDING]: 'Chưa thanh toán',
    [OrderStatus.CANCELLED]: 'Đã hủy'
  }
  return orderStatus[status]
}

export const getOrder = (chapters: GetCourseDetailResTypeForAdmin['chapters']): ReorderChaptersAndLessonsBodyType => {
  const body = chapters.map((chapter, index) => {
    const lesson = chapter.lessons.map((lesson, index) => {
      return {
        id: lesson.id,
        order: index
      }
    })
    return {
      id: chapter.id,
      order: index,
      lessons: lesson
    }
  })
  return {
    chapters: body
  }
}
