import type { PermissionsStoreType } from '~/types/permission.type'

export const CLIENT_PERMISSIONS: PermissionsStoreType = {
  COURSES: {
    GET_COURSES_BOUGHT: {
      method: 'GET',
      path: '/courses/bought',
      module: 'COURSES'
    },
    POST_COURSES: {
      method: 'POST',
      path: '/courses',
      module: 'COURSES'
    },
    GET_COURSES_SLUGS_SLUG: {
      method: 'GET',
      path: '/courses/slugs/:slug',
      module: 'COURSES'
    },
    GET_COURSES: {
      method: 'GET',
      path: '/courses',
      module: 'COURSES'
    },
    GET_COURSES_COURSEID: {
      method: 'GET',
      path: '/courses/:courseId',
      module: 'COURSES'
    }
  },
  PAYMENT: {
    POST_PAYMENT_RECEIVER: {
      method: 'POST',
      path: '/payment/receiver',
      module: 'PAYMENT'
    }
  },
  ORDERS: {
    PUT_ORDERS_ORDERID: {
      method: 'PUT',
      path: '/orders/:orderId',
      module: 'ORDERS'
    },
    POST_ORDERS: {
      method: 'POST',
      path: '/orders',
      module: 'ORDERS'
    },
    GET_ORDERS_ORDERID: {
      method: 'GET',
      path: '/orders/:orderId',
      module: 'ORDERS'
    },
    GET_ORDERS: {
      method: 'GET',
      path: '/orders',
      module: 'ORDERS'
    }
  },
  CARTS: {
    POST_CARTS: {
      method: 'POST',
      path: '/carts',
      module: 'CARTS'
    },
    DELETE_CARTS_CARTID: {
      method: 'DELETE',
      path: '/carts/:cartId',
      module: 'CARTS'
    },
    GET_CARTS: {
      method: 'GET',
      path: '/carts',
      module: 'CARTS'
    }
  },
  LESSONS: {
    GET_LESSONS_LESSONID: {
      method: 'GET',
      path: '/lessons/:lessonId',
      module: 'LESSONS'
    }
  },
  PROFILE: {
    PUT_PROFILE: {
      method: 'PUT',
      path: '/profile',
      module: 'PROFILE'
    },
    PUT_PROFILE_CHANGE_PASSWORD: {
      method: 'PUT',
      path: '/profile/change-password',
      module: 'PROFILE'
    },
    GET_PROFILE: {
      method: 'GET',
      path: '/profile',
      module: 'PROFILE'
    }
  },
  AUTH: {
    POST_AUTH_LOGOUT: {
      method: 'POST',
      path: '/auth/logout',
      module: 'AUTH'
    },
    POST_AUTH_FORGOT_PASSWORD: {
      method: 'POST',
      path: '/auth/forgot-password',
      module: 'AUTH'
    },
    POST_AUTH_LOGIN: {
      method: 'POST',
      path: '/auth/login',
      module: 'AUTH'
    },
    POST_AUTH_REGISTER: {
      method: 'POST',
      path: '/auth/register',
      module: 'AUTH'
    },
    POST_AUTH_OTP: {
      method: 'POST',
      path: '/auth/otp',
      module: 'AUTH'
    }
  },
  COUPONS: {
    POST_COUPONS_VALIDATE: {
      method: 'POST',
      path: '/coupons/validate',
      module: 'COUPONS'
    }
  },
  MEDIA: {
    GET_MEDIA_STATIC_IMAGES_FILENAME: {
      method: 'GET',
      path: '/media/static/images/:filename',
      module: 'MEDIA'
    },
    GET_MEDIA_STATIC_VIDEOS_FILENAME: {
      method: 'GET',
      path: '/media/static/videos/:filename',
      module: 'MEDIA'
    }
  }
}

