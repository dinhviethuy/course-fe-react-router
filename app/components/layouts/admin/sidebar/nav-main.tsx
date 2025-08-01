import { type LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '~/components/ui/sidebar'
import { CheckAccess } from '~/lib/utils'
import { useAuthStore } from '~/stores/useAuthStore'

export function NavMain({
  items
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string,
      path: string,
      method: string,
      icon?: LucideIcon
    }[]
  }[]
}) {
  const { open, isMobile } = useSidebar()
  const { permissions } = useAuthStore()
  const filteredItems = items
    .filter(item => item.items?.some(sub => CheckAccess(
      {
        permissions,
        method: sub.method,
        path: sub.path
      }
    )))
    .map(item => ({
      ...item,
      items: item.items!.filter(sub => CheckAccess({
        permissions,
        method: sub.method,
        path: sub.path
      }))
    }))

  return (
    <>
      {(open || isMobile) && filteredItems.map((item) => (
        <SidebarGroup key={item.title}>
          <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <NavLink to={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
      {(!open && !isMobile) && <SidebarGroup>
        <SidebarMenu>
          {filteredItems.map((item) => (
            <DropdownMenu key={item.title}>
              <SidebarMenuItem>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className=' rounded-lg'
                  align='start'
                  side='bottom'
                  sideOffset={4}
                >
                  {item.items?.map((subItem) => (
                    <DropdownMenuItem className='gap-2 p-2'>
                      <NavLink to={subItem.url}>
                        <span>{subItem.title}</span>
                      </NavLink>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </SidebarMenuItem>
            </DropdownMenu>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      }
    </>

  )
}
