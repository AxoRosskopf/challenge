import { Separator } from "../ui/separator"
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "../ui/sidebar"
import { CircleDashedIcon } from "lucide-react"

const sidebarItems = [
  { label: "Inicio", href: "/" },
  { label: "Propiedades", href: "/properties" },
]

const DashboardSlidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex gap-2 p-4">
          <CircleDashedIcon />
          <span className="text-base font-semibold">Dashboard</span>
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarMenu className="p-4">
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild>
                <div className="flex items-center gap-2 w-full">
                  <a href={item.href} className="font-medium w-full">{item.label}</a>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

export default DashboardSlidebar