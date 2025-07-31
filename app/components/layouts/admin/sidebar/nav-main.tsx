import { ChevronRight, type LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
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
      method: string
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
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {(open || isMobile) && filteredItems.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive} className='group/collapsible'>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <NavLink
                          to={subItem.url}
                          className={({ isActive }) => (isActive ? 'bg-primary text-primary-foreground' : '')}
                        >
                          <span>{subItem.title}</span>
                        </NavLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
        {(!open && !isMobile) && filteredItems.map((item) => (
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
  )
}
