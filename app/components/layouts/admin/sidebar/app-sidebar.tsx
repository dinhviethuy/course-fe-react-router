import {
  AudioWaveform,
  BookOpen,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  Lock,
  ShieldCheck,
  Ticket,
  Users
} from 'lucide-react'
import * as React from 'react'
import { NavMain } from '~/components/layouts/admin/sidebar/nav-main'
import { NavUser } from '~/components/layouts/admin/sidebar/nav-user'
import { TeamSwitcher } from '~/components/layouts/admin/sidebar/team-switcher'

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '~/components/ui/sidebar'
import { useGetProfileQuery } from '~/hooks/useUser'

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: 'https://github.com/shadcn.png'
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise'
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup'
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free'
    }
  ],
  navMain: [
    {
      title: 'Ttổng quan',
      url: '#',
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: 'Danh sách học viên',
          url: '#'
        }
      ]
    },
    {
      title: 'Khóa học',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Danh sách khóa học',
          url: '/admin/courses'
        },
        {
          title: 'Tạo khóa học mới',
          url: '/admin/courses/new'
        }
      ]
    },
    {
      title: 'Khuyến mãi',
      url: '#',
      icon: Ticket,
      items: [
        {
          title: 'Danh sách khuyến mãi',
          url: '/admin/coupons'
        }
      ]
    },
    {
      title: 'Người dùng',
      url: '#',
      icon: Users,
      items: [
        {
          title: 'Danh sách người dùng',
          url: '/admin/users'
        }
      ]
    },
    {
      title: 'Vai trò',
      url: '#',
      icon: ShieldCheck,
      items: [
        {
          title: 'Danh sách vai trò',
          url: '/admin/roles'
        }
      ]
    },
    {
      title: 'Quyền',
      url: '#',
      icon: Lock,
      items: [
        {
          title: 'Danh sách quyền',
          url: '/admin/permissions'
        }
      ]
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: profile } = useGetProfileQuery()
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={profile?.data.data} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
