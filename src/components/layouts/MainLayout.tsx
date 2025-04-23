
import { ReactNode } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Award, BookOpen, CalendarDays, Home, Layers, Menu, Settings, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: Home,
    },
    {
      title: "Profile",
      path: "/profile",
      icon: User,
    },
    {
      title: "Quests",
      path: "/quests",
      icon: Award,
    },
    {
      title: "Daily Log",
      path: "/daily-log",
      icon: CalendarDays,
    },
    {
      title: "Shadow Army",
      path: "/shadows",
      icon: Layers,
    },
    {
      title: "Codex",
      path: "/codex",
      icon: BookOpen,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="flex min-h-screen bg-solo-purple-dark">
      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 border-b border-solo-purple-secondary/20 bg-solo-purple-dark/90 backdrop-blur-md">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-semibold text-white">
            <span className="text-solo-purple-accent">Solo</span> Leveling
          </h1>
          <Button variant="outline" size="icon" className="border-solo-purple-secondary/50">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <Sidebar className="w-64 border-r border-solo-purple-secondary/20 bg-solo-purple-dark/90">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-glow-purple mb-8 mt-2">
              <span className="text-solo-purple-accent">Solo</span> Leveling
            </h1>
          </div>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-solo-gray-neutral">Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className={location.pathname === item.path ? "bg-solo-purple-accent/20" : ""}>
                        <Link to={item.path} className="flex items-center">
                          <item.icon className="mr-2 h-5 w-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </div>

      {/* Main content */}
      <div className="flex-1 pb-16 pt-20 md:pt-6 px-4 md:px-8">
        <main>{children}</main>
      </div>
    </div>
  );
}
