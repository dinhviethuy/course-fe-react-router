const permissions = [
  {
    id: 109,
    name: 'PUT /students/:courseEnrollmentId',
    path: '/students/:courseEnrollmentId',
    module: 'STUDENTS',
    method: 'PUT',
    createdById: null,
    updatedById: null,
    createdAt: '2025-08-01T03:41:51.297Z',
    updatedAt: '2025-08-01T03:41:51.297Z'
  },
  {
    id: 108,
    name: 'POST /students',
    path: '/students',
    module: 'STUDENTS',
    method: 'POST',
    createdById: null,
    updatedById: null,
    createdAt: '2025-08-01T03:41:51.297Z',
    updatedAt: '2025-08-01T03:41:51.297Z'
  },
  {
    id: 107,
    name: 'GET /students/:courseEnrollmentId',
    path: '/students/:courseEnrollmentId',
    module: 'STUDENTS',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-08-01T03:41:51.297Z',
    updatedAt: '2025-08-01T03:41:51.297Z'
  },
  {
    id: 106,
    name: 'GET /students',
    path: '/students',
    module: 'STUDENTS',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-08-01T03:41:51.297Z',
    updatedAt: '2025-08-01T03:41:51.297Z'
  },
  {
    id: 110,
    name: 'DELETE /students/:courseEnrollmentId',
    path: '/students/:courseEnrollmentId',
    module: 'STUDENTS',
    method: 'DELETE',
    createdById: null,
    updatedById: null,
    createdAt: '2025-08-01T03:41:51.297Z',
    updatedAt: '2025-08-01T03:41:51.297Z'
  },
  {
    id: 95,
    name: 'GET /permissions/modules',
    path: '/permissions/modules',
    module: 'PERMISSIONS',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-29T10:27:42.958Z',
    updatedAt: '2025-07-29T10:27:42.958Z'
  },
  {
    id: 94,
    name: 'GET /courses/bought',
    path: '/courses/bought',
    module: 'COURSES',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-18T15:34:31.722Z',
    updatedAt: '2025-07-18T15:34:31.722Z'
  },
  {
    id: 93,
    name: 'POST /courses',
    path: '/courses',
    module: 'COURSES',
    method: 'POST',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-16T08:22:30.823Z',
    updatedAt: '2025-07-16T08:22:30.823Z'
  },
  {
    id: 90,
    name: 'GET /courses/slugs/:slug',
    path: '/courses/slugs/:slug',
    module: 'COURSES',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-15T03:11:34.003Z',
    updatedAt: '2025-07-15T03:11:34.003Z'
  },
  {
    id: 92,
    name: 'POST /payment/receiver',
    path: '/payment/receiver',
    module: 'PAYMENT',
    method: 'POST',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-15T03:11:34.003Z',
    updatedAt: '2025-07-15T03:11:34.003Z'
  },
  {
    id: 91,
    name: 'POST /manage-courses/validate-slug',
    path: '/manage-courses/validate-slug',
    module: 'MANAGE-COURSES',
    method: 'POST',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-15T03:11:34.003Z',
    updatedAt: '2025-07-15T03:11:34.003Z'
  },
  {
    id: 89,
    name: 'PUT /orders/:orderId',
    path: '/orders/:orderId',
    module: 'ORDERS',
    method: 'PUT',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-13T12:22:50.421Z',
    updatedAt: '2025-07-13T12:22:50.421Z'
  },
  {
    id: 88,
    name: 'POST /orders',
    path: '/orders',
    module: 'ORDERS',
    method: 'POST',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-13T12:22:50.421Z',
    updatedAt: '2025-07-13T12:22:50.421Z'
  },
  {
    id: 87,
    name: 'GET /orders/:orderId',
    path: '/orders/:orderId',
    module: 'ORDERS',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-13T12:22:50.421Z',
    updatedAt: '2025-07-13T12:22:50.421Z'
  },
  {
    id: 86,
    name: 'GET /orders',
    path: '/orders',
    module: 'ORDERS',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-13T12:22:50.421Z',
    updatedAt: '2025-07-13T12:22:50.421Z'
  },
  {
    id: 76,
    name: 'POST /carts',
    path: '/carts',
    module: 'CARTS',
    method: 'POST',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-13T09:15:55.278Z',
    updatedAt: '2025-07-13T09:15:55.278Z'
  },
  {
    id: 77,
    name: 'DELETE /carts/:cartId',
    path: '/carts/:cartId',
    module: 'CARTS',
    method: 'DELETE',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-13T09:15:55.278Z',
    updatedAt: '2025-07-13T09:15:55.278Z'
  },
  {
    id: 75,
    name: 'GET /carts',
    path: '/carts',
    module: 'CARTS',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-13T09:15:55.278Z',
    updatedAt: '2025-07-13T09:15:55.278Z'
  },
  {
    id: 74,
    name: 'DELETE /coupons/:couponId',
    path: '/coupons/:couponId',
    module: 'COUPONS',
    method: 'DELETE',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-13T03:56:02.133Z',
    updatedAt: '2025-07-13T03:56:02.133Z'
  },
  {
    id: 73,
    name: 'PUT /coupons/:couponId',
    path: '/coupons/:couponId',
    module: 'COUPONS',
    method: 'PUT',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-13T03:56:02.133Z',
    updatedAt: '2025-07-13T03:56:02.133Z'
  },
  {
    id: 72,
    name: 'GET /coupons/:couponId',
    path: '/coupons/:couponId',
    module: 'COUPONS',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-13T03:56:02.133Z',
    updatedAt: '2025-07-13T03:56:02.133Z'
  },
  {
    id: 71,
    name: 'POST /coupons/validate',
    path: '/coupons/validate',
    module: 'COUPONS',
    method: 'POST',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-13T03:28:50.902Z',
    updatedAt: '2025-07-13T03:28:50.902Z'
  },
  {
    id: 66,
    name: 'GET /coupons',
    path: '/coupons',
    module: 'COUPONS',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-13T03:09:07.880Z',
    updatedAt: '2025-07-13T03:09:07.880Z'
  },
  {
    id: 68,
    name: 'POST /coupons',
    path: '/coupons',
    module: 'COUPONS',
    method: 'POST',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-13T03:09:07.880Z',
    updatedAt: '2025-07-13T03:09:07.880Z'
  },
  {
    id: 60,
    name: 'GET /lessons/:lessonId',
    path: '/lessons/:lessonId',
    module: 'LESSONS',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-11T11:38:44.778Z',
    updatedAt: '2025-07-11T11:38:44.778Z'
  },
  {
    id: 64,
    name: 'DELETE /manage-lessons/:lessonId',
    path: '/manage-lessons/:lessonId',
    module: 'MANAGE-LESSONS',
    method: 'DELETE',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-11T11:38:44.778Z',
    updatedAt: '2025-07-11T11:38:44.778Z'
  },
  {
    id: 63,
    name: 'PUT /manage-lessons/:lessonId',
    path: '/manage-lessons/:lessonId',
    module: 'MANAGE-LESSONS',
    method: 'PUT',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-11T11:38:44.778Z',
    updatedAt: '2025-07-11T11:38:44.778Z'
  },
  {
    id: 62,
    name: 'POST /manage-lessons',
    path: '/manage-lessons',
    module: 'MANAGE-LESSONS',
    method: 'POST',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-11T11:38:44.778Z',
    updatedAt: '2025-07-11T11:38:44.778Z'
  },
  {
    id: 61,
    name: 'GET /manage-lessons/:lessonId',
    path: '/manage-lessons/:lessonId',
    module: 'MANAGE-LESSONS',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-11T11:38:44.778Z',
    updatedAt: '2025-07-11T11:38:44.778Z'
  },
  {
    id: 59,
    name: 'PATCH /manage-courses/:courseId/reorder-full',
    path: '/manage-courses/:courseId/reorder-full',
    module: 'MANAGE-COURSES',
    method: 'PATCH',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T15:07:08.177Z',
    updatedAt: '2025-07-10T15:07:08.177Z'
  },
  {
    id: 54,
    name: 'PUT /users/:userId',
    path: '/users/:userId',
    module: 'USERS',
    method: 'PUT',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T13:33:10.374Z',
    updatedAt: '2025-07-10T13:33:10.374Z'
  },
  {
    id: 50,
    name: 'PUT /profile',
    path: '/profile',
    module: 'PROFILE',
    method: 'PUT',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T13:33:10.374Z',
    updatedAt: '2025-07-10T13:33:10.374Z'
  },
  {
    id: 51,
    name: 'PUT /profile/change-password',
    path: '/profile/change-password',
    module: 'PROFILE',
    method: 'PUT',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T13:33:10.374Z',
    updatedAt: '2025-07-10T13:33:10.374Z'
  },
  {
    id: 52,
    name: 'PUT /permissions/:permissionId',
    path: '/permissions/:permissionId',
    module: 'PERMISSIONS',
    method: 'PUT',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T13:33:10.374Z',
    updatedAt: '2025-07-10T13:33:10.374Z'
  },
  {
    id: 53,
    name: 'PUT /roles/:roleId',
    path: '/roles/:roleId',
    module: 'ROLES',
    method: 'PUT',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T13:33:10.374Z',
    updatedAt: '2025-07-10T13:33:10.374Z'
  },
  {
    id: 55,
    name: 'PUT /manage-courses/:courseId',
    path: '/manage-courses/:courseId',
    module: 'MANAGE-COURSES',
    method: 'PUT',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T13:33:10.374Z',
    updatedAt: '2025-07-10T13:33:10.374Z'
  },
  {
    id: 56,
    name: 'POST /chapters',
    path: '/chapters',
    module: 'CHAPTERS',
    method: 'POST',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T13:33:10.374Z',
    updatedAt: '2025-07-10T13:33:10.374Z'
  },
  {
    id: 57,
    name: 'PUT /chapters/:chapterId',
    path: '/chapters/:chapterId',
    module: 'CHAPTERS',
    method: 'PUT',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T13:33:10.374Z',
    updatedAt: '2025-07-10T13:33:10.374Z'
  },
  {
    id: 58,
    name: 'DELETE /chapters/:chapterId',
    path: '/chapters/:chapterId',
    module: 'CHAPTERS',
    method: 'DELETE',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T13:33:10.374Z',
    updatedAt: '2025-07-10T13:33:10.374Z'
  },
  {
    id: 49,
    name: 'GET /manage-courses',
    path: '/manage-courses',
    module: 'MANAGE-COURSES',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T11:49:40.858Z',
    updatedAt: '2025-07-10T11:49:40.858Z'
  },
  {
    id: 48,
    name: 'GET /courses',
    path: '/courses',
    module: 'COURSES',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T11:49:40.858Z',
    updatedAt: '2025-07-10T11:49:40.858Z'
  },
  {
    id: 47,
    name: 'DELETE /manage-courses/:courseId',
    path: '/manage-courses/:courseId',
    module: 'MANAGE-COURSES',
    method: 'DELETE',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T11:40:53.802Z',
    updatedAt: '2025-07-10T11:40:53.802Z'
  },
  {
    id: 45,
    name: 'POST /manage-courses',
    path: '/manage-courses',
    module: 'MANAGE-COURSES',
    method: 'POST',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T11:40:53.802Z',
    updatedAt: '2025-07-10T11:40:53.802Z'
  },
  {
    id: 44,
    name: 'GET /manage-courses/:courseId',
    path: '/manage-courses/:courseId',
    module: 'MANAGE-COURSES',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T11:40:53.802Z',
    updatedAt: '2025-07-10T11:40:53.802Z'
  },
  {
    id: 39,
    name: 'GET /courses/:courseId',
    path: '/courses/:courseId',
    module: 'COURSES',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T11:39:24.040Z',
    updatedAt: '2025-07-10T11:39:24.040Z'
  },
  {
    id: 38,
    name: 'GET /media/static/videos/:filename',
    path: '/media/static/videos/:filename',
    module: 'MEDIA',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T09:15:09.936Z',
    updatedAt: '2025-07-10T09:15:09.936Z'
  },
  {
    id: 37,
    name: 'GET /media/static/images/:filename',
    path: '/media/static/images/:filename',
    module: 'MEDIA',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T09:15:09.936Z',
    updatedAt: '2025-07-10T09:15:09.936Z'
  },
  {
    id: 36,
    name: 'POST /media/videos/upload',
    path: '/media/videos/upload',
    module: 'MEDIA',
    method: 'POST',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T09:15:09.936Z',
    updatedAt: '2025-07-10T09:15:09.936Z'
  },
  {
    id: 35,
    name: 'POST /media/images/upload',
    path: '/media/images/upload',
    module: 'MEDIA',
    method: 'POST',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T08:47:15.607Z',
    updatedAt: '2025-07-10T08:47:15.607Z'
  },
  {
    id: 33,
    name: 'DELETE /users/:userId',
    path: '/users/:userId',
    module: 'USERS',
    method: 'DELETE',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T04:53:23.056Z',
    updatedAt: '2025-07-10T04:53:23.056Z'
  },
  {
    id: 31,
    name: 'POST /users',
    path: '/users',
    module: 'USERS',
    method: 'POST',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T04:53:23.056Z',
    updatedAt: '2025-07-10T04:53:23.056Z'
  },
  {
    id: 30,
    name: 'GET /users/:userId',
    path: '/users/:userId',
    module: 'USERS',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T04:53:23.056Z',
    updatedAt: '2025-07-10T04:53:23.056Z'
  },
  {
    id: 29,
    name: 'GET /users',
    path: '/users',
    module: 'USERS',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T04:53:23.056Z',
    updatedAt: '2025-07-10T04:53:23.056Z'
  },
  {
    id: 28,
    name: 'DELETE /roles/:roleId',
    path: '/roles/:roleId',
    module: 'ROLES',
    method: 'DELETE',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T04:53:23.056Z',
    updatedAt: '2025-07-10T04:53:23.056Z'
  },
  {
    id: 26,
    name: 'POST /roles',
    path: '/roles',
    module: 'ROLES',
    method: 'POST',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T04:53:23.056Z',
    updatedAt: '2025-07-10T04:53:23.056Z'
  },
  {
    id: 25,
    name: 'GET /roles/:roleId',
    path: '/roles/:roleId',
    module: 'ROLES',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T04:53:23.056Z',
    updatedAt: '2025-07-10T04:53:23.056Z'
  },
  {
    id: 24,
    name: 'GET /roles',
    path: '/roles',
    module: 'ROLES',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T04:53:23.056Z',
    updatedAt: '2025-07-10T04:53:23.056Z'
  },
  {
    id: 23,
    name: 'DELETE /permissions/:permissionId',
    path: '/permissions/:permissionId',
    module: 'PERMISSIONS',
    method: 'DELETE',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T04:53:23.056Z',
    updatedAt: '2025-07-10T04:53:23.056Z'
  },
  {
    id: 21,
    name: 'POST /permissions',
    path: '/permissions',
    module: 'PERMISSIONS',
    method: 'POST',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T04:53:23.056Z',
    updatedAt: '2025-07-10T04:53:23.056Z'
  },
  {
    id: 20,
    name: 'GET /permissions/:permissionId',
    path: '/permissions/:permissionId',
    module: 'PERMISSIONS',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T04:53:23.056Z',
    updatedAt: '2025-07-10T04:53:23.056Z'
  },
  {
    id: 19,
    name: 'GET /permissions',
    path: '/permissions',
    module: 'PERMISSIONS',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T04:53:23.056Z',
    updatedAt: '2025-07-10T04:53:23.056Z'
  },
  {
    id: 16,
    name: 'GET /profile',
    path: '/profile',
    module: 'PROFILE',
    method: 'GET',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T04:53:23.056Z',
    updatedAt: '2025-07-10T04:53:23.056Z'
  },
  {
    id: 14,
    name: 'POST /auth/forgot-password',
    path: '/auth/forgot-password',
    module: 'AUTH',
    method: 'POST',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T04:53:23.056Z',
    updatedAt: '2025-07-10T04:53:23.056Z'
  },
  {
    id: 13,
    name: 'POST /auth/logout',
    path: '/auth/logout',
    module: 'AUTH',
    method: 'POST',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T04:53:23.056Z',
    updatedAt: '2025-07-10T04:53:23.056Z'
  },
  {
    id: 12,
    name: 'POST /auth/login',
    path: '/auth/login',
    module: 'AUTH',
    method: 'POST',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T04:53:23.056Z',
    updatedAt: '2025-07-10T04:53:23.056Z'
  },
  {
    id: 11,
    name: 'POST /auth/register',
    path: '/auth/register',
    module: 'AUTH',
    method: 'POST',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T04:53:23.056Z',
    updatedAt: '2025-07-10T04:53:23.056Z'
  },
  {
    id: 10,
    name: 'POST /auth/otp',
    path: '/auth/otp',
    module: 'AUTH',
    method: 'POST',
    createdById: null,
    updatedById: null,
    createdAt: '2025-07-10T04:53:23.056Z',
    updatedAt: '2025-07-10T04:53:23.056Z'
  }
]

interface Permissions {
  [key: string]: {
    [key: string]: {
      method: string
      path: string
      module: string
    }
  }
}

const RandomName = (method: string, path: string) => {
  const name = path
    .replace(/\//g, '_')
    .replace(/:/g, '')
    .replace(/-/g, '_')
    .replace(/\b\w/g, (char) => char.toUpperCase())
  return method + name.toUpperCase()
}

const res: Permissions = permissions.reduce((acc, permission) => {
  const { module, method, path } = permission
  const moduleNew = module.replace(/-/g, '_')
  if (!acc[moduleNew]) {
    acc[moduleNew] = {}
  }
  acc[moduleNew][RandomName(method, path)] = {
    method,
    path,
    module
  }
  return acc
}, {} as Permissions)

console.log(res)
