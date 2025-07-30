import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes'

export default [
  layout('layout/client/layout-init.tsx', [
    layout('layout/client/layout-default.tsx', [
      index('routes/client/home/index.tsx'),
      route('courses/:courseSlug', 'routes/client/courses/course.tsx'),
      layout('layout/client/private-route.tsx', [
        route('bought-courses', 'routes/client/bought-courses/index.tsx'),
        route('learn/:courseSlug', 'routes/client/learn/index.tsx'),
        ...prefix('manage', [
          layout('layout/client/layout-manage.tsx', [
            route('profile', 'routes/client/manage/profile/index.tsx'),
            route('change-password', 'routes/client/manage/change-password/index.tsx'),
            route('cart', 'routes/client/manage/cart/index.tsx'),
            route('orders', 'routes/client/manage/orders/index.tsx'),
            route('orders/detail/:orderId', 'routes/client/manage/orders/detail/index.tsx')
          ])
        ])
      ])
    ]),
    layout('layout/client/layout-auth.tsx', [
      route('login', 'routes/client/login/index.tsx'),
      route('register', 'routes/client/register/index.tsx'),
      route('forgot-password', 'routes/client/forgot-password/index.tsx')
    ]),
    layout('layout/admin/layout-default.tsx', [
      route('/admin/dashboard', 'routes/admin/dashboard/index.tsx'),
      ...prefix('/admin/courses', [
        index('routes/admin/course/list/index.tsx'),
        route('/new', 'routes/admin/course/new/index.tsx'),
        route('/edit/:courseId', 'routes/admin/course/edit/index.tsx'),
        route('/detail/:courseId', 'routes/admin/course/detail/index.tsx')
      ]),
      ...prefix('/admin/users', [index('routes/admin/users/list/index.tsx')]),
      route('/admin/roles', 'routes/admin/role/list/index.tsx'),
      route('/admin/permissions', 'routes/admin/permission/list/index.tsx'),
      route('/admin/coupons', 'routes/admin/coupon/list/index.tsx')
    ])
  ])
] satisfies RouteConfig
