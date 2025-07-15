import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes'

export default [
  layout('layout/client/layout.tsx', 
    [
      index('routes/client/home/index.tsx'),
      route('bought-courses', 'routes/client/bought-courses/index.tsx'),
      route('courses/:courseSlug', 'routes/client/courses/course.tsx'),
      route('learn/:courseSlug', 'routes/client/learn/index.tsx'),
      ...prefix('manage', [
        layout('layout/client/layout-manage.tsx', [
          route('profile', 'routes/client/manage/profile/index.tsx'),
          route('change-password', 'routes/client/manage/change-password/index.tsx')
        ])
      ])
    ]
  ),
  layout('layout/client/layout-auth.tsx',
    [
      route('login', 'routes/client/login/index.tsx'),
      route('register', 'routes/client/register/index.tsx'),
      route('forgot-password', 'routes/client/forgot-password/index.tsx')
    ]
  )
] satisfies RouteConfig
