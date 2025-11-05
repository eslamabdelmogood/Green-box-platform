'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Wrench, BrainCircuit, Ship, Plane, Tornado } from 'lucide-react';

import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePersona, type PersonaType } from '@/context/persona-context';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/marketplace', icon: Wrench, label: 'Spares' },
  { href: '/ai-tools', icon: BrainCircuit, label: 'AI Tools' },
];

const personaOptions: { value: PersonaType, label: string, icon: React.ElementType }[] = [
  { value: 'Port', label: 'Port', icon: Ship },
  { value: 'Airport', label: 'Airport', icon: Plane },
  { value: 'Disaster', label: 'Disaster', icon: Tornado },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { persona, setPersonaType } = usePersona();

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 p-1">
          <Logo className="w-8 h-8 text-primary" />
          <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">
            Green Box
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="p-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:py-2">
          <Select value={persona.type} onValueChange={(value: PersonaType) => setPersonaType(value)}>
            <SelectTrigger className="group-data-[collapsible=icon]:hidden">
              <SelectValue placeholder="Select Persona" />
            </SelectTrigger>
             <SelectTrigger className="hidden group-data-[collapsible=icon]:flex items-center justify-center size-8">
              {persona.type && (
                (() => {
                  const Icon = personaOptions.find(p => p.value === persona.type)?.icon;
                  return Icon ? <Icon className="size-4" /> : null;
                })()
              )}
            </SelectTrigger>
            <SelectContent>
              {personaOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    <option.icon className="h-4 w-4" />
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Button
                asChild
                variant="ghost"
                className="w-full justify-start"
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="text-xs text-muted-foreground p-2 group-data-[collapsible=icon]:hidden">
          <p>&copy; {new Date().getFullYear()} Green Box</p>
        </div>
      </SidebarFooter>
    </>
  );
}
