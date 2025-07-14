import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  layout('layout/client/layout.tsx', 
    [
      index('routes/client/home/index.tsx'),
      route('bought-courses', 'routes/client/bought-courses/index.tsx'),
      route('courses/:courseSlug', 'routes/client/courses/course.tsx')
    ]
  )
] satisfies RouteConfig
