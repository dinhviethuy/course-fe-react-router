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
      url: string
    }[]
  }[]
}) {
  const { open, isMobile } = useSidebar()
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {(open || isMobile) && items.map((item) => (
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
                    <SidebarMenuSubItem key={subItem.title}>
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
        {(!open && !isMobile) && items.map((item) => (
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
                  <DropdownMenuItem key={subItem.title} className='gap-2 p-2'>
                    {subItem.title}
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