export const ADMIN_PERMISSIONS = {
  PERMISSIONS: {
    GET_PERMISSIONS_MODULES: {
      method: 'GET',
      path: '/permissions/modules',
      module: 'PERMISSIONS'
    },
    PUT_PERMISSIONS_PERMISSIONID: {
      method: 'PUT',
      path: '/permissions/:permissionId',
      module: 'PERMISSIONS'
    },
    DELETE_PERMISSIONS_PERMISSIONID: {
      method: 'DELETE',
      path: '/permissions/:permissionId',
      module: 'PERMISSIONS'
    },
    POST_PERMISSIONS: {
      method: 'POST',
      path: '/permissions',
      module: 'PERMISSIONS'
    },
    GET_PERMISSIONS_PERMISSIONID: {
      method: 'GET',
      path: '/permissions/:permissionId',
      module: 'PERMISSIONS'
    },
    GET_PERMISSIONS: {
      method: 'GET',
      path: '/permissions',
      module: 'PERMISSIONS'
    }
  },
  MANAGE_COURSES: {
    POST_MANAGE_COURSES_VALIDATE_SLUG: {
      method: 'POST',
      path: '/manage-courses/validate-slug',
      module: 'MANAGE-COURSES'
    },
    PATCH_MANAGE_COURSES_COURSEID_REORDER_FULL: {
      method: 'PATCH',
      path: '/manage-courses/:courseId/reorder-full',
      module: 'MANAGE-COURSES'
    },
    PUT_MANAGE_COURSES_COURSEID: {
      method: 'PUT',
      path: '/manage-courses/:courseId',
      module: 'MANAGE-COURSES'
    },
    GET_MANAGE_COURSES: {
      method: 'GET',
      path: '/manage-courses',
      module: 'MANAGE-COURSES'
    },
    POST_MANAGE_COURSES: {
      method: 'POST',
      path: '/manage-courses',
      module: 'MANAGE-COURSES'
    },
    GET_MANAGE_COURSES_COURSEID: {
      method: 'GET',
      path: '/manage-courses/:courseId',
      module: 'MANAGE-COURSES'
    },
    DELETE_MANAGE_COURSES_COURSEID: {
      method: 'DELETE',
      path: '/manage-courses/:courseId',
      module: 'MANAGE-COURSES'
    }
  },
  COUPONS: {
    GET_COUPONS_COUPONID: {
      method: 'GET',
      path: '/coupons/:couponId',
      module: 'COUPONS'
    },
    DELETE_COUPONS_COUPONID: {
      method: 'DELETE',
      path: '/coupons/:couponId',
      module: 'COUPONS'
    },
    PUT_COUPONS_COUPONID: {
      method: 'PUT',
      path: '/coupons/:couponId',
      module: 'COUPONS'
    },
    GET_COUPONS: {
      method: 'GET',
      path: '/coupons',
      module: 'COUPONS'
    },
    POST_COUPONS: {
      method: 'POST',
      path: '/coupons',
      module: 'COUPONS'
    }
  },
  MANAGE_LESSONS: {
    DELETE_MANAGE_LESSONS_LESSONID: {
      method: 'DELETE',
      path: '/manage-lessons/:lessonId',
      module: 'MANAGE-LESSONS'
    },
    PUT_MANAGE_LESSONS_LESSONID: {
      method: 'PUT',
      path: '/manage-lessons/:lessonId',
      module: 'MANAGE-LESSONS'
    },
    POST_MANAGE_LESSONS: {
      method: 'POST',
      path: '/manage-lessons',
      module: 'MANAGE-LESSONS'
    },
    GET_MANAGE_LESSONS_LESSONID: {
      method: 'GET',
      path: '/manage-lessons/:lessonId',
      module: 'MANAGE-LESSONS'
    }
  },
  ROLES: {
    PUT_ROLES_ROLEID: {
      method: 'PUT',
      path: '/roles/:roleId',
      module: 'ROLES'
    },
    GET_ROLES_ROLEID: {
      method: 'GET',
      path: '/roles/:roleId',
      module: 'ROLES'
    },
    GET_ROLES: {
      method: 'GET',
      path: '/roles',
      module: 'ROLES'
    },
    DELETE_ROLES_ROLEID: {
      method: 'DELETE',
      path: '/roles/:roleId',
      module: 'ROLES'
    },
    POST_ROLES: {
      method: 'POST',
      path: '/roles',
      module: 'ROLES'
    }
  },
  USERS: {
    PUT_USERS_USERID: {
      method: 'PUT',
      path: '/users/:userId',
      module: 'USERS'
    },
    DELETE_USERS_USERID: {
      method: 'DELETE',
      path: '/users/:userId',
      module: 'USERS'
    },
    POST_USERS: {
      method: 'POST',
      path: '/users',
      module: 'USERS'
    },
    GET_USERS_USERID: {
      method: 'GET',
      path: '/users/:userId',
      module: 'USERS'
    },
    GET_USERS: {
      method: 'GET',
      path: '/users',
      module: 'USERS'
    }
  },
  CHAPTERS: {
    POST_CHAPTERS: {
      method: 'POST',
      path: '/chapters',
      module: 'CHAPTERS'
    },
    PUT_CHAPTERS_CHAPTERID: {
      method: 'PUT',
      path: '/chapters/:chapterId',
      module: 'CHAPTERS'
    },
    DELETE_CHAPTERS_CHAPTERID: {
      method: 'DELETE',
      path: '/chapters/:chapterId',
      module: 'CHAPTERS'
    }
  },
  MEDIA: {
    POST_MEDIA_VIDEOS_UPLOAD: {
      method: 'POST',
      path: '/media/videos/upload',
      module: 'MEDIA'
    },
    POST_MEDIA_IMAGES_UPLOAD: {
      method: 'POST',
      path: '/media/images/upload',
      module: 'MEDIA'
    }
  }
}
